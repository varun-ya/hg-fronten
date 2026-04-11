import {
    r as P
} from "./index.Ba4_ASc-.js";
import {
    j as Te
} from "./jsx-runtime.D_zvdyIk.js";
const ks = P.createContext({});

function yo(t) {
    const e = P.useRef(null);
    return e.current === null && (e.current = t()), e.current
}
const Fs = typeof window < "u",
    vo = Fs ? P.useLayoutEffect : P.useEffect,
    Zt = P.createContext(null);

function We(t, e) {
    t.indexOf(e) === -1 && t.push(e)
}

function Ke(t, e) {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1)
}

function nu([...t], e, n) {
    const s = e < 0 ? t.length + e : e;
    if (s >= 0 && s < t.length) {
        const i = n < 0 ? t.length + n : n,
            [r] = t.splice(e, 1);
        t.splice(i, 0, r)
    }
    return t
}
const X = (t, e, n) => n > e ? e : n < t ? t : n;
let su = () => { },
    $e = () => { };
const Y = {},
    Is = t => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);

function Bs(t) {
    return typeof t == "object" && t !== null
}
const js = t => /^0[^.\s]+$/u.test(t);

function Ge(t) {
    let e;
    return () => (e === void 0 && (e = t()), e)
}
const K = t => t,
    To = (t, e) => n => e(t(n)),
    kt = (...t) => t.reduce(To),
    Ct = (t, e, n) => {
        const s = e - t;
        return s === 0 ? 1 : (n - t) / s
    };
class He {
    constructor() {
        this.subscriptions = []
    }
    add(e) {
        return We(this.subscriptions, e), () => Ke(this.subscriptions, e)
    }
    notify(e, n, s) {
        const i = this.subscriptions.length;
        if (i)
            if (i === 1) this.subscriptions[0](e, n, s);
            else
                for (let r = 0; r < i; r++) {
                    const o = this.subscriptions[r];
                    o && o(e, n, s)
                }
    }
    getSize() {
        return this.subscriptions.length
    }
    clear() {
        this.subscriptions.length = 0
    }
}
const _ = t => t * 1e3,
    W = t => t / 1e3;

function Os(t, e) {
    return e ? t * (1e3 / e) : 0
}
const Ns = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t,
    xo = 1e-7,
    bo = 12;

function Po(t, e, n, s, i) {
    let r, o, a = 0;
    do o = e + (n - e) / 2, r = Ns(o, s, i) - t, r > 0 ? n = o : e = o; while (Math.abs(r) > xo && ++a < bo);
    return o
}

function Ft(t, e, n, s) {
    if (t === e && n === s) return K;
    const i = r => Po(r, 0, 1, t, n);
    return r => r === 0 || r === 1 ? r : Ns(i(r), e, s)
}
const Us = t => e => e <= .5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2,
    Ws = t => e => 1 - t(1 - e),
    Ks = Ft(.33, 1.53, .69, .99),
    _e = Ws(Ks),
    $s = Us(_e),
    Gs = t => (t *= 2) < 1 ? .5 * _e(t) : .5 * (2 - Math.pow(2, -10 * (t - 1))),
    ze = t => 1 - Math.sin(Math.acos(t)),
    Hs = Ws(ze),
    _s = Us(ze),
    So = Ft(.42, 0, 1, 1),
    wo = Ft(0, 0, .58, 1),
    zs = Ft(.42, 0, .58, 1),
    Ao = t => Array.isArray(t) && typeof t[0] != "number",
    Xs = t => Array.isArray(t) && typeof t[0] == "number",
    Vo = {
        linear: K,
        easeIn: So,
        easeInOut: zs,
        easeOut: wo,
        circIn: ze,
        circInOut: _s,
        circOut: Hs,
        backIn: _e,
        backInOut: $s,
        backOut: Ks,
        anticipate: Gs
    },
    Co = t => typeof t == "string",
    xn = t => {
        if (Xs(t)) {
            $e(t.length === 4);
            const [e, n, s, i] = t;
            return Ft(e, n, s, i)
        } else if (Co(t)) return Vo[t];
        return t
    },
    jt = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"],
    H = {
        value: null,
        addProjectionMetrics: null
    };

function Mo(t, e) {
    let n = new Set,
        s = new Set,
        i = !1,
        r = !1;
    const o = new WeakSet;
    let a = {
        delta: 0,
        timestamp: 0,
        isProcessing: !1
    },
        l = 0;

    function c(h) {
        o.has(h) && (u.schedule(h), t()), l++, h(a)
    }
    const u = {
        schedule: (h, f = !1, d = !1) => {
            const y = d && i ? n : s;
            return f && o.add(h), y.has(h) || y.add(h), h
        },
        cancel: h => {
            s.delete(h), o.delete(h)
        },
        process: h => {
            if (a = h, i) {
                r = !0;
                return
            }
            i = !0, [n, s] = [s, n], n.forEach(c), e && H.value && H.value.frameloop[e].push(l), l = 0, n.clear(), i = !1, r && (r = !1, u.process(h))
        }
    };
    return u
}
const Do = 40;

function Ys(t, e) {
    let n = !1,
        s = !0;
    const i = {
        delta: 0,
        timestamp: 0,
        isProcessing: !1
    },
        r = () => n = !0,
        o = jt.reduce((g, S) => (g[S] = Mo(r, e ? S : void 0), g), {}),
        {
            setup: a,
            read: l,
            resolveKeyframes: c,
            preUpdate: u,
            update: h,
            preRender: f,
            render: d,
            postRender: m
        } = o,
        y = () => {
            const g = Y.useManualTiming ? i.timestamp : performance.now();
            n = !1, Y.useManualTiming || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(g - i.timestamp, Do), 1)), i.timestamp = g, i.isProcessing = !0, a.process(i), l.process(i), c.process(i), u.process(i), h.process(i), f.process(i), d.process(i), m.process(i), i.isProcessing = !1, n && e && (s = !1, t(y))
        },
        T = () => {
            n = !0, s = !0, i.isProcessing || t(y)
        };
    return {
        schedule: jt.reduce((g, S) => {
            const b = o[S];
            return g[S] = (A, E = !1, w = !1) => (n || T(), b.schedule(A, E, w)), g
        }, {}),
        cancel: g => {
            for (let S = 0; S < jt.length; S++) o[jt[S]].cancel(g)
        },
        state: i,
        steps: o
    }
}
const {
    schedule: V,
    cancel: J,
    state: k,
    steps: ne
} = Ys(typeof requestAnimationFrame < "u" ? requestAnimationFrame : K, !0);
let Ut;

function Eo() {
    Ut = void 0
}
const I = {
    now: () => (Ut === void 0 && I.set(k.isProcessing || Y.useManualTiming ? k.timestamp : performance.now()), Ut),
    set: t => {
        Ut = t, queueMicrotask(Eo)
    }
},
    at = {
        layout: 0,
        mainThread: 0,
        waapi: 0
    },
    qs = t => e => typeof e == "string" && e.startsWith(t),
    Xe = qs("--"),
    Ro = qs("var(--"),
    Ye = t => Ro(t) ? Lo.test(t.split("/*")[0].trim()) : !1,
    Lo = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

function bn(t) {
    return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--")
}
const yt = {
    test: t => typeof t == "number",
    parse: parseFloat,
    transform: t => t
},
    Mt = {
        ...yt,
        transform: t => X(0, 1, t)
    },
    Ot = {
        ...yt,
        default: 1
    },
    St = t => Math.round(t * 1e5) / 1e5,
    qe = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

function ko(t) {
    return t == null
}
const Fo = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
    Ze = (t, e) => n => !!(typeof n == "string" && Fo.test(n) && n.startsWith(t) || e && !ko(n) && Object.prototype.hasOwnProperty.call(n, e)),
    Zs = (t, e, n) => s => {
        if (typeof s != "string") return s;
        const [i, r, o, a] = s.match(qe);
        return {
            [t]: parseFloat(i),
            [e]: parseFloat(r),
            [n]: parseFloat(o),
            alpha: a !== void 0 ? parseFloat(a) : 1
        }
    },
    Io = t => X(0, 255, t),
    se = {
        ...yt,
        transform: t => Math.round(Io(t))
    },
    ot = {
        test: Ze("rgb", "red"),
        parse: Zs("red", "green", "blue"),
        transform: ({
            red: t,
            green: e,
            blue: n,
            alpha: s = 1
        }) => "rgba(" + se.transform(t) + ", " + se.transform(e) + ", " + se.transform(n) + ", " + St(Mt.transform(s)) + ")"
    };

function Bo(t) {
    let e = "",
        n = "",
        s = "",
        i = "";
    return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
        red: parseInt(e, 16),
        green: parseInt(n, 16),
        blue: parseInt(s, 16),
        alpha: i ? parseInt(i, 16) / 255 : 1
    }
}
const xe = {
    test: Ze("#"),
    parse: Bo,
    transform: ot.transform
},
    It = t => ({
        test: e => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
        parse: parseFloat,
        transform: e => `${e}${t}`
    }),
    q = It("deg"),
    z = It("%"),
    v = It("px"),
    jo = It("vh"),
    Oo = It("vw"),
    Pn = {
        ...z,
        parse: t => z.parse(t) / 100,
        transform: t => z.transform(t * 100)
    },
    ht = {
        test: Ze("hsl", "hue"),
        parse: Zs("hue", "saturation", "lightness"),
        transform: ({
            hue: t,
            saturation: e,
            lightness: n,
            alpha: s = 1
        }) => "hsla(" + Math.round(t) + ", " + z.transform(St(e)) + ", " + z.transform(St(n)) + ", " + St(Mt.transform(s)) + ")"
    },
    D = {
        test: t => ot.test(t) || xe.test(t) || ht.test(t),
        parse: t => ot.test(t) ? ot.parse(t) : ht.test(t) ? ht.parse(t) : xe.parse(t),
        transform: t => typeof t == "string" ? t : t.hasOwnProperty("red") ? ot.transform(t) : ht.transform(t),
        getAnimatableNone: t => {
            const e = D.parse(t);
            return e.alpha = 0, D.transform(e)
        }
    },
    No = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

function Uo(t) {
    return isNaN(t) && typeof t == "string" && (t.match(qe)?.length || 0) + (t.match(No)?.length || 0) > 0
}
const Js = "number",
    Qs = "color",
    Wo = "var",
    Ko = "var(",
    Sn = "${}",
    $o = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;

function Dt(t) {
    const e = t.toString(),
        n = [],
        s = {
            color: [],
            number: [],
            var: []
        },
        i = [];
    let r = 0;
    const a = e.replace($o, l => (D.test(l) ? (s.color.push(r), i.push(Qs), n.push(D.parse(l))) : l.startsWith(Ko) ? (s.var.push(r), i.push(Wo), n.push(l)) : (s.number.push(r), i.push(Js), n.push(parseFloat(l))), ++r, Sn)).split(Sn);
    return {
        values: n,
        split: a,
        indexes: s,
        types: i
    }
}

function ti(t) {
    return Dt(t).values
}

function ei(t) {
    const {
        split: e,
        types: n
    } = Dt(t), s = e.length;
    return i => {
        let r = "";
        for (let o = 0; o < s; o++)
            if (r += e[o], i[o] !== void 0) {
                const a = n[o];
                a === Js ? r += St(i[o]) : a === Qs ? r += D.transform(i[o]) : r += i[o]
            } return r
    }
}
const Go = t => typeof t == "number" ? 0 : D.test(t) ? D.getAnimatableNone(t) : t;

function Ho(t) {
    const e = ti(t);
    return ei(t)(e.map(Go))
}
const Q = {
    test: Uo,
    parse: ti,
    createTransformer: ei,
    getAnimatableNone: Ho
};

function ie(t, e, n) {
    return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
}

function _o({
    hue: t,
    saturation: e,
    lightness: n,
    alpha: s
}) {
    t /= 360, e /= 100, n /= 100;
    let i = 0,
        r = 0,
        o = 0;
    if (!e) i = r = o = n;
    else {
        const a = n < .5 ? n * (1 + e) : n + e - n * e,
            l = 2 * n - a;
        i = ie(l, a, t + 1 / 3), r = ie(l, a, t), o = ie(l, a, t - 1 / 3)
    }
    return {
        red: Math.round(i * 255),
        green: Math.round(r * 255),
        blue: Math.round(o * 255),
        alpha: s
    }
}

function Gt(t, e) {
    return n => n > 0 ? e : t
}
const C = (t, e, n) => t + (e - t) * n,
    oe = (t, e, n) => {
        const s = t * t,
            i = n * (e * e - s) + s;
        return i < 0 ? 0 : Math.sqrt(i)
    },
    zo = [xe, ot, ht],
    Xo = t => zo.find(e => e.test(t));

function wn(t) {
    const e = Xo(t);
    if (!e) return !1;
    let n = e.parse(t);
    return e === ht && (n = _o(n)), n
}
const An = (t, e) => {
    const n = wn(t),
        s = wn(e);
    if (!n || !s) return Gt(t, e);
    const i = {
        ...n
    };
    return r => (i.red = oe(n.red, s.red, r), i.green = oe(n.green, s.green, r), i.blue = oe(n.blue, s.blue, r), i.alpha = C(n.alpha, s.alpha, r), ot.transform(i))
},
    be = new Set(["none", "hidden"]);

function Yo(t, e) {
    return be.has(t) ? n => n <= 0 ? t : e : n => n >= 1 ? e : t
}

function qo(t, e) {
    return n => C(t, e, n)
}

function Je(t) {
    return typeof t == "number" ? qo : typeof t == "string" ? Ye(t) ? Gt : D.test(t) ? An : Qo : Array.isArray(t) ? ni : typeof t == "object" ? D.test(t) ? An : Zo : Gt
}

function ni(t, e) {
    const n = [...t],
        s = n.length,
        i = t.map((r, o) => Je(r)(r, e[o]));
    return r => {
        for (let o = 0; o < s; o++) n[o] = i[o](r);
        return n
    }
}

function Zo(t, e) {
    const n = {
        ...t,
        ...e
    },
        s = {};
    for (const i in n) t[i] !== void 0 && e[i] !== void 0 && (s[i] = Je(t[i])(t[i], e[i]));
    return i => {
        for (const r in s) n[r] = s[r](i);
        return n
    }
}

function Jo(t, e) {
    const n = [],
        s = {
            color: 0,
            var: 0,
            number: 0
        };
    for (let i = 0; i < e.values.length; i++) {
        const r = e.types[i],
            o = t.indexes[r][s[r]],
            a = t.values[o] ?? 0;
        n[i] = a, s[r]++
    }
    return n
}
const Qo = (t, e) => {
    const n = Q.createTransformer(e),
        s = Dt(t),
        i = Dt(e);
    return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? be.has(t) && !i.values.length || be.has(e) && !s.values.length ? Yo(t, e) : kt(ni(Jo(s, i), i.values), n) : Gt(t, e)
};

function si(t, e, n) {
    return typeof t == "number" && typeof e == "number" && typeof n == "number" ? C(t, e, n) : Je(t)(t, e)
}
const tr = t => {
    const e = ({
        timestamp: n
    }) => t(n);
    return {
        start: (n = !0) => V.update(e, n),
        stop: () => J(e),
        now: () => k.isProcessing ? k.timestamp : I.now()
    }
},
    ii = (t, e, n = 10) => {
        let s = "";
        const i = Math.max(Math.round(e / n), 2);
        for (let r = 0; r < i; r++) s += Math.round(t(r / (i - 1)) * 1e4) / 1e4 + ", ";
        return `linear(${s.substring(0, s.length - 2)})`
    },
    Ht = 2e4;

function Qe(t) {
    let e = 0;
    const n = 50;
    let s = t.next(e);
    for (; !s.done && e < Ht;) e += n, s = t.next(e);
    return e >= Ht ? 1 / 0 : e
}

function er(t, e = 100, n) {
    const s = n({
        ...t,
        keyframes: [0, e]
    }),
        i = Math.min(Qe(s), Ht);
    return {
        type: "keyframes",
        ease: r => s.next(i * r).value / e,
        duration: W(i)
    }
}
const nr = 5;

function oi(t, e, n) {
    const s = Math.max(e - nr, 0);
    return Os(n - t(s), e - s)
}
const M = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: .3,
    visualDuration: .3,
    restSpeed: {
        granular: .01,
        default: 2
    },
    restDelta: {
        granular: .005,
        default: .5
    },
    minDuration: .01,
    maxDuration: 10,
    minDamping: .05,
    maxDamping: 1
},
    re = .001;

function sr({
    duration: t = M.duration,
    bounce: e = M.bounce,
    velocity: n = M.velocity,
    mass: s = M.mass
}) {
    let i, r, o = 1 - e;
    o = X(M.minDamping, M.maxDamping, o), t = X(M.minDuration, M.maxDuration, W(t)), o < 1 ? (i = c => {
        const u = c * o,
            h = u * t,
            f = u - n,
            d = Pe(c, o),
            m = Math.exp(-h);
        return re - f / d * m
    }, r = c => {
        const h = c * o * t,
            f = h * n + n,
            d = Math.pow(o, 2) * Math.pow(c, 2) * t,
            m = Math.exp(-h),
            y = Pe(Math.pow(c, 2), o);
        return (-i(c) + re > 0 ? -1 : 1) * ((f - d) * m) / y
    }) : (i = c => {
        const u = Math.exp(-c * t),
            h = (c - n) * t + 1;
        return -re + u * h
    }, r = c => {
        const u = Math.exp(-c * t),
            h = (n - c) * (t * t);
        return u * h
    });
    const a = 5 / t,
        l = or(i, r, a);
    if (t = _(t), isNaN(l)) return {
        stiffness: M.stiffness,
        damping: M.damping,
        duration: t
    };
    {
        const c = Math.pow(l, 2) * s;
        return {
            stiffness: c,
            damping: o * 2 * Math.sqrt(s * c),
            duration: t
        }
    }
}
const ir = 12;

function or(t, e, n) {
    let s = n;
    for (let i = 1; i < ir; i++) s = s - t(s) / e(s);
    return s
}

function Pe(t, e) {
    return t * Math.sqrt(1 - e * e)
}
const rr = ["duration", "bounce"],
    ar = ["stiffness", "damping", "mass"];

function Vn(t, e) {
    return e.some(n => t[n] !== void 0)
}

function lr(t) {
    let e = {
        velocity: M.velocity,
        stiffness: M.stiffness,
        damping: M.damping,
        mass: M.mass,
        isResolvedFromDuration: !1,
        ...t
    };
    if (!Vn(t, ar) && Vn(t, rr))
        if (t.visualDuration) {
            const n = t.visualDuration,
                s = 2 * Math.PI / (n * 1.2),
                i = s * s,
                r = 2 * X(.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
            e = {
                ...e,
                mass: M.mass,
                stiffness: i,
                damping: r
            }
        } else {
            const n = sr(t);
            e = {
                ...e,
                ...n,
                mass: M.mass
            }, e.isResolvedFromDuration = !0
        } return e
}

function _t(t = M.visualDuration, e = M.bounce) {
    const n = typeof t != "object" ? {
        visualDuration: t,
        keyframes: [0, 1],
        bounce: e
    } : t;
    let {
        restSpeed: s,
        restDelta: i
    } = n;
    const r = n.keyframes[0],
        o = n.keyframes[n.keyframes.length - 1],
        a = {
            done: !1,
            value: r
        },
        {
            stiffness: l,
            damping: c,
            mass: u,
            duration: h,
            velocity: f,
            isResolvedFromDuration: d
        } = lr({
            ...n,
            velocity: -W(n.velocity || 0)
        }),
        m = f || 0,
        y = c / (2 * Math.sqrt(l * u)),
        T = o - r,
        p = W(Math.sqrt(l / u)),
        x = Math.abs(T) < 5;
    s || (s = x ? M.restSpeed.granular : M.restSpeed.default), i || (i = x ? M.restDelta.granular : M.restDelta.default);
    let g;
    if (y < 1) {
        const b = Pe(p, y);
        g = A => {
            const E = Math.exp(-y * p * A);
            return o - E * ((m + y * p * T) / b * Math.sin(b * A) + T * Math.cos(b * A))
        }
    } else if (y === 1) g = b => o - Math.exp(-p * b) * (T + (m + p * T) * b);
    else {
        const b = p * Math.sqrt(y * y - 1);
        g = A => {
            const E = Math.exp(-y * p * A),
                w = Math.min(b * A, 300);
            return o - E * ((m + y * p * T) * Math.sinh(w) + b * T * Math.cosh(w)) / b
        }
    }
    const S = {
        calculatedDuration: d && h || null,
        next: b => {
            const A = g(b);
            if (d) a.done = b >= h;
            else {
                let E = b === 0 ? m : 0;
                y < 1 && (E = b === 0 ? _(m) : oi(g, b, A));
                const w = Math.abs(E) <= s,
                    j = Math.abs(o - A) <= i;
                a.done = w && j
            }
            return a.value = a.done ? o : A, a
        },
        toString: () => {
            const b = Math.min(Qe(S), Ht),
                A = ii(E => S.next(b * E).value, b, 30);
            return b + "ms " + A
        },
        toTransition: () => { }
    };
    return S
}
_t.applyToOptions = t => {
    const e = er(t, 100, _t);
    return t.ease = e.ease, t.duration = _(e.duration), t.type = "keyframes", t
};

function Se({
    keyframes: t,
    velocity: e = 0,
    power: n = .8,
    timeConstant: s = 325,
    bounceDamping: i = 10,
    bounceStiffness: r = 500,
    modifyTarget: o,
    min: a,
    max: l,
    restDelta: c = .5,
    restSpeed: u
}) {
    const h = t[0],
        f = {
            done: !1,
            value: h
        },
        d = w => a !== void 0 && w < a || l !== void 0 && w > l,
        m = w => a === void 0 ? l : l === void 0 || Math.abs(a - w) < Math.abs(l - w) ? a : l;
    let y = n * e;
    const T = h + y,
        p = o === void 0 ? T : o(T);
    p !== T && (y = p - h);
    const x = w => -y * Math.exp(-w / s),
        g = w => p + x(w),
        S = w => {
            const j = x(w),
                O = g(w);
            f.done = Math.abs(j) <= c, f.value = f.done ? p : O
        };
    let b, A;
    const E = w => {
        d(f.value) && (b = w, A = _t({
            keyframes: [f.value, m(f.value)],
            velocity: oi(g, w, f.value),
            damping: i,
            stiffness: r,
            restDelta: c,
            restSpeed: u
        }))
    };
    return E(0), {
        calculatedDuration: null,
        next: w => {
            let j = !1;
            return !A && b === void 0 && (j = !0, S(w), E(w)), b !== void 0 && w >= b ? A.next(w - b) : (!j && S(w), f)
        }
    }
}

function cr(t, e, n) {
    const s = [],
        i = n || Y.mix || si,
        r = t.length - 1;
    for (let o = 0; o < r; o++) {
        let a = i(t[o], t[o + 1]);
        if (e) {
            const l = Array.isArray(e) ? e[o] || K : e;
            a = kt(l, a)
        }
        s.push(a)
    }
    return s
}

function ur(t, e, {
    clamp: n = !0,
    ease: s,
    mixer: i
} = {}) {
    const r = t.length;
    if ($e(r === e.length), r === 1) return () => e[0];
    if (r === 2 && e[0] === e[1]) return () => e[1];
    const o = t[0] === t[1];
    t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
    const a = cr(e, s, i),
        l = a.length,
        c = u => {
            if (o && u < t[0]) return e[0];
            let h = 0;
            if (l > 1)
                for (; h < t.length - 2 && !(u < t[h + 1]); h++);
            const f = Ct(t[h], t[h + 1], u);
            return a[h](f)
        };
    return n ? u => c(X(t[0], t[r - 1], u)) : c
}

function hr(t, e) {
    const n = t[t.length - 1];
    for (let s = 1; s <= e; s++) {
        const i = Ct(0, e, s);
        t.push(C(n, 1, i))
    }
}

function fr(t) {
    const e = [0];
    return hr(e, t.length - 1), e
}

function dr(t, e) {
    return t.map(n => n * e)
}

function mr(t, e) {
    return t.map(() => e || zs).splice(0, t.length - 1)
}

function wt({
    duration: t = 300,
    keyframes: e,
    times: n,
    ease: s = "easeInOut"
}) {
    const i = Ao(s) ? s.map(xn) : xn(s),
        r = {
            done: !1,
            value: e[0]
        },
        o = dr(n && n.length === e.length ? n : fr(e), t),
        a = ur(o, e, {
            ease: Array.isArray(i) ? i : mr(e, i)
        });
    return {
        calculatedDuration: t,
        next: l => (r.value = a(l), r.done = l >= t, r)
    }
}
const pr = t => t !== null;

function tn(t, {
    repeat: e,
    repeatType: n = "loop"
}, s, i = 1) {
    const r = t.filter(pr),
        a = i < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
    return !a || s === void 0 ? r[a] : s
}
const gr = {
    decay: Se,
    inertia: Se,
    tween: wt,
    keyframes: wt,
    spring: _t
};

function ri(t) {
    typeof t.type == "string" && (t.type = gr[t.type])
}
class en {
    constructor() {
        this.updateFinished()
    }
    get finished() {
        return this._finished
    }
    updateFinished() {
        this._finished = new Promise(e => {
            this.resolve = e
        })
    }
    notifyFinished() {
        this.resolve()
    }
    then(e, n) {
        return this.finished.then(e, n)
    }
}
const yr = t => t / 100;
class Jt extends en {
    constructor(e) {
        super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
            const {
                motionValue: n
            } = this.options;
            n && n.updatedAt !== I.now() && this.tick(I.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.())
        }, at.mainThread++, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause()
    }
    initAnimation() {
        const {
            options: e
        } = this;
        ri(e);
        const {
            type: n = wt,
            repeat: s = 0,
            repeatDelay: i = 0,
            repeatType: r,
            velocity: o = 0
        } = e;
        let {
            keyframes: a
        } = e;
        const l = n || wt;
        l !== wt && typeof a[0] != "number" && (this.mixKeyframes = kt(yr, si(a[0], a[1])), a = [0, 100]);
        const c = l({
            ...e,
            keyframes: a
        });
        r === "mirror" && (this.mirroredGenerator = l({
            ...e,
            keyframes: [...a].reverse(),
            velocity: -o
        })), c.calculatedDuration === null && (c.calculatedDuration = Qe(c));
        const {
            calculatedDuration: u
        } = c;
        this.calculatedDuration = u, this.resolvedDuration = u + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = c
    }
    updateTime(e) {
        const n = Math.round(e - this.startTime) * this.playbackSpeed;
        this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n
    }
    tick(e, n = !1) {
        const {
            generator: s,
            totalDuration: i,
            mixKeyframes: r,
            mirroredGenerator: o,
            resolvedDuration: a,
            calculatedDuration: l
        } = this;
        if (this.startTime === null) return s.next(0);
        const {
            delay: c = 0,
            keyframes: u,
            repeat: h,
            repeatType: f,
            repeatDelay: d,
            type: m,
            onUpdate: y,
            finalKeyframe: T
        } = this.options;
        this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - i / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
        const p = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1),
            x = this.playbackSpeed >= 0 ? p < 0 : p > i;
        this.currentTime = Math.max(p, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
        let g = this.currentTime,
            S = s;
        if (h) {
            const w = Math.min(this.currentTime, i) / a;
            let j = Math.floor(w),
                O = w % 1;
            !O && w >= 1 && (O = 1), O === 1 && j--, j = Math.min(j, h + 1), !!(j % 2) && (f === "reverse" ? (O = 1 - O, d && (O -= d / a)) : f === "mirror" && (S = o)), g = X(0, 1, O) * a
        }
        const b = x ? {
            done: !1,
            value: u[0]
        } : S.next(g);
        r && (b.value = r(b.value));
        let {
            done: A
        } = b;
        !x && l !== null && (A = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
        const E = this.holdTime === null && (this.state === "finished" || this.state === "running" && A);
        return E && m !== Se && (b.value = tn(u, this.options, T, this.speed)), y && y(b.value), E && this.finish(), b
    }
    then(e, n) {
        return this.finished.then(e, n)
    }
    get duration() {
        return W(this.calculatedDuration)
    }
    get iterationDuration() {
        const {
            delay: e = 0
        } = this.options || {};
        return this.duration + W(e)
    }
    get time() {
        return W(this.currentTime)
    }
    set time(e) {
        e = _(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1)
    }
    get speed() {
        return this.playbackSpeed
    }
    set speed(e) {
        this.updateTime(I.now());
        const n = this.playbackSpeed !== e;
        this.playbackSpeed = e, n && (this.time = W(this.currentTime))
    }
    play() {
        if (this.isStopped) return;
        const {
            driver: e = tr,
            startTime: n
        } = this.options;
        this.driver || (this.driver = e(i => this.tick(i))), this.options.onPlay?.();
        const s = this.driver.now();
        this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start()
    }
    pause() {
        this.state = "paused", this.updateTime(I.now()), this.holdTime = this.currentTime
    }
    complete() {
        this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null
    }
    finish() {
        this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.()
    }
    cancel() {
        this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.()
    }
    teardown() {
        this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null, at.mainThread--
    }
    stopDriver() {
        this.driver && (this.driver.stop(), this.driver = void 0)
    }
    sample(e) {
        return this.startTime = 0, this.tick(e, !0)
    }
    attachTimeline(e) {
        return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this)
    }
}

function iu(t) {
    return new Jt(t)
}

function vr(t) {
    for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1])
}
const rt = t => t * 180 / Math.PI,
    we = t => {
        const e = rt(Math.atan2(t[1], t[0]));
        return Ae(e)
    },
    Tr = {
        x: 4,
        y: 5,
        translateX: 4,
        translateY: 5,
        scaleX: 0,
        scaleY: 3,
        scale: t => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
        rotate: we,
        rotateZ: we,
        skewX: t => rt(Math.atan(t[1])),
        skewY: t => rt(Math.atan(t[2])),
        skew: t => (Math.abs(t[1]) + Math.abs(t[2])) / 2
    },
    Ae = t => (t = t % 360, t < 0 && (t += 360), t),
    Cn = we,
    Mn = t => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
    Dn = t => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
    xr = {
        x: 12,
        y: 13,
        z: 14,
        translateX: 12,
        translateY: 13,
        translateZ: 14,
        scaleX: Mn,
        scaleY: Dn,
        scale: t => (Mn(t) + Dn(t)) / 2,
        rotateX: t => Ae(rt(Math.atan2(t[6], t[5]))),
        rotateY: t => Ae(rt(Math.atan2(-t[2], t[0]))),
        rotateZ: Cn,
        rotate: Cn,
        skewX: t => rt(Math.atan(t[4])),
        skewY: t => rt(Math.atan(t[1])),
        skew: t => (Math.abs(t[1]) + Math.abs(t[4])) / 2
    };

function Ve(t) {
    return t.includes("scale") ? 1 : 0
}

function Ce(t, e) {
    if (!t || t === "none") return Ve(e);
    const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let s, i;
    if (n) s = xr, i = n;
    else {
        const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        s = Tr, i = a
    }
    if (!i) return Ve(e);
    const r = s[e],
        o = i[1].split(",").map(Pr);
    return typeof r == "function" ? r(o) : o[r]
}
const br = (t, e) => {
    const {
        transform: n = "none"
    } = getComputedStyle(t);
    return Ce(n, e)
};

function Pr(t) {
    return parseFloat(t.trim())
}
const vt = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"],
    Tt = new Set(vt),
    En = t => t === yt || t === v,
    Sr = new Set(["x", "y", "z"]),
    wr = vt.filter(t => !Sr.has(t));

function Ar(t) {
    const e = [];
    return wr.forEach(n => {
        const s = t.getValue(n);
        s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0))
    }), e
}
const Z = {
    width: ({
        x: t
    }, {
        paddingLeft: e = "0",
        paddingRight: n = "0"
    }) => t.max - t.min - parseFloat(e) - parseFloat(n),
    height: ({
        y: t
    }, {
        paddingTop: e = "0",
        paddingBottom: n = "0"
    }) => t.max - t.min - parseFloat(e) - parseFloat(n),
    top: (t, {
        top: e
    }) => parseFloat(e),
    left: (t, {
        left: e
    }) => parseFloat(e),
    bottom: ({
        y: t
    }, {
        top: e
    }) => parseFloat(e) + (t.max - t.min),
    right: ({
        x: t
    }, {
        left: e
    }) => parseFloat(e) + (t.max - t.min),
    x: (t, {
        transform: e
    }) => Ce(e, "x"),
    y: (t, {
        transform: e
    }) => Ce(e, "y")
};
Z.translateX = Z.x;
Z.translateY = Z.y;
const lt = new Set;
let Me = !1,
    De = !1,
    Ee = !1;

function ai() {
    if (De) {
        const t = Array.from(lt).filter(s => s.needsMeasurement),
            e = new Set(t.map(s => s.element)),
            n = new Map;
        e.forEach(s => {
            const i = Ar(s);
            i.length && (n.set(s, i), s.render())
        }), t.forEach(s => s.measureInitialState()), e.forEach(s => {
            s.render();
            const i = n.get(s);
            i && i.forEach(([r, o]) => {
                s.getValue(r)?.set(o)
            })
        }), t.forEach(s => s.measureEndState()), t.forEach(s => {
            s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY)
        })
    }
    De = !1, Me = !1, lt.forEach(t => t.complete(Ee)), lt.clear()
}

function li() {
    lt.forEach(t => {
        t.readKeyframes(), t.needsMeasurement && (De = !0)
    })
}

function Vr() {
    Ee = !0, li(), ai(), Ee = !1
}
class nn {
    constructor(e, n, s, i, r, o = !1) {
        this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o
    }
    scheduleResolve() {
        this.state = "scheduled", this.isAsync ? (lt.add(this), Me || (Me = !0, V.read(li), V.resolveKeyframes(ai))) : (this.readKeyframes(), this.complete())
    }
    readKeyframes() {
        const {
            unresolvedKeyframes: e,
            name: n,
            element: s,
            motionValue: i
        } = this;
        if (e[0] === null) {
            const r = i?.get(),
                o = e[e.length - 1];
            if (r !== void 0) e[0] = r;
            else if (s && n) {
                const a = s.readValue(n, o);
                a != null && (e[0] = a)
            }
            e[0] === void 0 && (e[0] = o), i && r === void 0 && i.set(e[0])
        }
        vr(e)
    }
    setFinalKeyframe() { }
    measureInitialState() { }
    renderEndStyles() { }
    measureEndState() { }
    complete(e = !1) {
        this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), lt.delete(this)
    }
    cancel() {
        this.state === "scheduled" && (lt.delete(this), this.state = "pending")
    }
    resume() {
        this.state === "pending" && this.scheduleResolve()
    }
}
const Cr = t => t.startsWith("--");

function Mr(t, e, n) {
    Cr(e) ? t.style.setProperty(e, n) : t.style[e] = n
}
const Dr = Ge(() => window.ScrollTimeline !== void 0),
    Er = {};

function Rr(t, e) {
    const n = Ge(t);
    return () => Er[e] ?? n()
}
const ci = Rr(() => {
    try {
        document.createElement("div").animate({
            opacity: 0
        }, {
            easing: "linear(0, 1)"
        })
    } catch {
        return !1
    }
    return !0
}, "linearEasing"),
    bt = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`,
    Rn = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: bt([0, .65, .55, 1]),
        circOut: bt([.55, 0, 1, .45]),
        backIn: bt([.31, .01, .66, -.59]),
        backOut: bt([.33, 1.53, .69, .99])
    };

function ui(t, e) {
    if (t) return typeof t == "function" ? ci() ? ii(t, e) : "ease-out" : Xs(t) ? bt(t) : Array.isArray(t) ? t.map(n => ui(n, e) || Rn.easeOut) : Rn[t]
}

function Lr(t, e, n, {
    delay: s = 0,
    duration: i = 300,
    repeat: r = 0,
    repeatType: o = "loop",
    ease: a = "easeOut",
    times: l
} = {}, c = void 0) {
    const u = {
        [e]: n
    };
    l && (u.offset = l);
    const h = ui(a, i);
    Array.isArray(h) && (u.easing = h), H.value && at.waapi++;
    const f = {
        delay: s,
        duration: i,
        easing: Array.isArray(h) ? "linear" : h,
        fill: "both",
        iterations: r + 1,
        direction: o === "reverse" ? "alternate" : "normal"
    };
    c && (f.pseudoElement = c);
    const d = t.animate(u, f);
    return H.value && d.finished.finally(() => {
        at.waapi--
    }), d
}

function hi(t) {
    return typeof t == "function" && "applyToOptions" in t
}

function kr({
    type: t,
    ...e
}) {
    return hi(t) && ci() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e)
}
class Fr extends en {
    constructor(e) {
        if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
        const {
            element: n,
            name: s,
            keyframes: i,
            pseudoElement: r,
            allowFlatten: o = !1,
            finalKeyframe: a,
            onComplete: l
        } = e;
        this.isPseudoElement = !!r, this.allowFlatten = o, this.options = e, $e(typeof e.type != "string");
        const c = kr(e);
        this.animation = Lr(n, s, i, c, r), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
            if (this.finishedTime = this.time, !r) {
                const u = tn(i, this.options, a, this.speed);
                this.updateMotionValue ? this.updateMotionValue(u) : Mr(n, s, u), this.animation.cancel()
            }
            l?.(), this.notifyFinished()
        }
    }
    play() {
        this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished())
    }
    pause() {
        this.animation.pause()
    }
    complete() {
        this.animation.finish?.()
    }
    cancel() {
        try {
            this.animation.cancel()
        } catch { }
    }
    stop() {
        if (this.isStopped) return;
        this.isStopped = !0;
        const {
            state: e
        } = this;
        e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel())
    }
    commitStyles() {
        const e = this.options?.element;
        !this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.()
    }
    get duration() {
        const e = this.animation.effect?.getComputedTiming?.().duration || 0;
        return W(Number(e))
    }
    get iterationDuration() {
        const {
            delay: e = 0
        } = this.options || {};
        return this.duration + W(e)
    }
    get time() {
        return W(Number(this.animation.currentTime) || 0)
    }
    set time(e) {
        this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = _(e)
    }
    get speed() {
        return this.animation.playbackRate
    }
    set speed(e) {
        e < 0 && (this.finishedTime = null), this.animation.playbackRate = e
    }
    get state() {
        return this.finishedTime !== null ? "finished" : this.animation.playState
    }
    get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime)
    }
    set startTime(e) {
        this.manualStartTime = this.animation.startTime = e
    }
    attachTimeline({
        timeline: e,
        observe: n
    }) {
        return this.allowFlatten && this.animation.effect?.updateTiming({
            easing: "linear"
        }), this.animation.onfinish = null, e && Dr() ? (this.animation.timeline = e, K) : n(this)
    }
}
const fi = {
    anticipate: Gs,
    backInOut: $s,
    circInOut: _s
};

function Ir(t) {
    return t in fi
}

function Br(t) {
    typeof t.ease == "string" && Ir(t.ease) && (t.ease = fi[t.ease])
}
const ae = 10;
class jr extends Fr {
    constructor(e) {
        Br(e), ri(e), super(e), e.startTime !== void 0 && (this.startTime = e.startTime), this.options = e
    }
    updateMotionValue(e) {
        const {
            motionValue: n,
            onUpdate: s,
            onComplete: i,
            element: r,
            ...o
        } = this.options;
        if (!n) return;
        if (e !== void 0) {
            n.set(e);
            return
        }
        const a = new Jt({
            ...o,
            autoplay: !1
        }),
            l = Math.max(ae, I.now() - this.startTime),
            c = X(0, ae, l - ae);
        n.setWithVelocity(a.sample(Math.max(0, l - c)).value, a.sample(l).value, c), a.stop()
    }
}
const Ln = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && (Q.test(t) || t === "0") && !t.startsWith("url("));

function Or(t) {
    const e = t[0];
    if (t.length === 1) return !0;
    for (let n = 0; n < t.length; n++)
        if (t[n] !== e) return !0
}

function Nr(t, e, n, s) {
    const i = t[0];
    if (i === null) return !1;
    if (e === "display" || e === "visibility") return !0;
    const r = t[t.length - 1],
        o = Ln(i, e),
        a = Ln(r, e);
    return !o || !a ? !1 : Or(t) || (n === "spring" || hi(n)) && s
}

function Re(t) {
    t.duration = 0, t.type = "keyframes"
}
const Ur = new Set(["opacity", "clipPath", "filter", "transform"]),
    Wr = Ge(() => Object.hasOwnProperty.call(Element.prototype, "animate"));

function Kr(t) {
    const {
        motionValue: e,
        name: n,
        repeatDelay: s,
        repeatType: i,
        damping: r,
        type: o
    } = t;
    if (!(e?.owner?.current instanceof HTMLElement)) return !1;
    const {
        onUpdate: l,
        transformTemplate: c
    } = e.owner.getProps();
    return Wr() && n && Ur.has(n) && (n !== "transform" || !c) && !l && !s && i !== "mirror" && r !== 0 && o !== "inertia"
}
const $r = 40;
class Gr extends en {
    constructor({
        autoplay: e = !0,
        delay: n = 0,
        type: s = "keyframes",
        repeat: i = 0,
        repeatDelay: r = 0,
        repeatType: o = "loop",
        keyframes: a,
        name: l,
        motionValue: c,
        element: u,
        ...h
    }) {
        super(), this.stop = () => {
            this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel()
        }, this.createdAt = I.now();
        const f = {
            autoplay: e,
            delay: n,
            type: s,
            repeat: i,
            repeatDelay: r,
            repeatType: o,
            name: l,
            motionValue: c,
            element: u,
            ...h
        },
            d = u?.KeyframeResolver || nn;
        this.keyframeResolver = new d(a, (m, y, T) => this.onKeyframesResolved(m, y, f, !T), l, c, u), this.keyframeResolver?.scheduleResolve()
    }
    onKeyframesResolved(e, n, s, i) {
        this.keyframeResolver = void 0;
        const {
            name: r,
            type: o,
            velocity: a,
            delay: l,
            isHandoff: c,
            onUpdate: u
        } = s;
        this.resolvedAt = I.now(), Nr(e, r, o, a) || ((Y.instantAnimations || !l) && u?.(tn(e, s, n)), e[0] = e[e.length - 1], Re(s), s.repeat = 0);
        const f = {
            startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > $r ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
            finalKeyframe: n,
            ...s,
            keyframes: e
        },
            d = !c && Kr(f),
            m = f.motionValue?.owner?.current,
            y = d ? new jr({
                ...f,
                element: m
            }) : new Jt(f);
        y.finished.then(() => {
            this.notifyFinished()
        }).catch(K), this.pendingTimeline && (this.stopTimeline = y.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = y
    }
    get finished() {
        return this._animation ? this.animation.finished : this._finished
    }
    then(e, n) {
        return this.finished.finally(e).then(() => { })
    }
    get animation() {
        return this._animation || (this.keyframeResolver?.resume(), Vr()), this._animation
    }
    get duration() {
        return this.animation.duration
    }
    get iterationDuration() {
        return this.animation.iterationDuration
    }
    get time() {
        return this.animation.time
    }
    set time(e) {
        this.animation.time = e
    }
    get speed() {
        return this.animation.speed
    }
    get state() {
        return this.animation.state
    }
    set speed(e) {
        this.animation.speed = e
    }
    get startTime() {
        return this.animation.startTime
    }
    attachTimeline(e) {
        return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop()
    }
    play() {
        this.animation.play()
    }
    pause() {
        this.animation.pause()
    }
    complete() {
        this.animation.complete()
    }
    cancel() {
        this._animation && this.animation.cancel(), this.keyframeResolver?.cancel()
    }
}

function di(t, e, n, s = 0, i = 1) {
    const r = Array.from(t).sort((c, u) => c.sortNodePosition(u)).indexOf(e),
        o = t.size,
        a = (o - 1) * s;
    return typeof n == "function" ? n(r, o) : i === 1 ? r * s : a - r * s
}
const Hr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;

function _r(t) {
    const e = Hr.exec(t);
    if (!e) return [,];
    const [, n, s, i] = e;
    return [`--${n ?? s}`, i]
}

function mi(t, e, n = 1) {
    const [s, i] = _r(t);
    if (!s) return;
    const r = window.getComputedStyle(e).getPropertyValue(s);
    if (r) {
        const o = r.trim();
        return Is(o) ? parseFloat(o) : o
    }
    return Ye(i) ? mi(i, e, n + 1) : i
}
const zr = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
},
    Xr = t => ({
        type: "spring",
        stiffness: 550,
        damping: t === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10
    }),
    Yr = {
        type: "keyframes",
        duration: .8
    },
    qr = {
        type: "keyframes",
        ease: [.25, .1, .35, 1],
        duration: .3
    },
    Zr = (t, {
        keyframes: e
    }) => e.length > 2 ? Yr : Tt.has(t) ? t.startsWith("scale") ? Xr(e[1]) : zr : qr,
    Jr = t => t !== null;

function Qr(t, {
    repeat: e,
    repeatType: n = "loop"
}, s) {
    const i = t.filter(Jr),
        r = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
    return !r || s === void 0 ? i[r] : s
}

function sn(t, e) {
    return t?.[e] ?? t?.default ?? t
}

function ta({
    when: t,
    delay: e,
    delayChildren: n,
    staggerChildren: s,
    staggerDirection: i,
    repeat: r,
    repeatType: o,
    repeatDelay: a,
    from: l,
    elapsed: c,
    ...u
}) {
    return !!Object.keys(u).length
}
const on = (t, e, n, s = {}, i, r) => o => {
    const a = sn(s, t) || {},
        l = a.delay || s.delay || 0;
    let {
        elapsed: c = 0
    } = s;
    c = c - _(l);
    const u = {
        keyframes: Array.isArray(n) ? n : [null, n],
        ease: "easeOut",
        velocity: e.getVelocity(),
        ...a,
        delay: -c,
        onUpdate: f => {
            e.set(f), a.onUpdate && a.onUpdate(f)
        },
        onComplete: () => {
            o(), a.onComplete && a.onComplete()
        },
        name: t,
        motionValue: e,
        element: r ? void 0 : i
    };
    ta(a) || Object.assign(u, Zr(t, u)), u.duration && (u.duration = _(u.duration)), u.repeatDelay && (u.repeatDelay = _(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
    let h = !1;
    if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (Re(u), u.delay === 0 && (h = !0)), (Y.instantAnimations || Y.skipAnimations || i?.shouldSkipAnimations) && (h = !0, Re(u), u.delay = 0), u.allowFlatten = !a.type && !a.ease, h && !r && e.get() !== void 0) {
        const f = Qr(u.keyframes, a);
        if (f !== void 0) {
            V.update(() => {
                u.onUpdate(f), u.onComplete()
            });
            return
        }
    }
    return a.isSync ? new Jt(u) : new Gr(u)
};

function kn(t) {
    const e = [{}, {}];
    return t?.values.forEach((n, s) => {
        e[0][s] = n.get(), e[1][s] = n.getVelocity()
    }), e
}

function rn(t, e, n, s) {
    if (typeof e == "function") {
        const [i, r] = kn(s);
        e = e(n !== void 0 ? n : t.custom, i, r)
    }
    if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
        const [i, r] = kn(s);
        e = e(n !== void 0 ? n : t.custom, i, r)
    }
    return e
}

function pt(t, e, n) {
    const s = t.getProps();
    return rn(s, e, n !== void 0 ? n : s.custom, t)
}
const pi = new Set(["width", "height", "top", "left", "right", "bottom", ...vt]),
    Fn = 30,
    ea = t => !isNaN(parseFloat(t)),
    In = {
        current: void 0
    };
class na {
    constructor(e, n = {}) {
        this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = s => {
            const i = I.now();
            if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
                for (const r of this.dependents) r.dirty()
        }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner
    }
    setCurrent(e) {
        this.current = e, this.updatedAt = I.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = ea(this.current))
    }
    setPrevFrameValue(e = this.current) {
        this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt
    }
    onChange(e) {
        return this.on("change", e)
    }
    on(e, n) {
        this.events[e] || (this.events[e] = new He);
        const s = this.events[e].add(n);
        return e === "change" ? () => {
            s(), V.read(() => {
                this.events.change.getSize() || this.stop()
            })
        } : s
    }
    clearListeners() {
        for (const e in this.events) this.events[e].clear()
    }
    attach(e, n) {
        this.passiveEffect = e, this.stopPassiveEffect = n
    }
    set(e) {
        this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e)
    }
    setWithVelocity(e, n, s) {
        this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s
    }
    jump(e, n = !0) {
        this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect()
    }
    dirty() {
        this.events.change?.notify(this.current)
    }
    addDependent(e) {
        this.dependents || (this.dependents = new Set), this.dependents.add(e)
    }
    removeDependent(e) {
        this.dependents && this.dependents.delete(e)
    }
    get() {
        return In.current && In.current.push(this), this.current
    }
    getPrevious() {
        return this.prev
    }
    getVelocity() {
        const e = I.now();
        if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Fn) return 0;
        const n = Math.min(this.updatedAt - this.prevUpdatedAt, Fn);
        return Os(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
    }
    start(e) {
        return this.stop(), new Promise(n => {
            this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify()
        }).then(() => {
            this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation()
        })
    }
    stop() {
        this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation()
    }
    isAnimating() {
        return !!this.animation
    }
    clearAnimation() {
        delete this.animation
    }
    destroy() {
        this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect()
    }
}

function gt(t, e) {
    return new na(t, e)
}
const Le = t => Array.isArray(t);

function sa(t, e, n) {
    t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, gt(n))
}

function ia(t) {
    return Le(t) ? t[t.length - 1] || 0 : t
}

function oa(t, e) {
    const n = pt(t, e);
    let {
        transitionEnd: s = {},
        transition: i = {},
        ...r
    } = n || {};
    r = {
        ...r,
        ...s
    };
    for (const o in r) {
        const a = ia(r[o]);
        sa(t, o, a)
    }
}
const F = t => !!(t && t.getVelocity);

function ra(t) {
    return !!(F(t) && t.add)
}

function ke(t, e) {
    const n = t.getValue("willChange");
    if (ra(n)) return n.add(e);
    if (!n && Y.WillChange) {
        const s = new Y.WillChange("auto");
        t.addValue("willChange", s), s.add(e)
    }
}

function an(t) {
    return t.replace(/([A-Z])/g, e => `-${e.toLowerCase()}`)
}
const aa = "framerAppearId",
    gi = "data-" + an(aa);

function yi(t) {
    return t.props[gi]
}

function la({
    protectedKeys: t,
    needsAnimating: e
}, n) {
    const s = t.hasOwnProperty(n) && e[n] !== !0;
    return e[n] = !1, s
}

function vi(t, e, {
    delay: n = 0,
    transitionOverride: s,
    type: i
} = {}) {
    let {
        transition: r = t.getDefaultTransition(),
        transitionEnd: o,
        ...a
    } = e;
    const l = r?.reduceMotion;
    s && (r = s);
    const c = [],
        u = i && t.animationState && t.animationState.getState()[i];
    for (const h in a) {
        const f = t.getValue(h, t.latestValues[h] ?? null),
            d = a[h];
        if (d === void 0 || u && la(u, h)) continue;
        const m = {
            delay: n,
            ...sn(r || {}, h)
        },
            y = f.get();
        if (y !== void 0 && !f.isAnimating && !Array.isArray(d) && d === y && !m.velocity) continue;
        let T = !1;
        if (window.MotionHandoffAnimation) {
            const g = yi(t);
            if (g) {
                const S = window.MotionHandoffAnimation(g, h, V);
                S !== null && (m.startTime = S, T = !0)
            }
        }
        ke(t, h);
        const p = l ?? t.shouldReduceMotion;
        f.start(on(h, f, d, p && pi.has(h) ? {
            type: !1
        } : m, t, T));
        const x = f.animation;
        x && c.push(x)
    }
    return o && Promise.all(c).then(() => {
        V.update(() => {
            o && oa(t, o)
        })
    }), c
}

function Fe(t, e, n = {}) {
    const s = pt(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
    let {
        transition: i = t.getDefaultTransition() || {}
    } = s || {};
    n.transitionOverride && (i = n.transitionOverride);
    const r = s ? () => Promise.all(vi(t, s, n)) : () => Promise.resolve(),
        o = t.variantChildren && t.variantChildren.size ? (l = 0) => {
            const {
                delayChildren: c = 0,
                staggerChildren: u,
                staggerDirection: h
            } = i;
            return ca(t, e, l, c, u, h, n)
        } : () => Promise.resolve(),
        {
            when: a
        } = i;
    if (a) {
        const [l, c] = a === "beforeChildren" ? [r, o] : [o, r];
        return l().then(() => c())
    } else return Promise.all([r(), o(n.delay)])
}

function ca(t, e, n = 0, s = 0, i = 0, r = 1, o) {
    const a = [];
    for (const l of t.variantChildren) l.notify("AnimationStart", e), a.push(Fe(l, e, {
        ...o,
        delay: n + (typeof s == "function" ? 0 : s) + di(t.variantChildren, l, s, i, r)
    }).then(() => l.notify("AnimationComplete", e)));
    return Promise.all(a)
}

function ua(t, e, n = {}) {
    t.notify("AnimationStart", e);
    let s;
    if (Array.isArray(e)) {
        const i = e.map(r => Fe(t, r, n));
        s = Promise.all(i)
    } else if (typeof e == "string") s = Fe(t, e, n);
    else {
        const i = typeof e == "function" ? pt(t, e, n.custom) : e;
        s = Promise.all(vi(t, i, n))
    }
    return s.then(() => {
        t.notify("AnimationComplete", e)
    })
}
const ha = {
    test: t => t === "auto",
    parse: t => t
},
    Ti = t => e => e.test(t),
    xi = [yt, v, z, q, Oo, jo, ha],
    Bn = t => xi.find(Ti(t));

function fa(t) {
    return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || js(t) : !0
}
const da = new Set(["brightness", "contrast", "saturate", "opacity"]);

function ma(t) {
    const [e, n] = t.slice(0, -1).split("(");
    if (e === "drop-shadow") return t;
    const [s] = n.match(qe) || [];
    if (!s) return t;
    const i = n.replace(s, "");
    let r = da.has(e) ? 1 : 0;
    return s !== n && (r *= 100), e + "(" + r + i + ")"
}
const pa = /\b([a-z-]*)\(.*?\)/gu,
    Ie = {
        ...Q,
        getAnimatableNone: t => {
            const e = t.match(pa);
            return e ? e.map(ma).join(" ") : t
        }
    },
    jn = {
        ...yt,
        transform: Math.round
    },
    ga = {
        rotate: q,
        rotateX: q,
        rotateY: q,
        rotateZ: q,
        scale: Ot,
        scaleX: Ot,
        scaleY: Ot,
        scaleZ: Ot,
        skew: q,
        skewX: q,
        skewY: q,
        distance: v,
        translateX: v,
        translateY: v,
        translateZ: v,
        x: v,
        y: v,
        z: v,
        perspective: v,
        transformPerspective: v,
        opacity: Mt,
        originX: Pn,
        originY: Pn,
        originZ: v
    },
    ln = {
        borderWidth: v,
        borderTopWidth: v,
        borderRightWidth: v,
        borderBottomWidth: v,
        borderLeftWidth: v,
        borderRadius: v,
        borderTopLeftRadius: v,
        borderTopRightRadius: v,
        borderBottomRightRadius: v,
        borderBottomLeftRadius: v,
        width: v,
        maxWidth: v,
        height: v,
        maxHeight: v,
        top: v,
        right: v,
        bottom: v,
        left: v,
        inset: v,
        insetBlock: v,
        insetBlockStart: v,
        insetBlockEnd: v,
        insetInline: v,
        insetInlineStart: v,
        insetInlineEnd: v,
        padding: v,
        paddingTop: v,
        paddingRight: v,
        paddingBottom: v,
        paddingLeft: v,
        paddingBlock: v,
        paddingBlockStart: v,
        paddingBlockEnd: v,
        paddingInline: v,
        paddingInlineStart: v,
        paddingInlineEnd: v,
        margin: v,
        marginTop: v,
        marginRight: v,
        marginBottom: v,
        marginLeft: v,
        marginBlock: v,
        marginBlockStart: v,
        marginBlockEnd: v,
        marginInline: v,
        marginInlineStart: v,
        marginInlineEnd: v,
        fontSize: v,
        backgroundPositionX: v,
        backgroundPositionY: v,
        ...ga,
        zIndex: jn,
        fillOpacity: Mt,
        strokeOpacity: Mt,
        numOctaves: jn
    },
    ya = {
        ...ln,
        color: D,
        backgroundColor: D,
        outlineColor: D,
        fill: D,
        stroke: D,
        borderColor: D,
        borderTopColor: D,
        borderRightColor: D,
        borderBottomColor: D,
        borderLeftColor: D,
        filter: Ie,
        WebkitFilter: Ie
    },
    bi = t => ya[t];

function Pi(t, e) {
    let n = bi(t);
    return n !== Ie && (n = Q), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
}
const va = new Set(["auto", "none", "0"]);

function Ta(t, e, n) {
    let s = 0,
        i;
    for (; s < t.length && !i;) {
        const r = t[s];
        typeof r == "string" && !va.has(r) && Dt(r).values.length && (i = t[s]), s++
    }
    if (i && n)
        for (const r of e) t[r] = Pi(n, i)
}
class xa extends nn {
    constructor(e, n, s, i, r) {
        super(e, n, s, i, r, !0)
    }
    readKeyframes() {
        const {
            unresolvedKeyframes: e,
            element: n,
            name: s
        } = this;
        if (!n || !n.current) return;
        super.readKeyframes();
        for (let u = 0; u < e.length; u++) {
            let h = e[u];
            if (typeof h == "string" && (h = h.trim(), Ye(h))) {
                const f = mi(h, n.current);
                f !== void 0 && (e[u] = f), u === e.length - 1 && (this.finalKeyframe = h)
            }
        }
        if (this.resolveNoneKeyframes(), !pi.has(s) || e.length !== 2) return;
        const [i, r] = e, o = Bn(i), a = Bn(r), l = bn(i), c = bn(r);
        if (l !== c && Z[s]) {
            this.needsMeasurement = !0;
            return
        }
        if (o !== a)
            if (En(o) && En(a))
                for (let u = 0; u < e.length; u++) {
                    const h = e[u];
                    typeof h == "string" && (e[u] = parseFloat(h))
                } else Z[s] && (this.needsMeasurement = !0)
    }
    resolveNoneKeyframes() {
        const {
            unresolvedKeyframes: e,
            name: n
        } = this, s = [];
        for (let i = 0; i < e.length; i++)(e[i] === null || fa(e[i])) && s.push(i);
        s.length && Ta(e, s, n)
    }
    measureInitialState() {
        const {
            element: e,
            unresolvedKeyframes: n,
            name: s
        } = this;
        if (!e || !e.current) return;
        s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Z[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
        const i = n[n.length - 1];
        i !== void 0 && e.getValue(s, i).jump(i, !1)
    }
    measureEndState() {
        const {
            element: e,
            name: n,
            unresolvedKeyframes: s
        } = this;
        if (!e || !e.current) return;
        const i = e.getValue(n);
        i && i.jump(this.measuredOrigin, !1);
        const r = s.length - 1,
            o = s[r];
        s[r] = Z[n](e.measureViewportBox(), window.getComputedStyle(e.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
            e.getValue(a).set(l)
        }), this.resolveNoneKeyframes()
    }
}

function ba(t, e, n) {
    if (t == null) return [];
    if (t instanceof EventTarget) return [t];
    if (typeof t == "string") {
        let s = document;
        e && (s = e.current);
        const i = n?.[t] ?? s.querySelectorAll(t);
        return i ? Array.from(i) : []
    }
    return Array.from(t).filter(s => s != null)
}
const Si = (t, e) => e && typeof t == "number" ? e.transform(t) : t;

function Pa(t) {
    return Bs(t) && "offsetHeight" in t
}
const {
    schedule: cn,
    cancel: ou
} = Ys(queueMicrotask, !1), G = {
    x: !1,
    y: !1
};

function wi() {
    return G.x || G.y
}

function Sa(t) {
    return t === "x" || t === "y" ? G[t] ? null : (G[t] = !0, () => {
        G[t] = !1
    }) : G.x || G.y ? null : (G.x = G.y = !0, () => {
        G.x = G.y = !1
    })
}

function Ai(t, e) {
    const n = ba(t),
        s = new AbortController,
        i = {
            passive: !0,
            ...e,
            signal: s.signal
        };
    return [n, i, () => s.abort()]
}

function On(t) {
    return !(t.pointerType === "touch" || wi())
}

function wa(t, e, n = {}) {
    const [s, i, r] = Ai(t, n), o = a => {
        if (!On(a)) return;
        const {
            target: l
        } = a, c = e(l, a);
        if (typeof c != "function" || !l) return;
        const u = h => {
            On(h) && (c(h), l.removeEventListener("pointerleave", u))
        };
        l.addEventListener("pointerleave", u, i)
    };
    return s.forEach(a => {
        a.addEventListener("pointerenter", o, i)
    }), r
}
const Vi = (t, e) => e ? t === e ? !0 : Vi(t, e.parentElement) : !1,
    un = t => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1,
    Aa = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);

function Va(t) {
    return Aa.has(t.tagName) || t.isContentEditable === !0
}
const Ca = new Set(["INPUT", "SELECT", "TEXTAREA"]);

function Ma(t) {
    return Ca.has(t.tagName) || t.isContentEditable === !0
}
const Wt = new WeakSet;

function Nn(t) {
    return e => {
        e.key === "Enter" && t(e)
    }
}

function le(t, e) {
    t.dispatchEvent(new PointerEvent("pointer" + e, {
        isPrimary: !0,
        bubbles: !0
    }))
}
const Da = (t, e) => {
    const n = t.currentTarget;
    if (!n) return;
    const s = Nn(() => {
        if (Wt.has(n)) return;
        le(n, "down");
        const i = Nn(() => {
            le(n, "up")
        }),
            r = () => le(n, "cancel");
        n.addEventListener("keyup", i, e), n.addEventListener("blur", r, e)
    });
    n.addEventListener("keydown", s, e), n.addEventListener("blur", () => n.removeEventListener("keydown", s), e)
};

function Un(t) {
    return un(t) && !wi()
}

function Ea(t, e, n = {}) {
    const [s, i, r] = Ai(t, n), o = a => {
        const l = a.currentTarget;
        if (!Un(a)) return;
        Wt.add(l);
        const c = e(l, a),
            u = (d, m) => {
                window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", f), Wt.has(l) && Wt.delete(l), Un(d) && typeof c == "function" && c(d, {
                    success: m
                })
            },
            h = d => {
                u(d, l === window || l === document || n.useGlobalTarget || Vi(l, d.target))
            },
            f = d => {
                u(d, !1)
            };
        window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", f, i)
    };
    return s.forEach(a => {
        (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, i), Pa(a) && (a.addEventListener("focus", c => Da(c, i)), !Va(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0))
    }), r
}

function Ci(t) {
    return Bs(t) && "ownerSVGElement" in t
}

function Ra(t) {
    return Ci(t) && t.tagName === "svg"
}
const La = [...xi, D, Q],
    ka = t => La.find(Ti(t)),
    Wn = () => ({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    }),
    ft = () => ({
        x: Wn(),
        y: Wn()
    }),
    Kn = () => ({
        min: 0,
        max: 0
    }),
    R = () => ({
        x: Kn(),
        y: Kn()
    }),
    Be = {
        current: null
    },
    Mi = {
        current: !1
    },
    Fa = typeof window < "u";

function Ia() {
    if (Mi.current = !0, !!Fa)
        if (window.matchMedia) {
            const t = window.matchMedia("(prefers-reduced-motion)"),
                e = () => Be.current = t.matches;
            t.addEventListener("change", e), e()
        } else Be.current = !1
}
const Ba = new WeakMap;

function Qt(t) {
    return t !== null && typeof t == "object" && typeof t.start == "function"
}

function Et(t) {
    return typeof t == "string" || Array.isArray(t)
}
const hn = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
    fn = ["initial", ...hn];

function te(t) {
    return Qt(t.animate) || fn.some(e => Et(t[e]))
}

function Di(t) {
    return !!(te(t) || t.variants)
}

function ja(t, e, n) {
    for (const s in e) {
        const i = e[s],
            r = n[s];
        if (F(i)) t.addValue(s, i);
        else if (F(r)) t.addValue(s, gt(i, {
            owner: t
        }));
        else if (r !== i)
            if (t.hasValue(s)) {
                const o = t.getValue(s);
                o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i)
            } else {
                const o = t.getStaticValue(s);
                t.addValue(s, gt(o !== void 0 ? o : i, {
                    owner: t
                }))
            }
    }
    for (const s in n) e[s] === void 0 && t.removeValue(s);
    return e
}
const $n = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
let zt = {};

function Ei(t) {
    zt = t
}

function Oa() {
    return zt
}
class Na {
    scrapeMotionValuesFromProps(e, n, s) {
        return {}
    }
    constructor({
        parent: e,
        props: n,
        presenceContext: s,
        reducedMotionConfig: i,
        skipAnimations: r,
        blockInitialAnimation: o,
        visualState: a
    }, l = {}) {
        this.current = null, this.children = new Set, this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = new Map, this.KeyframeResolver = nn, this.features = {}, this.valueSubscriptions = new Map, this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
            this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
        }, this.renderScheduledAt = 0, this.scheduleRender = () => {
            const d = I.now();
            this.renderScheduledAt < d && (this.renderScheduledAt = d, V.render(this.render, !1, !0))
        };
        const {
            latestValues: c,
            renderState: u
        } = a;
        this.latestValues = c, this.baseTarget = {
            ...c
        }, this.initialValues = n.initial ? {
            ...c
        } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.skipAnimationsConfig = r, this.options = l, this.blockInitialAnimation = !!o, this.isControllingVariants = te(n), this.isVariantNode = Di(n), this.isVariantNode && (this.variantChildren = new Set), this.manuallyAnimateOnMount = !!(e && e.current);
        const {
            willChange: h,
            ...f
        } = this.scrapeMotionValuesFromProps(n, {}, this);
        for (const d in f) {
            const m = f[d];
            c[d] !== void 0 && F(m) && m.set(c[d])
        }
    }
    mount(e) {
        this.current = e, Ba.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Mi.current || Ia(), this.shouldReduceMotion = Be.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext)
    }
    unmount() {
        this.projection && this.projection.unmount(), J(this.notifyUpdate), J(this.render), this.valueSubscriptions.forEach(e => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
        for (const e in this.events) this.events[e].clear();
        for (const e in this.features) {
            const n = this.features[e];
            n && (n.unmount(), n.isMounted = !1)
        }
        this.current = null
    }
    addChild(e) {
        this.children.add(e), this.enteringChildren ?? (this.enteringChildren = new Set), this.enteringChildren.add(e)
    }
    removeChild(e) {
        this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e)
    }
    bindToMotionValue(e, n) {
        this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
        const s = Tt.has(e);
        s && this.onBindTransform && this.onBindTransform();
        const i = n.on("change", o => {
            this.latestValues[e] = o, this.props.onUpdate && V.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender()
        });
        let r;
        typeof window < "u" && window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
            i(), r && r(), n.owner && n.stop()
        })
    }
    sortNodePosition(e) {
        return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current)
    }
    updateFeatures() {
        let e = "animation";
        for (e in zt) {
            const n = zt[e];
            if (!n) continue;
            const {
                isEnabled: s,
                Feature: i
            } = n;
            if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
                const r = this.features[e];
                r.isMounted ? r.update() : (r.mount(), r.isMounted = !0)
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props)
    }
    measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : R()
    }
    getStaticValue(e) {
        return this.latestValues[e]
    }
    setStaticValue(e, n) {
        this.latestValues[e] = n
    }
    update(e, n) {
        (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
        for (let s = 0; s < $n.length; s++) {
            const i = $n[s];
            this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
            const r = "on" + i,
                o = e[r];
            o && (this.propEventSubscriptions[i] = this.on(i, o))
        }
        this.prevMotionValues = ja(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps() {
        return this.props
    }
    getVariant(e) {
        return this.props.variants ? this.props.variants[e] : void 0
    }
    getDefaultTransition() {
        return this.props.transition
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
    }
    addVariantChild(e) {
        const n = this.getClosestVariantNode();
        if (n) return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e)
    }
    addValue(e, n) {
        const s = this.values.get(e);
        n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get())
    }
    removeValue(e) {
        this.values.delete(e);
        const n = this.valueSubscriptions.get(e);
        n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState)
    }
    hasValue(e) {
        return this.values.has(e)
    }
    getValue(e, n) {
        if (this.props.values && this.props.values[e]) return this.props.values[e];
        let s = this.values.get(e);
        return s === void 0 && n !== void 0 && (s = gt(n === null ? void 0 : n, {
            owner: this
        }), this.addValue(e, s)), s
    }
    readValue(e, n) {
        let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
        return s != null && (typeof s == "string" && (Is(s) || js(s)) ? s = parseFloat(s) : !ka(s) && Q.test(n) && (s = Pi(e, n)), this.setBaseTarget(e, F(s) ? s.get() : s)), F(s) ? s.get() : s
    }
    setBaseTarget(e, n) {
        this.baseTarget[e] = n
    }
    getBaseTarget(e) {
        const {
            initial: n
        } = this.props;
        let s;
        if (typeof n == "string" || typeof n == "object") {
            const r = rn(this.props, n, this.presenceContext?.custom);
            r && (s = r[e])
        }
        if (n && s !== void 0) return s;
        const i = this.getBaseTargetFromProps(this.props, e);
        return i !== void 0 && !F(i) ? i : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e]
    }
    on(e, n) {
        return this.events[e] || (this.events[e] = new He), this.events[e].add(n)
    }
    notify(e, ...n) {
        this.events[e] && this.events[e].notify(...n)
    }
    scheduleRenderMicrotask() {
        cn.render(this.render)
    }
}
class Ri extends Na {
    constructor() {
        super(...arguments), this.KeyframeResolver = xa
    }
    sortInstanceNodePosition(e, n) {
        return e.compareDocumentPosition(n) & 2 ? 1 : -1
    }
    getBaseTargetFromProps(e, n) {
        const s = e.style;
        return s ? s[n] : void 0
    }
    removeValueFromRenderState(e, {
        vars: n,
        style: s
    }) {
        delete n[e], delete s[e]
    }
    handleChildMotionValue() {
        this.childSubscription && (this.childSubscription(), delete this.childSubscription);
        const {
            children: e
        } = this.props;
        F(e) && (this.childSubscription = e.on("change", n => {
            this.current && (this.current.textContent = `${n}`)
        }))
    }
}
class tt {
    constructor(e) {
        this.isMounted = !1, this.node = e
    }
    update() { }
}

function Li({
    top: t,
    left: e,
    right: n,
    bottom: s
}) {
    return {
        x: {
            min: e,
            max: n
        },
        y: {
            min: t,
            max: s
        }
    }
}

function Ua({
    x: t,
    y: e
}) {
    return {
        top: e.min,
        right: t.max,
        bottom: e.max,
        left: t.min
    }
}

function Wa(t, e) {
    if (!e) return t;
    const n = e({
        x: t.left,
        y: t.top
    }),
        s = e({
            x: t.right,
            y: t.bottom
        });
    return {
        top: n.y,
        left: n.x,
        bottom: s.y,
        right: s.x
    }
}

function ce(t) {
    return t === void 0 || t === 1
}

function je({
    scale: t,
    scaleX: e,
    scaleY: n
}) {
    return !ce(t) || !ce(e) || !ce(n)
}

function st(t) {
    return je(t) || ki(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY
}

function ki(t) {
    return Gn(t.x) || Gn(t.y)
}

function Gn(t) {
    return t && t !== "0%"
}

function Xt(t, e, n) {
    const s = t - n,
        i = e * s;
    return n + i
}

function Hn(t, e, n, s, i) {
    return i !== void 0 && (t = Xt(t, i, s)), Xt(t, n, s) + e
}

function Oe(t, e = 0, n = 1, s, i) {
    t.min = Hn(t.min, e, n, s, i), t.max = Hn(t.max, e, n, s, i)
}

function Fi(t, {
    x: e,
    y: n
}) {
    Oe(t.x, e.translate, e.scale, e.originPoint), Oe(t.y, n.translate, n.scale, n.originPoint)
}
const _n = .999999999999,
    zn = 1.0000000000001;

function Ka(t, e, n, s = !1) {
    const i = n.length;
    if (!i) return;
    e.x = e.y = 1;
    let r, o;
    for (let a = 0; a < i; a++) {
        r = n[a], o = r.projectionDelta;
        const {
            visualElement: l
        } = r.options;
        l && l.props.style && l.props.style.display === "contents" || (s && r.options.layoutScroll && r.scroll && r !== r.root && mt(t, {
            x: -r.scroll.offset.x,
            y: -r.scroll.offset.y
        }), o && (e.x *= o.x.scale, e.y *= o.y.scale, Fi(t, o)), s && st(r.latestValues) && mt(t, r.latestValues))
    }
    e.x < zn && e.x > _n && (e.x = 1), e.y < zn && e.y > _n && (e.y = 1)
}

function dt(t, e) {
    t.min = t.min + e, t.max = t.max + e
}

function Xn(t, e, n, s, i = .5) {
    const r = C(t.min, t.max, i);
    Oe(t, e, n, r, s)
}

function mt(t, e) {
    Xn(t.x, e.x, e.scaleX, e.scale, e.originX), Xn(t.y, e.y, e.scaleY, e.scale, e.originY)
}

function Ii(t, e) {
    return Li(Wa(t.getBoundingClientRect(), e))
}

function $a(t, e, n) {
    const s = Ii(t, n),
        {
            scroll: i
        } = e;
    return i && (dt(s.x, i.offset.x), dt(s.y, i.offset.y)), s
}
const Ga = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
},
    Ha = vt.length;

function _a(t, e, n) {
    let s = "",
        i = !0;
    for (let r = 0; r < Ha; r++) {
        const o = vt[r],
            a = t[o];
        if (a === void 0) continue;
        let l = !0;
        if (typeof a == "number") l = a === (o.startsWith("scale") ? 1 : 0);
        else {
            const c = parseFloat(a);
            l = o.startsWith("scale") ? c === 1 : c === 0
        }
        if (!l || n) {
            const c = Si(a, ln[o]);
            if (!l) {
                i = !1;
                const u = Ga[o] || o;
                s += `${u}(${c}) `
            }
            n && (e[o] = c)
        }
    }
    return s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s
}

function dn(t, e, n) {
    const {
        style: s,
        vars: i,
        transformOrigin: r
    } = t;
    let o = !1,
        a = !1;
    for (const l in e) {
        const c = e[l];
        if (Tt.has(l)) {
            o = !0;
            continue
        } else if (Xe(l)) {
            i[l] = c;
            continue
        } else {
            const u = Si(c, ln[l]);
            l.startsWith("origin") ? (a = !0, r[l] = u) : s[l] = u
        }
    }
    if (e.transform || (o || n ? s.transform = _a(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
        const {
            originX: l = "50%",
            originY: c = "50%",
            originZ: u = 0
        } = r;
        s.transformOrigin = `${l} ${c} ${u}`
    }
}

function Bi(t, {
    style: e,
    vars: n
}, s, i) {
    const r = t.style;
    let o;
    for (o in e) r[o] = e[o];
    i?.applyProjectionStyles(r, s);
    for (o in n) r.setProperty(o, n[o])
}

function Yn(t, e) {
    return e.max === e.min ? 0 : t / (e.max - e.min) * 100
}
const xt = {
    correct: (t, e) => {
        if (!e.target) return t;
        if (typeof t == "string")
            if (v.test(t)) t = parseFloat(t);
            else return t;
        const n = Yn(t, e.target.x),
            s = Yn(t, e.target.y);
        return `${n}% ${s}%`
    }
},
    za = {
        correct: (t, {
            treeScale: e,
            projectionDelta: n
        }) => {
            const s = t,
                i = Q.parse(t);
            if (i.length > 5) return s;
            const r = Q.createTransformer(t),
                o = typeof i[0] != "number" ? 1 : 0,
                a = n.x.scale * e.x,
                l = n.y.scale * e.y;
            i[0 + o] /= a, i[1 + o] /= l;
            const c = C(a, l, .5);
            return typeof i[2 + o] == "number" && (i[2 + o] /= c), typeof i[3 + o] == "number" && (i[3 + o] /= c), r(i)
        }
    },
    Rt = {
        borderRadius: {
            ...xt,
            applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
        },
        borderTopLeftRadius: xt,
        borderTopRightRadius: xt,
        borderBottomLeftRadius: xt,
        borderBottomRightRadius: xt,
        boxShadow: za
    };

function ru(t) {
    for (const e in t) Rt[e] = t[e], Xe(e) && (Rt[e].isCSSVariable = !0)
}

function ji(t, {
    layout: e,
    layoutId: n
}) {
    return Tt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Rt[t] || t === "opacity")
}

function mn(t, e, n) {
    const s = t.style,
        i = e?.style,
        r = {};
    if (!s) return r;
    for (const o in s) (F(s[o]) || i && F(i[o]) || ji(o, t) || n?.getValue(o)?.liveStyle !== void 0) && (r[o] = s[o]);
    return r
}

function Xa(t) {
    return window.getComputedStyle(t)
}
class Ya extends Ri {
    constructor() {
        super(...arguments), this.type = "html", this.renderInstance = Bi
    }
    readValueFromInstance(e, n) {
        if (Tt.has(n)) return this.projection?.isProjecting ? Ve(n) : br(e, n);
        {
            const s = Xa(e),
                i = (Xe(n) ? s.getPropertyValue(n) : s[n]) || 0;
            return typeof i == "string" ? i.trim() : i
        }
    }
    measureInstanceViewportBox(e, {
        transformPagePoint: n
    }) {
        return Ii(e, n)
    }
    build(e, n, s) {
        dn(e, n, s.transformTemplate)
    }
    scrapeMotionValuesFromProps(e, n, s) {
        return mn(e, n, s)
    }
}
const qa = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
},
    Za = {
        offset: "strokeDashoffset",
        array: "strokeDasharray"
    };

function Ja(t, e, n = 1, s = 0, i = !0) {
    t.pathLength = 1;
    const r = i ? qa : Za;
    t[r.offset] = `${-s}`, t[r.array] = `${e} ${n}`
}
const Qa = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];

function Oi(t, {
    attrX: e,
    attrY: n,
    attrScale: s,
    pathLength: i,
    pathSpacing: r = 1,
    pathOffset: o = 0,
    ...a
}, l, c, u) {
    if (dn(t, a, c), l) {
        t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
        return
    }
    t.attrs = t.style, t.style = {};
    const {
        attrs: h,
        style: f
    } = t;
    h.transform && (f.transform = h.transform, delete h.transform), (f.transform || h.transformOrigin) && (f.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete h.transformBox);
    for (const d of Qa) h[d] !== void 0 && (f[d] = h[d], delete h[d]);
    e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), s !== void 0 && (h.scale = s), i !== void 0 && Ja(h, i, r, o, !1)
}
const Ni = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]),
    Ui = t => typeof t == "string" && t.toLowerCase() === "svg";

function tl(t, e, n, s) {
    Bi(t, e, void 0, s);
    for (const i in e.attrs) t.setAttribute(Ni.has(i) ? i : an(i), e.attrs[i])
}

function Wi(t, e, n) {
    const s = mn(t, e, n);
    for (const i in t)
        if (F(t[i]) || F(e[i])) {
            const r = vt.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
            s[r] = t[i]
        } return s
}
class el extends Ri {
    constructor() {
        super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = R
    }
    getBaseTargetFromProps(e, n) {
        return e[n]
    }
    readValueFromInstance(e, n) {
        if (Tt.has(n)) {
            const s = bi(n);
            return s && s.default || 0
        }
        return n = Ni.has(n) ? n : an(n), e.getAttribute(n)
    }
    scrapeMotionValuesFromProps(e, n, s) {
        return Wi(e, n, s)
    }
    build(e, n, s) {
        Oi(e, n, this.isSVGTag, s.transformTemplate, s.style)
    }
    renderInstance(e, n, s, i) {
        tl(e, n, s, i)
    }
    mount(e) {
        this.isSVGTag = Ui(e.tagName), super.mount(e)
    }
}
const nl = fn.length;

function Ki(t) {
    if (!t) return;
    if (!t.isControllingVariants) {
        const n = t.parent ? Ki(t.parent) || {} : {};
        return t.props.initial !== void 0 && (n.initial = t.props.initial), n
    }
    const e = {};
    for (let n = 0; n < nl; n++) {
        const s = fn[n],
            i = t.props[s];
        (Et(i) || i === !1) && (e[s] = i)
    }
    return e
}

function $i(t, e) {
    if (!Array.isArray(e)) return !1;
    const n = e.length;
    if (n !== t.length) return !1;
    for (let s = 0; s < n; s++)
        if (e[s] !== t[s]) return !1;
    return !0
}
const sl = [...hn].reverse(),
    il = hn.length;

function ol(t) {
    return e => Promise.all(e.map(({
        animation: n,
        options: s
    }) => ua(t, n, s)))
}

function rl(t) {
    let e = ol(t),
        n = qn(),
        s = !0;
    const i = l => (c, u) => {
        const h = pt(t, u, l === "exit" ? t.presenceContext?.custom : void 0);
        if (h) {
            const {
                transition: f,
                transitionEnd: d,
                ...m
            } = h;
            c = {
                ...c,
                ...m,
                ...d
            }
        }
        return c
    };

    function r(l) {
        e = l(t)
    }

    function o(l) {
        const {
            props: c
        } = t, u = Ki(t.parent) || {}, h = [], f = new Set;
        let d = {},
            m = 1 / 0;
        for (let T = 0; T < il; T++) {
            const p = sl[T],
                x = n[p],
                g = c[p] !== void 0 ? c[p] : u[p],
                S = Et(g),
                b = p === l ? x.isActive : null;
            b === !1 && (m = T);
            let A = g === u[p] && g !== c[p] && S;
            if (A && s && t.manuallyAnimateOnMount && (A = !1), x.protectedKeys = {
                ...d
            }, !x.isActive && b === null || !g && !x.prevProp || Qt(g) || typeof g == "boolean") continue;
            const E = al(x.prevProp, g);
            let w = E || p === l && x.isActive && !A && S || T > m && S,
                j = !1;
            const O = Array.isArray(g) ? g : [g];
            let ct = O.reduce(i(p), {});
            b === !1 && (ct = {});
            const {
                prevResolvedValues: yn = {}
            } = x, po = {
                ...yn,
                ...ct
            }, vn = L => {
                w = !0, f.has(L) && (j = !0, f.delete(L)), x.needsAnimating[L] = !0;
                const N = t.getValue(L);
                N && (N.liveStyle = !1)
            };
            for (const L in po) {
                const N = ct[L],
                    et = yn[L];
                if (d.hasOwnProperty(L)) continue;
                let ut = !1;
                Le(N) && Le(et) ? ut = !$i(N, et) : ut = N !== et, ut ? N != null ? vn(L) : f.add(L) : N !== void 0 && f.has(L) ? vn(L) : x.protectedKeys[L] = !0
            }
            x.prevProp = g, x.prevResolvedValues = ct, x.isActive && (d = {
                ...d,
                ...ct
            }), s && t.blockInitialAnimation && (w = !1);
            const Tn = A && E;
            w && (!Tn || j) && h.push(...O.map(L => {
                const N = {
                    type: p
                };
                if (typeof L == "string" && s && !Tn && t.manuallyAnimateOnMount && t.parent) {
                    const {
                        parent: et
                    } = t, ut = pt(et, L);
                    if (et.enteringChildren && ut) {
                        const {
                            delayChildren: go
                        } = ut.transition || {};
                        N.delay = di(et.enteringChildren, t, go)
                    }
                }
                return {
                    animation: L,
                    options: N
                }
            }))
        }
        if (f.size) {
            const T = {};
            if (typeof c.initial != "boolean") {
                const p = pt(t, Array.isArray(c.initial) ? c.initial[0] : c.initial);
                p && p.transition && (T.transition = p.transition)
            }
            f.forEach(p => {
                const x = t.getBaseTarget(p),
                    g = t.getValue(p);
                g && (g.liveStyle = !0), T[p] = x ?? null
            }), h.push({
                animation: T
            })
        }
        let y = !!h.length;
        return s && (c.initial === !1 || c.initial === c.animate) && !t.manuallyAnimateOnMount && (y = !1), s = !1, y ? e(h) : Promise.resolve()
    }

    function a(l, c) {
        if (n[l].isActive === c) return Promise.resolve();
        t.variantChildren?.forEach(h => h.animationState?.setActive(l, c)), n[l].isActive = c;
        const u = o(l);
        for (const h in n) n[h].protectedKeys = {};
        return u
    }
    return {
        animateChanges: o,
        setActive: a,
        setAnimateFunction: r,
        getState: () => n,
        reset: () => {
            n = qn()
        }
    }
}

function al(t, e) {
    return typeof e == "string" ? e !== t : Array.isArray(e) ? !$i(e, t) : !1
}

function nt(t = !1) {
    return {
        isActive: t,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    }
}

function qn() {
    return {
        animate: nt(!0),
        whileInView: nt(),
        whileHover: nt(),
        whileTap: nt(),
        whileDrag: nt(),
        whileFocus: nt(),
        exit: nt()
    }
}

function Zn(t, e) {
    t.min = e.min, t.max = e.max
}

function $(t, e) {
    Zn(t.x, e.x), Zn(t.y, e.y)
}

function Jn(t, e) {
    t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin
}
const Gi = 1e-4,
    ll = 1 - Gi,
    cl = 1 + Gi,
    Hi = .01,
    ul = 0 - Hi,
    hl = 0 + Hi;

function B(t) {
    return t.max - t.min
}

function fl(t, e, n) {
    return Math.abs(t - e) <= n
}

function Qn(t, e, n, s = .5) {
    t.origin = s, t.originPoint = C(e.min, e.max, t.origin), t.scale = B(n) / B(e), t.translate = C(n.min, n.max, t.origin) - t.originPoint, (t.scale >= ll && t.scale <= cl || isNaN(t.scale)) && (t.scale = 1), (t.translate >= ul && t.translate <= hl || isNaN(t.translate)) && (t.translate = 0)
}

function At(t, e, n, s) {
    Qn(t.x, e.x, n.x, s ? s.originX : void 0), Qn(t.y, e.y, n.y, s ? s.originY : void 0)
}

function ts(t, e, n) {
    t.min = n.min + e.min, t.max = t.min + B(e)
}

function dl(t, e, n) {
    ts(t.x, e.x, n.x), ts(t.y, e.y, n.y)
}

function es(t, e, n) {
    t.min = e.min - n.min, t.max = t.min + B(e)
}

function Yt(t, e, n) {
    es(t.x, e.x, n.x), es(t.y, e.y, n.y)
}

function ns(t, e, n, s, i) {
    return t -= e, t = Xt(t, 1 / n, s), i !== void 0 && (t = Xt(t, 1 / i, s)), t
}

function ml(t, e = 0, n = 1, s = .5, i, r = t, o = t) {
    if (z.test(e) && (e = parseFloat(e), e = C(o.min, o.max, e / 100) - o.min), typeof e != "number") return;
    let a = C(r.min, r.max, s);
    t === r && (a -= e), t.min = ns(t.min, e, n, a, i), t.max = ns(t.max, e, n, a, i)
}

function ss(t, e, [n, s, i], r, o) {
    ml(t, e[n], e[s], e[i], e.scale, r, o)
}
const pl = ["x", "scaleX", "originX"],
    gl = ["y", "scaleY", "originY"];

function is(t, e, n, s) {
    ss(t.x, e, pl, n ? n.x : void 0, s ? s.x : void 0), ss(t.y, e, gl, n ? n.y : void 0, s ? s.y : void 0)
}

function os(t) {
    return t.translate === 0 && t.scale === 1
}

function _i(t) {
    return os(t.x) && os(t.y)
}

function rs(t, e) {
    return t.min === e.min && t.max === e.max
}

function yl(t, e) {
    return rs(t.x, e.x) && rs(t.y, e.y)
}

function as(t, e) {
    return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max)
}

function zi(t, e) {
    return as(t.x, e.x) && as(t.y, e.y)
}

function ls(t) {
    return B(t.x) / B(t.y)
}

function cs(t, e) {
    return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint
}

function U(t) {
    return [t("x"), t("y")]
}

function vl(t, e, n) {
    let s = "";
    const i = t.x.translate / e.x,
        r = t.y.translate / e.y,
        o = n?.z || 0;
    if ((i || r || o) && (s = `translate3d(${i}px, ${r}px, ${o}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
        const {
            transformPerspective: c,
            rotate: u,
            rotateX: h,
            rotateY: f,
            skewX: d,
            skewY: m
        } = n;
        c && (s = `perspective(${c}px) ${s}`), u && (s += `rotate(${u}deg) `), h && (s += `rotateX(${h}deg) `), f && (s += `rotateY(${f}deg) `), d && (s += `skewX(${d}deg) `), m && (s += `skewY(${m}deg) `)
    }
    const a = t.x.scale * e.x,
        l = t.y.scale * e.y;
    return (a !== 1 || l !== 1) && (s += `scale(${a}, ${l})`), s || "none"
}
const Xi = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
    Tl = Xi.length,
    us = t => typeof t == "string" ? parseFloat(t) : t,
    hs = t => typeof t == "number" || v.test(t);

function xl(t, e, n, s, i, r) {
    i ? (t.opacity = C(0, n.opacity ?? 1, bl(s)), t.opacityExit = C(e.opacity ?? 1, 0, Pl(s))) : r && (t.opacity = C(e.opacity ?? 1, n.opacity ?? 1, s));
    for (let o = 0; o < Tl; o++) {
        const a = `border${Xi[o]}Radius`;
        let l = fs(e, a),
            c = fs(n, a);
        if (l === void 0 && c === void 0) continue;
        l || (l = 0), c || (c = 0), l === 0 || c === 0 || hs(l) === hs(c) ? (t[a] = Math.max(C(us(l), us(c), s), 0), (z.test(c) || z.test(l)) && (t[a] += "%")) : t[a] = c
    } (e.rotate || n.rotate) && (t.rotate = C(e.rotate || 0, n.rotate || 0, s))
}

function fs(t, e) {
    return t[e] !== void 0 ? t[e] : t.borderRadius
}
const bl = Yi(0, .5, Hs),
    Pl = Yi(.5, .95, K);

function Yi(t, e, n) {
    return s => s < t ? 0 : s > e ? 1 : n(Ct(t, e, s))
}

function Sl(t, e, n) {
    const s = F(t) ? t : gt(t);
    return s.start(on("", s, e, n)), s.animation
}

function Lt(t, e, n, s = {
    passive: !0
}) {
    return t.addEventListener(e, n, s), () => t.removeEventListener(e, n)
}
const wl = (t, e) => t.depth - e.depth;
class Al {
    constructor() {
        this.children = [], this.isDirty = !1
    }
    add(e) {
        We(this.children, e), this.isDirty = !0
    }
    remove(e) {
        Ke(this.children, e), this.isDirty = !0
    }
    forEach(e) {
        this.isDirty && this.children.sort(wl), this.isDirty = !1, this.children.forEach(e)
    }
}

function qi(t, e) {
    const n = I.now(),
        s = ({
            timestamp: i
        }) => {
            const r = i - n;
            r >= e && (J(s), t(r - e))
        };
    return V.setup(s, !0), () => J(s)
}

function au(t, e) {
    return qi(t, _(e))
}

function Kt(t) {
    return F(t) ? t.get() : t
}
class Vl {
    constructor() {
        this.members = []
    }
    add(e) {
        We(this.members, e), e.scheduleRender()
    }
    remove(e) {
        if (Ke(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
            const n = this.members[this.members.length - 1];
            n && this.promote(n)
        }
    }
    relegate(e) {
        const n = this.members.findIndex(i => e === i);
        if (n === 0) return !1;
        let s;
        for (let i = n; i >= 0; i--) {
            const r = this.members[i];
            if (r.isPresent !== !1) {
                s = r;
                break
            }
        }
        return s ? (this.promote(s), !0) : !1
    }
    promote(e, n) {
        const s = this.lead;
        if (e !== s && (this.prevLead = s, this.lead = e, e.show(), s)) {
            s.instance && s.scheduleRender(), e.scheduleRender();
            const i = s.options.layoutDependency,
                r = e.options.layoutDependency;
            i !== void 0 && r !== void 0 && i === r || (e.resumeFrom = s, n && (e.resumeFrom.preserveOpacity = !0), s.snapshot && (e.snapshot = s.snapshot, e.snapshot.latestValues = s.animationValues || s.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
            const {
                crossfade: a
            } = e.options;
            a === !1 && s.hide()
        }
    }
    exitAnimationComplete() {
        this.members.forEach(e => {
            const {
                options: n,
                resumingFrom: s
            } = e;
            n.onExitComplete && n.onExitComplete(), s && s.options.onExitComplete && s.options.onExitComplete()
        })
    }
    scheduleRender() {
        this.members.forEach(e => {
            e.instance && e.scheduleRender(!1)
        })
    }
    removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
    }
}
const $t = {
    hasAnimatedSinceResize: !0,
    hasEverUpdated: !1
},
    it = {
        nodes: 0,
        calculatedTargetDeltas: 0,
        calculatedProjections: 0
    },
    ue = ["", "X", "Y", "Z"],
    Cl = 1e3;
let Ml = 0;

function he(t, e, n, s) {
    const {
        latestValues: i
    } = e;
    i[t] && (n[t] = i[t], e.setStaticValue(t, 0), s && (s[t] = 0))
}

function Zi(t) {
    if (t.hasCheckedOptimisedAppear = !0, t.root === t) return;
    const {
        visualElement: e
    } = t.options;
    if (!e) return;
    const n = yi(e);
    if (window.MotionHasOptimisedAnimation(n, "transform")) {
        const {
            layout: i,
            layoutId: r
        } = t.options;
        window.MotionCancelOptimisedAnimation(n, "transform", V, !(i || r))
    }
    const {
        parent: s
    } = t;
    s && !s.hasCheckedOptimisedAppear && Zi(s)
}

function Ji({
    attachResizeListener: t,
    defaultParent: e,
    measureScroll: n,
    checkIsScrollRoot: s,
    resetTransform: i
}) {
    return class {
        constructor(o = {}, a = e?.()) {
            this.id = Ml++, this.animationId = 0, this.animationCommitId = 0, this.children = new Set, this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
                x: 1,
                y: 1
            }, this.eventHandlers = new Map, this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
                this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots())
            }, this.updateProjection = () => {
                this.projectionUpdateScheduled = !1, H.value && (it.nodes = it.calculatedTargetDeltas = it.calculatedProjections = 0), this.nodes.forEach(Rl), this.nodes.forEach(Il), this.nodes.forEach(Bl), this.nodes.forEach(Ll), H.addProjectionMetrics && H.addProjectionMetrics(it)
            }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = new Map, this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
            for (let l = 0; l < this.path.length; l++) this.path[l].shouldResetTransform = !0;
            this.root === this && (this.nodes = new Al)
        }
        addEventListener(o, a) {
            return this.eventHandlers.has(o) || this.eventHandlers.set(o, new He), this.eventHandlers.get(o).add(a)
        }
        notifyListeners(o, ...a) {
            const l = this.eventHandlers.get(o);
            l && l.notify(...a)
        }
        hasListeners(o) {
            return this.eventHandlers.has(o)
        }
        mount(o) {
            if (this.instance) return;
            this.isSVG = Ci(o) && !Ra(o), this.instance = o;
            const {
                layoutId: a,
                layout: l,
                visualElement: c
            } = this.options;
            if (c && !c.current && c.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), t) {
                let u, h = 0;
                const f = () => this.root.updateBlockedByResize = !1;
                V.read(() => {
                    h = window.innerWidth
                }), t(o, () => {
                    const d = window.innerWidth;
                    d !== h && (h = d, this.root.updateBlockedByResize = !0, u && u(), u = qi(f, 250), $t.hasAnimatedSinceResize && ($t.hasAnimatedSinceResize = !1, this.nodes.forEach(ps)))
                })
            }
            a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && c && (a || l) && this.addEventListener("didUpdate", ({
                delta: u,
                hasLayoutChanged: h,
                hasRelativeLayoutChanged: f,
                layout: d
            }) => {
                if (this.isTreeAnimationBlocked()) {
                    this.target = void 0, this.relativeTarget = void 0;
                    return
                }
                const m = this.options.transition || c.getDefaultTransition() || Wl,
                    {
                        onLayoutAnimationStart: y,
                        onLayoutAnimationComplete: T
                    } = c.getProps(),
                    p = !this.targetLayout || !zi(this.targetLayout, d),
                    x = !h && f;
                if (this.options.layoutRoot || this.resumeFrom || x || h && (p || !this.currentAnimation)) {
                    this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
                    const g = {
                        ...sn(m, "layout"),
                        onPlay: y,
                        onComplete: T
                    };
                    (c.shouldReduceMotion || this.options.layoutRoot) && (g.delay = 0, g.type = !1), this.startAnimation(g), this.setAnimationOrigin(u, x)
                } else h || ps(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                this.targetLayout = d
            })
        }
        unmount() {
            this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
            const o = this.getStack();
            o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), J(this.updateProjection)
        }
        blockUpdate() {
            this.updateManuallyBlocked = !0
        }
        unblockUpdate() {
            this.updateManuallyBlocked = !1
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
        }
        startUpdate() {
            this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(jl), this.animationId++)
        }
        getTransformTemplate() {
            const {
                visualElement: o
            } = this.options;
            return o && o.getProps().transformTemplate
        }
        willUpdate(o = !0) {
            if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return
            }
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Zi(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
            this.isLayoutDirty = !0;
            for (let u = 0; u < this.path.length; u++) {
                const h = this.path[u];
                h.shouldResetTransform = !0, h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1)
            }
            const {
                layoutId: a,
                layout: l
            } = this.options;
            if (a === void 0 && !l) return;
            const c = this.getTransformTemplate();
            this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate")
        }
        update() {
            if (this.updateScheduled = !1, this.isUpdateBlocked()) {
                this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(ds);
                return
            }
            if (this.animationId <= this.animationCommitId) {
                this.nodes.forEach(ms);
                return
            }
            this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(Fl), this.nodes.forEach(Dl), this.nodes.forEach(El)) : this.nodes.forEach(ms), this.clearAllSnapshots();
            const a = I.now();
            k.delta = X(0, 1e3 / 60, a - k.timestamp), k.timestamp = a, k.isProcessing = !0, ne.update.process(k), ne.preRender.process(k), ne.render.process(k), k.isProcessing = !1
        }
        didUpdate() {
            this.updateScheduled || (this.updateScheduled = !0, cn.read(this.scheduleUpdate))
        }
        clearAllSnapshots() {
            this.nodes.forEach(kl), this.sharedNodes.forEach(Ol)
        }
        scheduleUpdateProjection() {
            this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, V.preRender(this.updateProjection, !1, !0))
        }
        scheduleCheckAfterUnmount() {
            V.postRender(() => {
                this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
            })
        }
        updateSnapshot() {
            this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !B(this.snapshot.measuredBox.x) && !B(this.snapshot.measuredBox.y) && (this.snapshot = void 0))
        }
        updateLayout() {
            if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
            const o = this.layout;
            this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = R(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
            const {
                visualElement: a
            } = this.options;
            a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0)
        }
        updateScroll(o = "measure") {
            let a = !!(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a && this.instance) {
                const l = s(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase: o,
                    isRoot: l,
                    offset: n(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : l
                }
            }
        }
        resetTransform() {
            if (!i) return;
            const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
                a = this.projectionDelta && !_i(this.projectionDelta),
                l = this.getTransformTemplate(),
                c = l ? l(this.latestValues, "") : void 0,
                u = c !== this.prevTransformTemplateValue;
            o && this.instance && (a || st(this.latestValues) || u) && (i(this.instance, c), this.shouldResetTransform = !1, this.scheduleRender())
        }
        measure(o = !0) {
            const a = this.measurePageBox();
            let l = this.removeElementScroll(a);
            return o && (l = this.removeTransform(l)), Kl(l), {
                animationId: this.root.animationId,
                measuredBox: a,
                layoutBox: l,
                latestValues: {},
                source: this.id
            }
        }
        measurePageBox() {
            const {
                visualElement: o
            } = this.options;
            if (!o) return R();
            const a = o.measureViewportBox();
            if (!(this.scroll?.wasRoot || this.path.some($l))) {
                const {
                    scroll: c
                } = this.root;
                c && (dt(a.x, c.offset.x), dt(a.y, c.offset.y))
            }
            return a
        }
        removeElementScroll(o) {
            const a = R();
            if ($(a, o), this.scroll?.wasRoot) return a;
            for (let l = 0; l < this.path.length; l++) {
                const c = this.path[l],
                    {
                        scroll: u,
                        options: h
                    } = c;
                c !== this.root && u && h.layoutScroll && (u.wasRoot && $(a, o), dt(a.x, u.offset.x), dt(a.y, u.offset.y))
            }
            return a
        }
        applyTransform(o, a = !1) {
            const l = R();
            $(l, o);
            for (let c = 0; c < this.path.length; c++) {
                const u = this.path[c];
                !a && u.options.layoutScroll && u.scroll && u !== u.root && mt(l, {
                    x: -u.scroll.offset.x,
                    y: -u.scroll.offset.y
                }), st(u.latestValues) && mt(l, u.latestValues)
            }
            return st(this.latestValues) && mt(l, this.latestValues), l
        }
        removeTransform(o) {
            const a = R();
            $(a, o);
            for (let l = 0; l < this.path.length; l++) {
                const c = this.path[l];
                if (!c.instance || !st(c.latestValues)) continue;
                je(c.latestValues) && c.updateSnapshot();
                const u = R(),
                    h = c.measurePageBox();
                $(u, h), is(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, u)
            }
            return st(this.latestValues) && is(a, this.latestValues), a
        }
        setTargetDelta(o) {
            this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0
        }
        setOptions(o) {
            this.options = {
                ...this.options,
                ...o,
                crossfade: o.crossfade !== void 0 ? o.crossfade : !0
            }
        }
        clearMeasurements() {
            this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1
        }
        forceRelativeParentToResolveTarget() {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== k.timestamp && this.relativeParent.resolveTargetDelta(!0)
        }
        resolveTargetDelta(o = !1) {
            const a = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
            const l = !!this.resumingFrom || this !== a;
            if (!(o || l && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
            const {
                layout: u,
                layoutId: h
            } = this.options;
            if (!this.layout || !(u || h)) return;
            this.resolvedRelativeTargetAt = k.timestamp;
            const f = this.getClosestProjectingParent();
            f && this.linkedParentVersion !== f.layoutVersion && !f.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (f && f.layout ? this.createRelativeTarget(f, this.layout.layoutBox, f.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = R(), this.targetWithTransforms = R()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), dl(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : $(this.target, this.layout.layoutBox), Fi(this.target, this.targetDelta)) : $(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, f && !!f.resumingFrom == !!this.resumingFrom && !f.options.layoutScroll && f.target && this.animationProgress !== 1 ? this.createRelativeTarget(f, this.target, f.target) : this.relativeParent = this.relativeTarget = void 0), H.value && it.calculatedTargetDeltas++)
        }
        getClosestProjectingParent() {
            if (!(!this.parent || je(this.parent.latestValues) || ki(this.parent.latestValues))) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
        }
        isProjecting() {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
        }
        createRelativeTarget(o, a, l) {
            this.relativeParent = o, this.linkedParentVersion = o.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = R(), this.relativeTargetOrigin = R(), Yt(this.relativeTargetOrigin, a, l), $(this.relativeTarget, this.relativeTargetOrigin)
        }
        removeRelativeTarget() {
            this.relativeParent = this.relativeTarget = void 0
        }
        calcProjection() {
            const o = this.getLead(),
                a = !!this.resumingFrom || this !== o;
            let l = !0;
            if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === k.timestamp && (l = !1), l) return;
            const {
                layout: c,
                layoutId: u
            } = this.options;
            if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(c || u)) return;
            $(this.layoutCorrected, this.layout.layoutBox);
            const h = this.treeScale.x,
                f = this.treeScale.y;
            Ka(this.layoutCorrected, this.treeScale, this.path, a), o.layout && !o.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (o.target = o.layout.layoutBox, o.targetWithTransforms = R());
            const {
                target: d
            } = o;
            if (!d) {
                this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
                return
            } !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Jn(this.prevProjectionDelta.x, this.projectionDelta.x), Jn(this.prevProjectionDelta.y, this.projectionDelta.y)), At(this.projectionDelta, this.layoutCorrected, d, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== f || !cs(this.projectionDelta.x, this.prevProjectionDelta.x) || !cs(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", d)), H.value && it.calculatedProjections++
        }
        hide() {
            this.isVisible = !1
        }
        show() {
            this.isVisible = !0
        }
        scheduleRender(o = !0) {
            if (this.options.visualElement?.scheduleRender(), o) {
                const a = this.getStack();
                a && a.scheduleRender()
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = ft(), this.projectionDelta = ft(), this.projectionDeltaWithTransform = ft()
        }
        setAnimationOrigin(o, a = !1) {
            const l = this.snapshot,
                c = l ? l.latestValues : {},
                u = {
                    ...this.latestValues
                },
                h = ft();
            (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
            const f = R(),
                d = l ? l.source : void 0,
                m = this.layout ? this.layout.source : void 0,
                y = d !== m,
                T = this.getStack(),
                p = !T || T.members.length <= 1,
                x = !!(y && !p && this.options.crossfade === !0 && !this.path.some(Ul));
            this.animationProgress = 0;
            let g;
            this.mixTargetDelta = S => {
                const b = S / 1e3;
                gs(h.x, o.x, b), gs(h.y, o.y, b), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Yt(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox), Nl(this.relativeTarget, this.relativeTargetOrigin, f, b), g && yl(this.relativeTarget, g) && (this.isProjectionDirty = !1), g || (g = R()), $(g, this.relativeTarget)), y && (this.animationValues = u, xl(u, c, this.latestValues, b, x, p)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = b
            }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
        }
        startAnimation(o) {
            this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (J(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = V.update(() => {
                $t.hasAnimatedSinceResize = !0, at.layout++, this.motionValue || (this.motionValue = gt(0)), this.currentAnimation = Sl(this.motionValue, [0, 1e3], {
                    ...o,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: a => {
                        this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a)
                    },
                    onStop: () => {
                        at.layout--
                    },
                    onComplete: () => {
                        at.layout--, o.onComplete && o.onComplete(), this.completeAnimation()
                    }
                }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0
            })
        }
        completeAnimation() {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
            const o = this.getStack();
            o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete")
        }
        finishAnimation() {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Cl), this.currentAnimation.stop()), this.completeAnimation()
        }
        applyTransformsToTarget() {
            const o = this.getLead();
            let {
                targetWithTransforms: a,
                target: l,
                layout: c,
                latestValues: u
            } = o;
            if (!(!a || !l || !c)) {
                if (this !== o && this.layout && c && Qi(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
                    l = this.target || R();
                    const h = B(this.layout.layoutBox.x);
                    l.x.min = o.target.x.min, l.x.max = l.x.min + h;
                    const f = B(this.layout.layoutBox.y);
                    l.y.min = o.target.y.min, l.y.max = l.y.min + f
                }
                $(a, l), mt(a, u), At(this.projectionDeltaWithTransform, this.layoutCorrected, a, u)
            }
        }
        registerSharedNode(o, a) {
            this.sharedNodes.has(o) || this.sharedNodes.set(o, new Vl), this.sharedNodes.get(o).add(a);
            const c = a.options.initialPromotionConfig;
            a.promote({
                transition: c ? c.transition : void 0,
                preserveFollowOpacity: c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(a) : void 0
            })
        }
        isLead() {
            const o = this.getStack();
            return o ? o.lead === this : !0
        }
        getLead() {
            const {
                layoutId: o
            } = this.options;
            return o ? this.getStack()?.lead || this : this
        }
        getPrevLead() {
            const {
                layoutId: o
            } = this.options;
            return o ? this.getStack()?.prevLead : void 0
        }
        getStack() {
            const {
                layoutId: o
            } = this.options;
            if (o) return this.root.sharedNodes.get(o)
        }
        promote({
            needsReset: o,
            transition: a,
            preserveFollowOpacity: l
        } = {}) {
            const c = this.getStack();
            c && c.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({
                transition: a
            })
        }
        relegate() {
            const o = this.getStack();
            return o ? o.relegate(this) : !1
        }
        resetSkewAndRotation() {
            const {
                visualElement: o
            } = this.options;
            if (!o) return;
            let a = !1;
            const {
                latestValues: l
            } = o;
            if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a) return;
            const c = {};
            l.z && he("z", o, c, this.animationValues);
            for (let u = 0; u < ue.length; u++) he(`rotate${ue[u]}`, o, c, this.animationValues), he(`skew${ue[u]}`, o, c, this.animationValues);
            o.render();
            for (const u in c) o.setStaticValue(u, c[u]), this.animationValues && (this.animationValues[u] = c[u]);
            o.scheduleRender()
        }
        applyProjectionStyles(o, a) {
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) {
                o.visibility = "hidden";
                return
            }
            const l = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = !1, o.visibility = "", o.opacity = "", o.pointerEvents = Kt(a?.pointerEvents) || "", o.transform = l ? l(this.latestValues, "") : "none";
                return
            }
            const c = this.getLead();
            if (!this.projectionDelta || !this.layout || !c.target) {
                this.options.layoutId && (o.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, o.pointerEvents = Kt(a?.pointerEvents) || ""), this.hasProjected && !st(this.latestValues) && (o.transform = l ? l({}, "") : "none", this.hasProjected = !1);
                return
            }
            o.visibility = "";
            const u = c.animationValues || c.latestValues;
            this.applyTransformsToTarget();
            let h = vl(this.projectionDeltaWithTransform, this.treeScale, u);
            l && (h = l(u, h)), o.transform = h;
            const {
                x: f,
                y: d
            } = this.projectionDelta;
            o.transformOrigin = `${f.origin * 100}% ${d.origin * 100}% 0`, c.animationValues ? o.opacity = c === this ? u.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : u.opacityExit : o.opacity = c === this ? u.opacity !== void 0 ? u.opacity : "" : u.opacityExit !== void 0 ? u.opacityExit : 0;
            for (const m in Rt) {
                if (u[m] === void 0) continue;
                const {
                    correct: y,
                    applyTo: T,
                    isCSSVariable: p
                } = Rt[m], x = h === "none" ? u[m] : y(u[m], c);
                if (T) {
                    const g = T.length;
                    for (let S = 0; S < g; S++) o[T[S]] = x
                } else p ? this.options.visualElement.renderState.vars[m] = x : o[m] = x
            }
            this.options.layoutId && (o.pointerEvents = c === this ? Kt(a?.pointerEvents) || "" : "none")
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0
        }
        resetTree() {
            this.root.nodes.forEach(o => o.currentAnimation?.stop()), this.root.nodes.forEach(ds), this.root.sharedNodes.clear()
        }
    }
}

function Dl(t) {
    t.updateLayout()
}

function El(t) {
    const e = t.resumeFrom?.snapshot || t.snapshot;
    if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
        const {
            layoutBox: n,
            measuredBox: s
        } = t.layout, {
            animationType: i
        } = t.options, r = e.source !== t.layout.source;
        i === "size" ? U(u => {
            const h = r ? e.measuredBox[u] : e.layoutBox[u],
                f = B(h);
            h.min = n[u].min, h.max = h.min + f
        }) : Qi(i, e.layoutBox, n) && U(u => {
            const h = r ? e.measuredBox[u] : e.layoutBox[u],
                f = B(n[u]);
            h.max = h.min + f, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[u].max = t.relativeTarget[u].min + f)
        });
        const o = ft();
        At(o, n, e.layoutBox);
        const a = ft();
        r ? At(a, t.applyTransform(s, !0), e.measuredBox) : At(a, n, e.layoutBox);
        const l = !_i(o);
        let c = !1;
        if (!t.resumeFrom) {
            const u = t.getClosestProjectingParent();
            if (u && !u.resumeFrom) {
                const {
                    snapshot: h,
                    layout: f
                } = u;
                if (h && f) {
                    const d = R();
                    Yt(d, e.layoutBox, h.layoutBox);
                    const m = R();
                    Yt(m, n, f.layoutBox), zi(d, m) || (c = !0), u.options.layoutRoot && (t.relativeTarget = m, t.relativeTargetOrigin = d, t.relativeParent = u)
                }
            }
        }
        t.notifyListeners("didUpdate", {
            layout: n,
            snapshot: e,
            delta: a,
            layoutDelta: o,
            hasLayoutChanged: l,
            hasRelativeLayoutChanged: c
        })
    } else if (t.isLead()) {
        const {
            onExitComplete: n
        } = t.options;
        n && n()
    }
    t.options.transition = void 0
}

function Rl(t) {
    H.value && it.nodes++, t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty))
}

function Ll(t) {
    t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
}

function kl(t) {
    t.clearSnapshot()
}

function ds(t) {
    t.clearMeasurements()
}

function ms(t) {
    t.isLayoutDirty = !1
}

function Fl(t) {
    const {
        visualElement: e
    } = t.options;
    e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform()
}

function ps(t) {
    t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0
}

function Il(t) {
    t.resolveTargetDelta()
}

function Bl(t) {
    t.calcProjection()
}

function jl(t) {
    t.resetSkewAndRotation()
}

function Ol(t) {
    t.removeLeadSnapshot()
}

function gs(t, e, n) {
    t.translate = C(e.translate, 0, n), t.scale = C(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint
}

function ys(t, e, n, s) {
    t.min = C(e.min, n.min, s), t.max = C(e.max, n.max, s)
}

function Nl(t, e, n, s) {
    ys(t.x, e.x, n.x, s), ys(t.y, e.y, n.y, s)
}

function Ul(t) {
    return t.animationValues && t.animationValues.opacityExit !== void 0
}
const Wl = {
    duration: .45,
    ease: [.4, 0, .1, 1]
},
    vs = t => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t),
    Ts = vs("applewebkit/") && !vs("chrome/") ? Math.round : K;

function xs(t) {
    t.min = Ts(t.min), t.max = Ts(t.max)
}

function Kl(t) {
    xs(t.x), xs(t.y)
}

function Qi(t, e, n) {
    return t === "position" || t === "preserve-aspect" && !fl(ls(e), ls(n), .2)
}

function $l(t) {
    return t !== t.root && t.scroll?.wasRoot
}
const Gl = Ji({
    attachResizeListener: (t, e) => Lt(t, "resize", e),
    measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
        y: document.documentElement.scrollTop || document.body?.scrollTop || 0
    }),
    checkIsScrollRoot: () => !0
}),
    fe = {
        current: void 0
    },
    to = Ji({
        measureScroll: t => ({
            x: t.scrollLeft,
            y: t.scrollTop
        }),
        defaultParent: () => {
            if (!fe.current) {
                const t = new Gl({});
                t.mount(window), t.setOptions({
                    layoutScroll: !0
                }), fe.current = t
            }
            return fe.current
        },
        resetTransform: (t, e) => {
            t.style.transform = e !== void 0 ? e : "none"
        },
        checkIsScrollRoot: t => window.getComputedStyle(t).position === "fixed"
    }),
    eo = P.createContext({
        transformPagePoint: t => t,
        isStatic: !1,
        reducedMotion: "never"
    });

function Hl(t = !0) {
    const e = P.useContext(Zt);
    if (e === null) return [!0, null];
    const {
        isPresent: n,
        onExitComplete: s,
        register: i
    } = e, r = P.useId();
    P.useEffect(() => {
        if (t) return i(r)
    }, [t]);
    const o = P.useCallback(() => t && s && s(r), [r, s, t]);
    return !n && s ? [!1, o] : [!0]
}

function cu() {
    return _l(P.useContext(Zt))
}

function _l(t) {
    return t === null ? !0 : t.isPresent
}
const no = P.createContext({
    strict: !1
}),
    bs = {
        animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"]
    };
let Ps = !1;

function zl() {
    if (Ps) return;
    const t = {};
    for (const e in bs) t[e] = {
        isEnabled: n => bs[e].some(s => !!n[s])
    };
    Ei(t), Ps = !0
}

function so() {
    return zl(), Oa()
}

function Xl(t) {
    const e = so();
    for (const n in t) e[n] = {
        ...e[n],
        ...t[n]
    };
    Ei(e)
}
const Yl = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);

function qt(t) {
    return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Yl.has(t)
}
let io = t => !qt(t);

function ql(t) {
    typeof t == "function" && (io = e => e.startsWith("on") ? !qt(e) : t(e))
}
try {
    ql(require("@emotion/is-prop-valid").default)
} catch { }

function Zl(t, e, n) {
    const s = {};
    for (const i in t) i === "values" && typeof t.values == "object" || (io(i) || n === !0 && qt(i) || !e && !qt(i) || t.draggable && i.startsWith("onDrag")) && (s[i] = t[i]);
    return s
}
const ee = P.createContext({});

function Jl(t, e) {
    if (te(t)) {
        const {
            initial: n,
            animate: s
        } = t;
        return {
            initial: n === !1 || Et(n) ? n : void 0,
            animate: Et(s) ? s : void 0
        }
    }
    return t.inherit !== !1 ? e : {}
}

function Ql(t) {
    const {
        initial: e,
        animate: n
    } = Jl(t, P.useContext(ee));
    return P.useMemo(() => ({
        initial: e,
        animate: n
    }), [Ss(e), Ss(n)])
}

function Ss(t) {
    return Array.isArray(t) ? t.join(" ") : t
}
const pn = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
});

function oo(t, e, n) {
    for (const s in e) !F(e[s]) && !ji(s, n) && (t[s] = e[s])
}

function tc({
    transformTemplate: t
}, e) {
    return P.useMemo(() => {
        const n = pn();
        return dn(n, e, t), Object.assign({}, n.vars, n.style)
    }, [e])
}

function ec(t, e) {
    const n = t.style || {},
        s = {};
    return oo(s, n, t), Object.assign(s, tc(t, e)), s
}

function nc(t, e) {
    const n = {},
        s = ec(t, e);
    return t.drag && t.dragListener !== !1 && (n.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = s, n
}
const ro = () => ({
    ...pn(),
    attrs: {}
});

function sc(t, e, n, s) {
    const i = P.useMemo(() => {
        const r = ro();
        return Oi(r, e, Ui(s), t.transformTemplate, t.style), {
            ...r.attrs,
            style: {
                ...r.style
            }
        }
    }, [e]);
    if (t.style) {
        const r = {};
        oo(r, t.style, t), i.style = {
            ...r,
            ...i.style
        }
    }
    return i
}
const ic = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];

function gn(t) {
    return typeof t != "string" || t.includes("-") ? !1 : !!(ic.indexOf(t) > -1 || /[A-Z]/u.test(t))
}

function oc(t, e, n, {
    latestValues: s
}, i, r = !1, o) {
    const l = (o ?? gn(t) ? sc : nc)(e, s, i, t),
        c = Zl(e, typeof t == "string", r),
        u = t !== P.Fragment ? {
            ...c,
            ...l,
            ref: n
        } : {},
        {
            children: h
        } = e,
        f = P.useMemo(() => F(h) ? h.get() : h, [h]);
    return P.createElement(t, {
        ...u,
        children: f
    })
}

function rc({
    scrapeMotionValuesFromProps: t,
    createRenderState: e
}, n, s, i) {
    return {
        latestValues: ac(n, s, i, t),
        renderState: e()
    }
}

function ac(t, e, n, s) {
    const i = {},
        r = s(t, {});
    for (const f in r) i[f] = Kt(r[f]);
    let {
        initial: o,
        animate: a
    } = t;
    const l = te(t),
        c = Di(t);
    e && c && !l && t.inherit !== !1 && (o === void 0 && (o = e.initial), a === void 0 && (a = e.animate));
    let u = n ? n.initial === !1 : !1;
    u = u || o === !1;
    const h = u ? a : o;
    if (h && typeof h != "boolean" && !Qt(h)) {
        const f = Array.isArray(h) ? h : [h];
        for (let d = 0; d < f.length; d++) {
            const m = rn(t, f[d]);
            if (m) {
                const {
                    transitionEnd: y,
                    transition: T,
                    ...p
                } = m;
                for (const x in p) {
                    let g = p[x];
                    if (Array.isArray(g)) {
                        const S = u ? g.length - 1 : 0;
                        g = g[S]
                    }
                    g !== null && (i[x] = g)
                }
                for (const x in y) i[x] = y[x]
            }
        }
    }
    return i
}
const ao = t => (e, n) => {
    const s = P.useContext(ee),
        i = P.useContext(Zt),
        r = () => rc(t, e, s, i);
    return n ? r() : yo(r)
},
    lc = ao({
        scrapeMotionValuesFromProps: mn,
        createRenderState: pn
    }),
    cc = ao({
        scrapeMotionValuesFromProps: Wi,
        createRenderState: ro
    }),
    uc = Symbol.for("motionComponentSymbol");

function hc(t, e, n) {
    const s = P.useRef(n);
    P.useInsertionEffect(() => {
        s.current = n
    });
    const i = P.useRef(null);
    return P.useCallback(r => {
        r && t.onMount?.(r), e && (r ? e.mount(r) : e.unmount());
        const o = s.current;
        if (typeof o == "function")
            if (r) {
                const a = o(r);
                typeof a == "function" && (i.current = a)
            } else i.current ? (i.current(), i.current = null) : o(r);
        else o && (o.current = r)
    }, [e])
}
const lo = P.createContext({});

function Pt(t) {
    return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current")
}

function fc(t, e, n, s, i, r) {
    const {
        visualElement: o
    } = P.useContext(ee), a = P.useContext(no), l = P.useContext(Zt), c = P.useContext(eo), u = c.reducedMotion, h = c.skipAnimations, f = P.useRef(null), d = P.useRef(!1);
    s = s || a.renderer, !f.current && s && (f.current = s(t, {
        visualState: e,
        parent: o,
        props: n,
        presenceContext: l,
        blockInitialAnimation: l ? l.initial === !1 : !1,
        reducedMotionConfig: u,
        skipAnimations: h,
        isSVG: r
    }), d.current && f.current && (f.current.manuallyAnimateOnMount = !0));
    const m = f.current,
        y = P.useContext(lo);
    m && !m.projection && i && (m.type === "html" || m.type === "svg") && dc(f.current, n, i, y);
    const T = P.useRef(!1);
    P.useInsertionEffect(() => {
        m && T.current && m.update(n, l)
    });
    const p = n[gi],
        x = P.useRef(!!p && !window.MotionHandoffIsComplete?.(p) && window.MotionHasOptimisedAnimation?.(p));
    return vo(() => {
        d.current = !0, m && (T.current = !0, window.MotionIsMounted = !0, m.updateFeatures(), m.scheduleRenderMicrotask(), x.current && m.animationState && m.animationState.animateChanges())
    }), P.useEffect(() => {
        m && (!x.current && m.animationState && m.animationState.animateChanges(), x.current && (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(p)
        }), x.current = !1), m.enteringChildren = void 0)
    }), m
}

function dc(t, e, n, s) {
    const {
        layoutId: i,
        layout: r,
        drag: o,
        dragConstraints: a,
        layoutScroll: l,
        layoutRoot: c,
        layoutCrossfade: u
    } = e;
    t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : co(t.parent)), t.projection.setOptions({
        layoutId: i,
        layout: r,
        alwaysMeasureLayout: !!o || a && Pt(a),
        visualElement: t,
        animationType: typeof r == "string" ? r : "both",
        initialPromotionConfig: s,
        crossfade: u,
        layoutScroll: l,
        layoutRoot: c
    })
}

function co(t) {
    if (t) return t.options.allowProjection !== !1 ? t.projection : co(t.parent)
}

function de(t, {
    forwardMotionProps: e = !1,
    type: n
} = {}, s, i) {
    s && Xl(s);
    const r = n ? n === "svg" : gn(t),
        o = r ? cc : lc;

    function a(c, u) {
        let h;
        const f = {
            ...P.useContext(eo),
            ...c,
            layoutId: mc(c)
        },
            {
                isStatic: d
            } = f,
            m = Ql(c),
            y = o(c, d);
        if (!d && Fs) {
            pc();
            const T = gc(f);
            h = T.MeasureLayout, m.visualElement = fc(t, y, f, i, T.ProjectionNode, r)
        }
        return Te.jsxs(ee.Provider, {
            value: m,
            children: [h && m.visualElement ? Te.jsx(h, {
                visualElement: m.visualElement,
                ...f
            }) : null, oc(t, c, hc(y, m.visualElement, u), y, d, e, r)]
        })
    }
    a.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
    const l = P.forwardRef(a);
    return l[uc] = t, l
}

function mc({
    layoutId: t
}) {
    const e = P.useContext(ks).id;
    return e && t !== void 0 ? e + "-" + t : t
}

function pc(t, e) {
    P.useContext(no).strict
}

function gc(t) {
    const e = so(),
        {
            drag: n,
            layout: s
        } = e;
    if (!n && !s) return {};
    const i = {
        ...n,
        ...s
    };
    return {
        MeasureLayout: n?.isEnabled(t) || s?.isEnabled(t) ? i.MeasureLayout : void 0,
        ProjectionNode: i.ProjectionNode
    }
}

function yc(t, e) {
    if (typeof Proxy > "u") return de;
    const n = new Map,
        s = (r, o) => de(r, o, t, e),
        i = (r, o) => s(r, o);
    return new Proxy(i, {
        get: (r, o) => o === "create" ? s : (n.has(o) || n.set(o, de(o, void 0, t, e)), n.get(o))
    })
}
const vc = (t, e) => e.isSVG ?? gn(t) ? new el(e) : new Ya(e, {
    allowProjection: t !== P.Fragment
});
class Tc extends tt {
    constructor(e) {
        super(e), e.animationState || (e.animationState = rl(e))
    }
    updateAnimationControlsSubscription() {
        const {
            animate: e
        } = this.node.getProps();
        Qt(e) && (this.unmountControls = e.subscribe(this.node))
    }
    mount() {
        this.updateAnimationControlsSubscription()
    }
    update() {
        const {
            animate: e
        } = this.node.getProps(), {
            animate: n
        } = this.node.prevProps || {};
        e !== n && this.updateAnimationControlsSubscription()
    }
    unmount() {
        this.node.animationState.reset(), this.unmountControls?.()
    }
}
let xc = 0;
class bc extends tt {
    constructor() {
        super(...arguments), this.id = xc++
    }
    update() {
        if (!this.node.presenceContext) return;
        const {
            isPresent: e,
            onExitComplete: n
        } = this.node.presenceContext, {
            isPresent: s
        } = this.node.prevPresenceContext || {};
        if (!this.node.animationState || e === s) return;
        const i = this.node.animationState.setActive("exit", !e);
        n && !e && i.then(() => {
            n(this.id)
        })
    }
    mount() {
        const {
            register: e,
            onExitComplete: n
        } = this.node.presenceContext || {};
        n && n(this.id), e && (this.unmount = e(this.id))
    }
    unmount() { }
}
const Pc = {
    animation: {
        Feature: Tc
    },
    exit: {
        Feature: bc
    }
};

function Bt(t) {
    return {
        point: {
            x: t.pageX,
            y: t.pageY
        }
    }
}
const Sc = t => e => un(e) && t(e, Bt(e));

function Vt(t, e, n, s) {
    return Lt(t, e, Sc(n), s)
}
const uo = ({
    current: t
}) => t ? t.ownerDocument.defaultView : null,
    ws = (t, e) => Math.abs(t - e);

function wc(t, e) {
    const n = ws(t.x, e.x),
        s = ws(t.y, e.y);
    return Math.sqrt(n ** 2 + s ** 2)
}
const As = new Set(["auto", "scroll"]);
class ho {
    constructor(e, n, {
        transformPagePoint: s,
        contextWindow: i = window,
        dragSnapToOrigin: r = !1,
        distanceThreshold: o = 3,
        element: a
    } = {}) {
        if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = new Map, this.removeScrollListeners = null, this.onElementScroll = d => {
            this.handleScroll(d.target)
        }, this.onWindowScroll = () => {
            this.handleScroll(window)
        }, this.updatePoint = () => {
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            const d = pe(this.lastMoveEventInfo, this.history),
                m = this.startEvent !== null,
                y = wc(d.offset, {
                    x: 0,
                    y: 0
                }) >= this.distanceThreshold;
            if (!m && !y) return;
            const {
                point: T
            } = d, {
                timestamp: p
            } = k;
            this.history.push({
                ...T,
                timestamp: p
            });
            const {
                onStart: x,
                onMove: g
            } = this.handlers;
            m || (x && x(this.lastMoveEvent, d), this.startEvent = this.lastMoveEvent), g && g(this.lastMoveEvent, d)
        }, this.handlePointerMove = (d, m) => {
            this.lastMoveEvent = d, this.lastMoveEventInfo = me(m, this.transformPagePoint), V.update(this.updatePoint, !0)
        }, this.handlePointerUp = (d, m) => {
            this.end();
            const {
                onEnd: y,
                onSessionEnd: T,
                resumeAnimation: p
            } = this.handlers;
            if ((this.dragSnapToOrigin || !this.startEvent) && p && p(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            const x = pe(d.type === "pointercancel" ? this.lastMoveEventInfo : me(m, this.transformPagePoint), this.history);
            this.startEvent && y && y(d, x), T && T(d, x)
        }, !un(e)) return;
        this.dragSnapToOrigin = r, this.handlers = n, this.transformPagePoint = s, this.distanceThreshold = o, this.contextWindow = i || window;
        const l = Bt(e),
            c = me(l, this.transformPagePoint),
            {
                point: u
            } = c,
            {
                timestamp: h
            } = k;
        this.history = [{
            ...u,
            timestamp: h
        }];
        const {
            onSessionStart: f
        } = n;
        f && f(e, pe(c, this.history)), this.removeListeners = kt(Vt(this.contextWindow, "pointermove", this.handlePointerMove), Vt(this.contextWindow, "pointerup", this.handlePointerUp), Vt(this.contextWindow, "pointercancel", this.handlePointerUp)), a && this.startScrollTracking(a)
    }
    startScrollTracking(e) {
        let n = e.parentElement;
        for (; n;) {
            const s = getComputedStyle(n);
            (As.has(s.overflowX) || As.has(s.overflowY)) && this.scrollPositions.set(n, {
                x: n.scrollLeft,
                y: n.scrollTop
            }), n = n.parentElement
        }
        this.scrollPositions.set(window, {
            x: window.scrollX,
            y: window.scrollY
        }), window.addEventListener("scroll", this.onElementScroll, {
            capture: !0,
            passive: !0
        }), window.addEventListener("scroll", this.onWindowScroll, {
            passive: !0
        }), this.removeScrollListeners = () => {
            window.removeEventListener("scroll", this.onElementScroll, {
                capture: !0
            }), window.removeEventListener("scroll", this.onWindowScroll)
        }
    }
    handleScroll(e) {
        const n = this.scrollPositions.get(e);
        if (!n) return;
        const s = e === window,
            i = s ? {
                x: window.scrollX,
                y: window.scrollY
            } : {
                x: e.scrollLeft,
                y: e.scrollTop
            },
            r = {
                x: i.x - n.x,
                y: i.y - n.y
            };
        r.x === 0 && r.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += r.x, this.lastMoveEventInfo.point.y += r.y) : this.history.length > 0 && (this.history[0].x -= r.x, this.history[0].y -= r.y), this.scrollPositions.set(e, i), V.update(this.updatePoint, !0))
    }
    updateHandlers(e) {
        this.handlers = e
    }
    end() {
        this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), J(this.updatePoint)
    }
}

function me(t, e) {
    return e ? {
        point: e(t.point)
    } : t
}

function Vs(t, e) {
    return {
        x: t.x - e.x,
        y: t.y - e.y
    }
}

function pe({
    point: t
}, e) {
    return {
        point: t,
        delta: Vs(t, fo(e)),
        offset: Vs(t, Ac(e)),
        velocity: Vc(e, .1)
    }
}

function Ac(t) {
    return t[0]
}

function fo(t) {
    return t[t.length - 1]
}

function Vc(t, e) {
    if (t.length < 2) return {
        x: 0,
        y: 0
    };
    let n = t.length - 1,
        s = null;
    const i = fo(t);
    for (; n >= 0 && (s = t[n], !(i.timestamp - s.timestamp > _(e)));) n--;
    if (!s) return {
        x: 0,
        y: 0
    };
    const r = W(i.timestamp - s.timestamp);
    if (r === 0) return {
        x: 0,
        y: 0
    };
    const o = {
        x: (i.x - s.x) / r,
        y: (i.y - s.y) / r
    };
    return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o
}

function Cc(t, {
    min: e,
    max: n
}, s) {
    return e !== void 0 && t < e ? t = s ? C(e, t, s.min) : Math.max(t, e) : n !== void 0 && t > n && (t = s ? C(n, t, s.max) : Math.min(t, n)), t
}

function Cs(t, e, n) {
    return {
        min: e !== void 0 ? t.min + e : void 0,
        max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
    }
}

function Mc(t, {
    top: e,
    left: n,
    bottom: s,
    right: i
}) {
    return {
        x: Cs(t.x, n, i),
        y: Cs(t.y, e, s)
    }
}

function Ms(t, e) {
    let n = e.min - t.min,
        s = e.max - t.max;
    return e.max - e.min < t.max - t.min && ([n, s] = [s, n]), {
        min: n,
        max: s
    }
}

function Dc(t, e) {
    return {
        x: Ms(t.x, e.x),
        y: Ms(t.y, e.y)
    }
}

function Ec(t, e) {
    let n = .5;
    const s = B(t),
        i = B(e);
    return i > s ? n = Ct(e.min, e.max - s, t.min) : s > i && (n = Ct(t.min, t.max - i, e.min)), X(0, 1, n)
}

function Rc(t, e) {
    const n = {};
    return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n
}
const Ne = .35;

function Lc(t = Ne) {
    return t === !1 ? t = 0 : t === !0 && (t = Ne), {
        x: Ds(t, "left", "right"),
        y: Ds(t, "top", "bottom")
    }
}

function Ds(t, e, n) {
    return {
        min: Es(t, e),
        max: Es(t, n)
    }
}

function Es(t, e) {
    return typeof t == "number" ? t : t[e] || 0
}
const kc = new WeakMap;
class Fc {
    constructor(e) {
        this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
            x: 0,
            y: 0
        }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = R(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e
    }
    start(e, {
        snapToCursor: n = !1,
        distanceThreshold: s
    } = {}) {
        const {
            presenceContext: i
        } = this.visualElement;
        if (i && i.isPresent === !1) return;
        const r = h => {
            n ? (this.stopAnimation(), this.snapToCursor(Bt(h).point)) : this.pauseAnimation()
        },
            o = (h, f) => {
                this.stopAnimation();
                const {
                    drag: d,
                    dragPropagation: m,
                    onDragStart: y
                } = this.getProps();
                if (d && !m && (this.openDragLock && this.openDragLock(), this.openDragLock = Sa(d), !this.openDragLock)) return;
                this.latestPointerEvent = h, this.latestPanInfo = f, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), U(p => {
                    let x = this.getAxisMotionValue(p).get() || 0;
                    if (z.test(x)) {
                        const {
                            projection: g
                        } = this.visualElement;
                        if (g && g.layout) {
                            const S = g.layout.layoutBox[p];
                            S && (x = B(S) * (parseFloat(x) / 100))
                        }
                    }
                    this.originPoint[p] = x
                }), y && V.update(() => y(h, f), !1, !0), ke(this.visualElement, "transform");
                const {
                    animationState: T
                } = this.visualElement;
                T && T.setActive("whileDrag", !0)
            },
            a = (h, f) => {
                this.latestPointerEvent = h, this.latestPanInfo = f;
                const {
                    dragPropagation: d,
                    dragDirectionLock: m,
                    onDirectionLock: y,
                    onDrag: T
                } = this.getProps();
                if (!d && !this.openDragLock) return;
                const {
                    offset: p
                } = f;
                if (m && this.currentDirection === null) {
                    this.currentDirection = Ic(p), this.currentDirection !== null && y && y(this.currentDirection);
                    return
                }
                this.updateAxis("x", f.point, p), this.updateAxis("y", f.point, p), this.visualElement.render(), T && V.update(() => T(h, f), !1, !0)
            },
            l = (h, f) => {
                this.latestPointerEvent = h, this.latestPanInfo = f, this.stop(h, f), this.latestPointerEvent = null, this.latestPanInfo = null
            },
            c = () => U(h => this.getAnimationState(h) === "paused" && this.getAxisMotionValue(h).animation?.play()),
            {
                dragSnapToOrigin: u
            } = this.getProps();
        this.panSession = new ho(e, {
            onSessionStart: r,
            onStart: o,
            onMove: a,
            onSessionEnd: l,
            resumeAnimation: c
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: u,
            distanceThreshold: s,
            contextWindow: uo(this.visualElement),
            element: this.visualElement.current
        })
    }
    stop(e, n) {
        const s = e || this.latestPointerEvent,
            i = n || this.latestPanInfo,
            r = this.isDragging;
        if (this.cancel(), !r || !i || !s) return;
        const {
            velocity: o
        } = i;
        this.startAnimation(o);
        const {
            onDragEnd: a
        } = this.getProps();
        a && V.postRender(() => a(s, i))
    }
    cancel() {
        this.isDragging = !1;
        const {
            projection: e,
            animationState: n
        } = this.visualElement;
        e && (e.isAnimationBlocked = !1), this.endPanSession();
        const {
            dragPropagation: s
        } = this.getProps();
        !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1)
    }
    endPanSession() {
        this.panSession && this.panSession.end(), this.panSession = void 0
    }
    updateAxis(e, n, s) {
        const {
            drag: i
        } = this.getProps();
        if (!s || !Nt(e, i, this.currentDirection)) return;
        const r = this.getAxisMotionValue(e);
        let o = this.originPoint[e] + s[e];
        this.constraints && this.constraints[e] && (o = Cc(o, this.constraints[e], this.elastic[e])), r.set(o)
    }
    resolveConstraints() {
        const {
            dragConstraints: e,
            dragElastic: n
        } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, i = this.constraints;
        e && Pt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = Mc(s.layoutBox, e) : this.constraints = !1, this.elastic = Lc(n), i !== this.constraints && s && this.constraints && !this.hasMutatedConstraints && U(r => {
            this.constraints !== !1 && this.getAxisMotionValue(r) && (this.constraints[r] = Rc(s.layoutBox[r], this.constraints[r]))
        })
    }
    resolveRefConstraints() {
        const {
            dragConstraints: e,
            onMeasureDragConstraints: n
        } = this.getProps();
        if (!e || !Pt(e)) return !1;
        const s = e.current,
            {
                projection: i
            } = this.visualElement;
        if (!i || !i.layout) return !1;
        const r = $a(s, i.root, this.visualElement.getTransformPagePoint());
        let o = Dc(i.layout.layoutBox, r);
        if (n) {
            const a = n(Ua(o));
            this.hasMutatedConstraints = !!a, a && (o = Li(a))
        }
        return o
    }
    startAnimation(e) {
        const {
            drag: n,
            dragMomentum: s,
            dragElastic: i,
            dragTransition: r,
            dragSnapToOrigin: o,
            onDragTransitionEnd: a
        } = this.getProps(), l = this.constraints || {}, c = U(u => {
            if (!Nt(u, n, this.currentDirection)) return;
            let h = l && l[u] || {};
            o && (h = {
                min: 0,
                max: 0
            });
            const f = i ? 200 : 1e6,
                d = i ? 40 : 1e7,
                m = {
                    type: "inertia",
                    velocity: s ? e[u] : 0,
                    bounceStiffness: f,
                    bounceDamping: d,
                    timeConstant: 750,
                    restDelta: 1,
                    restSpeed: 10,
                    ...r,
                    ...h
                };
            return this.startAxisValueAnimation(u, m)
        });
        return Promise.all(c).then(a)
    }
    startAxisValueAnimation(e, n) {
        const s = this.getAxisMotionValue(e);
        return ke(this.visualElement, e), s.start(on(e, s, 0, n, this.visualElement, !1))
    }
    stopAnimation() {
        U(e => this.getAxisMotionValue(e).stop())
    }
    pauseAnimation() {
        U(e => this.getAxisMotionValue(e).animation?.pause())
    }
    getAnimationState(e) {
        return this.getAxisMotionValue(e).animation?.state
    }
    getAxisMotionValue(e) {
        const n = `_drag${e.toUpperCase()}`,
            s = this.visualElement.getProps(),
            i = s[n];
        return i || this.visualElement.getValue(e, (s.initial ? s.initial[e] : void 0) || 0)
    }
    snapToCursor(e) {
        U(n => {
            const {
                drag: s
            } = this.getProps();
            if (!Nt(n, s, this.currentDirection)) return;
            const {
                projection: i
            } = this.visualElement, r = this.getAxisMotionValue(n);
            if (i && i.layout) {
                const {
                    min: o,
                    max: a
                } = i.layout.layoutBox[n], l = r.get() || 0;
                r.set(e[n] - C(o, a, .5) + l)
            }
        })
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        const {
            drag: e,
            dragConstraints: n
        } = this.getProps(), {
            projection: s
        } = this.visualElement;
        if (!Pt(n) || !s || !this.constraints) return;
        this.stopAnimation();
        const i = {
            x: 0,
            y: 0
        };
        U(o => {
            const a = this.getAxisMotionValue(o);
            if (a && this.constraints !== !1) {
                const l = a.get();
                i[o] = Ec({
                    min: l,
                    max: l
                }, this.constraints[o])
            }
        });
        const {
            transformTemplate: r
        } = this.visualElement.getProps();
        this.visualElement.current.style.transform = r ? r({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.resolveConstraints(), U(o => {
            if (!Nt(o, e, null)) return;
            const a = this.getAxisMotionValue(o),
                {
                    min: l,
                    max: c
                } = this.constraints[o];
            a.set(C(l, c, i[o]))
        })
    }
    addListeners() {
        if (!this.visualElement.current) return;
        kc.set(this.visualElement, this);
        const e = this.visualElement.current,
            n = Vt(e, "pointerdown", l => {
                const {
                    drag: c,
                    dragListener: u = !0
                } = this.getProps(), h = l.target, f = h !== e && Ma(h);
                c && u && !f && this.start(l)
            }),
            s = () => {
                const {
                    dragConstraints: l
                } = this.getProps();
                Pt(l) && l.current && (this.constraints = this.resolveRefConstraints())
            },
            {
                projection: i
            } = this.visualElement,
            r = i.addEventListener("measure", s);
        i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), V.read(s);
        const o = Lt(window, "resize", () => this.scalePositionWithinConstraints()),
            a = i.addEventListener("didUpdate", (({
                delta: l,
                hasLayoutChanged: c
            }) => {
                this.isDragging && c && (U(u => {
                    const h = this.getAxisMotionValue(u);
                    h && (this.originPoint[u] += l[u].translate, h.set(h.get() + l[u].translate))
                }), this.visualElement.render())
            }));
        return () => {
            o(), n(), r(), a && a()
        }
    }
    getProps() {
        const e = this.visualElement.getProps(),
            {
                drag: n = !1,
                dragDirectionLock: s = !1,
                dragPropagation: i = !1,
                dragConstraints: r = !1,
                dragElastic: o = Ne,
                dragMomentum: a = !0
            } = e;
        return {
            ...e,
            drag: n,
            dragDirectionLock: s,
            dragPropagation: i,
            dragConstraints: r,
            dragElastic: o,
            dragMomentum: a
        }
    }
}

function Nt(t, e, n) {
    return (e === !0 || e === t) && (n === null || n === t)
}

function Ic(t, e = 10) {
    let n = null;
    return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n
}
class Bc extends tt {
    constructor(e) {
        super(e), this.removeGroupControls = K, this.removeListeners = K, this.controls = new Fc(e)
    }
    mount() {
        const {
            dragControls: e
        } = this.node.getProps();
        e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || K
    }
    update() {
        const {
            dragControls: e
        } = this.node.getProps(), {
            dragControls: n
        } = this.node.prevProps || {};
        e !== n && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)))
    }
    unmount() {
        this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession()
    }
}
const ge = t => (e, n) => {
    t && V.update(() => t(e, n), !1, !0)
};
class jc extends tt {
    constructor() {
        super(...arguments), this.removePointerDownListener = K
    }
    onPointerDown(e) {
        this.session = new ho(e, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: uo(this.node)
        })
    }
    createPanHandlers() {
        const {
            onPanSessionStart: e,
            onPanStart: n,
            onPan: s,
            onPanEnd: i
        } = this.node.getProps();
        return {
            onSessionStart: ge(e),
            onStart: ge(n),
            onMove: ge(s),
            onEnd: (r, o) => {
                delete this.session, i && V.postRender(() => i(r, o))
            }
        }
    }
    mount() {
        this.removePointerDownListener = Vt(this.node.current, "pointerdown", e => this.onPointerDown(e))
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers())
    }
    unmount() {
        this.removePointerDownListener(), this.session && this.session.end()
    }
}
let ye = !1;
class Oc extends P.Component {
    componentDidMount() {
        const {
            visualElement: e,
            layoutGroup: n,
            switchLayoutGroup: s,
            layoutId: i
        } = this.props, {
            projection: r
        } = e;
        r && (n.group && n.group.add(r), s && s.register && i && s.register(r), ye && r.root.didUpdate(), r.addEventListener("animationComplete", () => {
            this.safeToRemove()
        }), r.setOptions({
            ...r.options,
            layoutDependency: this.props.layoutDependency,
            onExitComplete: () => this.safeToRemove()
        })), $t.hasEverUpdated = !0
    }
    getSnapshotBeforeUpdate(e) {
        const {
            layoutDependency: n,
            visualElement: s,
            drag: i,
            isPresent: r
        } = this.props, {
            projection: o
        } = s;
        return o && (o.isPresent = r, e.layoutDependency !== n && o.setOptions({
            ...o.options,
            layoutDependency: n
        }), ye = !0, i || e.layoutDependency !== n || n === void 0 || e.isPresent !== r ? o.willUpdate() : this.safeToRemove(), e.isPresent !== r && (r ? o.promote() : o.relegate() || V.postRender(() => {
            const a = o.getStack();
            (!a || !a.members.length) && this.safeToRemove()
        }))), null
    }
    componentDidUpdate() {
        const {
            projection: e
        } = this.props.visualElement;
        e && (e.root.didUpdate(), cn.postRender(() => {
            !e.currentAnimation && e.isLead() && this.safeToRemove()
        }))
    }
    componentWillUnmount() {
        const {
            visualElement: e,
            layoutGroup: n,
            switchLayoutGroup: s
        } = this.props, {
            projection: i
        } = e;
        ye = !0, i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), s && s.deregister && s.deregister(i))
    }
    safeToRemove() {
        const {
            safeToRemove: e
        } = this.props;
        e && e()
    }
    render() {
        return null
    }
}

function mo(t) {
    const [e, n] = Hl(), s = P.useContext(ks);
    return Te.jsx(Oc, {
        ...t,
        layoutGroup: s,
        switchLayoutGroup: P.useContext(lo),
        isPresent: e,
        safeToRemove: n
    })
}
const Nc = {
    pan: {
        Feature: jc
    },
    drag: {
        Feature: Bc,
        ProjectionNode: to,
        MeasureLayout: mo
    }
};

function Rs(t, e, n) {
    const {
        props: s
    } = t;
    t.animationState && s.whileHover && t.animationState.setActive("whileHover", n === "Start");
    const i = "onHover" + n,
        r = s[i];
    r && V.postRender(() => r(e, Bt(e)))
}
class Uc extends tt {
    mount() {
        const {
            current: e
        } = this.node;
        e && (this.unmount = wa(e, (n, s) => (Rs(this.node, s, "Start"), i => Rs(this.node, i, "End"))))
    }
    unmount() { }
}
class Wc extends tt {
    constructor() {
        super(...arguments), this.isActive = !1
    }
    onFocus() {
        let e = !1;
        try {
            e = this.node.current.matches(":focus-visible")
        } catch {
            e = !0
        } !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0)
    }
    onBlur() {
        !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1)
    }
    mount() {
        this.unmount = kt(Lt(this.node.current, "focus", () => this.onFocus()), Lt(this.node.current, "blur", () => this.onBlur()))
    }
    unmount() { }
}

function Ls(t, e, n) {
    const {
        props: s
    } = t;
    if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
    t.animationState && s.whileTap && t.animationState.setActive("whileTap", n === "Start");
    const i = "onTap" + (n === "End" ? "" : n),
        r = s[i];
    r && V.postRender(() => r(e, Bt(e)))
}
class Kc extends tt {
    mount() {
        const {
            current: e
        } = this.node;
        e && (this.unmount = Ea(e, (n, s) => (Ls(this.node, s, "Start"), (i, {
            success: r
        }) => Ls(this.node, i, r ? "End" : "Cancel")), {
            useGlobalTarget: this.node.props.globalTapTarget
        }))
    }
    unmount() { }
}
const Ue = new WeakMap,
    ve = new WeakMap,
    $c = t => {
        const e = Ue.get(t.target);
        e && e(t)
    },
    Gc = t => {
        t.forEach($c)
    };

function Hc({
    root: t,
    ...e
}) {
    const n = t || document;
    ve.has(n) || ve.set(n, {});
    const s = ve.get(n),
        i = JSON.stringify(e);
    return s[i] || (s[i] = new IntersectionObserver(Gc, {
        root: t,
        ...e
    })), s[i]
}

function _c(t, e, n) {
    const s = Hc(e);
    return Ue.set(t, n), s.observe(t), () => {
        Ue.delete(t), s.unobserve(t)
    }
}
const zc = {
    some: 0,
    all: 1
};
class Xc extends tt {
    constructor() {
        super(...arguments), this.hasEnteredView = !1, this.isInView = !1
    }
    startObserver() {
        this.unmount();
        const {
            viewport: e = {}
        } = this.node.getProps(), {
            root: n,
            margin: s,
            amount: i = "some",
            once: r
        } = e, o = {
            root: n ? n.current : void 0,
            rootMargin: s,
            threshold: typeof i == "number" ? i : zc[i]
        }, a = l => {
            const {
                isIntersecting: c
            } = l;
            if (this.isInView === c || (this.isInView = c, r && !c && this.hasEnteredView)) return;
            c && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", c);
            const {
                onViewportEnter: u,
                onViewportLeave: h
            } = this.node.getProps(), f = c ? u : h;
            f && f(l)
        };
        return _c(this.node.current, o, a)
    }
    mount() {
        this.startObserver()
    }
    update() {
        if (typeof IntersectionObserver > "u") return;
        const {
            props: e,
            prevProps: n
        } = this.node;
        ["amount", "margin", "root"].some(Yc(e, n)) && this.startObserver()
    }
    unmount() { }
}

function Yc({
    viewport: t = {}
}, {
    viewport: e = {}
} = {}) {
    return n => t[n] !== e[n]
}
const qc = {
    inView: {
        Feature: Xc
    },
    tap: {
        Feature: Kc
    },
    focus: {
        Feature: Wc
    },
    hover: {
        Feature: Uc
    }
},
    Zc = {
        layout: {
            ProjectionNode: to,
            MeasureLayout: mo
        }
    },
    Jc = {
        ...Pc,
        ...qc,
        ...Nc,
        ...Zc
    },
    uu = yc(Jc, vc);
export {
    kr as $, vi as A, _t as B, X as C, Rn as D, ci as E, Xs as F, Ge as G, Ya as H, Si as I, Jt as J, ln as K, ks as L, eo as M, Fr as N, an as O, Zt as P, vt as Q, Tt as R, el as S, na as T, Cr as U, Na as V, H as W, k as X, at as Y, xn as Z, sn as _, Hl as a, as as a$, ui as a0, cn as a1, K as a2, $ as a3, to as a4, jt as a5, Xl as a6, no as a7, ql as a8, yc as a9, Ri as aA, Gl as aB, tt as aC, Al as aD, nn as aE, jr as aF, Vl as aG, He as aH, lo as aI, Vt as aJ, Sc as aK, ru as aL, We as aM, ke as aN, Mt as aO, Dt as aP, on as aQ, iu as aR, Fe as aS, Gs as aT, Oe as aU, Fi as aV, Hn as aW, Ka as aX, ls as aY, cs as aZ, rs as a_, qc as aa, Pc as ab, vc as ac, Zc as ad, Nc as ae, Os as af, Dr as ag, $e as ah, Mi as ai, Ia as aj, Be as ak, ua as al, oa as am, vr as an, Lt as ao, uc as ap, fe as aq, Y as ar, aa as as, Lr as at, yi as au, ao as av, ee as aw, nu as ax, Gr as ay, xa as az, vo as b, ii as b$, _e as b0, $s as b1, Ks as b2, yl as b3, zi as b4, dn as b5, vl as b6, Oi as b7, Ja as b8, _a as b9, za as bA, rl as bB, Kn as bC, Wn as bD, ft as bE, Ji as bF, Ys as bG, Ft as bH, bt as bI, mr as bJ, Ve as bK, ya as bL, q as bM, qi as bN, au as bO, xi as bP, ws as bQ, wc as bR, U as bS, So as bT, zs as bU, wo as bV, Zl as bW, Bn as bX, ka as bY, Vr as bZ, ne as b_, Qn as ba, At as bb, di as bc, Qe as bd, B as be, ts as bf, es as bg, dl as bh, Yt as bi, Ni as bj, ou as bk, al as bl, ze as bm, _s as bn, Hs as bo, Ll as bp, D as bq, wl as br, Q as bs, bn as bt, Li as bu, Ua as bv, dr as bw, Jn as bx, Zn as by, xt as bz, ur as c, kt as c$, Pi as c0, Zr as c1, bi as c2, Oa as c3, Qr as c4, Je as c5, mi as c6, Ki as c7, $t as c8, ki as c9, ta as cA, qt as cB, Et as cC, Di as cD, ra as cE, js as cF, wt as cG, Re as cH, Ht as cI, $a as cJ, Ii as cK, W as cL, Us as cM, si as cN, ni as cO, An as cP, Qo as cQ, Gt as cR, oe as cS, Zo as cT, xl as cU, Yo as cV, yt as cW, gi as cX, _r as cY, Ce as cZ, z as c_, je as ca, st as cb, xe as cc, wa as cd, ht as ce, _o as cf, Se as cg, be as ch, Qt as ci, Fs as cj, Xe as ck, Ye as cl, te as cm, _i as cn, wi as co, G as cp, Va as cq, Ma as cr, ji as cs, Le as ct, fl as cu, Vi as cv, Is as cw, Bs as cx, un as cy, Ui as cz, F as d, Yn as d0, pi as d1, Ea as d2, Pn as d3, Rl as d4, v as d5, br as d6, ml as d7, ss as d8, is as d9, dt as dA, ja as dB, cu as dC, hn as dD, fn as dE, jo as dF, Oo as dG, su as dH, ns as da, Bi as db, tl as dc, Kt as dd, pt as de, rn as df, Ws as dg, se as dh, ot as di, Ot as dj, Rt as dk, Xt as dl, mn as dm, Wi as dn, Sa as dp, Ei as dq, Mr as dr, Kr as ds, Er as dt, Ti as du, I as dv, Xn as dw, mt as dx, Wa as dy, ga as dz, gt as e, V as f, J as g, In as h, Pa as i, Ao as j, R as k, C as l, uu as m, Ke as n, fr as o, er as p, hr as q, ba as r, hi as s, _ as t, yo as u, Ct as v, Ci as w, Ra as x, Ba as y, Sl as z
};