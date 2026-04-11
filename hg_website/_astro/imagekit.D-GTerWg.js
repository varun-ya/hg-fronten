const r = "https://assets.sarvam.ai",
    l = r,
    f = /\.(png|jpe?g|webp|gif|avif|bmp|tiff?|svg)(\?|$)/i,
    c = /\.svg(\?|$)/i;

function a(i) {
    return f.test(i)
}

function $(i) {
    return c.test(i)
}

function m(i) {
    const s = [];
    return i.width && s.push(`w-${i.width}`), i.height && s.push(`h-${i.height}`), i.quality && s.push(`q-${i.quality}`), i.format && s.push(`f-${i.format}`), i.blur && s.push(`bl-${i.blur}`), i.focus && s.push(`fo-${i.focus}`), s.join(",")
}

function h(i, s) {
    if (!i || !a(i) || i.includes("ik.imagekit.io") || i.includes("assets.sarvam.ai")) return i;
    const u = $(i) ? {
        ...s
    } : {
        format: "auto",
        ...s
    },
        n = m(u),
        e = n ? `/tr:${n}` : "";
    if (i.startsWith("http")) try {
        const t = new URL(i);
        return t.hostname.endsWith("sanity.io") ? `${r}${e}${t.pathname}${t.search}` : i
    } catch {
        return i
    }
    const o = i.startsWith("/") ? i : `/${i}`;
    return `${r}${e}${o}`
}
export {
    l as I, h as i
};