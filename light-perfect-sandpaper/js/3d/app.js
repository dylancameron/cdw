!(function (t) {
	var e = {};
	function i(a) {
		if (e[a]) return e[a].exports;
		var n = (e[a] = { i: a, l: !1, exports: {} });
		return t[a].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
	}
	(i.m = t),
		(i.c = e),
		(i.d = function (t, e, a) {
			i.o(t, e) ||
				Object.defineProperty(t, e, { enumerable: !0, get: a });
		}),
		(i.r = function (t) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, {
					value: "Module",
				}),
				Object.defineProperty(t, "__esModule", { value: !0 });
		}),
		(i.t = function (t, e) {
			if ((1 & e && (t = i(t)), 8 & e)) return t;
			if (4 & e && "object" == typeof t && t && t.__esModule) return t;
			var a = Object.create(null);
			if (
				(i.r(a),
				Object.defineProperty(a, "default", {
					enumerable: !0,
					value: t,
				}),
				2 & e && "string" != typeof t)
			)
				for (var n in t)
					i.d(
						a,
						n,
						function (e) {
							return t[e];
						}.bind(null, n)
					);
			return a;
		}),
		(i.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return i.d(e, "a", e), e;
		}),
		(i.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(i.p = "js/"),
		i((i.s = 0));
})([
	function (t, e, i) {
		"use strict";
		Object.defineProperty(e, "__esModule", { value: !0 });
		var a = (function () {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var a = e[i];
						(a.enumerable = a.enumerable || !1),
							(a.configurable = !0),
							"value" in a && (a.writable = !0),
							Object.defineProperty(t, a.key, a);
					}
				}
				return function (e, i, a) {
					return i && t(e.prototype, i), a && t(e, a), e;
				};
			})(),
			n = r(i(1)),
			o = r(i(2));
		function r(t) {
			return t && t.__esModule ? t : { default: t };
		}
		var s = new (r(i(3)).default.GyroNorm)(),
			l = (function () {
				function t() {
					!(function (t, e) {
						if (!(t instanceof e))
							throw new TypeError(
								"Cannot call a class as a function"
							);
					})(this, t),
						(this.container = document.getElementById("gl")),
						(this.canvas = document.createElement("canvas")),
						this.container.appendChild(this.canvas),
						(this.gl = this.canvas.getContext("webgl")),
						(this.ratio = window.devicePixelRatio),
						(this.windowWidth = window.innerWidth),
						(this.windowHeight = window.innerHeight),
						(this.mouseX = 0),
						(this.mouseY = 0),
						(this.mouseTargetX = 0),
						(this.mouseTargetY = 0),
						(this.imageOriginal =
							this.container.getAttribute("data-imageOriginal")),
						(this.imageDepth =
							this.container.getAttribute("data-imageDepth")),
						(this.vth = this.container.getAttribute(
							"data-verticalThreshold"
						)),
						(this.hth = this.container.getAttribute(
							"data-horizontalThreshold"
						)),
						(this.imageURLs = [
							this.imageOriginal,
							this.imageDepth,
						]),
						(this.textures = []),
						(this.startTime = new Date().getTime()),
						this.createScene(),
						this.addTexture(),
						this.mouseMove(),
						this.gyro();
				}
				return (
					a(t, [
						{
							key: "addShader",
							value: function (t, e) {
								var i = this.gl.createShader(e);
								if (
									(this.gl.shaderSource(i, t),
									this.gl.compileShader(i),
									!this.gl.getShaderParameter(
										i,
										this.gl.COMPILE_STATUS
									))
								)
									throw new Error(
										"Shader compile error: " +
											this.gl.getShaderInfoLog(i)
									);
								this.gl.attachShader(this.program, i);
							},
						},
						{
							key: "resizeHandler",
							value: function () {
								(this.windowWidth = window.innerWidth),
									(this.windowHeight = window.innerHeight),
									(this.width = this.container.offsetWidth),
									(this.height = this.container.offsetHeight),
									(this.canvas.width =
										this.width * this.ratio),
									(this.canvas.height =
										this.height * this.ratio),
									(this.canvas.style.width =
										this.width + "px"),
									(this.canvas.style.height =
										this.height + "px");
								var t = void 0,
									e = void 0;
								this.height / this.width < this.imageAspect
									? ((t = 1),
									  (e =
											this.height /
											this.width /
											this.imageAspect))
									: ((t =
											(this.width / this.height) *
											this.imageAspect),
									  (e = 1)),
									this.uResolution.set(
										this.width,
										this.height,
										t,
										e
									),
									this.uRatio.set(1 / this.ratio),
									this.uThreshold.set(this.hth, this.vth),
									this.gl.viewport(
										0,
										0,
										this.width * this.ratio,
										this.height * this.ratio
									);
							},
						},
						{
							key: "resize",
							value: function () {
								this.resizeHandler(),
									window.addEventListener(
										"resize",
										this.resizeHandler.bind(this)
									);
							},
						},
						{
							key: "createScene",
							value: function () {
								(this.program = this.gl.createProgram()),
									this.addShader(
										o.default,
										this.gl.VERTEX_SHADER
									),
									this.addShader(
										n.default,
										this.gl.FRAGMENT_SHADER
									),
									this.gl.linkProgram(this.program),
									this.gl.useProgram(this.program),
									(this.uResolution = new h(
										"resolution",
										"4f",
										this.program,
										this.gl
									)),
									(this.uMouse = new h(
										"mouse",
										"2f",
										this.program,
										this.gl
									)),
									(this.uTime = new h(
										"time",
										"1f",
										this.program,
										this.gl
									)),
									(this.uRatio = new h(
										"pixelRatio",
										"1f",
										this.program,
										this.gl
									)),
									(this.uThreshold = new h(
										"threshold",
										"2f",
										this.program,
										this.gl
									)),
									(this.billboard = new u(this.gl)),
									(this.positionLocation =
										this.gl.getAttribLocation(
											this.program,
											"a_position"
										)),
									this.gl.enableVertexAttribArray(
										this.positionLocation
									),
									this.gl.vertexAttribPointer(
										this.positionLocation,
										2,
										this.gl.FLOAT,
										!1,
										0,
										0
									);
							},
						},
						{
							key: "addTexture",
							value: function () {
								this.gl;
								!(function (t, e) {
									for (
										var i = [],
											a = t.length,
											n = function () {
												0 === --a && e(i);
											},
											o = 0;
										o < a;
										++o
									) {
										var r = c(t[o], n);
										i.push(r);
									}
								})(this.imageURLs, this.start.bind(this));
							},
						},
						{
							key: "start",
							value: function (t) {
								var e = this.gl;
								(this.imageAspect =
									t[0].naturalHeight / t[0].naturalWidth),
									console.log(
										this.imageAspect,
										"=aspect",
										this
									);
								for (var i = 0; i < t.length; i++) {
									var a = e.createTexture();
									e.bindTexture(e.TEXTURE_2D, a),
										e.texParameteri(
											e.TEXTURE_2D,
											e.TEXTURE_WRAP_S,
											e.CLAMP_TO_EDGE
										),
										e.texParameteri(
											e.TEXTURE_2D,
											e.TEXTURE_WRAP_T,
											e.CLAMP_TO_EDGE
										),
										e.texParameteri(
											e.TEXTURE_2D,
											e.TEXTURE_MIN_FILTER,
											e.LINEAR
										),
										e.texParameteri(
											e.TEXTURE_2D,
											e.TEXTURE_MAG_FILTER,
											e.LINEAR
										),
										e.texImage2D(
											e.TEXTURE_2D,
											0,
											e.RGBA,
											e.RGBA,
											e.UNSIGNED_BYTE,
											t[i]
										),
										this.textures.push(a);
								}
								var n = this.gl.getUniformLocation(
										this.program,
										"image0"
									),
									o = this.gl.getUniformLocation(
										this.program,
										"image1"
									);
								this.gl.uniform1i(n, 0),
									this.gl.uniform1i(o, 1),
									this.gl.activeTexture(this.gl.TEXTURE0),
									this.gl.bindTexture(
										this.gl.TEXTURE_2D,
										this.textures[0]
									),
									this.gl.activeTexture(this.gl.TEXTURE1),
									this.gl.bindTexture(
										this.gl.TEXTURE_2D,
										this.textures[1]
									),
									this.resize(),
									this.render();
							},
						},
						{
							key: "gyro",
							value: function () {
								var t = this;
								this.maxTilt = 15;
								s.init({ gravityNormalized: !0 })
									.then(function () {
										s.start(function (e) {
											var i = e.do.gamma,
												a = e.do.beta;
											(t.mouseTargetY =
												m(a, -t.maxTilt, t.maxTilt) /
												t.maxTilt),
												(t.mouseTargetX =
													-m(
														i,
														-t.maxTilt,
														t.maxTilt
													) / t.maxTilt);
										});
									})
									.catch(function (t) {
										console.log("not supported");
									});
							},
						},
						{
							key: "mouseMove",
							value: function () {
								var t = this;
								document.addEventListener(
									"mousemove",
									function (e) {
										var i = t.windowWidth / 2,
											a = t.windowHeight / 2;
										(t.mouseTargetX = (i - e.clientX) / i),
											(t.mouseTargetY =
												(a - e.clientY) / a);
									}
								);
							},
						},
						{
							key: "render",
							value: function () {
								var t =
									(new Date().getTime() - this.startTime) /
									1e3;
								this.uTime.set(t),
									(this.mouseX +=
										0.05 *
										(this.mouseTargetX - this.mouseX)),
									(this.mouseY +=
										0.05 *
										(this.mouseTargetY - this.mouseY)),
									this.uMouse.set(this.mouseX, this.mouseY),
									this.billboard.render(this.gl),
									requestAnimationFrame(
										this.render.bind(this)
									);
							},
						},
					]),
					t
				);
			})();
		function c(t, e) {
			var i = new Image();
			return (i.src = t), (i.onload = e), i;
		}
		function h(t, e, i, a) {
			(this.name = t),
				(this.suffix = e),
				(this.gl = a),
				(this.program = i),
				(this.location = a.getUniformLocation(i, t));
		}
		function u(t) {
			var e = t.createBuffer();
			t.bindBuffer(t.ARRAY_BUFFER, e),
				t.bufferData(t.ARRAY_BUFFER, u.verts, t.STATIC_DRAW);
		}
		function m(t, e, i) {
			return (
				t == t &&
					(void 0 !== i && (t = t <= i ? t : i),
					void 0 !== e && (t = t >= e ? t : e)),
				t
			);
		}
		(e.default = l),
			(h.prototype.set = function () {
				for (
					var t = "uniform" + this.suffix,
						e = arguments.length,
						i = Array(e),
						a = 0;
					a < e;
					a++
				)
					i[a] = arguments[a];
				var n = [this.location].concat(i);
				this.gl[t].apply(this.gl, n);
			}),
			(u.verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])),
			(u.prototype.render = function (t) {
				t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
			}),
			new l();
	},
	function (t, e) {
		t.exports =
			"#ifdef GL_ES\n  precision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform vec4 resolution;\nuniform vec2 mouse;\nuniform vec2 threshold;\nuniform float time;\nuniform float pixelRatio;\nuniform sampler2D image0;\nuniform sampler2D image1;\n\n\nvec2 mirrored(vec2 v) {\n  vec2 m = mod(v,2.);\n  return mix(m,2.0 - m, step(1.0 ,m));\n}\n\nvoid main() {\n  // uvs and textures\n  vec2 uv = pixelRatio*gl_FragCoord.xy / resolution.xy ;\n  vec2 vUv = (uv - vec2(0.5))*resolution.zw + vec2(0.5);\n  vUv.y = 1. - vUv.y;\n  vec4 tex1 = texture2D(image1,mirrored(vUv));\n  // tex1.r = 1. - tex1.r;\n  // tex1.r = tex1.r*tex1.r;\n  vec2 fake3d = vec2(vUv.x + (tex1.r - 0.5)*mouse.x/threshold.x, vUv.y + (tex1.r - 0.5)*mouse.y/threshold.y);\n  vec4 tex0 = texture2D(image0,mirrored(fake3d));\n  \n\n\n  gl_FragColor = vec4(uv,0.,1.);\n  gl_FragColor = tex0;\n}";
	},
	function (t, e) {
		t.exports =
			"#define GLSLIFY 1\nattribute vec2 a_position;\n\nvoid main() {\n  gl_Position = vec4( a_position, 0, 1 );\n}";
	},
	function (t, e, i) {
		"use strict";
		var a, n;
		"function" == typeof Symbol && Symbol.iterator;
		!(function (t) {
			function e(t) {
				return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1;
			}
			function i(t) {
				return new Promise(function (e, i) {
					!(function a(n) {
						setTimeout(function () {
							t && t.data ? e() : n >= 20 ? i() : a(++n);
						}, 50);
					})(0);
				});
			}
			function a() {
				d = m
					? (t.screen.orientation.angle || 0) * c
					: (t.orientation || 0) * c;
			}
			function n(t) {
				for (var e in ((u.orientation.data = t),
				u.orientation.callbacks))
					u.orientation.callbacks[e].call(this);
			}
			function o(t) {
				for (var e in ((u.motion.data = t), u.motion.callbacks))
					u.motion.callbacks[e].call(this);
			}
			if (void 0 === t.FULLTILT || null === t.FULLTILT) {
				var r = Math.PI,
					s = r / 2,
					l = 2 * r,
					c = r / 180,
					h = 180 / r,
					u = {
						orientation: {
							active: !1,
							callbacks: [],
							data: void 0,
						},
						motion: { active: !1, callbacks: [], data: void 0 },
					},
					m = !(
						!t.screen ||
						!t.screen.orientation ||
						void 0 === t.screen.orientation.angle ||
						null === t.screen.orientation.angle
					),
					d =
						(m ? t.screen.orientation.angle : t.orientation || 0) *
						c,
					v = s,
					g = r,
					f = l / 3,
					p = -s,
					y = {
						version: "0.5.3",
						getDeviceOrientation: function (t) {
							return new Promise(function (e, a) {
								var n = new y.DeviceOrientation(t);
								n.start(),
									new i(u.orientation)
										.then(function () {
											(n._alphaAvailable =
												u.orientation.data.alpha &&
												null !==
													u.orientation.data.alpha),
												(n._betaAvailable =
													u.orientation.data.beta &&
													null !==
														u.orientation.data
															.beta),
												(n._gammaAvailable =
													u.orientation.data.gamma &&
													null !==
														u.orientation.data
															.gamma),
												e(n);
										})
										.catch(function () {
											n.stop(),
												a(
													"DeviceOrientation is not supported"
												);
										});
							});
						},
						getDeviceMotion: function (t) {
							return new Promise(function (e, a) {
								var n = new y.DeviceMotion(t);
								n.start(),
									new i(u.motion)
										.then(function () {
											(n._accelerationXAvailable =
												u.motion.data.acceleration &&
												u.motion.data.acceleration.x),
												(n._accelerationYAvailable =
													u.motion.data
														.acceleration &&
													u.motion.data.acceleration
														.y),
												(n._accelerationZAvailable =
													u.motion.data
														.acceleration &&
													u.motion.data.acceleration
														.z),
												(n._accelerationIncludingGravityXAvailable =
													u.motion.data
														.accelerationIncludingGravity &&
													u.motion.data
														.accelerationIncludingGravity
														.x),
												(n._accelerationIncludingGravityYAvailable =
													u.motion.data
														.accelerationIncludingGravity &&
													u.motion.data
														.accelerationIncludingGravity
														.y),
												(n._accelerationIncludingGravityZAvailable =
													u.motion.data
														.accelerationIncludingGravity &&
													u.motion.data
														.accelerationIncludingGravity
														.z),
												(n._rotationRateAlphaAvailable =
													u.motion.data
														.rotationRate &&
													u.motion.data.rotationRate
														.alpha),
												(n._rotationRateBetaAvailable =
													u.motion.data
														.rotationRate &&
													u.motion.data.rotationRate
														.beta),
												(n._rotationRateGammaAvailable =
													u.motion.data
														.rotationRate &&
													u.motion.data.rotationRate
														.gamma),
												e(n);
										})
										.catch(function () {
											n.stop(),
												a(
													"DeviceMotion is not supported"
												);
										});
							});
						},
						Quaternion: function (t, i, a, n) {
							var o;
							(this.set = function (t, e, i, a) {
								(this.x = t || 0),
									(this.y = e || 0),
									(this.z = i || 0),
									(this.w = a || 1);
							}),
								(this.copy = function (t) {
									(this.x = t.x),
										(this.y = t.y),
										(this.z = t.z),
										(this.w = t.w);
								}),
								(this.setFromEuler = (function () {
									var t, e, i, a, n, o, r, s, l, h, u, m;
									return function (d) {
										return (
											(i =
												((d = d || {}).alpha || 0) * c),
											(t = (d.beta || 0) * c),
											(e = (d.gamma || 0) * c),
											(o = i / 2),
											(a = t / 2),
											(n = e / 2),
											(r = Math.cos(a)),
											(s = Math.cos(n)),
											(l = Math.cos(o)),
											(h = Math.sin(a)),
											(u = Math.sin(n)),
											(m = Math.sin(o)),
											this.set(
												h * s * l - r * u * m,
												r * u * l + h * s * m,
												r * s * m + h * u * l,
												r * s * l - h * u * m
											),
											this.normalize(),
											this
										);
									};
								})()),
								(this.setFromRotationMatrix = (function () {
									var t;
									return function (i) {
										return (
											(t = i.elements),
											this.set(
												0.5 *
													Math.sqrt(
														1 + t[0] - t[4] - t[8]
													) *
													e(t[7] - t[5]),
												0.5 *
													Math.sqrt(
														1 - t[0] + t[4] - t[8]
													) *
													e(t[2] - t[6]),
												0.5 *
													Math.sqrt(
														1 - t[0] - t[4] + t[8]
													) *
													e(t[3] - t[1]),
												0.5 *
													Math.sqrt(
														1 + t[0] + t[4] + t[8]
													)
											),
											this
										);
									};
								})()),
								(this.multiply = function (t) {
									return (
										(o =
											y.Quaternion.prototype.multiplyQuaternions(
												this,
												t
											)),
										this.copy(o),
										this
									);
								}),
								(this.rotateX = function (t) {
									return (
										(o =
											y.Quaternion.prototype.rotateByAxisAngle(
												this,
												[1, 0, 0],
												t
											)),
										this.copy(o),
										this
									);
								}),
								(this.rotateY = function (t) {
									return (
										(o =
											y.Quaternion.prototype.rotateByAxisAngle(
												this,
												[0, 1, 0],
												t
											)),
										this.copy(o),
										this
									);
								}),
								(this.rotateZ = function (t) {
									return (
										(o =
											y.Quaternion.prototype.rotateByAxisAngle(
												this,
												[0, 0, 1],
												t
											)),
										this.copy(o),
										this
									);
								}),
								(this.normalize = function () {
									return y.Quaternion.prototype.normalize(
										this
									);
								}),
								this.set(t, i, a, n);
						},
					};
				(y.Quaternion.prototype = {
					constructor: y.Quaternion,
					multiplyQuaternions: (function () {
						var t = new y.Quaternion();
						return function (e, i) {
							var a = e.x,
								n = e.y,
								o = e.z,
								r = e.w,
								s = i.x,
								l = i.y,
								c = i.z,
								h = i.w;
							return (
								t.set(
									a * h + r * s + n * c - o * l,
									n * h + r * l + o * s - a * c,
									o * h + r * c + a * l - n * s,
									r * h - a * s - n * l - o * c
								),
								t
							);
						};
					})(),
					normalize: function (t) {
						var e = Math.sqrt(
							t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w
						);
						return (
							0 === e
								? ((t.x = 0), (t.y = 0), (t.z = 0), (t.w = 1))
								: ((e = 1 / e),
								  (t.x *= e),
								  (t.y *= e),
								  (t.z *= e),
								  (t.w *= e)),
							t
						);
					},
					rotateByAxisAngle: (function () {
						var t,
							e,
							i = new y.Quaternion(),
							a = new y.Quaternion();
						return function (n, o, r) {
							return (
								(t = (r || 0) / 2),
								(e = Math.sin(t)),
								a.set(
									(o[0] || 0) * e,
									(o[1] || 0) * e,
									(o[2] || 0) * e,
									Math.cos(t)
								),
								(i = y.Quaternion.prototype.multiplyQuaternions(
									n,
									a
								)),
								y.Quaternion.prototype.normalize(i)
							);
						};
					})(),
				}),
					(y.RotationMatrix = function (t, e, i, a, n, o, r, s, l) {
						var h;
						(this.elements = new Float32Array(9)),
							(this.identity = function () {
								return (
									this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
								);
							}),
							(this.set = function (t, e, i, a, n, o, r, s, l) {
								(this.elements[0] = t || 1),
									(this.elements[1] = e || 0),
									(this.elements[2] = i || 0),
									(this.elements[3] = a || 0),
									(this.elements[4] = n || 1),
									(this.elements[5] = o || 0),
									(this.elements[6] = r || 0),
									(this.elements[7] = s || 0),
									(this.elements[8] = l || 1);
							}),
							(this.copy = function (t) {
								(this.elements[0] = t.elements[0]),
									(this.elements[1] = t.elements[1]),
									(this.elements[2] = t.elements[2]),
									(this.elements[3] = t.elements[3]),
									(this.elements[4] = t.elements[4]),
									(this.elements[5] = t.elements[5]),
									(this.elements[6] = t.elements[6]),
									(this.elements[7] = t.elements[7]),
									(this.elements[8] = t.elements[8]);
							}),
							(this.setFromEuler = (function () {
								var t, e, i, a, n, o, r, s, l;
								return function (h) {
									return (
										(i = ((h = h || {}).alpha || 0) * c),
										(t = (h.beta || 0) * c),
										(e = (h.gamma || 0) * c),
										(a = Math.cos(t)),
										(n = Math.cos(e)),
										(o = Math.cos(i)),
										(r = Math.sin(t)),
										(s = Math.sin(e)),
										(l = Math.sin(i)),
										this.set(
											o * n - l * r * s,
											-a * l,
											n * l * r + o * s,
											n * l + o * r * s,
											o * a,
											l * s - o * n * r,
											-a * s,
											r,
											a * n
										),
										this.normalize(),
										this
									);
								};
							})()),
							(this.setFromQuaternion = (function () {
								var t, e, i, a;
								return function (n) {
									return (
										(t = n.w * n.w),
										(e = n.x * n.x),
										(i = n.y * n.y),
										(a = n.z * n.z),
										this.set(
											t + e - i - a,
											2 * (n.x * n.y - n.w * n.z),
											2 * (n.x * n.z + n.w * n.y),
											2 * (n.x * n.y + n.w * n.z),
											t - e + i - a,
											2 * (n.y * n.z - n.w * n.x),
											2 * (n.x * n.z - n.w * n.y),
											2 * (n.y * n.z + n.w * n.x),
											t - e - i + a
										),
										this
									);
								};
							})()),
							(this.multiply = function (t) {
								return (
									(h =
										y.RotationMatrix.prototype.multiplyMatrices(
											this,
											t
										)),
									this.copy(h),
									this
								);
							}),
							(this.rotateX = function (t) {
								return (
									(h =
										y.RotationMatrix.prototype.rotateByAxisAngle(
											this,
											[1, 0, 0],
											t
										)),
									this.copy(h),
									this
								);
							}),
							(this.rotateY = function (t) {
								return (
									(h =
										y.RotationMatrix.prototype.rotateByAxisAngle(
											this,
											[0, 1, 0],
											t
										)),
									this.copy(h),
									this
								);
							}),
							(this.rotateZ = function (t) {
								return (
									(h =
										y.RotationMatrix.prototype.rotateByAxisAngle(
											this,
											[0, 0, 1],
											t
										)),
									this.copy(h),
									this
								);
							}),
							(this.normalize = function () {
								return y.RotationMatrix.prototype.normalize(
									this
								);
							}),
							this.set(t, e, i, a, n, o, r, s, l);
					}),
					(y.RotationMatrix.prototype = {
						constructor: y.RotationMatrix,
						multiplyMatrices: (function () {
							var t,
								e,
								i = new y.RotationMatrix();
							return function (a, n) {
								return (
									(t = a.elements),
									(e = n.elements),
									i.set(
										t[0] * e[0] + t[1] * e[3] + t[2] * e[6],
										t[0] * e[1] + t[1] * e[4] + t[2] * e[7],
										t[0] * e[2] + t[1] * e[5] + t[2] * e[8],
										t[3] * e[0] + t[4] * e[3] + t[5] * e[6],
										t[3] * e[1] + t[4] * e[4] + t[5] * e[7],
										t[3] * e[2] + t[4] * e[5] + t[5] * e[8],
										t[6] * e[0] + t[7] * e[3] + t[8] * e[6],
										t[6] * e[1] + t[7] * e[4] + t[8] * e[7],
										t[6] * e[2] + t[7] * e[5] + t[8] * e[8]
									),
									i
								);
							};
						})(),
						normalize: function (t) {
							var e = t.elements,
								i =
									e[0] * e[4] * e[8] -
									e[0] * e[5] * e[7] -
									e[1] * e[3] * e[8] +
									e[1] * e[5] * e[6] +
									e[2] * e[3] * e[7] -
									e[2] * e[4] * e[6];
							return (
								(e[0] /= i),
								(e[1] /= i),
								(e[2] /= i),
								(e[3] /= i),
								(e[4] /= i),
								(e[5] /= i),
								(e[6] /= i),
								(e[7] /= i),
								(e[8] /= i),
								(t.elements = e),
								t
							);
						},
						rotateByAxisAngle: (function () {
							var t,
								e,
								i = new y.RotationMatrix(),
								a = new y.RotationMatrix(),
								n = !1;
							return function (o, r, s) {
								return (
									a.identity(),
									(n = !1),
									(t = Math.sin(s)),
									(e = Math.cos(s)),
									1 === r[0] && 0 === r[1] && 0 === r[2]
										? ((n = !0),
										  (a.elements[4] = e),
										  (a.elements[5] = -t),
										  (a.elements[7] = t),
										  (a.elements[8] = e))
										: 1 === r[1] && 0 === r[0] && 0 === r[2]
										? ((n = !0),
										  (a.elements[0] = e),
										  (a.elements[2] = t),
										  (a.elements[6] = -t),
										  (a.elements[8] = e))
										: 1 === r[2] &&
										  0 === r[0] &&
										  0 === r[1] &&
										  ((n = !0),
										  (a.elements[0] = e),
										  (a.elements[1] = -t),
										  (a.elements[3] = t),
										  (a.elements[4] = e)),
									n
										? ((i =
												y.RotationMatrix.prototype.multiplyMatrices(
													o,
													a
												)),
										  (i =
												y.RotationMatrix.prototype.normalize(
													i
												)))
										: (i = o),
									i
								);
							};
						})(),
					}),
					(y.Euler = function (t, e, i) {
						(this.set = function (t, e, i) {
							(this.alpha = t || 0),
								(this.beta = e || 0),
								(this.gamma = i || 0);
						}),
							(this.copy = function (t) {
								(this.alpha = t.alpha),
									(this.beta = t.beta),
									(this.gamma = t.gamma);
							}),
							(this.setFromRotationMatrix = (function () {
								var t, e, i, a;
								return function (n) {
									(t = n.elements)[8] > 0
										? ((e = Math.atan2(-t[1], t[4])),
										  (i = Math.asin(t[7])),
										  (a = Math.atan2(-t[6], t[8])))
										: t[8] < 0
										? ((e = Math.atan2(t[1], -t[4])),
										  (i = -Math.asin(t[7])),
										  (i += i >= 0 ? -r : r),
										  (a = Math.atan2(t[6], -t[8])))
										: t[6] > 0
										? ((e = Math.atan2(-t[1], t[4])),
										  (i = Math.asin(t[7])),
										  (a = -s))
										: t[6] < 0
										? ((e = Math.atan2(t[1], -t[4])),
										  (i = -Math.asin(t[7])),
										  (i += i >= 0 ? -r : r),
										  (a = -s))
										: ((e = Math.atan2(t[3], t[0])),
										  (i = t[7] > 0 ? s : -s),
										  (a = 0)),
										0 > e && (e += l),
										(e *= h),
										(i *= h),
										(a *= h),
										this.set(e, i, a);
								};
							})()),
							(this.setFromQuaternion = (function () {
								var t, e, i;
								return function (a) {
									var n = a.w * a.w,
										o = a.x * a.x,
										c = a.y * a.y,
										u = a.z * a.z,
										m = n + o + c + u,
										d = a.w * a.x + a.y * a.z;
									if (d > 0.499999 * m)
										(t = 2 * Math.atan2(a.y, a.w)),
											(e = s),
											(i = 0);
									else if ((1e-6 - 0.5) * m > d)
										(t = -2 * Math.atan2(a.y, a.w)),
											(e = -s),
											(i = 0);
									else {
										var v = n - o + c - u,
											g = 2 * (a.w * a.z - a.x * a.y),
											f = n - o - c + u,
											p = 2 * (a.w * a.y - a.x * a.z);
										f > 0
											? ((t = Math.atan2(g, v)),
											  (e = Math.asin((2 * d) / m)),
											  (i = Math.atan2(p, f)))
											: ((t = Math.atan2(-g, -v)),
											  (e = -Math.asin((2 * d) / m)),
											  (e += 0 > e ? r : -r),
											  (i = Math.atan2(-p, -f)));
									}
									0 > t && (t += l),
										(t *= h),
										(e *= h),
										(i *= h),
										this.set(t, e, i);
								};
							})()),
							(this.rotateX = function (t) {
								return (
									y.Euler.prototype.rotateByAxisAngle(
										this,
										[1, 0, 0],
										t
									),
									this
								);
							}),
							(this.rotateY = function (t) {
								return (
									y.Euler.prototype.rotateByAxisAngle(
										this,
										[0, 1, 0],
										t
									),
									this
								);
							}),
							(this.rotateZ = function (t) {
								return (
									y.Euler.prototype.rotateByAxisAngle(
										this,
										[0, 0, 1],
										t
									),
									this
								);
							}),
							this.set(t, e, i);
					}),
					(y.Euler.prototype = {
						constructor: y.Euler,
						rotateByAxisAngle: (function () {
							var t = new y.RotationMatrix();
							return function (e, i, a) {
								return (
									t.setFromEuler(e),
									(t =
										y.RotationMatrix.prototype.rotateByAxisAngle(
											t,
											i,
											a
										)),
									e.setFromRotationMatrix(t),
									e
								);
							};
						})(),
					}),
					(y.DeviceOrientation = function (e) {
						this.options = e || {};
						var i = 0,
							a = 0;
						if (
							((this.alphaOffsetScreen = 0),
							(this.alphaOffsetDevice = void 0),
							"game" === this.options.type)
						) {
							var n = function (e) {
								return null !== e.alpha &&
									((this.alphaOffsetDevice = new y.Euler(
										e.alpha,
										0,
										0
									)),
									this.alphaOffsetDevice.rotateZ(-d),
									++a >= 10)
									? void t.removeEventListener(
											"deviceorientation",
											n,
											!1
									  )
									: void (
											++i >= 200 &&
											t.removeEventListener(
												"deviceorientation",
												n,
												!1
											)
									  );
							}.bind(this);
							t.addEventListener("deviceorientation", n, !1);
						} else if ("world" === this.options.type) {
							var o = function (e) {
								return !0 !== e.absolute &&
									void 0 !== e.webkitCompassAccuracy &&
									null !== e.webkitCompassAccuracy &&
									+e.webkitCompassAccuracy >= 0 &&
									+e.webkitCompassAccuracy < 50 &&
									((this.alphaOffsetDevice = new y.Euler(
										e.webkitCompassHeading,
										0,
										0
									)),
									this.alphaOffsetDevice.rotateZ(d),
									(this.alphaOffsetScreen = d),
									++a >= 10)
									? void t.removeEventListener(
											"deviceorientation",
											o,
											!1
									  )
									: void (
											++i >= 200 &&
											t.removeEventListener(
												"deviceorientation",
												o,
												!1
											)
									  );
							}.bind(this);
							t.addEventListener("deviceorientation", o, !1);
						}
					}),
					(y.DeviceOrientation.prototype = {
						constructor: y.DeviceOrientation,
						start: function (e) {
							e &&
								"[object Function]" ==
									Object.prototype.toString.call(e) &&
								u.orientation.callbacks.push(e),
								m
									? t.screen.orientation.addEventListener(
											"change",
											a,
											!1
									  )
									: t.addEventListener(
											"orientationchange",
											a,
											!1
									  ),
								u.orientation.active ||
									(t.addEventListener(
										"deviceorientation",
										n,
										!1
									),
									(u.orientation.active = !0));
						},
						stop: function () {
							u.orientation.active &&
								(t.removeEventListener(
									"deviceorientation",
									n,
									!1
								),
								(u.orientation.active = !1));
						},
						listen: function (t) {
							this.start(t);
						},
						getFixedFrameQuaternion: (function () {
							var t = new y.Euler(),
								e = new y.RotationMatrix(),
								i = new y.Quaternion();
							return function () {
								var a = u.orientation.data || {
										alpha: 0,
										beta: 0,
										gamma: 0,
									},
									n = a.alpha;
								return (
									this.alphaOffsetDevice &&
										(e.setFromEuler(this.alphaOffsetDevice),
										e.rotateZ(-this.alphaOffsetScreen),
										t.setFromRotationMatrix(e),
										t.alpha < 0 && (t.alpha += 360),
										(t.alpha %= 360),
										(n -= t.alpha)),
									t.set(n, a.beta, a.gamma),
									i.setFromEuler(t),
									i
								);
							};
						})(),
						getScreenAdjustedQuaternion: (function () {
							var t;
							return function () {
								return (
									(t =
										this.getFixedFrameQuaternion()).rotateZ(
										-d
									),
									t
								);
							};
						})(),
						getFixedFrameMatrix: (function () {
							var t = new y.Euler(),
								e = new y.RotationMatrix();
							return function () {
								var i = u.orientation.data || {
										alpha: 0,
										beta: 0,
										gamma: 0,
									},
									a = i.alpha;
								return (
									this.alphaOffsetDevice &&
										(e.setFromEuler(this.alphaOffsetDevice),
										e.rotateZ(-this.alphaOffsetScreen),
										t.setFromRotationMatrix(e),
										t.alpha < 0 && (t.alpha += 360),
										(t.alpha %= 360),
										(a -= t.alpha)),
									t.set(a, i.beta, i.gamma),
									e.setFromEuler(t),
									e
								);
							};
						})(),
						getScreenAdjustedMatrix: (function () {
							var t;
							return function () {
								return (
									(t = this.getFixedFrameMatrix()).rotateZ(
										-d
									),
									t
								);
							};
						})(),
						getFixedFrameEuler: (function () {
							var t,
								e = new y.Euler();
							return function () {
								return (
									(t = this.getFixedFrameMatrix()),
									e.setFromRotationMatrix(t),
									e
								);
							};
						})(),
						getScreenAdjustedEuler: (function () {
							var t,
								e = new y.Euler();
							return function () {
								return (
									(t = this.getScreenAdjustedMatrix()),
									e.setFromRotationMatrix(t),
									e
								);
							};
						})(),
						isAbsolute: function () {
							return !(
								!u.orientation.data ||
								!0 !== u.orientation.data.absolute
							);
						},
						getLastRawEventData: function () {
							return u.orientation.data || {};
						},
						_alphaAvailable: !1,
						_betaAvailable: !1,
						_gammaAvailable: !1,
						isAvailable: function (t) {
							switch (t) {
								case this.ALPHA:
									return this._alphaAvailable;
								case this.BETA:
									return this._betaAvailable;
								case this.GAMMA:
									return this._gammaAvailable;
							}
						},
						ALPHA: "alpha",
						BETA: "beta",
						GAMMA: "gamma",
					}),
					(y.DeviceMotion = function (t) {
						this.options = t || {};
					}),
					(y.DeviceMotion.prototype = {
						constructor: y.DeviceMotion,
						start: function (e) {
							e &&
								"[object Function]" ==
									Object.prototype.toString.call(e) &&
								u.motion.callbacks.push(e),
								m
									? t.screen.orientation.addEventListener(
											"change",
											a,
											!1
									  )
									: t.addEventListener(
											"orientationchange",
											a,
											!1
									  ),
								u.motion.active ||
									(t.addEventListener("devicemotion", o, !1),
									(u.motion.active = !0));
						},
						stop: function () {
							u.motion.active &&
								(t.removeEventListener("devicemotion", o, !1),
								(u.motion.active = !1));
						},
						listen: function (t) {
							this.start(t);
						},
						getScreenAdjustedAcceleration: function () {
							var t =
									u.motion.data && u.motion.data.acceleration
										? u.motion.data.acceleration
										: { x: 0, y: 0, z: 0 },
								e = {};
							switch (d) {
								case v:
									(e.x = -t.y), (e.y = t.x);
									break;
								case g:
									(e.x = -t.x), (e.y = -t.y);
									break;
								case f:
								case p:
									(e.x = t.y), (e.y = -t.x);
									break;
								default:
									(e.x = t.x), (e.y = t.y);
							}
							return (e.z = t.z), e;
						},
						getScreenAdjustedAccelerationIncludingGravity:
							function () {
								var t =
										u.motion.data &&
										u.motion.data
											.accelerationIncludingGravity
											? u.motion.data
													.accelerationIncludingGravity
											: { x: 0, y: 0, z: 0 },
									e = {};
								switch (d) {
									case v:
										(e.x = -t.y), (e.y = t.x);
										break;
									case g:
										(e.x = -t.x), (e.y = -t.y);
										break;
									case f:
									case p:
										(e.x = t.y), (e.y = -t.x);
										break;
									default:
										(e.x = t.x), (e.y = t.y);
								}
								return (e.z = t.z), e;
							},
						getScreenAdjustedRotationRate: function () {
							var t =
									u.motion.data && u.motion.data.rotationRate
										? u.motion.data.rotationRate
										: { alpha: 0, beta: 0, gamma: 0 },
								e = {};
							switch (d) {
								case v:
									(e.beta = -t.gamma), (e.gamma = t.beta);
									break;
								case g:
									(e.beta = -t.beta), (e.gamma = -t.gamma);
									break;
								case f:
								case p:
									(e.beta = t.gamma), (e.gamma = -t.beta);
									break;
								default:
									(e.beta = t.beta), (e.gamma = t.gamma);
							}
							return (e.alpha = t.alpha), e;
						},
						getLastRawEventData: function () {
							return u.motion.data || {};
						},
						_accelerationXAvailable: !1,
						_accelerationYAvailable: !1,
						_accelerationZAvailable: !1,
						_accelerationIncludingGravityXAvailable: !1,
						_accelerationIncludingGravityYAvailable: !1,
						_accelerationIncludingGravityZAvailable: !1,
						_rotationRateAlphaAvailable: !1,
						_rotationRateBetaAvailable: !1,
						_rotationRateGammaAvailable: !1,
						isAvailable: function (t) {
							switch (t) {
								case this.ACCELERATION_X:
									return this._accelerationXAvailable;
								case this.ACCELERATION_Y:
									return this._accelerationYAvailable;
								case this.ACCELERATION_Z:
									return this._accelerationZAvailable;
								case this.ACCELERATION_INCLUDING_GRAVITY_X:
									return this
										._accelerationIncludingGravityXAvailable;
								case this.ACCELERATION_INCLUDING_GRAVITY_Y:
									return this
										._accelerationIncludingGravityYAvailable;
								case this.ACCELERATION_INCLUDING_GRAVITY_Z:
									return this
										._accelerationIncludingGravityZAvailable;
								case this.ROTATION_RATE_ALPHA:
									return this._rotationRateAlphaAvailable;
								case this.ROTATION_RATE_BETA:
									return this._rotationRateBetaAvailable;
								case this.ROTATION_RATE_GAMMA:
									return this._rotationRateGammaAvailable;
							}
						},
						ACCELERATION_X: "accelerationX",
						ACCELERATION_Y: "accelerationY",
						ACCELERATION_Z: "accelerationZ",
						ACCELERATION_INCLUDING_GRAVITY_X:
							"accelerationIncludingGravityX",
						ACCELERATION_INCLUDING_GRAVITY_Y:
							"accelerationIncludingGravityY",
						ACCELERATION_INCLUDING_GRAVITY_Z:
							"accelerationIncludingGravityZ",
						ROTATION_RATE_ALPHA: "rotationRateAlpha",
						ROTATION_RATE_BETA: "rotationRateBeta",
						ROTATION_RATE_GAMMA: "rotationRateGamma",
					}),
					(t.FULLTILT = y);
			}
		})(window),
			(n = {
				GyroNorm: (function () {
					function t(t) {
						return (
							Math.round(t * Math.pow(10, A)) / Math.pow(10, A)
						);
					}
					function e() {
						var e = {};
						e = b
							? v.getScreenAdjustedEuler()
							: v.getFixedFrameEuler();
						var i = g.getScreenAdjustedAcceleration(),
							n =
								g.getScreenAdjustedAccelerationIncludingGravity(),
							o = g.getScreenAdjustedRotationRate(),
							r = 0;
						y === a
							? (r =
									0 > (r = e.alpha - h)
										? 360 - Math.abs(r)
										: r)
							: (r = e.alpha);
						var s = {
							do: {
								alpha: t(r),
								beta: t(e.beta),
								gamma: t(e.gamma),
								absolute: v.isAbsolute(),
							},
							dm: {
								x: t(i.x),
								y: t(i.y),
								z: t(i.z),
								gx: t(n.x),
								gy: t(n.y),
								gz: t(n.z),
								alpha: t(o.alpha),
								beta: t(o.beta),
								gamma: t(o.gamma),
							},
						};
						return (
							p &&
								((s.dm.gx *= u),
								(s.dm.gy *= u),
								(s.dm.gz *= u)),
							s
						);
					}
					function i(t) {
						x &&
							("string" == typeof t &&
								(t = { message: t, code: 0 }),
							x(t));
					}
					var a = "game",
						n = "world",
						o = "deviceorientation",
						r = "acceleration",
						s = "accelerationinludinggravity",
						l = "rotationrate",
						c = null,
						h = 0,
						u = 0,
						m = !1,
						d = !1,
						v = null,
						g = null,
						f = 50,
						p = !0,
						y = a,
						A = 2,
						x = null,
						b = !1,
						E = function (t) {};
					return (
						(E.GAME = a),
						(E.WORLD = n),
						(E.DEVICE_ORIENTATION = o),
						(E.ACCELERATION = r),
						(E.ACCELERATION_INCLUDING_GRAVITY = s),
						(E.ROTATION_RATE = l),
						(E.prototype.init = function (t) {
							t && t.frequency && (f = t.frequency),
								t &&
									t.gravityNormalized &&
									(p = t.gravityNormalized),
								t &&
									t.orientationBase &&
									(y = t.orientationBase),
								t &&
									"number" == typeof t.decimalCount &&
									t.decimalCount >= 0 &&
									(A = parseInt(t.decimalCount)),
								t && t.logger && (x = t.logger),
								t && t.screenAdjusted && (b = t.screenAdjusted);
							var e = new FULLTILT.getDeviceOrientation({
									type: y,
								}).then(function (t) {
									v = t;
								}),
								i = new FULLTILT.getDeviceMotion().then(
									function (t) {
										u =
											(g =
												t).getScreenAdjustedAccelerationIncludingGravity()
												.z > 0
												? -1
												: 1;
									}
								);
							return Promise.all([e, i]).then(function () {
								d = !0;
							});
						}),
						(E.prototype.end = function () {
							try {
								(d = !1), this.stop(), g.stop(), v.stop();
							} catch (t) {
								i(t);
							}
						}),
						(E.prototype.start = function (t) {
							return d
								? ((c = setInterval(function () {
										t(e());
								  }, f)),
								  void (m = !0))
								: void i({
										message:
											'GyroNorm is not initialized yet. First call the "init()" function.',
										code: 1,
								  });
						}),
						(E.prototype.stop = function () {
							c && (clearInterval(c), (m = !1));
						}),
						(E.prototype.normalizeGravity = function (t) {
							p = !!t;
						}),
						(E.prototype.setHeadDirection = function () {
							return (
								!b &&
								y !== n &&
								((h = v.getFixedFrameEuler().alpha), !0)
							);
						}),
						(E.prototype.startLogging = function (t) {
							t && (x = t);
						}),
						(E.prototype.stopLogging = function () {
							x = null;
						}),
						(E.prototype.isAvailable = function (t) {
							var e = v.getScreenAdjustedEuler(),
								i = g.getScreenAdjustedAcceleration(),
								a =
									g.getScreenAdjustedAccelerationIncludingGravity(),
								n = g.getScreenAdjustedRotationRate();
							switch (t) {
								case o:
									return (
										e.alpha &&
										null !== e.alpha &&
										e.beta &&
										null !== e.beta &&
										e.gamma &&
										null !== e.gamma
									);
								case r:
									return i && i.x && i.y && i.z;
								case s:
									return a && a.x && a.y && a.z;
								case l:
									return n && n.alpha && n.beta && n.gamma;
								default:
									return {
										deviceOrientationAvailable:
											e.alpha &&
											null !== e.alpha &&
											e.beta &&
											null !== e.beta &&
											e.gamma &&
											null !== e.gamma,
										accelerationAvailable:
											i && i.x && i.y && i.z,
										accelerationIncludingGravityAvailable:
											a && a.x && a.y && a.z,
										rotationRateAvailable:
											n && n.alpha && n.beta && n.gamma,
									};
							}
						}),
						(E.prototype.isRunning = function () {
							return m;
						}),
						E
					);
				})(),
			}),
			void 0 ===
				(a = function () {
					return n;
				}.call(e, i, e, t)) || (t.exports = a);
	},
]);
//# sourceMappingURL=app.js.map
