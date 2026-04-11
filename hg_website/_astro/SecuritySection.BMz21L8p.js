import {
    j as s
} from "./jsx-runtime.D_zvdyIk.js";
import {
    r as i
} from "./index.Ba4_ASc-.js";
import m from "./SectionHeading.jnpc81R8.js";
import {
    i as r
} from "./imagekit.D-GTerWg.js";
import "./BlurButton.o_ZBrAUK.js";
import "./clsx.B-dksMZM.js";
const l = [{
    svgPath: r("/assets/prod-samvaad/products/sam-sec-03.svg")
}, {
    svgPath: r("/assets/prod-samvaad/products/sam-sec-02.svg")
}, {
    svgPath: r("/assets/prod-samvaad/products/sam-sec-01.svg")
}, {
    svgPath: r("/assets/prod-samvaad/products/sam-sec-04.svg")
}],
    u = ({
        svgPath: a
    }) => s.jsx("div", {
        className: "flex justify-center items-center w-fit md:w-fit",
        children: s.jsx("div", {
            className: "flex justify-center items-center rounded-4xl md:rounded-full w-[140px] md:w-[200px] h-[140px] md:h-[200px] hover:scale-105 transition-transform duration-300",
            style: {
                background: "#F0F3FA",
                boxShadow: "inset 0 0 50px #A5BBFC"
            },
            children: s.jsx("img", {
                src: a,
                alt: "Security badge",
                className: "max-w-[60%] md:max-w-[65%] max-h-[60%] md:max-h-[65%] object-contain"
            })
        })
    });

function j({
    heading: a = "Enterprise-grade security. Built in from day one.",
    badges: n = l,
    className: o = ""
}) {
    const c = i.useRef(null);
    return i.useEffect(() => {
        if (!c.current) return;
        const t = c.current,
            e = new IntersectionObserver(([d]) => {
                d.isIntersecting && (t.classList.add("is-visible"), e.disconnect())
            }, {
                threshold: .3
            });
        return e.observe(t), () => e.disconnect()
    }, []), s.jsxs("section", {
        className: `flex flex-col items-center gap-12 md:gap-16 ${o}`,
        children: [s.jsx(m, {
            heading: a
        }), s.jsx("div", {
            ref: c,
            className: "flex md:flex-row flex-wrap justify-center items-center gap-5 md:gap-10 mx-auto w-full security-badges",
            children: n.map((t, e) => s.jsx(u, {
                svgPath: t.svgPath
            }, e))
        })]
    })
}
export {
    j as
        default
};