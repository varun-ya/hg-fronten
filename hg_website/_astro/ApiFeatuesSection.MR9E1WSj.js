import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    R as I
} from "./index.Ba4_ASc-.js";
import x from "./SectionHeading.jnpc81R8.js";
import {
    i as d
} from "./imagekit.D-GTerWg.js";
import "./BlurButton.o_ZBrAUK.js";
import "./clsx.B-dksMZM.js";
const _ = ({
    size: t = 12,
    color: a = "currentColor",
    className: p = ""
}) => e.jsxs("svg", {
    width: t,
    height: t,
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: p,
    children: [e.jsx("g", {
        style: {
            mixBlendMode: "luminosity"
        },
        children: e.jsx("g", {
            filter: "url(#filter0_i_sparkle)",
            children: e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M5.86247 0.145966C5.93745 0.0636007 6.06606 0.0635969 6.14104 0.145962C7.00239 1.09215 7.36117 2.33793 7.21343 3.53119C7.6848 3.19604 8.2612 2.99897 8.88361 2.99895C8.94736 2.99895 8.99927 3.05066 8.99685 3.11437C8.97419 3.71103 8.77671 4.26443 8.45424 4.7237C9.6718 4.56061 10.9489 4.94689 11.8846 5.88256C11.9483 5.94631 11.9485 6.04998 11.8823 6.11126C10.9146 7.00817 9.62571 7.37272 8.39967 7.20054C8.73823 7.65241 8.9528 8.20262 8.99248 8.7992C8.99987 8.91034 8.90875 9.00146 8.79761 8.99407C8.20202 8.95446 7.65265 8.74055 7.20121 8.40297C7.37065 9.61609 7.01468 10.8904 6.13749 11.854C6.06251 11.9364 5.93389 11.9364 5.85891 11.854C4.98242 10.8912 4.6263 9.61811 4.79477 8.40586C4.32236 8.75791 3.74317 8.97471 3.11622 8.99852C3.05251 9.00094 3.0008 8.94903 3.0008 8.88528C3.00081 8.26185 3.19851 7.68456 3.53467 7.21277C2.3284 7.36307 1.06813 6.99577 0.117652 6.11486C0.0515287 6.05358 0.05168 5.94991 0.11543 5.88616C1.05179 4.94984 2.32999 4.56369 3.54831 4.72768C3.23985 4.28982 3.04517 3.76605 3.00756 3.20064C3.00017 3.0895 3.09129 2.99837 3.20243 3.00576C3.79795 3.04537 4.34726 3.25919 4.79866 3.59669C4.62933 2.38367 4.98535 1.10948 5.86247 0.145966ZM5.99971 5.99443C5.99845 5.99636 5.99668 5.99789 5.99456 5.99883C5.99467 5.99951 5.99474 6.00019 5.99477 6.00088C5.99691 6.00186 5.99868 6.00346 5.99992 6.00544H6.00021C6.00146 6.00349 6.00326 6.00192 6.0054 6.00096C6.00527 6.00026 6.00523 5.99954 6.00519 5.99883C6.00307 5.99788 6.00125 5.99637 6 5.99443H5.99971Z",
                fill: "url(#paint0_linear_sparkle)"
            })
        })
    }), e.jsxs("defs", {
        children: [e.jsxs("filter", {
            id: "filter0_i_sparkle",
            x: "0.0703125",
            y: "0.0859375",
            width: "12.3636",
            height: "12.3323",
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
                dx: "0.504202",
                dy: "0.504202"
            }), e.jsx("feGaussianBlur", {
                stdDeviation: "0.535714"
            }), e.jsx("feComposite", {
                in2: "hardAlpha",
                operator: "arithmetic",
                k2: "-1",
                k3: "1"
            }), e.jsx("feColorMatrix", {
                type: "matrix",
                values: "0 0 0 0 0.996078 0 0 0 0 0.694118 0 0 0 0 0.168627 0 0 0 1 0"
            }), e.jsx("feBlend", {
                mode: "normal",
                in2: "shape",
                result: "effect1_innerShadow_sparkle"
            })]
        }), e.jsxs("linearGradient", {
            id: "paint0_linear_sparkle",
            x1: "6",
            y1: "0",
            x2: "6",
            y2: "11.1013",
            gradientUnits: "userSpaceOnUse",
            children: [e.jsx("stop", {
                stopColor: "#F38858"
            }), e.jsx("stop", {
                offset: "1",
                stopColor: "#FFCB79"
            })]
        })]
    })]
});

function G({
    heading: t = "Made for developers. Scales for enterprises.",
    subtext: a,
    ctaText: p = "Try it on playground",
    ctaLink: B = "/playground",
    features: n,
    className: o = "",
    variant: m = "default",
    cardClassName: j = ""
}) {
    const u = l => e.jsxs("div", {
        className: "flex flex-col gap-6 md:gap-[32px] bg-white p-4 md:p-[32px] border border-[#f0f0f0] rounded-[24px] md:rounded-[32px] overflow-hidden",
        children: [e.jsxs("div", {
            className: "flex flex-col gap-[12px]",
            children: [e.jsx("h3", {
                className: "font-matter font-medium text-[#3d3d3d] text-[22px] leading-[1.2] whitespace-pre-wrap",
                children: l.title
            }), e.jsx("p", {
                className: "font-matter text-[#666] text-[16px] leading-normal whitespace-pre-wrap",
                children: l.description
            })]
        }), e.jsx("div", {
            className: "flex flex-col justify-center items-center bg-sf rounded-[16px] md:rounded-[24px] overflow-hidden",
            children: l.image && e.jsx("img", {
                src: d(l.image),
                alt: l.title,
                className: "w-full h-auto object-contain"
            })
        })]
    }, l.id),
        w = ({
            feature: l
        }) => {
            const [r, y] = I.useState(0), h = l.subItems && l.subItems.length > 0, k = s => {
                y(r === s ? -1 : s)
            }, g = () => e.jsx("div", {
                className: "relative flex-1 bg-sf border border-[#f0f0f0] rounded-[20px] md:rounded-[32px] overflow-hidden",
                children: h ? e.jsx(e.Fragment, {
                    children: l.subItems.map((s, i) => {
                        const c = s.image || l.image,
                            S = r === i,
                            F = r === -1 && i === 0;
                        return c ? e.jsx("img", {
                            src: d(c),
                            alt: s.title,
                            className: `w-full h-auto object-contain transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${S || F ? "relative opacity-100" : "absolute inset-0 opacity-0"}`
                        }, i) : null
                    })
                }) : l.image && e.jsx("img", {
                    src: d(l.image),
                    alt: l.title,
                    className: "w-full h-auto object-contain"
                })
            });
            return e.jsxs("div", {
                className: "flex md:flex-row flex-col gap-6 bg-red bg-white p-3 md:p-6 border border-[#f0f0f0] rounded-[24px] md:rounded-[48px] overflow-hidden",
                children: [e.jsxs("div", {
                    className: "flex flex-col flex-1 md:justify-between gap-7 md:gap-0 p-3 md:p-6 md:min-h-[400px]",
                    children: [e.jsxs("div", {
                        className: "flex flex-col gap-2.5 md:gap-4",
                        children: [e.jsx("h3", {
                            className: "max-w-[480px] font-matter font-medium text-[24px] text-tx md:text-[28px] leading-[130%] tracking-[-0.28px]",
                            children: l.title
                        }), l.description && e.jsx("p", {
                            className: "font-matter text-tx-tertiary md:text-[15px] text-sm leading-normal",
                            children: l.description
                        })]
                    }), e.jsx("div", {
                        className: "md:hidden",
                        children: e.jsx(g, {})
                    }), h ? e.jsx("div", {
                        className: "flex flex-col",
                        children: l.subItems.map((s, i) => {
                            s.image || l.image;
                            const c = !!s.description;
                            return e.jsxs("div", {
                                className: "border-[#e8e8e8] border-t first:border-t-0",
                                children: [c ? e.jsxs("button", {
                                    onClick: () => k(i),
                                    className: "flex items-center gap-3 py-4 w-full text-left",
                                    children: [e.jsxs("div", {
                                        className: "relative w-[10px] h-[10px] text-tx-tertiary",
                                        children: [e.jsx("span", {
                                            className: "top-1/2 left-0 absolute bg-current rounded-full w-full h-[1.5px] -translate-y-1/2"
                                        }), e.jsx("span", {
                                            className: `absolute top-1/2 left-0 w-full h-[1.5px] bg-current -translate-y-1/2 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${r === i ? "rotate-0" : "rotate-90"}`
                                        })]
                                    }), e.jsx("h4", {
                                        className: "font-matter font-medium text-tx-secondary text-lg leading-[1.3]",
                                        children: s.title
                                    })]
                                }) : e.jsxs("div", {
                                    className: "flex items-start md:items-center gap-3 py-4",
                                    children: [e.jsx("div", {
                                        className: "py-1.5 shrink-0",
                                        children: e.jsx(_, {
                                            size: 12
                                        })
                                    }), e.jsx("h4", {
                                        className: "font-matter font-medium text-tx-secondary text-base md:text-lg leading-normal md:leading-[1.3]",
                                        children: s.title
                                    })]
                                }), s.description && e.jsx("div", {
                                    className: "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    style: {
                                        gridTemplateRows: r === i ? "1fr" : "0fr"
                                    },
                                    children: e.jsx("div", {
                                        className: "overflow-hidden",
                                        children: e.jsx("p", {
                                            className: `pl-[22px] font-matter text-base text-tx-tertiary leading-normal pb-5 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${r === i ? "opacity-100" : "opacity-0"}`,
                                            children: s.description
                                        })
                                    })
                                })]
                            }, i)
                        })
                    }) : null]
                }), e.jsx("div", {
                    className: "hidden md:block flex-1",
                    children: e.jsx(g, {})
                })]
            })
        },
        v = l => e.jsx(w, {
            feature: l
        }, l.id),
        b = l => e.jsxs("div", {
            className: `flex flex-col gap-6 bg-white p-6 md:p-8 border border-[#f0f0f0] rounded-[28px] overflow-hidden ${j}`,
            children: [l.image && e.jsx("div", {
                className: "flex justify-center items-center bg-sf rounded-[20px] w-full h-[180px] md:h-[200px] overflow-hidden",
                children: e.jsx("img", {
                    src: d(l.image),
                    alt: l.title,
                    className: "w-full h-full object-cover"
                })
            }), e.jsxs("div", {
                className: "flex flex-col gap-3 md:p-0 px-3 pb-3",
                children: [e.jsx("h3", {
                    className: "font-matter font-medium text-[#3d3d3d] text-[20px] md:text-[22px] leading-[1.3] whitespace-pre-line",
                    children: l.title
                }), e.jsx("p", {
                    className: "font-matter text-[#666] text-[14px] md:text-[16px] leading-normal",
                    children: l.description
                })]
            })]
        }, l.id),
        N = l => e.jsxs("div", {
            className: "flex flex-row items-center gap-5 bg-white p-2 md:p-4 border border-[#f0f0f0] rounded-[26px] w-full overflow-hidden",
            children: [l.image && e.jsx("div", {
                className: "flex justify-center items-center w-[100px] h-[100px] overflow-hidden shrink-0",
                children: e.jsx("img", {
                    src: d(l.image),
                    alt: l.title,
                    className: "w-fit h-full object-contain"
                })
            }), e.jsxs("div", {
                className: "flex flex-col gap-2 w-full",
                children: [e.jsx("h3", {
                    className: "font-matter font-medium text-[#3d3d3d] text-[18px] leading-[1.3]",
                    children: l.title
                }), e.jsx("p", {
                    className: "font-matter text-[#666] text-[16px] leading-normal",
                    children: l.description
                })]
            })]
        }, l.id),
        C = n.slice(0, 3),
        f = n.slice(3, 5);
    return m === "small-card" ? e.jsxs("div", {
        className: `flex flex-col items-center gap-12 ${o}`,
        children: [t && e.jsx(x, {
            heading: t,
            subtext: a
        }), e.jsx("div", {
            className: "gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full",
            children: n.map(l => b(l))
        })]
    }) : m === "extra-small-card" ? e.jsxs("div", {
        className: `flex flex-col items-center gap-12 ${o}`,
        children: [t && e.jsx(x, {
            heading: t,
            subtext: a
        }), e.jsx("div", {
            className: "gap-4 lg:gap-6 grid grid-cols-1 lg:grid-cols-3 w-full",
            children: n.map(l => N(l))
        })]
    }) : m === "large-card" ? e.jsxs("div", {
        className: `flex flex-col items-center gap-12 ${o}`,
        children: [e.jsx(x, {
            heading: t,
            subtext: a
        }), e.jsx("div", {
            className: "flex flex-col gap-8 w-full",
            children: n.map(l => v(l))
        })]
    }) : e.jsxs("div", {
        className: `flex flex-col items-center gap-12 ${o}`,
        children: [e.jsx(x, {
            heading: t,
            subtext: a
        }), e.jsxs("div", {
            className: "flex flex-col gap-[16px] w-full",
            children: [e.jsx("div", {
                className: "gap-[16px] grid grid-cols-1 md:grid-cols-3 w-full",
                children: C.map(l => u(l))
            }), f.length > 0 && e.jsx("div", {
                className: "flex md:flex-row flex-col justify-center gap-[16px] w-full",
                children: f.map(l => e.jsxs("div", {
                    className: "flex flex-col gap-6 md:gap-[32px] bg-white p-4 md:p-[32px] border border-[#f0f0f0] rounded-[24px] md:rounded-[32px] w-full md:w-[367px] overflow-hidden",
                    children: [e.jsxs("div", {
                        className: "flex flex-col gap-[12px]",
                        children: [e.jsx("h3", {
                            className: "font-matter font-medium text-[#3d3d3d] text-[22px] leading-[1.2] whitespace-pre-wrap",
                            children: l.title
                        }), e.jsx("p", {
                            className: "font-matter text-[#666] text-[16px] leading-normal whitespace-pre-wrap",
                            children: l.description
                        })]
                    }), e.jsx("div", {
                        className: "flex flex-col justify-center items-center bg-sf rounded-[16px] md:rounded-[24px] overflow-hidden",
                        children: l.image && e.jsx("img", {
                            src: d(l.image),
                            alt: l.title,
                            className: "w-full h-auto object-contain"
                        })
                    })]
                }, l.id))
            })]
        })]
    })
}
export {
    G as
        default
};