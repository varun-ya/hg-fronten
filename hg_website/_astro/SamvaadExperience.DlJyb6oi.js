import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as i
} from "./index.Ba4_ASc-.js";
import {
    u as N
} from "./useVoiceAgent.B06R93iD.js";
import {
    i as b
} from "./imagekit.D-GTerWg.js";
import "./preload-helper.BlTxHScW.js";

function M({
    motifs: c,
    className: j = ""
}) {
    const [d, v] = i.useState(0), [u, n] = i.useState(null), [o, w] = i.useState([]), [l, h] = i.useState(null), g = c[d];
    i.useEffect(() => {
        (async () => {
            try {
                const t = await fetch("/api/samvaad/config");
                if (!t.ok) throw new Error("Failed to load configuration");
                const x = await t.json();
                w(x)
            } catch (t) {
                h(t instanceof Error ? t.message : "Configuration error")
            }
        })()
    }, []);
    const r = N({
        onEnd: () => n(null),
        onError: () => n(null)
    }),
        a = r.error && (r.error.toLowerCase().includes("permission") || r.error.toLowerCase().includes("notallowederror") || r.error.toLowerCase().includes("denied") || r.error.toLowerCase().includes("microphone") || r.error.toLowerCase().includes("audio")),
        y = async s => {
            if (o.length)
                if (r.error && r.clearError(), r.isActive) await r.endCall(), n(null);
                else {
                    n(s);
                    const t = o[s] || o[0];
                    await r.startCall({
                        appId: t.appId,
                        orgId: t.orgId,
                        workspaceId: t.workspaceId
                    })
                }
        }, k = async () => {
            await r.endCall(), n(null)
        }, f = s => {
            const t = u === s && r.isActive,
                x = !o.length || l !== null;
            if (t) return e.jsxs("button", {
                onClick: k,
                className: "z-10 absolute flex items-center gap-3 px-5 py-3 rounded-full font-matter font-medium text-white hover:scale-105 transition-all duration-300 cursor-pointer",
                style: {
                    backdropFilter: "blur(20px) saturate(1.2) contrast(1.05) brightness(1.02)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.2) contrast(1.05) brightness(1.02)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.05)"
                },
                children: [r.isConnecting ? e.jsx("span", {
                    children: "Connecting..."
                }) : e.jsx("span", {
                    children: r.formattedTime
                }), e.jsxs("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "text-red-400",
                    children: [e.jsx("path", {
                        d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"
                    }), e.jsx("line", {
                        x1: "23",
                        y1: "1",
                        x2: "1",
                        y2: "23"
                    })]
                })]
            });
            const p = r.isActive && u !== s || x;
            return e.jsx("button", {
                onClick: () => y(s),
                disabled: p,
                className: "group z-10 absolute disabled:opacity-50 px-6 py-3 rounded-full font-matter font-medium text-white hover:text-black hover:scale-105 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed",
                style: {
                    backdropFilter: "blur(20px) saturate(1.2) contrast(1.05) brightness(1.02)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.2) contrast(1.05) brightness(1.02)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.05)"
                },
                onMouseEnter: m => {
                    p || (m.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.75) 100%)")
                },
                onMouseLeave: m => {
                    p || (m.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)")
                },
                children: a ? "Retry" : "Start Speaking"
            })
        };
    return e.jsxs("div", {
        className: `w-full ${j}`,
        children: [e.jsx("div", {
            className: "md:hidden",
            children: e.jsxs("div", {
                className: "bg-white border border-st-secondary rounded-[32px] md:rounded-[40px] h-[550px] overflow-hidden",
                children: [e.jsxs("div", {
                    className: "flex justify-between items-center px-6 py-6 border-st-secondary border-b",
                    children: [e.jsx("h3", {
                        className: "font-matter text-tx-secondary text-xl",
                        children: "Experience Samvaad"
                    }), e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [e.jsx("div", {
                            className: `rounded-full w-2 h-2 ${a ? "bg-red-500" : "bg-green-500"}`
                        }), e.jsx("span", {
                            className: `font-matter font-medium text-xs uppercase tracking-wider ${a ? "text-red-500" : "text-tx-secondary"}`,
                            children: a ? "Mic Denied" : r.isActive ? "Connected" : "Live"
                        })]
                    })]
                }), e.jsxs("div", {
                    className: "flex flex-col items-center gap-8 p-8",
                    children: [e.jsx("div", {
                        className: "flex flex-wrap justify-center items-center gap-2.5",
                        children: c.map((s, t) => e.jsx("button", {
                            onClick: () => v(t),
                            className: `flex items-center justify-center px-5 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${t === d ? "bg-sr-indigo-50 text-sr-indigo-900 font-medium shadow-[inset_0_0_10px_rgba(199,210,254,0.8)]" : "bg-white border border-st-secondary text-tx-tertiary font-medium"}`,
                            children: e.jsx("span", {
                                className: "font-matter text-base leading-[1.3]",
                                children: s.type
                            })
                        }, t))
                    }), e.jsxs("div", {
                        className: "relative flex justify-center items-center w-[220px] h-[220px]",
                        children: [e.jsx("img", {
                            src: b(g.src),
                            alt: `${g.type} motif`,
                            className: "w-full h-full object-contain transition-opacity duration-300"
                        }), f(d)]
                    })]
                })]
            })
        }), e.jsx("div", {
            className: "hidden md:block",
            children: e.jsxs("div", {
                className: "bg-white border border-st-secondary rounded-[32px] md:rounded-[40px] w-full h-[550px] overflow-hidden",
                children: [e.jsxs("div", {
                    className: "flex justify-between items-center px-10 py-8 border-st-secondary border-b",
                    children: [e.jsx("h3", {
                        className: "font-matter text-[22px] text-tx-secondary",
                        children: "Experience Samvaad"
                    }), e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [e.jsx("div", {
                            className: `rounded-full w-2 h-2 ${a ? "bg-red-500" : "bg-green-500"}`
                        }), e.jsx("span", {
                            className: `font-matter font-medium text-sm uppercase tracking-wider ${a ? "text-red-500" : "text-tx-secondary"}`,
                            children: a ? "Mic Denied" : r.isActive ? "Connected" : "Live"
                        })]
                    })]
                }), e.jsx("div", {
                    className: "p-12",
                    children: e.jsx("div", {
                        className: "flex justify-center items-stretch gap-8",
                        children: c.map((s, t) => e.jsxs("div", {
                            className: "flex flex-col flex-1 items-center gap-6",
                            children: [e.jsxs("div", {
                                className: "relative flex justify-center items-center w-full h-[280px]",
                                children: [e.jsx("img", {
                                    src: b(s.src),
                                    alt: `${s.type} motif`,
                                    className: "h-full object-contain"
                                }), f(t)]
                            }), e.jsx("span", {
                                className: "font-matter font-medium text-tx-secondary text-lg text-center",
                                children: s.type
                            })]
                        }, t))
                    })
                })]
            })
        }), (l || r.error && !a) && e.jsxs("div", {
            className: "right-4 bottom-4 z-50 fixed flex items-start gap-3 bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.12)] px-5 py-4 border border-red-100 rounded-2xl max-w-sm",
            children: [e.jsx("div", {
                className: "shrink-0 mt-0.5",
                children: e.jsxs("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    children: [e.jsx("circle", {
                        cx: "10",
                        cy: "10",
                        r: "10",
                        fill: "#FEE2E2"
                    }), e.jsx("path", {
                        d: "M10 6v4m0 4h.01",
                        stroke: "#DC2626",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    })]
                })
            }), e.jsx("div", {
                className: "flex-1 min-w-0",
                children: e.jsx("p", {
                    className: "font-matter font-medium text-sm text-tx-primary leading-snug",
                    children: l || r.error
                })
            }), e.jsx("button", {
                onClick: () => {
                    l && h(null), r.error && r.clearError()
                },
                className: "shrink-0 mt-0.5 text-tx-tertiary hover:text-tx-primary transition-colors cursor-pointer",
                "aria-label": "Dismiss error",
                children: e.jsx("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    children: e.jsx("path", {
                        d: "M12 4L4 12M4 4l8 8",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    })
                })
            })]
        })]
    })
}
export {
    M as
        default
};