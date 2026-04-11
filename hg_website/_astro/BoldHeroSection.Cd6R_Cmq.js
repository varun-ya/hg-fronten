import {
    _ as c
} from "./preload-helper.BlTxHScW.js";
import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as i
} from "./index.Ba4_ASc-.js";
import d from "./BlurButton.o_ZBrAUK.js";
import {
    i as s
} from "./imagekit.D-GTerWg.js";
import "./clsx.B-dksMZM.js";
const v = ({
    className: o = ""
}) => {
    const a = i.useRef(null);
    return i.useEffect(() => {
        if (!a.current) return;
        const n = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        (async () => {
            const {
                gsap: l
            } = await c(async () => {
                const {
                    gsap: r
                } = await import("./index.CMq3EfTn.js");
                return {
                    gsap: r
                }
            }, []), t = a.current;
            if (!t) return;
            if (n) {
                t.querySelectorAll("[data-animate]").forEach(r => {
                    r.style.opacity = "1"
                });
                return
            }
            l.timeline({
                defaults: {
                    ease: "power4.out"
                }
            }).fromTo(t.querySelector("[data-animate='motif']"), {
                opacity: 0,
                scale: .5,
                filter: "blur(12px)"
            }, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: .8
            }).fromTo(t.querySelector("[data-animate='badge']"), {
                opacity: 0,
                y: 20,
                scale: .9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: .7
            }, "-=0.4").fromTo(t.querySelector("[data-animate='heading']"), {
                opacity: 0,
                y: 50,
                scale: .95
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2
            }, "-=0.5").fromTo(t.querySelector("[data-animate='subheading']"), {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: .8
            }, "-=0.7").fromTo(t.querySelector("[data-animate='cta']"), {
                opacity: 0,
                y: 20,
                scale: .9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: .6
            }, "-=0.4")
        })()
    }, []), e.jsxs("div", {
        ref: a,
        className: `relative flex flex-col items-center ${o}`,
        children: [e.jsx("img", {
            src: s("/assets/home/hero-gradient.svg"),
            alt: "",
            className: "top-[-80%] md:top-[-165%] left-1/2 absolute w-[160%] md:w-[220%] max-w-none h-auto scale-x-200 scale-y-170 -translate-x-1/2 pointer-events-none"
        }), e.jsx("div", {
            className: "top-1/2 left-1/2 absolute opacity-30 md:opacity-40 blur-[80px] md:blur-[100px] w-[300px] md:w-[600px] h-[200px] md:h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none",
            style: {
                background: "radial-gradient(ellipse, #A5BBFC 0%, #D5E2FF 40%, transparent 70%)"
            },
            "aria-hidden": "true"
        }), e.jsxs("div", {
            className: "z-10 relative flex flex-col items-center gap-5 md:gap-10",
            children: [e.jsx("img", {
                "data-animate": "motif",
                src: s("/assets/svgs/motif.svg"),
                alt: "",
                role: "presentation",
                className: "w-auto h-10 object-cover"
            }), e.jsxs("div", {
                "data-animate": "badge",
                className: "relative bg-white/50 shadow-[0px_0px_60px_0px_rgba(85,106,220,0.12)] backdrop-blur-lg px-5 py-2.5 border border-sr-indigo-200/60 rounded-full overflow-hidden",
                children: [e.jsx("span", {
                    className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite_1.5s] pointer-events-none",
                    "aria-hidden": "true"
                }), e.jsx("p", {
                    className: "relative font-matter font-semibold text-sr-indigo-800 text-sm text-center leading-normal tracking-wide",
                    children: "Learn Like Never before  "
                })]
            }), e.jsxs("div", {
                className: "flex flex-col items-center gap-2.5 md:gap-3",
                children: [e.jsx("h1", {
                    "data-animate": "heading",
                    className: "max-w-4xl font-season-mix text-[48px] text-tx md:text-[72px] text-center leading-[1.05] tracking-tight",
                    children: "AI for all from India"
                }), e.jsxs("p", {
                    "data-animate": "subheading",
                    className: "max-w-[800px] font-matter text-tx-secondary md:text-[22px] text-lg text-center leading-[1.6]",
                    children: ["Built on sovereign compute. Powered by frontier-class models.", e.jsx("br", {
                        className: "hidden md:block"
                    }), "Delivering population-scale impact."]
                })]
            }), e.jsx("div", {
                "data-animate": "cta",
                children: e.jsx("a", {
                    href: "https://dashboard.sarvam.ai/",
                    "aria-label": "Sign in to Get Started",
                    children: e.jsx(d, {
                        variant: "filled",
                        size: "lg",
                        children: "Get Started"
                    })
                })
            })]
        })]
    })
};
export {
    v as
        default
};