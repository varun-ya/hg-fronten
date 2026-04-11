import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as l
} from "./index.Ba4_ASc-.js";
import {
    i as N
} from "./imagekit.D-GTerWg.js";
import v from "./BlurButton.o_ZBrAUK.js";
import {
    c as A
} from "./posthogTracking.BbmDXBfN.js";
import {
    A as j
} from "./index.DmqP4pWL.js";
import {
    m as L
} from "./proxy.BAVlt-Tv.js";
import "./clsx.B-dksMZM.js";
const F = {
    enabled: !0,
    mode: "announcement",
    items: [{
        label: "Indus is live in beta. Try Now",
        href: "/blogs/introducing-indus",
        badge: "NEW"
    }]
},
    k = ({
        className: t = ""
    }) => e.jsxs("svg", {
        className: t,
        width: "15",
        height: "15",
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [e.jsxs("g", {
            filter: "url(#ticker-star-filter)",
            children: [e.jsx("path", {
                d: "M5.44591 9.26754C4.39059 10.3229 2.67959 10.3229 1.62427 9.26754L0.202621 7.8459C-0.0675402 7.57574 -0.0675402 7.13772 0.202621 6.86756L1.62427 5.44591C2.67959 4.39059 4.39059 4.39059 5.44591 5.44591L7.35673 7.35673L5.44591 9.26754Z",
                fill: "#F1F1F1"
            }), e.jsx("path", {
                d: "M5.44591 13.0892C4.39059 12.0339 4.39059 10.3229 5.44591 9.26754L7.35673 7.35673L9.26754 9.26754C10.3229 10.3229 10.3229 12.0339 9.26754 13.0892L7.35673 15L5.44591 13.0892Z",
                fill: "#F1F1F1"
            }), e.jsx("path", {
                d: "M5.44591 5.44591C4.39059 4.39059 4.39059 2.67959 5.44591 1.62427L6.86756 0.202621C7.13772 -0.0675402 7.57573 -0.0675402 7.84589 0.202621L9.26754 1.62427C10.3229 2.67959 10.3229 4.39059 9.26754 5.44591L7.35673 7.35673L5.44591 5.44591Z",
                fill: "#F1F1F1"
            }), e.jsx("path", {
                d: "M13.0892 9.26754C12.0339 10.3229 10.3229 10.3229 9.26754 9.26754L7.35673 7.35673L9.26754 5.44591C10.3229 4.39059 12.0339 4.39059 13.0892 5.44591L15 7.35672L13.0892 9.26754Z",
                fill: "#F1F1F1"
            })]
        }), e.jsx("defs", {
            children: e.jsxs("filter", {
                id: "ticker-star-filter",
                x: "0",
                y: "0",
                width: "15",
                height: "15",
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
                }), e.jsx("feOffset", {}), e.jsx("feGaussianBlur", {
                    stdDeviation: "2"
                }), e.jsx("feComposite", {
                    in2: "hardAlpha",
                    operator: "arithmetic",
                    k2: "-1",
                    k3: "1"
                }), e.jsx("feColorMatrix", {
                    type: "matrix",
                    values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                }), e.jsx("feBlend", {
                    mode: "normal",
                    in2: "shape",
                    result: "effect1_innerShadow"
                })]
            })
        })]
    });

function Z({
    targetDate: t
}) {
    const [r, a] = l.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    l.useEffect(() => {
        const u = new Date(t).getTime(),
            p = () => {
                const y = Date.now(),
                    m = Math.max(0, u - y);
                a({
                    days: Math.floor(m / (1e3 * 60 * 60 * 24)),
                    hours: Math.floor(m / (1e3 * 60 * 60) % 24),
                    minutes: Math.floor(m / (1e3 * 60) % 60),
                    seconds: Math.floor(m / 1e3 % 60)
                })
            };
        p();
        const b = setInterval(p, 1e3);
        return () => clearInterval(b)
    }, [t]);
    const d = u => String(u).padStart(2, "0");
    return e.jsxs("span", {
        className: "relative z-10 font-matter font-semibold text-[14px] text-white tabular-nums tracking-wider",
        children: [r.days > 0 && `${r.days}d `, d(r.hours), ":", d(r.minutes), ":", d(r.seconds)]
    })
}
const I = "bg-cover bg-center";

function U({
    config: t,
    onDismiss: r
}) {
    if (!t.enabled) return null;
    if (t.mode === "countdown" && t.countdown) {
        const a = t.countdown.href ? "a" : "div",
            d = t.countdown.href ? {
                href: t.countdown.href,
                className: "flex items-center gap-2 md:gap-3 min-w-0"
            } : {
                className: "flex items-center gap-2 md:gap-3 min-w-0"
            };
        return e.jsxs("div", {
            className: `relative flex justify-center items-center px-4 md:px-8 h-8 ${I}`,
            style: {
                backgroundImage: `url('${N("/assets/home/hero-bg.webp")}')`
            },
            children: [e.jsxs("div", {
                className: "relative z-10 flex items-center gap-2 md:gap-2.5 min-w-0",
                children: [e.jsx(k, {
                    className: "shrink-0"
                }), e.jsxs(a, {
                    ...d,
                    children: [e.jsx("span", {
                        className: "hidden md:inline font-matter font-medium text-white text-[14px] tracking-wide whitespace-nowrap",
                        children: t.countdown.label
                    }), e.jsx("span", {
                        className: "md:hidden font-matter font-medium text-white text-[11px] tracking-wide whitespace-nowrap",
                        children: t.countdown.mobileLabel || t.countdown.label
                    }), e.jsx(Z, {
                        targetDate: t.countdown.targetDate
                    })]
                }), e.jsx(k, {
                    className: "shrink-0"
                })]
            }), r && e.jsx("button", {
                onClick: r,
                className: "right-3 absolute text-white/50 hover:text-white/80 transition-colors",
                "aria-label": "Dismiss ticker",
                children: e.jsx("svg", {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: e.jsx("path", {
                        d: "M18 6L6 18M6 6l12 12"
                    })
                })
            })]
        })
    }
    if (t.mode === "announcement" && t.items && t.items.length > 0) {
        const a = t.items[0];
        return e.jsx("div", {
            className: `relative flex justify-center items-center h-8 ${I}`,
            style: {
                backgroundImage: `url('${N("/assets/home/hero-bg.webp")}')`
            },
            children: e.jsxs("div", {
                className: "relative z-10 flex items-center gap-2.5",
                children: [e.jsx(k, {}), a.badge && e.jsx("span", {
                    className: "bg-white/20 px-2 py-0.5 border border-white/20 rounded-full font-matter font-semibold text-white text-[10px] leading-none",
                    children: a.badge
                }), a.href ? e.jsxs("a", {
                    href: a.href,
                    className: "flex items-center gap-1.5 font-matter font-medium text-white/90 hover:text-white text-[14px] tracking-wide transition-colors",
                    children: [a.label, e.jsx("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        className: "shrink-0",
                        children: e.jsx("path", {
                            d: "M5 12h14M12 5l7 7-7 7"
                        })
                    })]
                }) : e.jsx("span", {
                    className: "font-matter font-medium text-white text-[14px] tracking-wide",
                    children: a.label
                }), e.jsx(k, {})]
            })
        })
    }
    return null
}
const Y = ({
    className: t = ""
}) => e.jsx("div", {
    className: `absolute w-auto h-3 overflow-hidden ${t}`,
    children: e.jsx("div", {
        className: "flex flex-row justify-center items-center gap-0.5 w-auto h-full overflow-hidden",
        children: Array.from({
            length: 50
        }).map((r, a) => e.jsx("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 80 80",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-auto h-full",
            style: {
                minWidth: 12,
                minHeight: 12
            },
            children: e.jsx("path", {
                d: "M34.4139 5.14775C34.4139 4.75969 33.4564 3.44265 32.2859 2.22145L30.1579 0H39.8095C45.118 0 49.4611 0.315208 49.4611 0.700894C49.4611 1.08658 48.5702 1.98544 47.4812 2.699C44.9644 4.34786 44.9913 5.3204 47.6293 8.07405L49.7574 10.2955L47.4812 12.6714L45.2052 15.0473L47.5002 17.4429L49.7953 19.8379L59.3409 10.3153C64.5916 5.07726 69.2491 0.791961 69.6926 0.791961C70.1353 0.791961 72.6165 2.93342 75.2062 5.55006L79.9153 10.3082L70.0474 20.1998L60.1795 30.0914L62.5752 32.4863L64.9701 34.882L67.2692 32.4823L69.5683 30.0826L72.1825 32.6161L74.7968 35.1496L77.1758 32.8704L79.5557 30.5903V40.3489V50.1074L77.9139 48.0206C75.8548 45.4016 75.0431 45.4087 72.2696 48.0657L70.045 50.1969L67.4307 47.6634L64.8165 45.1299L62.5158 47.5312L60.2152 49.9324L70.0656 59.8074L79.9168 69.6815L74.8031 74.8412L69.6902 80L59.7424 70.0751L49.7953 60.1495L47.5002 62.5452L45.2052 64.9408L47.3331 67.1623C48.5037 68.3835 49.4611 69.7005 49.4611 70.0886C49.4611 70.4767 48.5037 71.7937 47.3331 73.0149L45.2052 75.2363L47.4812 77.6122L49.7574 79.9881H39.9576H30.1579L32.434 77.6122L34.7101 75.2363L32.5821 73.0149C31.4116 71.7937 30.4541 70.4767 30.4541 70.0886C30.4541 69.7005 31.4116 68.3835 32.5821 67.1623L34.7101 64.9408L32.415 62.5452L30.1199 60.1495L20.1728 70.0751L10.225 80L5.13112 74.861L0.0379933 69.7211L9.50431 60.178C14.7107 54.9289 19.1227 50.4638 19.3088 50.2555C19.4949 50.0472 18.6238 48.8086 17.3733 47.5034L15.0987 45.1299L12.4845 47.6634L9.87022 50.1969L7.64559 48.0657C4.87214 45.4087 4.06037 45.4016 2.00127 48.0206L0.359534 50.1074V40.3489V30.5903L2.75287 32.883L5.14698 35.1765L7.67648 32.6462L10.2068 30.1167L12.6524 32.4878L15.0987 34.8582L17.3994 32.457L19.7 30.0557L9.85041 20.1824L0 10.3082L4.70899 5.55006C7.2987 2.93342 9.77995 0.791961 10.2227 0.791961C10.6662 0.791961 15.3237 5.07726 20.5744 10.3153L30.1199 19.8379L32.415 17.4429L34.7101 15.0473L32.434 12.6714L30.1579 10.2955L32.2859 8.07405C33.4564 6.85285 34.4139 5.53581 34.4139 5.14775Z",
                fill: "#E3E3E3"
            })
        }, a))
    })
}),
    M = {
        platform: {
            label: "PLATFORM",
            subdivisions: {
                products: {
                    label: "Products",
                    items: [{
                        name: "Conversational Agents",
                        href: "/products/conversational-agents"
                    }, {
                        name: "Studio",
                        href: "/products/studio"
                    }]
                }
            }
        },
        developers: {
            label: "DEVELOPERS",
            subdivisions: {
                apis: {
                    label: "APIs",
                    items: [{
                        name: "Models",
                        href: "/models"
                    }, {
                        name: "Text to Speech",
                        href: "/apis/text-to-speech"
                    }, {
                        name: "Speech to Text",
                        href: "/apis/speech-to-text"
                    }]
                },
                resources: {
                    label: "Resources",
                    items: [{
                        name: "Documentation",
                        href: "/docs",
                        external: !0
                    }, {
                        name: "API Pricing",
                        href: "/api-pricing"
                    }, {
                        name: "Join the Community",
                        href: "/community",
                        external: !0
                    }]
                }
            }
        },
        blogs: {
            label: "BLOGS",
            items: [{
                name: "All Blogs",
                href: "/blogs"
            }, {
                name: "Brand",
                href: "/brand"
            }]
        },
        company: {
            label: "COMPANY",
            subdivisions: {
                about: {
                    label: "Company",
                    items: [{
                        name: "About Sarvam",
                        href: "/about-us"
                    }, {
                        name: "Careers",
                        href: "https://careers.kula.ai/sarvam-ai",
                        external: !0
                    }]
                }
            }
        }
    },
    S = (t, r) => {
        if (r === "platform") return !1;
        if (t.subdivisions) {
            const a = Object.values(t.subdivisions);
            return a.length === 1 && a[0].items.length === 1
        }
        return !!t.items && t.items.length === 1
    },
    P = t => {
        if (t.subdivisions) {
            const r = Object.values(t.subdivisions);
            return r.length === 1 && r[0].items.length === 1 ? r[0].items[0] : null
        }
        return t.items && t.items.length === 1 ? t.items[0] : null
    },
    D = () => e.jsx("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 12 12",
        fill: "none",
        className: "opacity-50",
        "aria-hidden": "true",
        children: e.jsx("path", {
            d: "M10.5 1.5L5.5 6.5M10.5 1.5H7M10.5 1.5V5M10.5 7V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H5",
            stroke: "currentColor",
            strokeWidth: "1.2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        })
    });

function J() {
    const [t, r] = l.useState(null), [a, d] = l.useState(!1), [u, p] = l.useState(""), [b, y] = l.useState({
        left: 0,
        top: 0
    }), [m, R] = l.useState(0), h = l.useRef(null), c = l.useRef(null), E = l.useRef({});
    l.useEffect(() => {
        typeof window < "u" && p(window.location.pathname)
    }, []), l.useEffect(() => {
        const s = () => {
            const n = Math.min(1, window.scrollY / 100);
            R(n)
        };
        return window.addEventListener("scroll", s, {
            passive: !0
        }), () => window.removeEventListener("scroll", s)
    }, []), l.useEffect(() => () => {
        h.current && clearTimeout(h.current), c.current && clearTimeout(c.current)
    }, []);
    const x = s => u === s,
        T = l.useCallback(s => {
            const n = E.current[s];
            if (n) {
                const i = n.getBoundingClientRect();
                y({
                    left: i.left + i.width / 2,
                    top: i.bottom
                })
            }
        }, []),
        z = s => {
            c.current && clearTimeout(c.current), h.current && clearTimeout(h.current), h.current = setTimeout(() => {
                r(s), T(s)
            }, 100)
        },
        $ = () => {
            h.current && clearTimeout(h.current), c.current = setTimeout(() => r(null), 300)
        },
        B = s => {
            t === s ? r(null) : (r(s), T(s))
        },
        g = () => {
            r(null), d(!1)
        },
        _ = () => {
            d(!a), a || r(null)
        },
        H = F.enabled,
        w = t ? M[t] : null,
        V = w && !S(w, t ?? void 0),
        O = (s, n = !1) => {
            const i = n ? "flex items-center justify-between gap-2 py-2 text-base font-matter tracking-wide rounded-md transition-colors" : "flex items-center justify-between gap-2 md:px-4 py-2 min-w-52 text-sm font-matter tracking-wide rounded-md transition-colors";
            if (s.subdivisions) {
                const o = Object.entries(s.subdivisions);
                return e.jsx("div", {
                    className: n ? "flex flex-col gap-4" : `flex ${o.length > 1 ? "flex-row gap-8" : ""}`,
                    children: o.map(([C, W]) => e.jsx("div", {
                        className: "flex-1",
                        children: e.jsx("div", {
                            className: "space-y-1",
                            children: W.items.map((f, G) => e.jsxs("a", {
                                href: f.href,
                                className: `${i} ${x(f.href) ? "bg-black/5 text-tx" : "text-tx-secondary hover:bg-black/5 hover:text-tx"}`,
                                onClick: n ? g : void 0,
                                ...f.external && {
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                },
                                children: [f.name, f.external && e.jsx(D, {})]
                            }, G))
                        })
                    }, C))
                })
            }
            return s.items ? e.jsx("div", {
                className: "space-y-1",
                children: s.items.map((o, C) => e.jsxs("a", {
                    href: o.href,
                    className: `${i} ${x(o.href) ? "bg-black/5 text-tx" : "text-tx-secondary hover:bg-black/5 hover:text-tx"}`,
                    onClick: n ? g : void 0,
                    ...o.external && {
                        target: "_blank",
                        rel: "noopener noreferrer"
                    },
                    children: [o.name, o.external && e.jsx(D, {})]
                }, C))
            }) : null
        };
    return e.jsxs("header", {
        className: "top-0 right-0 left-0 z-10000 fixed w-full",
        children: [H && e.jsx(U, {
            config: F
        }), e.jsx("div", {
            className: "p-0",
            style: {
                background: `linear-gradient(to bottom, rgba(255,255,255,${m}), rgba(255,255,255,0))`
            },
            children: e.jsxs("div", {
                className: "rounded-b-xl overflow-hidden",
                style: {
                    backgroundColor: `rgba(255, 255, 255, ${m})`,
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid",
                    borderBottomColor: `rgba(240, 240, 240, ${m})`
                },
                children: [e.jsx("nav", {
                    className: "hidden lg:flex justify-between items-center py-3 pr-4 pl-6 w-full",
                    children: e.jsxs("div", {
                        className: "flex flex-1 justify-between items-center mx-auto max-w-width-mx",
                        children: [e.jsx("a", {
                            href: "/",
                            className: "flex flex-1 items-center gap-2 transition-opacity",
                            children: e.jsx("img", {
                                src: N("/assets/svgs/sarvam-wordmark-black.svg"),
                                alt: "Sarvam AI",
                                className: "w-auto h-4 md:h-4.5",
                                width: 202,
                                height: 32
                            })
                        }), e.jsx("div", {
                            className: "hidden lg:flex flex-2 justify-center items-center gap-4",
                            children: Object.entries(M).map(([s, n]) => {
                                const i = S(n, s) ? P(n) : null;
                                return i ? e.jsx("a", {
                                    href: i.href,
                                    className: `flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-black/5 ${x(i.href) ? "bg-black/5" : ""}`,
                                    ...i.external && {
                                        target: "_blank",
                                        rel: "noopener noreferrer"
                                    },
                                    onMouseEnter: () => {
                                        c.current && clearTimeout(c.current), r(null)
                                    },
                                    children: e.jsx("span", {
                                        className: `font-medium text-xs uppercase tracking-[1px] transition-colors font-matter ${x(i.href), "text-black"}`,
                                        children: n.label
                                    })
                                }, s) : e.jsx("div", {
                                    className: "relative",
                                    ref: o => {
                                        E.current[s] = o
                                    },
                                    onMouseEnter: () => z(s),
                                    onMouseLeave: $,
                                    children: e.jsxs("button", {
                                        className: `flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors duration-200 ${t === s ? "bg-black/5" : "hover:bg-black/5"}`,
                                        onClick: () => B(s),
                                        children: [e.jsx("span", {
                                            className: "font-medium text-xs uppercase tracking-[1px] font-matter text-black",
                                            children: n.label
                                        }), e.jsx("svg", {
                                            width: 6,
                                            height: 10,
                                            viewBox: "0 0 6 10",
                                            className: `ml-1.5 transition-transform duration-300 ${t === s ? "rotate-90" : "rotate-0"}`,
                                            children: e.jsx("path", {
                                                d: "M1 1L5 5L1 9",
                                                stroke: "#666",
                                                strokeWidth: "1.25",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                fill: "none"
                                            })
                                        })]
                                    })
                                }, s)
                            })
                        }), e.jsxs("div", {
                            className: "hidden md:flex flex-1 justify-end items-center gap-3",
                            children: [e.jsx(v, {
                                variant: "filled",
                                size: "md",
                                className: "w-fit text-nowrap",
                                onClick: () => {
                                    A("navbar_desktop"), window.location.href = "https://dashboard.sarvam.ai/"
                                },
                                children: "Get Started"
                            }), e.jsx(v, {
                                variant: "outline",
                                size: "md",
                                className: "w-fit text-nowrap",
                                onClick: () => window.location.href = "/contact-us",
                                children: "Login"
                            })]
                        })]
                    })
                }), e.jsxs("div", {
                    className: "lg:hidden flex flex-col p-0.5 max-h-[calc(100vh-2rem)] overflow-hidden",
                    children: [e.jsxs("div", {
                        className: "flex justify-between items-center px-4.5 py-2.5",
                        children: [e.jsx("a", {
                            href: "/",
                            className: "relative flex items-center gap-2",
                            children: e.jsx("img", {
                                src: N("/assets/svgs/sarvam-wordmark-black.svg"),
                                alt: "Sarvam AI",
                                className: "w-auto h-4"
                            })
                        }), e.jsxs("button", {
                            onClick: _,
                            className: "flex flex-col justify-center items-center space-y-1 focus:outline-none w-8 h-8",
                            "aria-label": "Toggle menu",
                            children: [e.jsx("span", {
                                className: `w-6 h-0.5 bg-black transition-transform duration-300 ${a ? "rotate-45 translate-y-1.5" : ""}`
                            }), e.jsx("span", {
                                className: `w-6 h-0.5 bg-black transition-opacity duration-300 ${a ? "opacity-0" : ""}`
                            }), e.jsx("span", {
                                className: `w-6 h-0.5 bg-black transition-transform duration-300 ${a ? "-rotate-45 -translate-y-1.5" : ""}`
                            })]
                        })]
                    }), e.jsx(j, {
                        children: a && e.jsx(L.div, {
                            className: "relative flex-1 w-full overflow-hidden overflow-y-auto",
                            initial: {
                                opacity: 0,
                                height: 0
                            },
                            animate: {
                                opacity: 1,
                                height: "auto"
                            },
                            exit: {
                                opacity: 0,
                                height: 0
                            },
                            transition: {
                                duration: .25,
                                ease: "easeInOut"
                            },
                            children: e.jsx("div", {
                                className: "bg-white/95 shadow-sm backdrop-blur-lg p-6 border-white/20 border-b rounded-[1.9rem]",
                                children: e.jsxs("div", {
                                    className: "space-y-4",
                                    children: [Object.entries(M).map(([s, n]) => {
                                        const i = S(n, s) ? P(n) : null;
                                        if (i) return e.jsx("div", {
                                            className: "pb-4 last:pb-0 border-gray-100 border-b last:border-b-0",
                                            children: e.jsx("a", {
                                                href: i.href,
                                                className: `flex justify-between items-center py-2 w-full font-matter font-medium text-sm uppercase tracking-[1px] ${x(i.href) ? "text-black" : "text-black hover:text-tx"}`,
                                                onClick: g,
                                                ...i.external && {
                                                    target: "_blank",
                                                    rel: "noopener noreferrer"
                                                },
                                                children: n.label
                                            })
                                        }, s);
                                        const o = t === s;
                                        return e.jsxs("div", {
                                            className: "pb-4 last:pb-0 border-gray-100 border-b last:border-b-0",
                                            children: [e.jsxs("button", {
                                                className: "flex justify-between items-center py-2 w-full font-matter font-medium text-black text-sm uppercase tracking-[1px]",
                                                onClick: () => B(s),
                                                children: [n.label, e.jsx("svg", {
                                                    width: 6,
                                                    height: 10,
                                                    viewBox: "0 0 6 10",
                                                    className: `ml-1.5 transition-transform duration-200 ${o ? "rotate-90" : "rotate-0"}`,
                                                    children: e.jsx("path", {
                                                        d: "M1 1L5 5L1 9",
                                                        stroke: "#666",
                                                        strokeWidth: "1.25",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        fill: "none"
                                                    })
                                                })]
                                            }), e.jsx(j, {
                                                children: o && e.jsx(L.div, {
                                                    className: "mt-2 rounded-lg overflow-hidden",
                                                    initial: {
                                                        opacity: 0,
                                                        height: 0
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        height: "auto"
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        height: 0
                                                    },
                                                    transition: {
                                                        duration: .2
                                                    },
                                                    children: e.jsx("div", {
                                                        className: "space-y-1",
                                                        children: O(n, !0)
                                                    })
                                                })
                                            })]
                                        }, s)
                                    }), e.jsx(v, {
                                        className: "w-full",
                                        variant: "filled",
                                        size: "lg",
                                        onClick: () => {
                                            A("navbar_mobile"), window.location.href = "https://dashboard.sarvam.ai/"
                                        },
                                        children: "Get Started"
                                    }), e.jsx(v, {
                                        className: "w-full",
                                        variant: "outline",
                                        size: "lg",
                                        onClick: () => window.location.href = "/contact-us",
                                        children: "Login"
                                    })]
                                })
                            })
                        })
                    })]
                })]
            })
        }), e.jsx(j, {
            children: V && w && e.jsx(L.div, {
                className: "hidden lg:block z-[10001] fixed",
                style: {
                    left: b.left,
                    top: b.top + 8
                },
                initial: {
                    opacity: 0,
                    y: -10,
                    x: "-50%"
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    x: "-50%"
                },
                exit: {
                    opacity: 0,
                    y: -10,
                    x: "-50%"
                },
                transition: {
                    duration: .2
                },
                onMouseEnter: () => {
                    c.current && clearTimeout(c.current)
                },
                onMouseLeave: $,
                children: e.jsxs("div", {
                    className: "bg-sf backdrop-blur-[100px] mt-8 border border-stone-200 rounded-[32px] w-fit overflow-hidden",
                    children: [e.jsx("div", {
                        className: "p-[20px]",
                        children: O(w)
                    }), e.jsx("div", {
                        className: "pt-2 pb-12 w-full",
                        children: e.jsx(Y, {})
                    })]
                })
            }, t)
        }), e.jsx(j, {
            children: a && e.jsx(L.div, {
                className: "lg:hidden -z-40 fixed inset-0 bg-black/20 backdrop-blur-sm",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                onClick: g
            })
        })]
    })
}

function ae() {
    return e.jsx(J, {})
}
export {
    ae as
        default
};