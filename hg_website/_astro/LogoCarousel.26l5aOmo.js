import {
  j as e
} from "./jsx-runtime.D_zvdyIk.js";
import {
  r as a
} from "./index.Ba4_ASc-.js";
import "./gsap.6ER3_Get.js";
import {
  i as S
} from "./imagekit.D-GTerWg.js";
import b from "./index.CMq3EfTn.js";
import "./ScrollTrigger.CrR5uyL1.js";
const W = ["/assets/prod-samvaad/logos/products/samvaad-logo-01.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-02.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-03.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-04.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-05.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-06.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-07.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-08.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-09.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-10.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-11.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-12.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-13.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-14.svg", "/assets/prod-samvaad/logos/products/samvaad-logo-15.svg"],
  U = ({
    className: x = "",
    speed: g = 60,
    logoHeight: k = 60,
    gap: w = 40,
    hoverScale: y = 1.1,
    whiteLogos: j = !1,
    logos: E
  }) => {
    const n = a.useRef(null),
      [L, d] = a.useState(null),
      [u, v] = a.useState(!1),
      r = a.useRef(null),
      [m, M] = a.useState(!1);
    a.useEffect(() => {
      const s = () => M(window.innerWidth < 768);
      return s(), window.addEventListener("resize", s), () => window.removeEventListener("resize", s)
    }, []);
    const t = m ? 80 : k,
      p = m ? 32 : w,
      c = E ?? W,
      f = t * 1.5,
      z = f + p,
      l = c.length * z;
    a.useEffect(() => {
      if (!n.current) return;
      const s = n.current;
      return b.set(s, {
        x: 0
      }), r.current = b.to(s, {
        x: -l,
        duration: g,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: o => `${parseFloat(o) % -l}px`
        }
      }), () => {
        r.current?.kill()
      }
    }, [g, l, t]), a.useEffect(() => {
      r.current && r.current.paused(u)
    }, [u]);
    const $ = () => v(!0),
      I = () => {
        v(!1), d(null)
      },
      h = (s, o, R) => {
        const i = L === o;
        return e.jsx("div", {
          className: "logo-item",
          onMouseEnter: () => d(o),
          onMouseLeave: () => d(null),
          style: {
            width: f,
            height: t,
            marginRight: p,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: i ? `scale(${y})` : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: i ? 10 : 1
          },
          children: e.jsx("img", {
            src: S(s),
            alt: `Partner logo ${o + 1}`,
            loading: "lazy",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: j ? "brightness(1.5)" : i ? "none" : "grayscale(100%) brightness(0.8)",
              opacity: i ? 1 : .7,
              transition: "filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }
          })
        }, `${R}-${o}`)
      };
    return e.jsxs("div", {
      className: `logo-carousel-container ${x}`,
      role: "region",
      "aria-label": "Partner logos carousel",
      children: [e.jsx("div", {
        className: "logo-carousel-track",
        onMouseEnter: $,
        onMouseLeave: I,
        style: {
          overflow: "hidden",
          width: "100%",
          position: "relative",
          height: t
        },
        children: e.jsxs("div", {
          ref: n,
          className: "logo-carousel-inner",
          style: {
            display: "flex",
            alignItems: "center",
            width: `${l * 2}px`,
            height: t
          },
          children: [c.map((s, o) => h(s, o, "first")), c.map((s, o) => h(s, o, "second"))]
        })
      }), e.jsx("style", {
        children: `
        .logo-carousel-container {
          position: relative;
          width: 100%;
          will-change: transform;
        }

        .logo-carousel-track {
          mask: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .logo-item img {
          will-change: filter;
          pointer-events: none;
        }

        .logo-item:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 4px;
        }

        .logo-carousel-container * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `
      })]
    })
  };
export {
  U as
    default
};