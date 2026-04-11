import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as F,
    R as w
} from "./index.Ba4_ASc-.js";
import {
    c as t
} from "./clsx.B-dksMZM.js";
const B = F.forwardRef(({
    children: c,
    variant: r = "filled",
    size: p = "md",
    withArrow: d = !1,
    loading: a = !1,
    leftIcon: n,
    rightIcon: s,
    className: x,
    onClick: f,
    ...i
}, g) => {
    const o = w.useRef(null),
        b = l => {
            if (!o.current) return;
            const u = l.currentTarget.getBoundingClientRect(),
                j = (l.clientX - u.left) / u.width / 2 * 100;
            o.current.style.setProperty("--x", `${100 - j}%`)
        },
        m = () => {
            o.current && o.current.style.setProperty("--x", "50%")
        },
        _ = {
            sm: "px-5 py-3 text-[15px]",
            md: "px-5 py-3 text-base",
            lg: "px-6 py-3.5 text-lg"
        },
        h = "relative inline-flex items-center justify-center cursor-pointer font-season-mix font-medium transition-all duration-500 overflow-hidden rounded-full hover:duration-700 active:scale-95 active:duration-200 touch-manipulation",
        v = {
            filled: t("bg-[#131313] text-white", "shadow-[inset_0_0_12px_rgba(255,255,255,1),0px_0px_2px_0_rgba(0,0,0,0.1)]"),
            outline: t("bg-sf text-black", "shadow-[inset_0_0_12px_rgba(0,0,0,0.09),0px_0px_1px_rgba(0,0,0,0.2)]"),
            text: t("bg-transparent underline underline-offset-4", "text-black !font-matter !font-normal")
        },
        y = r === "filled" ? "absolute inset-0 opacity-0 transition-opacity duration-700 bg-[linear-gradient(90deg,#131313_0%,#0A2156_33%,#BED2FF_66%,#FF8717_100%)] group-hover:opacity-100 group-active:opacity-100 rounded-full shadow-[inset_0px_0px_12px_2px_rgba(255,255,255,0.5)]" : r === "outline" ? "absolute inset-0 opacity-0 rounded-full transition-opacity duration-700 bg-gradient-to-r from-[#A5BBFC] via-[#D5E2FF] to-[#FFA133] group-hover:opacity-100 group-active:opacity-100 shadow-[inset_0_0_12px_2px_rgba(255,255,255,1)]" : "";
    return e.jsxs("button", {
        ref: g,
        disabled: a || i.disabled,
        onClick: f,
        onMouseMove: b,
        onMouseLeave: m,
        className: t(h, _[p], v[r], "group", x),
        ...i,
        children: [r !== "text" && e.jsx("span", {
            ref: o,
            className: t(y),
            style: {
                backgroundPosition: "var(--x, 50%) 0%",
                backgroundSize: "200% 100%"
            },
            "aria-hidden": "true"
        }), e.jsx("span", {
            className: t("z-10 relative flex items-center gap-2 transition-all duration-500", r === "text" && "bg-clip-text text-transparent bg-gradient-to-r from-black to-black group-hover:from-[#0f172a] group-hover:via-[#3b82f6] group-hover:to-[#f97316] group-active:from-[#0f172a] group-active:via-[#3b82f6] group-active:to-[#f97316]"),
            children: a ? e.jsx("span", {
                className: "border-2 border-current border-t-transparent rounded-full w-4 h-4 animate-spin loader"
            }) : e.jsxs(e.Fragment, {
                children: [n && e.jsx("span", {
                    children: n
                }), c, s && e.jsx("span", {
                    children: s
                }), d && e.jsx("span", {
                    children: "→"
                })]
            })
        })]
    })
});
B.displayName = "Button";
export {
    B as
        default
};