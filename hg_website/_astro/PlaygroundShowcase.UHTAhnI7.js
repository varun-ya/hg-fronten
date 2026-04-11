const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["_astro/TTSPlayground.B6GJYhAq.js", "_astro/jsx-runtime.D_zvdyIk.js", "_astro/index.Ba4_ASc-.js", "_astro/Pause.CNmsl99k.js", "_astro/BlurButton.o_ZBrAUK.js", "_astro/clsx.B-dksMZM.js", "_astro/posthogTracking.BbmDXBfN.js", "_astro/STTPlayground.RlnvH0ox.js", "_astro/SamvaadExperience.DlJyb6oi.js", "_astro/useVoiceAgent.B06R93iD.js", "_astro/preload-helper.BlTxHScW.js", "_astro/imagekit.D-GTerWg.js", "_astro/VisionShowcase.BX1f7nDw.js", "_astro/MarkdownContent.D3N74zwB.js", "_astro/DubbingShowcase.B512A1vc.js"]))) => i.map(i => d[i]);
import {
    _ as i
} from "./preload-helper.BlTxHScW.js";
import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as t
} from "./index.Ba4_ASc-.js";
const y = t.lazy(() => i(() => import("./TTSPlayground.B6GJYhAq.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6]))),
    _ = t.lazy(() => i(() => import("./STTPlayground.RlnvH0ox.js"), __vite__mapDeps([7, 1, 2, 6]))),
    b = t.lazy(() => i(() => import("./SamvaadExperience.DlJyb6oi.js"), __vite__mapDeps([8, 1, 2, 9, 10, 11]))),
    v = t.lazy(() => i(() => import("./VisionShowcase.BX1f7nDw.js"), __vite__mapDeps([12, 1, 2, 11, 13]))),
    j = t.lazy(() => i(() => import("./DubbingShowcase.B512A1vc.js"), __vite__mapDeps([14, 1, 2, 11]))),
    E = [{
        id: "samvaad",
        label: "Conversational Agents"
    }, {
        id: "tts",
        label: "Text to Speech"
    }, {
        id: "stt",
        label: "Speech to Text"
    }, {
        id: "vision",
        label: "Vision"
    }, {
        id: "dubbing",
        label: "Dubbing"
    }],
    T = () => e.jsx("div", {
        className: "flex justify-center items-center w-full h-[550px]",
        children: e.jsx("div", {
            className: "border-2 border-sr-indigo-200 border-t-sr-indigo-600 rounded-full w-8 h-8 animate-spin"
        })
    });
class S extends t.Component {
    state = {
        hasError: !1
    };
    static getDerivedStateFromError() {
        return {
            hasError: !0
        }
    }
    componentDidCatch(r, n) {
        console.error("PlaygroundShowcase tab failed to load:", r, n)
    }
    componentDidUpdate(r) {
        r.children !== this.props.children && this.state.hasError && this.setState({
            hasError: !1
        })
    }
    render() {
        return this.state.hasError ? e.jsxs("div", {
            className: "flex flex-col justify-center items-center gap-4 w-full h-[550px]",
            children: [e.jsx("p", {
                className: "font-matter text-tx-secondary text-base",
                children: "Something went wrong loading this demo."
            }), e.jsx("button", {
                onClick: () => {
                    this.setState({
                        hasError: !1
                    }), this.props.onReset()
                },
                className: "bg-sr-indigo-50 hover:bg-sr-indigo-100 px-5 py-2.5 rounded-full font-matter font-medium text-sr-indigo-900 text-sm transition-colors cursor-pointer",
                children: "Try again"
            })]
        }) : this.props.children
    }
}

function N({
    samvaadMotifs: d,
    className: r = ""
}) {
    const [n, m] = t.useState("samvaad"), [a, h] = t.useState("samvaad"), [c, u] = t.useState(!1), [x, f] = t.useState(0), l = t.useRef(null), o = t.useRef(null), p = s => {
        s === n || c || (l.current && (o.current = l.current.offsetHeight), u(!0), m(s), setTimeout(() => {
            h(s), requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    o.current = null, u(!1)
                })
            })
        }, 200))
    }, g = () => {
        f(s => s + 1)
    };
    return e.jsxs("div", {
        className: `flex flex-col gap-8 w-full ${r}`,
        children: [e.jsx("div", {
            className: "flex flex-wrap justify-center gap-4",
            children: E.map(s => e.jsx("button", {
                onClick: () => p(s.id),
                className: `px-4 md:px-6 py-3 md:py-3 rounded-full font-matter font-medium text-base md:text-lg transition-all duration-300 cursor-pointer ${n === s.id ? "bg-sr-indigo-50 text-sr-indigo-900 shadow-[inset_0_0_12px_rgba(199,210,254,0.8)]" : "bg-sf-secondary text-tx-tertiary hover:text-tx-secondary"}`,
                children: s.label
            }, s.id))
        }), e.jsx("div", {
            className: "relative w-full",
            children: e.jsx(S, {
                onReset: g,
                children: e.jsx(t.Suspense, {
                    fallback: e.jsx(T, {}),
                    children: e.jsx("div", {
                        ref: l,
                        className: "z-10 relative w-full h-[550px] transition-[height] duration-300 ease-in-out",
                        style: o.current ? {
                            height: o.current
                        } : void 0,
                        children: e.jsxs("div", {
                            className: `w-full transition-all duration-200 ease-in-out ${c ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`,
                            children: [a === "tts" && e.jsx(y, {}), a === "samvaad" && e.jsx(b, {
                                motifs: d
                            }), a === "stt" && e.jsx(_, {}), a === "vision" && e.jsx(v, {}), a === "dubbing" && e.jsx(j, {})]
                        })
                    })
                })
            }, x)
        })]
    })
}
export {
    N as
        default
};