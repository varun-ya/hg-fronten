import {
    j as t
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as u
} from "./index.Ba4_ASc-.js";
import "./gsap.6ER3_Get.js";
import $ from "./SectionHeading.jnpc81R8.js";
import d from "./index.CMq3EfTn.js";
import {
    ScrollTrigger as D
} from "./ScrollTrigger.CrR5uyL1.js";
import "./BlurButton.o_ZBrAUK.js";
import "./clsx.B-dksMZM.js";
import "./imagekit.D-GTerWg.js";
const H = ({
    progressRef: w
}) => {
    const P = u.useRef(null),
        A = u.useRef(null);
    return u.useEffect(() => {
        const o = P.current;
        if (!o) return;
        const e = o.getContext("webgl");
        if (!e) return;
        const S = `
            attribute vec2 aPosition;
            void main() {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `,
            R = `
            precision highp float;
            uniform vec2 iResolution;
            uniform float iTime;
            uniform float uProgress;

            void main() {
                vec2 uv = gl_FragCoord.xy / iResolution.xy;

                // Slow gentle drift
                float t = iTime * 0.04;
                float drift = sin(uv.x * 1.5 + t) * 0.03 + sin(uv.y * 2.0 - t * 0.7) * 0.02;
                float y = uv.y + drift + uProgress * 0.05;

                // Orange to blue (top to bottom): #F9730C → #FFB053 → #BED2FF
                vec3 cBlue   = vec3(0.745, 0.824, 1.0);    // #BED2FF
                vec3 cAmber  = vec3(1.0, 0.690, 0.325);    // #FFB053
                vec3 cOrange = vec3(0.976, 0.451, 0.047);   // #F9730C

                vec3 color;
                if (y > 0.5) {
                    color = mix(cAmber, cOrange, smoothstep(0.5, 1.0, y));
                } else {
                    color = mix(cBlue, cAmber, smoothstep(0.0, 0.5, y));
                }

                gl_FragColor = vec4(color, 1.0);
            }
        `,
            g = (a, F) => {
                const x = e.createShader(F);
                return e.shaderSource(x, a), e.compileShader(x), e.getShaderParameter(x, e.COMPILE_STATUS) ? x : (console.error(e.getShaderInfoLog(x)), null)
            },
            y = g(S, e.VERTEX_SHADER),
            b = g(R, e.FRAGMENT_SHADER);
        if (!y || !b) return;
        const i = e.createProgram();
        e.attachShader(i, y), e.attachShader(i, b), e.linkProgram(i), e.useProgram(i);
        const s = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            c = e.createBuffer();
        e.bindBuffer(e.ARRAY_BUFFER, c), e.bufferData(e.ARRAY_BUFFER, s, e.STATIC_DRAW);
        const f = e.getAttribLocation(i, "aPosition");
        e.enableVertexAttribArray(f), e.vertexAttribPointer(f, 2, e.FLOAT, !1, 0, 0);
        const k = e.getUniformLocation(i, "iResolution"),
            E = e.getUniformLocation(i, "iTime"),
            C = e.getUniformLocation(i, "uProgress"),
            m = () => {
                const a = Math.min(window.devicePixelRatio || 1, 2);
                o.width = o.clientWidth * a, o.height = o.clientHeight * a, e.viewport(0, 0, o.width, o.height), e.uniform2f(k, o.width, o.height)
            };
        m(), window.addEventListener("resize", m);
        const h = performance.now(),
            v = () => {
                const a = (performance.now() - h) / 1e3;
                e.uniform1f(E, a), e.uniform1f(C, w.current ?? 0), e.drawArrays(e.TRIANGLES, 0, 6), A.current = requestAnimationFrame(v)
            };
        return v(), () => {
            window.removeEventListener("resize", m), A.current && cancelAnimationFrame(A.current), e.deleteProgram(i), e.deleteBuffer(c)
        }
    }, [w]), t.jsx("canvas", {
        ref: P,
        className: "absolute inset-0 w-full h-full"
    })
},
    Z = 3,
    B = 280,
    z = 40,
    K = 155,
    V = 24,
    ie = ({
        label: w,
        heading: P = "From compute to conversation",
        subtext: A,
        layers: o,
        className: e = ""
    }) => {
        const S = u.useRef(null),
            R = u.useRef(null),
            g = u.useRef(null),
            y = u.useRef(null),
            b = u.useRef(0);
        u.useEffect(() => {
            if (!S.current || !R.current || !g.current || !y.current) return;
            d.registerPlugin(D);
            const s = window.innerWidth < 768,
                c = s ? K : B,
                f = s ? V : z,
                k = s ? 220 : 380,
                E = (r, p) => (p - r / 2) * f;
            g.current.querySelectorAll(".glass-layer").forEach(r => {
                r.style.width = `${c}px`, r.style.height = `${c}px`
            });
            const m = g.current.querySelectorAll(".card-wrapper"),
                h = y.current.querySelectorAll(".text-block"),
                v = o.length;
            d.set(Array.from(m).slice(1), {
                y: k,
                opacity: 0
            }), d.set(Array.from(h).slice(1), {
                opacity: 0
            }), d.set(m[0], {
                y: E(0, 0),
                opacity: 1
            }), d.set(h[0], {
                opacity: 1
            });
            const a = h[0],
                F = a?.querySelectorAll(".blur-word"),
                x = a?.querySelector(".desc"),
                L = a?.querySelectorAll(".pill");
            F?.length && d.set(F, {
                filter: "blur(0px)",
                opacity: 1
            }), x && d.set(x, {
                opacity: 1,
                y: 0
            }), L?.length && d.set(L, {
                scale: 1,
                opacity: 1
            }), b.current = .25;
            const n = 1,
                l = d.timeline({
                    scrollTrigger: {
                        trigger: S.current,
                        start: "center center",
                        end: `+=${(v - 1) * 100}%`,
                        pin: R.current,
                        pinSpacing: !0,
                        scrub: .5,
                        anticipatePin: 1,
                        snap: {
                            snapTo: 1 / (v - 1),
                            duration: {
                                min: .25,
                                max: .5
                            },
                            delay: 0,
                            ease: "power2.inOut"
                        },
                        onUpdate: r => {
                            b.current = .25 + r.progress * .75
                        }
                    }
                }),
                q = .35,
                Y = n + q;
            for (let r = 1; r < v; r++) {
                const p = (r - 1) * Y + q;
                l.to(m[r], {
                    y: E(r, r),
                    opacity: 1,
                    duration: n * .7,
                    ease: "power2.out"
                }, p);
                for (let N = 0; N < r; N++) l.to(m[N], {
                    y: E(r, N),
                    duration: n * .7,
                    ease: "power2.out"
                }, p);
                const j = h[r - 1],
                    O = j?.querySelectorAll(".pill"),
                    W = j?.querySelectorAll(".blur-word"),
                    I = j?.querySelector(".desc");
                W?.length && l.to(W, {
                    filter: "blur(6px)",
                    opacity: 0,
                    duration: n * .35,
                    stagger: .01,
                    ease: "power1.in"
                }, p), I && l.to(I, {
                    opacity: 0,
                    y: -6,
                    duration: n * .3,
                    ease: "power1.in"
                }, p), O?.length && l.to(O, {
                    scale: .8,
                    opacity: 0,
                    duration: n * .3,
                    stagger: .02,
                    ease: "power1.in"
                }, p), l.set(j, {
                    opacity: 0
                }, p + n * .35);
                const T = h[r],
                    U = T?.querySelectorAll(".pill"),
                    G = T?.querySelectorAll(".blur-word"),
                    M = T?.querySelector(".desc"),
                    _ = p + n * .3;
                l.set(T, {
                    opacity: 1
                }, _), G?.length && l.fromTo(G, {
                    filter: "blur(4px)",
                    opacity: 0
                }, {
                    filter: "blur(0px)",
                    opacity: 1,
                    duration: n * .5,
                    stagger: .02,
                    ease: "power1.out"
                }, _), M && l.fromTo(M, {
                    opacity: 0,
                    y: 10
                }, {
                    opacity: 1,
                    y: 0,
                    duration: n * .45,
                    ease: "power1.out"
                }, _ + n * .05), U?.length && l.fromTo(U, {
                    scale: .7,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: n * .5,
                    stagger: .04,
                    ease: "power2.out"
                }, _ + n * .08)
            }
            return D.refresh(), () => {
                D.getAll().forEach(r => r.kill())
            }
        }, [o]);
        const i = s => s.split(" ").map((c, f) => t.jsx("span", {
            className: "inline-block blur-word mr-[0.3em]",
            style: {
                opacity: 0,
                filter: "blur(6px)"
            },
            children: c
        }, f));
        return t.jsx("div", {
            ref: S,
            className: e,
            children: t.jsxs("div", {
                ref: R,
                className: "flex flex-col items-center gap-12 md:gap-16",
                children: [t.jsxs("div", {
                    className: "flex flex-col items-center gap-4",
                    children: [w && t.jsx("p", {
                        className: "font-matter font-medium text-tx-tertiary text-xs text-center uppercase tracking-[2px]",
                        children: w
                    }), t.jsx($, {
                        heading: P,
                        subtext: A
                    })]
                }), t.jsxs("div", {
                    className: "flex md:flex-row flex-col items-stretch w-full",
                    children: [t.jsxs("div", {
                        className: "relative border border-st rounded-[48px] w-full md:w-1/2 h-[320px] md:h-[480px] overflow-hidden",
                        children: [t.jsx(H, {
                            progressRef: b
                        }), t.jsx("div", {
                            ref: g,
                            className: "absolute inset-0 flex justify-center items-center",
                            style: {
                                perspective: "900px"
                            },
                            children: Array.from({
                                length: Z
                            }).map((s, c) => t.jsx("div", {
                                className: "absolute card-wrapper",
                                style: {
                                    willChange: "transform, opacity"
                                },
                                children: t.jsx("div", {
                                    className: "glass-layer",
                                    style: {
                                        width: `${B}px`,
                                        height: `${B}px`,
                                        borderRadius: "22px",
                                        background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 100%)",
                                        backdropFilter: "blur(16px) saturate(1.4)",
                                        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.06)",
                                        transform: "rotateX(55deg) rotateZ(-45deg)",
                                        transformStyle: "preserve-3d"
                                    }
                                })
                            }, c))
                        })]
                    }), t.jsx("div", {
                        ref: y,
                        className: "relative w-full md:w-1/2 min-h-[280px] md:min-h-0",
                        children: o.map(s => t.jsxs("div", {
                            className: "text-block absolute inset-0 flex flex-col gap-8 px-6 md:px-20 py-8 md:py-16 justify-center",
                            style: {
                                opacity: 0
                            },
                            children: [t.jsxs("div", {
                                className: "flex flex-col gap-3 md:gap-4",
                                children: [t.jsx("h3", {
                                    className: "font-matter font-medium text-tx md:text-[26px] text-xl leading-tight tracking-[-0.26px]",
                                    children: i(s.title)
                                }), t.jsx("p", {
                                    className: "max-w-[480px] font-matter text-tx-tertiary md:text-[18px] text-base leading-[1.55] tracking-[-0.18px] desc",
                                    style: {
                                        opacity: 0
                                    },
                                    children: s.description
                                })]
                            }), t.jsx("div", {
                                className: "flex flex-wrap gap-2 md:gap-3",
                                children: s.tags?.map((c, f) => t.jsx("span", {
                                    className: "inline-flex items-center bg-sr-indigo-50 px-3 md:px-5 py-2 md:py-2.5 border border-sr-indigo-100 rounded-full font-matter text-tx-secondary md:text-[18px] text-sm tracking-[-0.18px] pill",
                                    style: {
                                        opacity: 0,
                                        transform: "scale(0.5)"
                                    },
                                    children: c
                                }, f))
                            })]
                        }, s.id))
                    })]
                })]
            })
        })
    };
export {
    ie as
        default
};