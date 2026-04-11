import {
    j as e
} from "./jsx-runtime.D_zvdyIk.js";
import m from "./SectionHeading.jnpc81R8.js";
import x from "./BlurButton.o_ZBrAUK.js";
import {
    i as d
} from "./imagekit.D-GTerWg.js";
import "./index.Ba4_ASc-.js";
import "./clsx.B-dksMZM.js";

function i({
    logo: a,
    quote: s,
    authorName: l,
    authorTitle: t,
    authorImage: r,
    link: o
}) {
    return e.jsxs("div", {
        className: "flex flex-col gap-16 bg-white p-6 md:p-16 border border-[#f0f0f0] rounded-[24px] md:rounded-[48px] w-full overflow-hidden",
        children: [e.jsxs("div", {
            className: "flex flex-col items-start gap-10 py-3 md:py-2",
            children: [e.jsx("img", {
                src: a,
                alt: "Company logo",
                className: "w-auto h-7 object-contain"
            }), e.jsx("p", {
                className: "font-matter text-tx text-xl md:text-xl leading-[160%]",
                children: s
            })]
        }), e.jsxs("div", {
            className: "flex md:flex-row flex-col md:justify-between md:items-center gap-6",
            children: [e.jsxs("div", {
                className: "flex items-center gap-4",
                children: [e.jsx("img", {
                    src: d(r),
                    alt: l,
                    className: "rounded-full w-12 h-12 object-cover"
                }), e.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [e.jsx("p", {
                        className: "font-matter font-medium text-[16px] text-tx leading-normal",
                        children: l
                    }), e.jsx("p", {
                        className: "font-matter text-[14px] text-tx-tertiary leading-normal",
                        children: t
                    })]
                })]
            }), o && e.jsx("a", {
                href: o,
                children: e.jsx(x, {
                    variant: "outline",
                    size: "md",
                    className: "w-full md:w-auto",
                    children: "Read case study"
                })
            })]
        })]
    })
}

function j({
    heading: a = "What our customers say",
    testimonials: s,
    className: l = ""
}) {
    return e.jsxs("section", {
        className: `flex flex-col gap-10 md:gap-12 ${l}`,
        children: [e.jsx(m, {
            heading: a
        }), e.jsx("div", {
            className: "flex flex-col gap-8 w-full",
            children: s.map((t, r) => e.jsx(i, {
                logo: t.logo,
                quote: t.quote,
                authorName: t.authorName,
                authorTitle: t.authorTitle,
                authorImage: t.authorImage,
                link: t.link
            }, r))
        })]
    })
}
export {
    j as
        default
};