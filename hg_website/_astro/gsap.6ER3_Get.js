import _i from "./index.CMq3EfTn.js";
import {
    ScrollTrigger as xi
} from "./ScrollTrigger.CrR5uyL1.js";
/*!
 * ScrollToPlugin 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */
var C, $t, F, Y, q, Ut, W, ht, Wt = function () {
    return typeof window < "u"
},
    Zt = function () {
        return C || Wt() && (C = window.gsap) && C.registerPlugin && C
    },
    Ht = function (t) {
        return typeof t == "string"
    },
    Xt = function (t) {
        return typeof t == "function"
    },
    nt = function (t, i) {
        var e = i === "x" ? "Width" : "Height",
            n = "scroll" + e,
            r = "client" + e;
        return t === F || t === Y || t === q ? Math.max(Y[n], q[n]) - (F["inner" + e] || Y[r] || q[r]) : t[n] - t["offset" + e]
    },
    ot = function (t, i) {
        var e = "scroll" + (i === "x" ? "Left" : "Top");
        return t === F && (t.pageXOffset != null ? e = "page" + i.toUpperCase() + "Offset" : t = Y[e] != null ? Y : q),
            function () {
                return t[e]
            }
    },
    bi = function (t, i, e, n) {
        if (Xt(t) && (t = t(i, e, n)), typeof t != "object") return Ht(t) && t !== "max" && t.charAt(1) !== "=" ? {
            x: t,
            y: t
        } : {
            y: t
        };
        if (t.nodeType) return {
            y: t,
            x: t
        };
        var r = {},
            l;
        for (l in t) r[l] = l !== "onAutoKill" && Xt(t[l]) ? t[l](i, e, n) : t[l];
        return r
    },
    Qt = function (t, i) {
        if (t = Ut(t)[0], !t || !t.getBoundingClientRect) return console.warn("scrollTo target doesn't exist. Using 0") || {
            x: 0,
            y: 0
        };
        var e = t.getBoundingClientRect(),
            n = !i || i === F || i === q,
            r = n ? {
                top: Y.clientTop - (F.pageYOffset || Y.scrollTop || q.scrollTop || 0),
                left: Y.clientLeft - (F.pageXOffset || Y.scrollLeft || q.scrollLeft || 0)
            } : i.getBoundingClientRect(),
            l = {
                x: e.left - r.left,
                y: e.top - r.top
            };
        return !n && i && (l.x += ot(i, "x")(), l.y += ot(i, "y")()), l
    },
    Yt = function (t, i, e, n, r) {
        return !isNaN(t) && typeof t != "object" ? parseFloat(t) - r : Ht(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + n - r : t === "max" ? nt(i, e) - r : Math.min(nt(i, e), Qt(t, i)[e] - r)
    },
    Pt = function () {
        C = Zt(), Wt() && C && typeof document < "u" && document.body && (F = window, q = document.body, Y = document.documentElement, Ut = C.utils.toArray, C.config({
            autoKillThreshold: 7
        }), W = C.config(), $t = 1)
    },
    H = {
        version: "3.14.2",
        name: "scrollTo",
        rawVars: 1,
        register: function (t) {
            C = t, Pt()
        },
        init: function (t, i, e, n, r) {
            $t || Pt();
            var l = this,
                c = C.getProperty(t, "scrollSnapType");
            l.isWin = t === F, l.target = t, l.tween = e, i = bi(i, n, t, r), l.vars = i, l.autoKill = !!("autoKill" in i ? i : W).autoKill, l.getX = ot(t, "x"), l.getY = ot(t, "y"), l.x = l.xPrev = l.getX(), l.y = l.yPrev = l.getY(), ht || (ht = C.core.globals().ScrollTrigger), C.getProperty(t, "scrollBehavior") === "smooth" && C.set(t, {
                scrollBehavior: "auto"
            }), c && c !== "none" && (l.snap = 1, l.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), i.x != null ? (l.add(l, "x", l.x, Yt(i.x, t, "x", l.x, i.offsetX || 0), n, r), l._props.push("scrollTo_x")) : l.skipX = 1, i.y != null ? (l.add(l, "y", l.y, Yt(i.y, t, "y", l.y, i.offsetY || 0), n, r), l._props.push("scrollTo_y")) : l.skipY = 1
        },
        render: function (t, i) {
            for (var e = i._pt, n = i.target, r = i.tween, l = i.autoKill, c = i.xPrev, h = i.yPrev, s = i.isWin, p = i.snap, f = i.snapInline, u, a, y, g, d; e;) e.r(t, e.d), e = e._next;
            u = s || !i.skipX ? i.getX() : c, a = s || !i.skipY ? i.getY() : h, y = a - h, g = u - c, d = W.autoKillThreshold, i.x < 0 && (i.x = 0), i.y < 0 && (i.y = 0), l && (!i.skipX && (g > d || g < -d) && u < nt(n, "x") && (i.skipX = 1), !i.skipY && (y > d || y < -d) && a < nt(n, "y") && (i.skipY = 1), i.skipX && i.skipY && (r.kill(), i.vars.onAutoKill && i.vars.onAutoKill.apply(r, i.vars.onAutoKillParams || []))), s ? F.scrollTo(i.skipX ? u : i.x, i.skipY ? a : i.y) : (i.skipY || (n.scrollTop = i.y), i.skipX || (n.scrollLeft = i.x)), p && (t === 1 || t === 0) && (a = n.scrollTop, u = n.scrollLeft, f ? n.style.scrollSnapType = f : n.style.removeProperty("scroll-snap-type"), n.scrollTop = a + 1, n.scrollLeft = u + 1, n.scrollTop = a, n.scrollLeft = u), i.xPrev = i.x, i.yPrev = i.y, ht && ht.update()
        },
        kill: function (t) {
            var i = t === "scrollTo",
                e = this._props.indexOf(t);
            return (i || t === "scrollTo_x") && (this.skipX = 1), (i || t === "scrollTo_y") && (this.skipY = 1), e > -1 && this._props.splice(e, 1), !this._props.length
        }
    };
H.max = nt;
H.getOffset = Qt;
H.buildGetter = ot;
H.config = function (o) {
    W || Pt() || (W = C.config());
    for (var t in o) W[t] = o[t]
};
Zt() && C.registerPlugin(H);
/*!
 * paths 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */
var wi = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    Ti = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    Si = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
    Pi = /(^[#\.][a-z]|[a-y][a-z])/i,
    vi = Math.PI / 180,
    Li = 180 / Math.PI,
    pt = Math.sin,
    ut = Math.cos,
    k = Math.abs,
    G = Math.sqrt,
    mi = Math.atan2,
    vt = 1e8,
    Et = function (t) {
        return typeof t == "string"
    },
    Jt = function (t) {
        return typeof t == "number"
    },
    Mi = function (t) {
        return typeof t > "u"
    },
    Ci = {},
    Ai = {},
    yt = 1e5,
    ti = function (t) {
        return Math.round((t + vt) % 1 * yt) / yt || (t < 0 ? 0 : 1)
    },
    P = function (t) {
        return Math.round(t * yt) / yt || 0
    },
    Dt = function (t) {
        return Math.round(t * 1e10) / 1e10 || 0
    },
    It = function (t) {
        return t.closed = Math.abs(t[0] - t[t.length - 2]) < .001 && Math.abs(t[1] - t[t.length - 1]) < .001
    },
    jt = function (t, i, e, n) {
        var r = t[i],
            l = n === 1 ? 6 : Lt(r, e, n);
        if ((l || !n) && l + e + 2 < r.length) return t.splice(i, 0, r.slice(0, e + l + 2)), r.splice(0, e + l), 1
    },
    ii = function (t, i, e) {
        var n = t.length,
            r = ~~(e * n);
        if (t[r] > i) {
            for (; --r && t[r] > i;);
            r < 0 && (r = 0)
        } else
            for (; t[++r] < i && r < n;);
        return r < n ? r : n - 1
    },
    Ri = function (t, i) {
        var e = t.length;
        for (t.reverse(); e--;) t[e].reversed || ki(t[e])
    },
    Gt = function (t, i) {
        return i.totalLength = t.totalLength, t.samples ? (i.samples = t.samples.slice(0), i.lookup = t.lookup.slice(0), i.minLength = t.minLength, i.resolution = t.resolution) : t.totalPoints && (i.totalPoints = t.totalPoints), i
    },
    Ni = function (t, i) {
        var e = t.length,
            n = t[e - 1] || [],
            r = n.length;
        e && i[0] === n[r - 2] && i[1] === n[r - 1] && (i = n.concat(i.slice(2)), e--), t[e] = i
    };

function at(o) {
    o = Et(o) && Pi.test(o) && document.querySelector(o) || o;
    var t = o.getAttribute ? o : 0,
        i;
    return t && (o = o.getAttribute("d")) ? (t._gsPath || (t._gsPath = {}), i = t._gsPath[o], i && !i._dirty ? i : t._gsPath[o] = dt(o)) : o ? Et(o) ? dt(o) : Jt(o[0]) ? [o] : o : console.warn("Expecting a <path> element or an SVG path data string")
}

function Oi(o) {
    for (var t = [], i = 0; i < o.length; i++) t[i] = Gt(o[i], o[i].slice(0));
    return Gt(o, t)
}

function ki(o) {
    var t = 0,
        i;
    for (o.reverse(); t < o.length; t += 2) i = o[t], o[t] = o[t + 1], o[t + 1] = i;
    o.reversed = !o.reversed
}
var Bi = function (t, i) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", "path"),
        n = [].slice.call(t.attributes),
        r = n.length,
        l;
    for (i = "," + i + ","; --r > -1;) l = n[r].nodeName.toLowerCase(), i.indexOf("," + l + ",") < 0 && e.setAttributeNS(null, l, n[r].nodeValue);
    return e
},
    Xi = {
        rect: "rx,ry,x,y,width,height",
        circle: "r,cx,cy",
        ellipse: "rx,ry,cx,cy",
        line: "x1,x2,y1,y2"
    },
    Yi = function (t, i) {
        for (var e = i ? i.split(",") : [], n = {}, r = e.length; --r > -1;) n[e[r]] = +t.getAttribute(e[r]) || 0;
        return n
    };

function Ei(o, t) {
    var i = o.tagName.toLowerCase(),
        e = .552284749831,
        n, r, l, c, h, s, p, f, u, a, y, g, d, _, x, b, S, v, w, m, L, T;
    return i === "path" || !o.getBBox ? o : (s = Bi(o, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), T = Yi(o, Xi[i]), i === "rect" ? (c = T.rx, h = T.ry || c, r = T.x, l = T.y, a = T.width - c * 2, y = T.height - h * 2, c || h ? (g = r + c * (1 - e), d = r + c, _ = d + a, x = _ + c * e, b = _ + c, S = l + h * (1 - e), v = l + h, w = v + y, m = w + h * e, L = w + h, n = "M" + b + "," + v + " V" + w + " C" + [b, m, x, L, _, L, _ - (_ - d) / 3, L, d + (_ - d) / 3, L, d, L, g, L, r, m, r, w, r, w - (w - v) / 3, r, v + (w - v) / 3, r, v, r, S, g, l, d, l, d + (_ - d) / 3, l, _ - (_ - d) / 3, l, _, l, x, l, b, S, b, v].join(",") + "z") : n = "M" + (r + a) + "," + l + " v" + y + " h" + -a + " v" + -y + " h" + a + "z") : i === "circle" || i === "ellipse" ? (i === "circle" ? (c = h = T.r, f = c * e) : (c = T.rx, h = T.ry, f = h * e), r = T.cx, l = T.cy, p = c * e, n = "M" + (r + c) + "," + l + " C" + [r + c, l + f, r + p, l + h, r, l + h, r - p, l + h, r - c, l + f, r - c, l, r - c, l - f, r - p, l - h, r, l - h, r + p, l - h, r + c, l - f, r + c, l].join(",") + "z") : i === "line" ? n = "M" + T.x1 + "," + T.y1 + " L" + T.x2 + "," + T.y2 : (i === "polyline" || i === "polygon") && (u = (o.getAttribute("points") + "").match(Ti) || [], r = u.shift(), l = u.shift(), n = "M" + r + "," + l + " L" + u.join(","), i === "polygon" && (n += "," + r + "," + l + "z")), s.setAttribute("d", oi(s._gsRawPath = dt(n))), t && o.parentNode && (o.parentNode.insertBefore(s, o), o.parentNode.removeChild(o)), s)
}

function ei(o, t, i) {
    var e = o[t],
        n = o[t + 2],
        r = o[t + 4],
        l;
    return e += (n - e) * i, n += (r - n) * i, e += (n - e) * i, l = n + (r + (o[t + 6] - r) * i - n) * i - e, e = o[t + 1], n = o[t + 3], r = o[t + 5], e += (n - e) * i, n += (r - n) * i, e += (n - e) * i, P(mi(n + (r + (o[t + 7] - r) * i - n) * i - e, l) * Li)
}

function ni(o, t, i) {
    i = Mi(i) ? 1 : Dt(i) || 0, t = Dt(t) || 0;
    var e = Math.max(0, ~~(k(i - t) - 1e-8)),
        n = Oi(o);
    if (t > i && (t = 1 - t, i = 1 - i, Ri(n), n.totalLength = 0), t < 0 || i < 0) {
        var r = Math.abs(~~Math.min(t, i)) + 1;
        t += r, i += r
    }
    n.totalLength || K(n);
    var l = i > 1,
        c = zt(n, t, Ci, !0),
        h = zt(n, i, Ai),
        s = h.segment,
        p = c.segment,
        f = h.segIndex,
        u = c.segIndex,
        a = h.i,
        y = c.i,
        g = u === f,
        d = a === y && g,
        _, x, b, S, v, w, m, L;
    if (l || e) {
        for (_ = f < u || g && a < y || d && h.t < c.t, jt(n, u, y, c.t) && (u++, _ || (f++, d ? (h.t = (h.t - c.t) / (1 - c.t), a = 0) : g && (a -= y))), Math.abs(1 - (i - t)) < 1e-5 ? f = u - 1 : !h.t && f ? f-- : jt(n, f, a, h.t) && _ && u++, c.t === 1 && (u = (u + 1) % n.length), v = [], w = n.length, m = 1 + w * e, L = u, m += (w - u + f) % w, S = 0; S < m; S++) Ni(v, n[L++ % w]);
        n = v
    } else if (b = h.t === 1 ? 6 : Lt(s, a, h.t), t !== i)
        for (x = Lt(p, y, d ? c.t / h.t : c.t), g && (b += x), s.splice(a + b + 2), (x || y) && p.splice(0, y + x), S = n.length; S--;)(S < u || S > f) && n.splice(S, 1);
    else s.angle = ei(s, a + b, 0), a += b, c = s[a], h = s[a + 1], s.length = s.totalLength = 0, s.totalPoints = n.totalPoints = 8, s.push(c, h, c, h, c, h, c, h);
    return n.totalLength = 0, n
}

function Di(o, t, i) {
    t = t || 0, o.samples || (o.samples = [], o.lookup = []);
    var e = ~~o.resolution || 12,
        n = 1 / e,
        r = o.length,
        l = o[t],
        c = o[t + 1],
        h = t ? t / 6 * e : 0,
        s = o.samples,
        p = o.lookup,
        f = (t ? o.minLength : vt) || vt,
        u = s[h + i * e - 1],
        a = t ? s[h - 1] : 0,
        y, g, d, _, x, b, S, v, w, m, L, T, M, A, X, N, Q;
    for (s.length = p.length = 0, g = t + 2; g < r; g += 6) {
        if (d = o[g + 4] - l, _ = o[g + 2] - l, x = o[g] - l, v = o[g + 5] - c, w = o[g + 3] - c, m = o[g + 1] - c, b = S = L = T = 0, k(d) < .01 && k(v) < .01 && k(x) + k(m) < .01) o.length > 8 && (o.splice(g, 6), g -= 6, r -= 6);
        else
            for (y = 1; y <= e; y++) A = n * y, M = 1 - A, b = S - (S = (A * A * d + 3 * M * (A * _ + M * x)) * A), L = T - (T = (A * A * v + 3 * M * (A * w + M * m)) * A), N = G(L * L + b * b), N < f && (f = N), a += N, s[h++] = a;
        l += d, c += v
    }
    if (u)
        for (u -= a; h < s.length; h++) s[h] += u;
    if (s.length && f) {
        if (o.totalLength = Q = s[s.length - 1] || 0, o.minLength = f, Q / f < 9999)
            for (N = X = 0, y = 0; y < Q; y += f) p[N++] = s[X] < y ? ++X : X
    } else o.totalLength = s[0] = 0;
    return t ? a - s[t / 2 - 1] : a
}

function K(o, t) {
    var i, e, n;
    for (n = i = e = 0; n < o.length; n++) o[n].resolution = ~~t || 12, i += Di(o[n]), e += o[n].length;
    return o.totalPoints = e, o.totalLength = i, o
}

function Lt(o, t, i) {
    if (i <= 0 || i >= 1) return 0;
    var e = o[t],
        n = o[t + 1],
        r = o[t + 2],
        l = o[t + 3],
        c = o[t + 4],
        h = o[t + 5],
        s = o[t + 6],
        p = o[t + 7],
        f = e + (r - e) * i,
        u = r + (c - r) * i,
        a = n + (l - n) * i,
        y = l + (h - l) * i,
        g = f + (u - f) * i,
        d = a + (y - a) * i,
        _ = c + (s - c) * i,
        x = h + (p - h) * i;
    return u += (_ - u) * i, y += (x - y) * i, o.splice(t + 2, 4, P(f), P(a), P(g), P(d), P(g + (u - g) * i), P(d + (y - d) * i), P(u), P(y), P(_), P(x)), o.samples && o.samples.splice(t / 6 * o.resolution | 0, 0, 0, 0, 0, 0, 0, 0), 6
}

function zt(o, t, i, e) {
    i = i || {}, o.totalLength || K(o), (t < 0 || t > 1) && (t = ti(t));
    var n = 0,
        r = o[0],
        l, c, h, s, p, f, u;
    if (!t) u = f = n = 0, r = o[0];
    else if (t === 1) u = 1, n = o.length - 1, r = o[n], f = r.length - 8;
    else {
        if (o.length > 1) {
            for (h = o.totalLength * t, p = f = 0;
                (p += o[f++].totalLength) < h;) n = f;
            r = o[n], s = p - r.totalLength, t = (h - s) / (p - s) || 0
        }
        l = r.samples, c = r.resolution, h = r.totalLength * t, f = r.lookup.length ? r.lookup[~~(h / r.minLength)] || 0 : ii(l, h, t), s = f ? l[f - 1] : 0, p = l[f], p < h && (s = p, p = l[++f]), u = 1 / c * ((h - s) / (p - s) + f % c), f = ~~(f / c) * 6, e && u === 1 && (f + 6 < r.length ? (f += 6, u = 0) : n + 1 < o.length && (f = u = 0, r = o[++n]))
    }
    return i.t = u, i.i = f, i.path = o, i.segment = r, i.segIndex = n, i
}

function Ft(o, t, i, e) {
    var n = o[0],
        r = e || {},
        l, c, h, s, p, f, u, a, y;
    if ((t < 0 || t > 1) && (t = ti(t)), n.lookup || K(o), o.length > 1) {
        for (h = o.totalLength * t, p = f = 0;
            (p += o[f++].totalLength) < h;) n = o[f];
        s = p - n.totalLength, t = (h - s) / (p - s) || 0
    }
    return l = n.samples, c = n.resolution, h = n.totalLength * t, f = n.lookup.length ? n.lookup[t < 1 ? ~~(h / n.minLength) : n.lookup.length - 1] || 0 : ii(l, h, t), s = f ? l[f - 1] : 0, p = l[f], p < h && (s = p, p = l[++f]), u = 1 / c * ((h - s) / (p - s) + f % c) || 0, y = 1 - u, f = ~~(f / c) * 6, a = n[f], r.x = P((u * u * (n[f + 6] - a) + 3 * y * (u * (n[f + 4] - a) + y * (n[f + 2] - a))) * u + a), r.y = P((u * u * (n[f + 7] - (a = n[f + 1])) + 3 * y * (u * (n[f + 5] - a) + y * (n[f + 3] - a))) * u + a), i && (r.angle = n.totalLength ? ei(n, f, u >= 1 ? 1 - 1e-9 : u || 1e-9) : n.angle || 0), r
}

function tt(o, t, i, e, n, r, l) {
    for (var c = o.length, h, s, p, f, u; --c > -1;)
        for (h = o[c], s = h.length, p = 0; p < s; p += 2) f = h[p], u = h[p + 1], h[p] = f * t + u * e + r, h[p + 1] = f * i + u * n + l;
    return o._dirty = 1, o
}

function Ii(o, t, i, e, n, r, l, c, h) {
    if (!(o === c && t === h)) {
        i = k(i), e = k(e);
        var s = n % 360 * vi,
            p = ut(s),
            f = pt(s),
            u = Math.PI,
            a = u * 2,
            y = (o - c) / 2,
            g = (t - h) / 2,
            d = p * y + f * g,
            _ = -f * y + p * g,
            x = d * d,
            b = _ * _,
            S = x / (i * i) + b / (e * e);
        S > 1 && (i = G(S) * i, e = G(S) * e);
        var v = i * i,
            w = e * e,
            m = (v * w - v * b - w * x) / (v * b + w * x);
        m < 0 && (m = 0);
        var L = (r === l ? -1 : 1) * G(m),
            T = L * (i * _ / e),
            M = L * -(e * d / i),
            A = (o + c) / 2,
            X = (t + h) / 2,
            N = A + (p * T - f * M),
            Q = X + (f * T + p * M),
            E = (d - T) / i,
            D = (_ - M) / e,
            lt = (-d - T) / i,
            st = (-_ - M) / e,
            Ot = E * E + D * D,
            kt = (D < 0 ? -1 : 1) * Math.acos(E / G(Ot)),
            I = (E * st - D * lt < 0 ? -1 : 1) * Math.acos((E * lt + D * st) / G(Ot * (lt * lt + st * st)));
        isNaN(I) && (I = u), !l && I > 0 ? I -= a : l && I < 0 && (I += a), kt %= a, I %= a;
        var Bt = Math.ceil(k(I) / (a / 4)),
            j = [],
            ft = I / Bt,
            ct = 4 / 3 * pt(ft / 2) / (1 + ut(ft / 2)),
            ai = p * i,
            gi = f * i,
            yi = f * -e,
            di = p * e,
            R;
        for (R = 0; R < Bt; R++) n = kt + R * ft, d = ut(n), _ = pt(n), E = ut(n += ft), D = pt(n), j.push(d - ct * _, _ + ct * d, E + ct * D, D - ct * E, E, D);
        for (R = 0; R < j.length; R += 2) d = j[R], _ = j[R + 1], j[R] = d * ai + _ * yi + N, j[R + 1] = d * gi + _ * di + Q;
        return j[R - 2] = c, j[R - 1] = h, j
    }
}

function dt(o) {
    var t = (o + "").replace(Si, function (T) {
        var M = +T;
        return M < 1e-4 && M > -1e-4 ? 0 : M
    }).match(wi) || [],
        i = [],
        e = 0,
        n = 0,
        r = 2 / 3,
        l = t.length,
        c = 0,
        h = "ERROR: malformed path: " + o,
        s, p, f, u, a, y, g, d, _, x, b, S, v, w, m, L = function (M, A, X, N) {
            x = (X - M) / 3, b = (N - A) / 3, g.push(M + x, A + b, X - x, N - b, X, N)
        };
    if (!o || !isNaN(t[0]) || isNaN(t[1])) return console.log(h), i;
    for (s = 0; s < l; s++)
        if (v = a, isNaN(t[s]) ? (a = t[s].toUpperCase(), y = a !== t[s]) : s--, f = +t[s + 1], u = +t[s + 2], y && (f += e, u += n), s || (d = f, _ = u), a === "M") g && (g.length < 8 ? i.length -= 1 : c += g.length, It(g)), e = d = f, n = _ = u, g = [f, u], i.push(g), s += 2, a = "L";
        else if (a === "C") g || (g = [0, 0]), y || (e = n = 0), g.push(f, u, e + t[s + 3] * 1, n + t[s + 4] * 1, e += t[s + 5] * 1, n += t[s + 6] * 1), s += 6;
        else if (a === "S") x = e, b = n, (v === "C" || v === "S") && (x += e - g[g.length - 4], b += n - g[g.length - 3]), y || (e = n = 0), g.push(x, b, f, u, e += t[s + 3] * 1, n += t[s + 4] * 1), s += 4;
        else if (a === "Q") x = e + (f - e) * r, b = n + (u - n) * r, y || (e = n = 0), e += t[s + 3] * 1, n += t[s + 4] * 1, g.push(x, b, e + (f - e) * r, n + (u - n) * r, e, n), s += 4;
        else if (a === "T") x = e - g[g.length - 4], b = n - g[g.length - 3], g.push(e + x, n + b, f + (e + x * 1.5 - f) * r, u + (n + b * 1.5 - u) * r, e = f, n = u), s += 2;
        else if (a === "H") L(e, n, e = f, n), s += 1;
        else if (a === "V") L(e, n, e, n = f + (y ? n - e : 0)), s += 1;
        else if (a === "L" || a === "Z") a === "Z" && (f = d, u = _, g.closed = !0), (a === "L" || k(e - f) > .5 || k(n - u) > .5) && (L(e, n, f, u), a === "L" && (s += 2)), e = f, n = u;
        else if (a === "A") {
            if (w = t[s + 4], m = t[s + 5], x = t[s + 6], b = t[s + 7], p = 7, w.length > 1 && (w.length < 3 ? (b = x, x = m, p--) : (b = m, x = w.substr(2), p -= 2), m = w.charAt(1), w = w.charAt(0)), S = Ii(e, n, +t[s + 1], +t[s + 2], +t[s + 3], +w, +m, (y ? e : 0) + x * 1, (y ? n : 0) + b * 1), s += p, S)
                for (p = 0; p < S.length; p++) g.push(S[p]);
            e = g[g.length - 2], n = g[g.length - 1]
        } else console.log(h);
    return s = g.length, s < 6 ? (i.pop(), s = 0) : It(g), i.totalPoints = c + s, i
}

function ji(o, t) {
    t === void 0 && (t = 1);
    for (var i = o[0], e = 0, n = [i, e], r = 2; r < o.length; r += 2) n.push(i, e, o[r], e = (o[r] - i) * t / 2, i = o[r], -e);
    return n
}

function mt(o, t) {
    k(o[0] - o[2]) < 1e-4 && k(o[1] - o[3]) < 1e-4 && (o = o.slice(2));
    var i = o.length - 2,
        e = +o[0],
        n = +o[1],
        r = +o[2],
        l = +o[3],
        c = [e, n, e, n],
        h = r - e,
        s = l - n,
        p = o.nonSmooth || [],
        f = Math.abs(o[i] - e) < .001 && Math.abs(o[i + 1] - n) < .001,
        u, a, y, g, d, _, x, b, S, v, w, m, L, T, M;
    if (!i) return [e, n, e, n, e, n, e, n];
    for (f && (o.push(r, l), r = e, l = n, e = o[i - 2], n = o[i - 1], o.unshift(e, n), i += 4, p = [0, 0].concat(p)), t = t || t === 0 ? +t : 1, y = 2; y < i; y += 2)
        if (u = e, a = n, e = r, n = l, r = +o[y + 2], l = +o[y + 3], !(e === r && n === l)) {
            if (g = h, d = s, h = r - e, s = l - n, p[y]) {
                c.push(e - (e - u) / 4, n - (n - a) / 4, e, n, e + (r - e) / 4, n + (l - n) / 4);
                continue
            }
            _ = G(g * g + d * d), x = G(h * h + s * s), b = G(Math.pow(h / x + g / _, 2) + Math.pow(s / x + d / _, 2)), S = (_ + x) * t * .25 / b, v = e - (e - u) * (_ ? S / _ : 0), w = e + (r - e) * (x ? S / x : 0), m = e - (v + ((w - v) * (_ * 3 / (_ + x) + .5) / 4 || 0)), L = n - (n - a) * (_ ? S / _ : 0), T = n + (l - n) * (x ? S / x : 0), M = n - (L + ((T - L) * (_ * 3 / (_ + x) + .5) / 4 || 0)), c.push(P(v + m), P(L + M), P(e), P(n), P(w + m), P(T + M))
        } return e !== r || n !== l || c.length < 4 ? c.push(P(r), P(l), P(r), P(l)) : c.length -= 2, c.length === 2 ? c.push(e, n, e, n, e, n) : f && (c.splice(0, 6), c.length -= 6), c.closed = f, c
}

function oi(o) {
    Jt(o[0]) && (o = [o]);
    var t = "",
        i = o.length,
        e, n, r, l;
    for (n = 0; n < i; n++) {
        for (l = o[n], t += "M" + P(l[0]) + "," + P(l[1]) + " C", e = l.length, r = 2; r < e; r++) t += P(l[r++]) + "," + P(l[r++]) + " " + P(l[r++]) + "," + P(l[r++]) + " " + P(l[r++]) + "," + P(l[r]) + " ";
        l.closed && (t += "z")
    }
    return t
}
/*!
 * matrix 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */
var z, V, Rt, bt, it, gt, _t, et, B = "transform",
    Mt = B + "Origin",
    ri, li = function (t) {
        var i = t.ownerDocument || t;
        for (!(B in t.style) && ("msTransform" in t.style) && (B = "msTransform", Mt = B + "Origin"); i.parentNode && (i = i.parentNode););
        if (V = window, _t = new rt, i) {
            z = i, Rt = i.documentElement, bt = i.body, et = z.createElementNS("http://www.w3.org/2000/svg", "g"), et.style.transform = "none";
            var e = i.createElement("div"),
                n = i.createElement("div"),
                r = i && (i.body || i.firstElementChild);
            r && r.appendChild && (r.appendChild(e), e.appendChild(n), e.style.position = "static", e.style.transform = "translate3d(0,0,1px)", ri = n.offsetParent !== e, r.removeChild(e))
        }
        return i
    },
    Gi = function (t) {
        for (var i, e; t && t !== bt;) e = t._gsap, e && e.uncache && e.get(t, "x"), e && !e.scaleX && !e.scaleY && e.renderTransform && (e.scaleX = e.scaleY = 1e-4, e.renderTransform(1, e), i ? i.push(e) : i = [e]), t = t.parentNode;
        return i
    },
    si = [],
    fi = [],
    zi = function () {
        return V.pageYOffset || z.scrollTop || Rt.scrollTop || bt.scrollTop || 0
    },
    Fi = function () {
        return V.pageXOffset || z.scrollLeft || Rt.scrollLeft || bt.scrollLeft || 0
    },
    Nt = function (t) {
        return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null)
    },
    qi = function o(t) {
        if (V.getComputedStyle(t).position === "fixed") return !0;
        if (t = t.parentNode, t && t.nodeType === 1) return o(t)
    },
    wt = function o(t, i) {
        if (t.parentNode && (z || li(t))) {
            var e = Nt(t),
                n = e ? e.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
                r = e ? i ? "rect" : "g" : "div",
                l = i !== 2 ? 0 : 100,
                c = i === 3 ? 100 : 0,
                h = {
                    position: "absolute",
                    display: "block",
                    pointerEvents: "none",
                    margin: "0",
                    padding: "0"
                },
                s = z.createElementNS ? z.createElementNS(n.replace(/^https/, "http"), r) : z.createElement(r);
            return i && (e ? (gt || (gt = o(t)), s.setAttribute("width", .01), s.setAttribute("height", .01), s.setAttribute("transform", "translate(" + l + "," + c + ")"), s.setAttribute("fill", "transparent"), gt.appendChild(s)) : (it || (it = o(t), Object.assign(it.style, h)), Object.assign(s.style, h, {
                width: "0.1px",
                height: "0.1px",
                top: c + "px",
                left: l + "px"
            }), it.appendChild(s))), s
        }
        throw "Need document and parent."
    },
    Ki = function (t) {
        for (var i = new rt, e = 0; e < t.numberOfItems; e++) i.multiply(t.getItem(e).matrix);
        return i
    },
    Vi = function (t) {
        var i = t.getCTM(),
            e;
        return i || (e = t.style[B], t.style[B] = "none", t.appendChild(et), i = et.getCTM(), t.removeChild(et), e ? t.style[B] = e : t.style.removeProperty(B.replace(/([A-Z])/g, "-$1").toLowerCase())), i || _t.clone()
    },
    $i = function (t, i) {
        var e = Nt(t),
            n = t === e,
            r = e ? si : fi,
            l = t.parentNode,
            c = l && !e && l.shadowRoot && l.shadowRoot.appendChild ? l.shadowRoot : l,
            h, s, p, f, u, a;
        if (t === V) return t;
        if (r.length || r.push(wt(t, 1), wt(t, 2), wt(t, 3)), h = e ? gt : it, e) n ? (p = Vi(t), f = -p.e / p.a, u = -p.f / p.d, s = _t) : t.getBBox ? (p = t.getBBox(), s = t.transform ? t.transform.baseVal : {}, s = s.numberOfItems ? s.numberOfItems > 1 ? Ki(s) : s.getItem(0).matrix : _t, f = s.a * p.x + s.c * p.y, u = s.b * p.x + s.d * p.y) : (s = new rt, f = u = 0), i && t.tagName.toLowerCase() === "g" && (f = u = 0), (n || !t.getBoundingClientRect().width ? e : l).appendChild(h), h.setAttribute("transform", "matrix(" + s.a + "," + s.b + "," + s.c + "," + s.d + "," + (s.e + f) + "," + (s.f + u) + ")");
        else {
            if (f = u = 0, ri)
                for (s = t.offsetParent, p = t; p && (p = p.parentNode) && p !== s && p.parentNode;)(V.getComputedStyle(p)[B] + "").length > 4 && (f = p.offsetLeft, u = p.offsetTop, p = 0);
            if (a = V.getComputedStyle(t), a.position !== "absolute" && a.position !== "fixed")
                for (s = t.offsetParent; l && l !== s;) f += l.scrollLeft || 0, u += l.scrollTop || 0, l = l.parentNode;
            p = h.style, p.top = t.offsetTop - u + "px", p.left = t.offsetLeft - f + "px", p[B] = a[B], p[Mt] = a[Mt], p.position = a.position === "fixed" ? "fixed" : "absolute", c.appendChild(h)
        }
        return h
    },
    Tt = function (t, i, e, n, r, l, c) {
        return t.a = i, t.b = e, t.c = n, t.d = r, t.e = l, t.f = c, t
    },
    rt = (function () {
        function o(i, e, n, r, l, c) {
            i === void 0 && (i = 1), e === void 0 && (e = 0), n === void 0 && (n = 0), r === void 0 && (r = 1), l === void 0 && (l = 0), c === void 0 && (c = 0), Tt(this, i, e, n, r, l, c)
        }
        var t = o.prototype;
        return t.inverse = function () {
            var e = this.a,
                n = this.b,
                r = this.c,
                l = this.d,
                c = this.e,
                h = this.f,
                s = e * l - n * r || 1e-10;
            return Tt(this, l / s, -n / s, -r / s, e / s, (r * h - l * c) / s, -(e * h - n * c) / s)
        }, t.multiply = function (e) {
            var n = this.a,
                r = this.b,
                l = this.c,
                c = this.d,
                h = this.e,
                s = this.f,
                p = e.a,
                f = e.c,
                u = e.b,
                a = e.d,
                y = e.e,
                g = e.f;
            return Tt(this, p * n + u * l, p * r + u * c, f * n + a * l, f * r + a * c, h + y * n + g * l, s + y * r + g * c)
        }, t.clone = function () {
            return new o(this.a, this.b, this.c, this.d, this.e, this.f)
        }, t.equals = function (e) {
            var n = this.a,
                r = this.b,
                l = this.c,
                c = this.d,
                h = this.e,
                s = this.f;
            return n === e.a && r === e.b && l === e.c && c === e.d && h === e.e && s === e.f
        }, t.apply = function (e, n) {
            n === void 0 && (n = {});
            var r = e.x,
                l = e.y,
                c = this.a,
                h = this.b,
                s = this.c,
                p = this.d,
                f = this.e,
                u = this.f;
            return n.x = r * c + l * s + f || 0, n.y = r * h + l * p + u || 0, n
        }, o
    })();

function Z(o, t, i, e) {
    if (!o || !o.parentNode || (z || li(o)).documentElement === o) return new rt;
    var n = Gi(o),
        r = Nt(o),
        l = r ? si : fi,
        c = $i(o, i),
        h = l[0].getBoundingClientRect(),
        s = l[1].getBoundingClientRect(),
        p = l[2].getBoundingClientRect(),
        f = c.parentNode,
        u = !e && qi(o),
        a = new rt((s.left - h.left) / 100, (s.top - h.top) / 100, (p.left - h.left) / 100, (p.top - h.top) / 100, h.left + (u ? 0 : Fi()), h.top + (u ? 0 : zi()));
    if (f.removeChild(c), n)
        for (h = n.length; h--;) s = n[h], s.scaleX = s.scaleY = 0, s.renderTransform(1, s);
    return t ? a.inverse() : a
}
/*!
 * MotionPathPlugin 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */
var Ui = "x,translateX,left,marginLeft,xPercent".split(","),
    Wi = "y,translateY,top,marginTop,yPercent".split(","),
    Zi = Math.PI / 180,
    O, ci, $, Ct, St, qt, Hi = function () {
        return O || typeof window < "u" && (O = window.gsap) && O.registerPlugin && O
    },
    J = function (t, i, e, n) {
        for (var r = i.length, l = n === 2 ? 0 : n, c = 0; c < r; c++) t[l] = parseFloat(i[c][e]), n === 2 && (t[l + 1] = 0), l += 2;
        return t
    },
    U = function (t, i, e) {
        return parseFloat(t._gsap.get(t, i, e || "px")) || 0
    },
    hi = function (t) {
        var i = t[0],
            e = t[1],
            n;
        for (n = 2; n < t.length; n += 2) i = t[n] += i, e = t[n + 1] += e
    },
    Kt = function (t, i, e, n, r, l, c, h, s) {
        if (c.type === "cubic") i = [i];
        else {
            c.fromCurrent !== !1 && i.unshift(U(e, n, h), r ? U(e, r, s) : 0), c.relative && hi(i);
            var p = r ? mt : ji;
            i = [p(i, c.curviness)]
        }
        return i = l(pi(i, e, c)), xt(t, e, n, i, "x", h), r && xt(t, e, r, i, "y", s), K(i, c.resolution || (c.curviness === 0 ? 20 : 12))
    },
    Qi = function (t) {
        return t
    },
    Ji = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g,
    Vt = function (t, i, e) {
        var n = Z(t),
            r = 0,
            l = 0,
            c;
        return (t.tagName + "").toLowerCase() === "svg" ? (c = t.viewBox.baseVal, c.width || (c = {
            width: +t.getAttribute("width"),
            height: +t.getAttribute("height")
        })) : c = i && t.getBBox && t.getBBox(), i && i !== "auto" && (r = i.push ? i[0] * (c ? c.width : t.offsetWidth || 0) : i.x, l = i.push ? i[1] * (c ? c.height : t.offsetHeight || 0) : i.y), e.apply(r || l ? n.apply({
            x: r,
            y: l
        }) : {
            x: n.e,
            y: n.f
        })
    },
    At = function (t, i, e, n) {
        var r = Z(t.parentNode, !0, !0),
            l = r.clone().multiply(Z(i)),
            c = Vt(t, e, r),
            h = Vt(i, n, r),
            s = h.x,
            p = h.y,
            f;
        return l.e = l.f = 0, n === "auto" && i.getTotalLength && i.tagName.toLowerCase() === "path" && (f = i.getAttribute("d").match(Ji) || [], f = l.apply({
            x: +f[0],
            y: +f[1]
        }), s += f.x, p += f.y), f && (f = l.apply(i.getBBox()), s -= f.x, p -= f.y), l.e = s - c.x, l.f = p - c.y, l
    },
    pi = function (t, i, e) {
        var n = e.align,
            r = e.matrix,
            l = e.offsetX,
            c = e.offsetY,
            h = e.alignOrigin,
            s = t[0][0],
            p = t[0][1],
            f = U(i, "x"),
            u = U(i, "y"),
            a, y, g;
        return !t || !t.length ? at("M0,0L0,0") : (n && (n === "self" || (a = Ct(n)[0] || i) === i ? tt(t, 1, 0, 0, 1, f - s, u - p) : (h && h[2] !== !1 ? O.set(i, {
            transformOrigin: h[0] * 100 + "% " + h[1] * 100 + "%"
        }) : h = [U(i, "xPercent") / -100, U(i, "yPercent") / -100], y = At(i, a, h, "auto"), g = y.apply({
            x: s,
            y: p
        }), tt(t, y.a, y.b, y.c, y.d, f + y.e - (g.x - y.e), u + y.f - (g.y - y.f)))), r ? tt(t, r.a, r.b, r.c, r.d, r.e, r.f) : (l || c) && tt(t, 1, 0, 0, 1, l || 0, c || 0), t)
    },
    xt = function (t, i, e, n, r, l) {
        var c = i._gsap,
            h = c.harness,
            s = h && h.aliases && h.aliases[e],
            p = s && s.indexOf(",") < 0 ? s : e,
            f = t._pt = new ci(t._pt, i, p, 0, 0, Qi, 0, c.set(i, p, t));
        f.u = $(c.get(i, p, l)) || 0, f.path = n, f.pp = r, t._props.push(p)
    },
    te = function (t, i) {
        return function (e) {
            return t || i !== 1 ? ni(e, t, i) : e
        }
    },
    ui = {
        version: "3.14.2",
        name: "motionPath",
        register: function (t, i, e) {
            O = t, $ = O.utils.getUnit, Ct = O.utils.toArray, St = O.core.getStyleSaver, qt = O.core.reverting || function () { }, ci = e
        },
        init: function (t, i, e) {
            if (!O) return console.warn("Please gsap.registerPlugin(MotionPathPlugin)"), !1;
            (!(typeof i == "object" && !i.style) || !i.path) && (i = {
                path: i
            });
            var n = [],
                r = i,
                l = r.path,
                c = r.autoRotate,
                h = r.unitX,
                s = r.unitY,
                p = r.x,
                f = r.y,
                u = l[0],
                a = te(i.start, "end" in i ? i.end : 1),
                y, g;
            if (this.rawPaths = n, this.target = t, this.tween = e, this.styles = St && St(t, "transform"), (this.rotate = c || c === 0) && (this.rOffset = parseFloat(c) || 0, this.radians = !!i.useRadians, this.rProp = i.rotation || "rotation", this.rSet = t._gsap.set(t, this.rProp, this), this.ru = $(t._gsap.get(t, this.rProp)) || 0), Array.isArray(l) && !("closed" in l) && typeof u != "number") {
                for (g in u) !p && ~Ui.indexOf(g) ? p = g : !f && ~Wi.indexOf(g) && (f = g);
                p && f ? n.push(Kt(this, J(J([], l, p, 0), l, f, 1), t, p, f, a, i, h || $(l[0][p]), s || $(l[0][f]))) : p = f = 0;
                for (g in u) g !== p && g !== f && n.push(Kt(this, J([], l, g, 2), t, g, 0, a, i, $(l[0][g])))
            } else y = a(pi(at(i.path), t, i)), K(y, i.resolution), n.push(y), xt(this, t, i.x || "x", y, "x", i.unitX || "px"), xt(this, t, i.y || "y", y, "y", i.unitY || "px");
            e.vars.immediateRender && this.render(e.progress(), this)
        },
        render: function (t, i) {
            var e = i.rawPaths,
                n = e.length,
                r = i._pt;
            if (i.tween._time || !qt()) {
                for (t > 1 ? t = 1 : t < 0 && (t = 0); n--;) Ft(e[n], t, !n && i.rotate, e[n]);
                for (; r;) r.set(r.t, r.p, r.path[r.pp] + r.u, r.d, t), r = r._next;
                i.rotate && i.rSet(i.target, i.rProp, e[0].angle * (i.radians ? Zi : 1) + i.rOffset + i.ru, i, t)
            } else i.styles.revert()
        },
        getLength: function (t) {
            return K(at(t)).totalLength
        },
        sliceRawPath: ni,
        getRawPath: at,
        pointsToSegment: mt,
        stringToRawPath: dt,
        rawPathToString: oi,
        transformRawPath: tt,
        getGlobalMatrix: Z,
        getPositionOnPath: Ft,
        cacheRawPathMeasurements: K,
        convertToPath: function (t, i) {
            return Ct(t).map(function (e) {
                return Ei(e, i !== !1)
            })
        },
        convertCoordinates: function (t, i, e) {
            var n = Z(i, !0, !0).multiply(Z(t));
            return e ? n.apply(e) : n
        },
        getAlignMatrix: At,
        getRelativePosition: function (t, i, e, n) {
            var r = At(t, i, e, n);
            return {
                x: r.e,
                y: r.f
            }
        },
        arrayToRawPath: function (t, i) {
            i = i || {};
            var e = J(J([], t, i.x || "x", 0), t, i.y || "y", 1);
            return i.relative && hi(e), [i.type === "cubic" ? e : mt(e, i.curviness)]
        }
    };
Hi() && O.registerPlugin(ui);
_i.registerPlugin(xi, H, ui);