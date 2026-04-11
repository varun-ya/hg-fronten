import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as x
} from "./index.Ba4_ASc-.js";
import w from "./BlurButton.o_ZBrAUK.js";
import {
    i as N
} from "./imagekit.D-GTerWg.js";
import "./clsx.B-dksMZM.js";
const y = ({
    showMotif: m = !1,
    motifSrc: d = "/assets/svgs/motif.svg",
    heading: t,
    subtext: s,
    ctaText: l,
    ctaLink: i,
    ctaVariant: p = "filled",
    onCtaClick: o,
    className: u = "",
    headingClassName: h = "",
    subtextClassName: g = ""
}) => {
    const n = x.useRef(null);
    x.useEffect(() => {
        if (!n.current) return;
        const f = n.current,
            r = new IntersectionObserver(([j]) => {
                j.isIntersecting && (f.classList.add("is-revealed"), r.disconnect())
            }, {
                threshold: .2
            });
        return r.observe(f), () => r.disconnect()
    }, []);
    const v = () => {
        o ? o() : i && (window.location.href = i)
    },
        a = t || s,
        c = l;
    return e.jsxs("div", {
        ref: n,
        className: `section-heading-reveal flex flex-col items-center text-center gap-6 w-full ${u}`,
        children: [m && e.jsx("img", {
            src: N(d),
            alt: "Section Motif",
            className: "w-fit h-7 object-contain"
        }), (a || c) && e.jsxs("div", {
            className: "flex flex-col items-center gap-6 w-full text-center",
            children: [a && e.jsxs("div", {
                className: "flex flex-col items-center gap-4 w-full text-center",
                children: [t && e.jsx("h2", {
                    className: `font-season-mix md:font-normal font-normal w-full px-3 md:px-0 text-3xl md:text-[36px] text-tx leading-[135%] whitespace-pre-line ${h}`,
                    dangerouslySetInnerHTML: {
                        __html: t
                    }
                }), s && e.jsx("p", {
                    className: `max-w-[700px] font-matter text-[14px] md:text-[18px] text-tx-tertiary leading-[155%] ${g}`,
                    dangerouslySetInnerHTML: {
                        __html: s
                    }
                })]
            }), c && e.jsx(w, {
                variant: p,
                size: "sm",
                onClick: v,
                children: l
            })]
        })]
    })
};
export {
    y as
        default
};