import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as a
} from "./index.Ba4_ASc-.js";
import "./BlurButton.o_ZBrAUK.js";
import {
    u,
    a as g
} from "./use-spring.DJowZ3aG.js";
import {
    m as B
} from "./proxy.BAVlt-Tv.js";
import {
    i as x
} from "./imagekit.D-GTerWg.js";
import "./clsx.B-dksMZM.js";

function F({
    className: r = "",
    style: i = {}
}) {
    const [l, o] = a.useState(!1), [w, d] = a.useState("down"), f = a.useRef(0), j = a.useRef(null), t = u(.3), s = u(0), v = g(t, {
        stiffness: 80,
        damping: 25
    }), y = g(s, {
        stiffness: 80,
        damping: 25
    });
    return a.useEffect(() => {
        const n = () => {
            const c = window.scrollY,
                b = window.innerHeight,
                m = document.documentElement.scrollHeight - (c + b),
                p = m <= 800,
                N = m <= 100;
            if (o(p), c > f.current ? d("down") : d("up"), f.current = c, p)
                if (N) t.set(1.5), s.set(1);
                else {
                    const h = Math.max(0, Math.min(1, (800 - m) / 700)),
                        S = .3 + 1.2 * h,
                        _ = 0 + .8 * h;
                    t.set(S), s.set(_)
                }
            else t.set(.3), s.set(0)
        };
        return window.addEventListener("scroll", n, {
            passive: !0
        }), n(), () => window.removeEventListener("scroll", n)
    }, [w, t, s]), e.jsx(B.div, {
        ref: j,
        style: {
            scale: v,
            opacity: y,
            transformOrigin: "bottom center",
            ...i
        },
        className: r,
        children: e.jsxs("svg", {
            width: "2292",
            height: "833",
            viewBox: "0 0 2292 833",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-full h-auto",
            children: [e.jsx("g", {
                clipPath: "url(#clip0_5226_125)",
                children: e.jsx("g", {
                    filter: "url(#filter0_f_5226_125)",
                    children: e.jsx("path", {
                        d: "M1113.5 40C502.673 39.9999 40 793 40 793H2252C2252 793 1724.33 40 1113.5 40Z",
                        fill: "url(#paint0_radial_5226_125)"
                    })
                })
            }), e.jsxs("defs", {
                children: [e.jsxs("filter", {
                    id: "filter0_f_5226_125",
                    x: "-10",
                    y: "-10",
                    width: "2312",
                    height: "853",
                    filterUnits: "userSpaceOnUse",
                    colorInterpolationFilters: "sRGB",
                    children: [e.jsx("feFlood", {
                        floodOpacity: "0",
                        result: "BackgroundImageFix"
                    }), e.jsx("feBlend", {
                        mode: "normal",
                        in: "SourceGraphic",
                        in2: "BackgroundImageFix",
                        result: "shape"
                    }), e.jsx("feGaussianBlur", {
                        stdDeviation: "25",
                        result: "effect1_foregroundBlur_5226_125"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint0_radial_5226_125",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientTransform: "matrix(0 -1256.51 2148.88 -11.8434 1146 1272)",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        offset: "0.327754",
                        stopColor: "#F9730C"
                    }), e.jsx("stop", {
                        offset: "0.423421",
                        stopColor: "#FFA336"
                    }), e.jsx("stop", {
                        offset: "0.536751",
                        stopColor: "#F0D5BA"
                    }), e.jsx("stop", {
                        offset: "0.635122",
                        stopColor: "#CBDBFF"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FAFAFA",
                        stopOpacity: "0"
                    })]
                }), e.jsx("clipPath", {
                    id: "clip0_5226_125",
                    children: e.jsx("rect", {
                        width: "2292",
                        height: "833",
                        fill: "white"
                    })
                })]
            })]
        })
    })
}
const A = [{
    title: "Products",
    links: [{
        name: "Sarvam Samvaad",
        href: "/products/conversational-agents"
    }]
}, {
    title: "API",
    links: [{
        name: "Text to Speech",
        href: "/apis/text-to-speech"
    }, {
        name: "Speech to Text",
        href: "/apis/speech-to-text"
    }, {
        name: "API Pricing",
        href: "/api-pricing"
    }]
}, {
    title: "Company",
    links: [{
        name: "About us",
        href: "/about-us"
    }, {
        name: "Blogs",
        href: "/blogs"
    }, {
        name: "Discord",
        href: "/community",
        external: !0
    }, {
        name: "Careers",
        href: "https://careers.kula.ai/sarvam-ai",
        external: !0
    }, {
        name: "Terms of service",
        href: "/terms-of-use"
    }, {
        name: "Privacy Policy",
        href: "/privacy-policy"
    }]
}, {
    title: "Socials",
    links: [{
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/sarvam-ai",
        external: !0
    }, {
        name: "X",
        href: "https://x.com/sarvamai",
        external: !0
    }, {
        name: "YouTube",
        href: "https://youtube.com/@sarvamai",
        external: !0
    }]
}],
    T = () => e.jsxs("footer", {
        className: "bottom-0 z-10 relative md:sticky bg-white mx-auto p-10 md:px-16 pt-24 md:pt-24 border-[#e6e6e6] border-t w-screen h-full md:h-fit overflow-hidden pointer-events-auto",
        children: [e.jsx("div", {
            className: "z-100 relative mx-auto pb-40 max-w-width-mx",
            children: e.jsxs("div", {
                className: "flex lg:flex-row flex-col justify-start md:justify-between items-start gap-16 md:gap-24 lg:gap-[200px] w-full",
                children: [e.jsxs("div", {
                    className: "flex flex-col gap-6 md:gap-6",
                    children: [e.jsxs("div", {
                        className: "flex flex-col gap-[12px]",
                        children: [e.jsx("a", {
                            className: "flex items-center",
                            href: "/",
                            children: e.jsx("img", {
                                src: x("/assets/svgs/sarvam-wordmark-black.svg"),
                                alt: "Sarvam AI",
                                className: "w-[202px] h-[32px]"
                            })
                        }), e.jsx("p", {
                            className: "font-matter font-medium text-[#666] text-[14px] leading-[12px]",
                            children: "AI for India starts here"
                        })]
                    }), e.jsxs("div", {
                        className: "flex gap-[12px]",
                        children: [e.jsx("div", {
                            className: "flex justify-center items-center bg-[#fafafa] rounded-[16px] w-[64px] h-[64px] overflow-hidden",
                            children: e.jsx("img", {
                                src: x("/assets/misc/sec-iso.png"),
                                alt: "ISO Certified",
                                className: "w-[40px] h-[40px] object-contain"
                            })
                        }), e.jsx("div", {
                            className: "flex justify-center items-center bg-[#fafafa] rounded-[16px] w-[64px] h-[64px] overflow-hidden",
                            children: e.jsx("img", {
                                src: x("/assets/misc/sec-soc2.png"),
                                alt: "SOC 2 Type II",
                                className: "w-[40px] h-[40px] object-contain"
                            })
                        })]
                    })]
                }), e.jsx("div", {
                    className: "justify-center gap-12 md:gap-8 lg:gap-16 grid grid-cols-2 md:grid-cols-4 w-full",
                    children: A.map((r, i) => e.jsxs("div", {
                        className: "flex flex-col gap-[24px] w-fit",
                        children: [e.jsx("h3", {
                            className: "w-fit font-matter font-semibold text-[#3d3d3d] text-[12px] uppercase leading-normal",
                            children: r.title
                        }), e.jsx("ul", {
                            className: "flex flex-col gap-3 w-fit font-matter",
                            children: r.links.map((l, o) => e.jsx("li", {
                                className: "w-fit",
                                children: e.jsx("a", {
                                    href: l.href,
                                    className: "block w-fit text-tx-tertiary hover:text-sr-indigo-800 text-base leading-normal transition-colors",
                                    ...l.external && {
                                        target: "_blank",
                                        rel: "noopener noreferrer"
                                    },
                                    children: l.name
                                })
                            }, o))
                        })]
                    }, i))
                })]
            })
        }), e.jsxs("div", {
            className: "bottom-0 left-1/2 z-10 md:absolute relative flex md:flex-row flex-col justify-between items-center gap-3 mx-auto md:p-16 2xl:px-0 py-4 w-full max-w-width-mx font-matter text-[#666] text-[12px] text-center leading-[1.5] -translate-x-1/2",
            children: [e.jsx("span", {
                children: "Copyright Sarvam AI 2026"
            }), e.jsx("span", {
                children: "All rights reserved, Bengaluru- 560038"
            })]
        }), e.jsx("div", {
            className: "absolute inset-0 flex flex-col justify-end items-center mx-auto w-full max-w-width-mx h-full",
            children: e.jsx(F, {
                className: "relative mx-auto -mb-20 w-full max-w-[1200px] scale-x-[200%] md:scale-x-[100%] scale-y-[300%] md:scale-y-[90%]"
            })
        })]
    });
export {
    T as
        default
};