import {
    r as f
} from "./index.Ba4_ASc-.js";
import {
    c as k,
    f as S,
    d,
    e as A,
    J as w,
    u as l,
    M as C,
    b as I,
    g as J,
    h as p
} from "./proxy.BAVlt-Tv.js";

function L(...t) {
    const e = !Array.isArray(t[0]),
        n = e ? 0 : -1,
        o = t[0 + n],
        s = t[1 + n],
        a = t[2 + n],
        r = t[3 + n],
        u = k(s, a, r);
    return e ? u(o) : u
}

function z(t, e) {
    const n = d(t) ? t.get() : t,
        o = A(n);
    return b(o, t, e), o
}

function b(t, e, n = {}) {
    const o = t.get();
    let s = null,
        a = o,
        r;
    const u = typeof o == "string" ? o.replace(/[\d.-]/g, "") : void 0,
        m = () => {
            s && (s.stop(), s = null)
        },
        M = () => {
            m();
            const c = g(t.get()),
                i = g(a);
            c !== i && (s = new w({
                keyframes: [c, i],
                velocity: t.getVelocity(),
                type: "spring",
                restDelta: .001,
                restSpeed: .01,
                ...n,
                onUpdate: r
            }))
        };
    if (t.attach((c, i) => {
        a = c, r = y => i(V(y, u)), S.postRender(() => {
            M(), t.events.animationStart?.notify(), s?.then(() => {
                t.events.animationComplete?.notify()
            })
        })
    }, m), d(e)) {
        const c = e.on("change", y => t.set(V(y, u))),
            i = t.on("destroy", c);
        return () => {
            c(), i()
        }
    }
    return m
}

function V(t, e) {
    return e ? t + e : t
}

function g(t) {
    return typeof t == "number" ? t : parseFloat(t)
}

function x(t) {
    const e = l(() => A(t)),
        {
            isStatic: n
        } = f.useContext(C);
    if (n) {
        const [, o] = f.useState(t);
        f.useEffect(() => e.on("change", o), [])
    }
    return e
}

function E(t, e) {
    const n = x(e()),
        o = () => n.set(e());
    return o(), I(() => {
        const s = () => S.preRender(o, !1, !0),
            a = t.map(r => r.on("change", s));
        return () => {
            a.forEach(r => r()), J(o)
        }
    }), n
}

function D(t) {
    p.current = [], t();
    const e = E(p.current, t);
    return p.current = void 0, e
}

function F(t, e, n, o) {
    if (typeof t == "function") return D(t);
    if (n !== void 0 && !Array.isArray(n) && typeof e != "function") return N(t, e, n, o);
    const r = typeof e == "function" ? e : L(e, n, o);
    return Array.isArray(t) ? h(t, r) : h([t], ([u]) => r(u))
}

function h(t, e) {
    const n = l(() => []);
    return E(t, () => {
        n.length = 0;
        const o = t.length;
        for (let s = 0; s < o; s++) n[s] = t[s].get();
        return e(n)
    })
}

function N(t, e, n, o) {
    const s = l(() => Object.keys(n)),
        a = l(() => ({}));
    for (const r of s) a[r] = F(t, e, n[r], o);
    return a
}

function U(t, e = {}) {
    const {
        isStatic: n
    } = f.useContext(C), o = () => d(t) ? t.get() : t;
    if (n) return F(o);
    const s = x(o());
    return f.useInsertionEffect(() => b(s, t, e), [s, JSON.stringify(e)]), s
}

function B(t, e = {}) {
    return U(t, {
        type: "spring",
        ...e
    })
}
export {
    B as a, b, E as c, F as d, U as e, z as f, L as t, x as u
};