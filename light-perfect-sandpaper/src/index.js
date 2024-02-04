import "core-js";
import RainRenderer from "./rain-renderer";
import Raindrops from "./raindrops";
import loadImages from "./image-loader";
import createCanvas from "./create-canvas";
import TweenLite from "gsap";
import times from "./times";
import { random, chance } from "./random";

let textureRainFg,
	textureRainBg,
	textureSunFg,
	textureSunBg,
	textureDrizzleFg,
	textureDrizzleBg,
	dropColor,
	dropAlpha;

let textureFg, textureFgCtx, textureBg, textureBgCtx;

let textureBgSize = {
	width: 2000,
	height: 1500,
};
let textureFgSize = {
	width: 2000,
	height: 1500,
};

let raindrops, renderer, canvas;

let parallax = { x: 0, y: 0 };

let weatherData = null;
let curWeatherData = null;
let blend = { v: 0 };

function loadTextures() {
	loadImages([
		{ name: "dropAlpha", src: "img/drop-alpha.png" },
		{ name: "dropColor", src: "img/drop-color.png" },

		{ name: "textureRainFg", src: "img/main-texture.jpg" },
		{ name: "textureRainBg", src: "img/main.jpg" },

		{ name: "textureSunFg", src: "img/main-texture.jpg" },
		{ name: "textureSunBg", src: "img/main.jpg" },

		{ name: "textureDrizzleFg", src: "img/main-texture.jpg" },
		{ name: "textureDrizzleBg", src: "img/main.jpg" },
	]).then((images) => {
		textureRainFg = images.textureRainFg.img;
		textureRainBg = images.textureRainBg.img;

		textureSunFg = images.textureSunFg.img;
		textureSunBg = images.textureSunBg.img;

		textureDrizzleFg = images.textureDrizzleFg.img;
		textureDrizzleBg = images.textureDrizzleBg.img;

		dropColor = images.dropColor.img;
		dropAlpha = images.dropAlpha.img;

		init();
	});
}
loadTextures();

function init() {
	canvas = document.querySelector("#container");

	let dpi = window.devicePixelRatio;
	canvas.width = window.innerWidth * dpi;
	canvas.height = window.innerHeight * dpi;
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";

	raindrops = new Raindrops(
		canvas.width,
		canvas.height,
		dpi,
		dropAlpha,
		dropColor,
		{
			trailRate: 1,
			trailScaleRange: [0.2, 0.45],
			collisionRadius: 0.45,
			dropletsCleaningRadiusMultiplier: 0.28,
		}
	);

	textureFg = createCanvas(textureFgSize.width, textureFgSize.height);
	textureFgCtx = textureFg.getContext("2d");
	textureBg = createCanvas(textureBgSize.width, textureBgSize.height);
	textureBgCtx = textureBg.getContext("2d");

	generateTextures(textureRainFg, textureRainBg);

	renderer = new RainRenderer(
		canvas,
		raindrops.canvas,
		textureFg,
		textureBg,
		null,
		{
			brightness: 1.04,
			alphaMultiply: 6,
			alphaSubtract: 3,
			minRefraction: 256,
			maxRefraction: 512,
		}
	);

	setupEvents();
}

function setupEvents() {
	setupParallax();
	setupWeather();
	setupFlash();
}
function setupParallax() {
	document.addEventListener("mousemove", (event) => {
		let x = event.pageX;
		let y = event.pageY;

		// Increase the multiplier to make the parallax effect more intense
		const intensityMultiplier = 2.5;

		TweenLite.to(parallax, 1, {
			x: (x / canvas.width) * 2 - 1,
			y: (y / canvas.height) * 2 - 1,
			ease: Quint.easeOut,
			onUpdate: () => {
				renderer.parallaxX = parallax.x * intensityMultiplier;
				renderer.parallaxY = parallax.y * intensityMultiplier;
			},
		});
	});
}
function setupFlash() {
	setInterval(() => {
		if (chance(curWeatherData.flashChance)) {
			flash(
				curWeatherData.bg,
				curWeatherData.fg,
				curWeatherData.flashBg,
				curWeatherData.flashFg
			);
		}
	}, 500);
}
function setupWeather() {
	setupWeatherData();
	window.addEventListener("hashchange", (event) => {
		updateWeather();
	});
	updateWeather();
}
function setupWeatherData() {
	let defaultWeather = {
		raining: true,
		minR: 20,
		maxR: 50,
		rainChance: 0.35,
		rainLimit: 6,
		dropletsRate: 50,
		dropletsSize: [3, 5.5],
		trailRate: 1,
		trailScaleRange: [0.25, 0.35],
		fg: textureRainFg,
		bg: textureRainBg,
		flashFg: null,
		flashBg: null,
		flashChance: 0,
		collisionRadiusIncrease: 0.0002,
	};

	function weather(data) {
		return Object.assign({}, defaultWeather, data);
	}

	weatherData = {
		sunny: weather({
			rainChance: 0,
			rainLimit: 0,
			droplets: 0,
			raining: false,
			fg: textureSunFg,
			bg: textureSunBg,
		}),
		drizzle: weather({
			minR: 10,
			maxR: 40,
			rainChance: 0.15,
			rainLimit: 2,
			dropletsRate: 10,
			dropletsSize: [3.5, 6],
			fg: textureDrizzleFg,
			bg: textureDrizzleBg,
		}),
		rain: weather({
			rainChance: 0.35,
			dropletsRate: 50,
			raining: true,
			trailRate: 2.5,
			fg: textureRainFg,
			bg: textureRainBg,
		}),
	};
}
function updateWeather() {
	let hash = window.location.hash;
	let currentSlide = null;
	let currentNav = null;
	if (hash != "") {
		currentSlide = document.querySelector(hash);
	}
	if (currentSlide == null) {
		currentSlide = document.querySelector(".slide");
		hash = "#" + currentSlide.getAttribute("id");
	}
	currentNav = document.querySelector("[href='" + hash + "']");
	let data = weatherData[currentSlide.getAttribute("data-weather")];
	curWeatherData = data;

	raindrops.options = Object.assign(raindrops.options, data);

	raindrops.clearDrops();

	TweenLite.fromTo(
		blend,
		1,
		{
			v: 0,
		},
		{
			v: 1,
			onUpdate: () => {
				generateTextures(data.fg, data.bg, blend.v);
				renderer.updateTextures();
			},
		}
	);

	let lastSlide = document.querySelector(".slide--current");
	if (lastSlide != null) lastSlide.classList.remove("slide--current");

	let lastNav = document.querySelector(".nav-item--current");
	if (lastNav != null) lastNav.classList.remove("nav-item--current");

	currentSlide.classList.add("slide--current");
	currentNav.classList.add("nav-item--current");
}

function flash(baseBg, baseFg, flashBg, flashFg) {
	let flashValue = { v: 0 };
	function transitionFlash(to, t = 0.025) {
		return new Promise((resolve, reject) => {
			TweenLite.to(flashValue, t, {
				v: to,
				ease: Quint.easeOut,
				onUpdate: () => {
					generateTextures(baseFg, baseBg);
					generateTextures(flashFg, flashBg, flashValue.v);
					renderer.updateTextures();
				},
				onComplete: () => {
					resolve();
				},
			});
		});
	}

	let lastFlash = transitionFlash(1);
	times(random(2, 7), (i) => {
		lastFlash = lastFlash.then(() => {
			return transitionFlash(random(0.1, 1));
		});
	});
	lastFlash = lastFlash
		.then(() => {
			return transitionFlash(1, 0.1);
		})
		.then(() => {
			transitionFlash(0, 0.25);
		});
}
function generateTextures(fg, bg, alpha = 1) {
	textureFgCtx.globalAlpha = alpha;
	textureFgCtx.drawImage(fg, 0, 0, textureFgSize.width, textureFgSize.height);

	textureBgCtx.globalAlpha = alpha;
	textureBgCtx.drawImage(bg, 0, 0, textureBgSize.width, textureBgSize.height);
}
