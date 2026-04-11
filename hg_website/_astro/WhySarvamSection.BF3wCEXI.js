import {
    _ as o
} from "./preload-helper.BlTxHScW.js";
import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as l
} from "./index.Ba4_ASc-.js";
import f from "./SectionHeading.jnpc81R8.js";
import {
    i as n
} from "./imagekit.D-GTerWg.js";
import {
    m as u
} from "./proxy.BAVlt-Tv.js";
import "./BlurButton.o_ZBrAUK.js";
import "./clsx.B-dksMZM.js";
const b = ({
    heading: d = "Powering India's AI-first future",
    features: m,
    image: c = "/assets/home/why-sarvam-bg.png",
    className: x = ""
}) => {
    const t = l.useRef(null);
    return l.useEffect(() => {
        if (!t.current) return;
        (async () => {
            const {
                gsap: i
            } = await o(async () => {
                const {
                    gsap: s
                } = await import("./index.CMq3EfTn.js");
                return {
                    gsap: s
                }
            }, []), {
                ScrollTrigger: p
            } = await o(async () => {
                const {
                    ScrollTrigger: s
                } = await import("./ScrollTrigger.CrR5uyL1.js");
                return {
                    ScrollTrigger: s
                }
            }, []);
            i.registerPlugin(p);
            const a = t.current?.querySelectorAll("[data-animate]");
            a && i.fromTo(a, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: .7,
                stagger: .12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: t.current,
                    start: "top 80%",
                    once: !0
                }
            })
        })()
    }, []), e.jsxs("div", {
        ref: t,
        className: `flex flex-col items-center gap-8 md:gap-16 ${x}`,
        children: [e.jsx("div", {
            "data-animate": !0,
            children: e.jsx(f, {
                heading: d
            })
        }), e.jsxs("div", {
            "data-animate": !0,
            className: "flex md:flex-row flex-col gap-3 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[48px] w-full overflow-hidden",
            children: [e.jsxs("div", {
                className: "relative rounded-2xl w-full md:w-[50%] h-[250px] md:h-[420px] overflow-hidden shrink-0",
                children: [e.jsx("img", {
                    src: n(c),
                    alt: "Sarvam AI Platform",
                    className: "absolute inset-0 w-full h-full object-cover"
                }), e.jsx("div", {
                    className: "absolute inset-0 flex justify-center items-center mix-blend-overlay",
                    children: e.jsx(u.img, {
                        src: n("/assets/svgs/sarvam-logo-white.svg"),
                        alt: "",
                        className: "opacity-90 mb-20 md:mb-36 w-20 md:w-24 h-auto",
                        initial: {
                            opacity: 0,
                            scale: .5,
                            rotate: 90,
                            filter: "blur(5px) brightness(2)"
                        },
                        whileInView: {
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            filter: "blur(0px) brightness(1)"
                        },
                        viewport: {
                            once: !0,
                            margin: "-100px"
                        },
                        transition: {
                            duration: 1.25,
                            ease: "easeOut"
                        }
                    })
                })]
            }), e.jsx("div", {
                className: "flex flex-col flex-1 md:justify-between gap-4 md:gap-0 px-4 md:px-12 py-6 md:py-10",
                children: m.map(r => e.jsxs("div", {
                    className: "flex items-start gap-4",
                    children: [e.jsxs("svg", {
                        className: "mt-1 shrink-0",
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [e.jsx("g", {
                            filter: "url(#filter0_i_9981_1736)",
                            children: e.jsx("path", {
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                                d: "M12.0035 0C13.927 1.92336 14.7378 4.55104 14.4269 7.06239C15.3696 6.39209 16.5224 5.99794 17.7672 5.99791H17.9981C17.998 7.2792 17.5948 8.4699 16.9085 9.4474C19.3436 9.12122 21.8977 9.89379 23.7691 11.7651L24 11.996C22.0413 13.9546 19.3522 14.7596 16.7993 14.4011C17.5521 15.4058 17.9984 16.6535 17.9983 18.0015C16.6523 18.0015 15.4063 17.5566 14.4024 16.8059C14.7587 19.3568 13.9535 22.0429 11.9964 23.9999C10.0408 22.0444 9.23528 19.3609 9.58954 16.8117C8.58701 17.5588 7.34402 18.0014 6.00159 18.0014V17.7706C6.00162 16.5237 6.39701 15.3691 7.06934 14.4255C4.55586 14.7387 1.92515 13.9283 0 12.0032L0.230859 11.7723C2.10358 9.89968 4.65997 9.12739 7.09662 9.45536C6.407 8.47643 6.00174 7.28284 6.00176 5.99816C7.3476 5.99814 8.5935 6.44286 9.59732 7.19339C9.24126 4.64272 10.0466 1.95683 12.0035 0ZM11.9994 11.9889C11.9969 11.9927 11.9934 11.9958 11.9891 11.9977C11.9893 11.999 11.9895 12.0004 11.9895 12.0018C11.9938 12.0037 11.9974 12.0069 11.9998 12.0109H12.0004C12.0029 12.007 12.0065 12.0038 12.0108 12.0019C12.0105 12.0005 12.0105 11.9991 12.0104 11.9977C12.0061 11.9958 12.0025 11.9927 12 11.9889H11.9994Z",
                                fill: "url(#paint0_linear_9981_1736)"
                            })
                        }), e.jsxs("defs", {
                            children: [e.jsxs("filter", {
                                id: "filter0_i_9981_1736",
                                x: "0",
                                y: "0",
                                width: "24",
                                height: "25",
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
                                }), e.jsx("feColorMatrix", {
                                    in: "SourceAlpha",
                                    type: "matrix",
                                    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                                    result: "hardAlpha"
                                }), e.jsx("feOffset", {
                                    dy: "1"
                                }), e.jsx("feGaussianBlur", {
                                    stdDeviation: "2"
                                }), e.jsx("feComposite", {
                                    in2: "hardAlpha",
                                    operator: "arithmetic",
                                    k2: "-1",
                                    k3: "1"
                                }), e.jsx("feColorMatrix", {
                                    type: "matrix",
                                    values: "0 0 0 0 0.647059 0 0 0 0 0.733333 0 0 0 0 0.988235 0 0 0 1 0"
                                }), e.jsx("feBlend", {
                                    mode: "normal",
                                    in2: "shape",
                                    result: "effect1_innerShadow_9981_1736"
                                })]
                            }), e.jsxs("linearGradient", {
                                id: "paint0_linear_9981_1736",
                                x1: "12",
                                y1: "23.9999",
                                x2: "12",
                                y2: "-3.67886",
                                gradientUnits: "userSpaceOnUse",
                                children: [e.jsx("stop", {
                                    stopColor: "#E3F1D8"
                                }), e.jsx("stop", {
                                    offset: "0.33",
                                    stopColor: "#C8E4B0"
                                }), e.jsx("stop", {
                                    offset: "0.66",
                                    stopColor: "#83C040"
                                }), e.jsx("stop", {
                                    offset: "1",
                                    stopColor: "#496D21"
                                })]
                            })]
                        })]
                    }), e.jsxs("div", {
                        className: "flex flex-col gap-1.5 md:gap-3",
                        children: [e.jsx("h3", {
                            className: "font-matter font-medium text-tx md:text-[22px] text-xl leading-normal tracking-[-0.22px]",
                            children: r.title
                        }), e.jsx("p", {
                            className: "font-matter text-[#999] text-base leading-normal tracking-[-0.16px]",
                            children: r.description
                        })]
                    })]
                }, r.id))
            })]
        })]
    })
};
export {
    b as
        default
};