import {
    _ as b
} from "./preload-helper.BlTxHScW.js";
import {
    r as e
} from "./index.Ba4_ASc-.js";

function _(p) {
    const o = p.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(),
        d = [
            [/gateway\s*timeout/i, "Service temporarily unavailable. Please try again in a moment."],
            [/504/i, "Service temporarily unavailable. Please try again in a moment."],
            [/502/i, "Service temporarily unavailable. Please try again in a moment."],
            [/503/i, "Service is undergoing maintenance. Please try again later."],
            [/500/i, "Something went wrong on our end. Please try again."],
            [/timeout/i, "Connection timed out. Please check your network and try again."],
            [/network/i, "Network error. Please check your connection and try again."],
            [/failed to fetch/i, "Could not reach the server. Please check your connection."],
            [/connection.*refused/i, "Could not connect to the service. Please try again later."],
            [/signed\s*url/i, "Could not establish a voice connection. Please try again."]
        ];
    for (const [f, c] of d)
        if (f.test(o)) return c;
    return o.length > 200 ? "An unexpected error occurred. Please try again." : o || "An unexpected error occurred. Please try again."
}

function A(p = {}) {
    const {
        onStart: o,
        onEnd: d,
        onError: f
    } = p, [c, r] = e.useState({
        isConnecting: !1,
        isConnected: !1,
        elapsedSeconds: 0,
        error: null
    }), n = e.useRef(null), g = e.useRef(null), m = e.useRef(null), y = e.useCallback(() => {
        m.current = Date.now(), g.current = setInterval(() => {
            if (m.current) {
                const t = Math.floor((Date.now() - m.current) / 1e3);
                r(l => ({
                    ...l,
                    elapsedSeconds: t
                }))
            }
        }, 1e3)
    }, []), a = e.useCallback(() => {
        g.current && (clearInterval(g.current), g.current = null), m.current = null
    }, []), k = e.useCallback(async t => {
        const {
            appId: l,
            orgId: C,
            workspaceId: S
        } = t;
        r(i => ({
            ...i,
            isConnecting: !0,
            error: null,
            elapsedSeconds: 0
        }));
        try {
            const {
                createProxiedVoiceAgent: i
            } = await b(async () => {
                const {
                    createProxiedVoiceAgent: u
                } = await import("./ProxiedVoiceAgent.PMYiw2lo.js");
                return {
                    createProxiedVoiceAgent: u
                }
            }, []), s = i({
                config: {
                    user_identifier_type: "custom",
                    user_identifier: `web-demo-${Date.now()}`,
                    org_id: C,
                    workspace_id: S,
                    app_id: l
                },
                textCallback: async () => { },
                eventCallback: async () => { },
                startCallback: async () => {
                    r(u => ({
                        ...u,
                        isConnecting: !1,
                        isConnected: !0
                    })), y(), o?.()
                },
                endCallback: async () => {
                    r(u => ({
                        ...u,
                        isConnected: !1,
                        isConnecting: !1
                    })), a(), d?.()
                }
            });
            if (n.current = s, await s.start(), !await s.waitForConnect(15)) throw new Error("Connection timeout - could not connect within 15 seconds")
        } catch (i) {
            const s = i instanceof Error ? i : new Error("Failed to start call");
            if (n.current) {
                try {
                    await n.current.stop()
                } catch { }
                n.current = null
            }
            r(w => ({
                ...w,
                isConnecting: !1,
                isConnected: !1,
                error: _(s.message)
            })), a(), f?.(s)
        }
    }, [o, d, f, y, a]), h = e.useCallback(async () => {
        if (n.current) {
            try {
                await n.current.stop()
            } catch { }
            n.current = null
        }
        r(t => ({
            ...t,
            isConnected: !1,
            isConnecting: !1
        })), a()
    }, [a]);
    e.useEffect(() => () => {
        n.current && n.current.stop().catch(() => { }), a()
    }, [a]);
    const P = e.useCallback(t => {
        const l = Math.floor(t / 60),
            C = t % 60;
        return `${l.toString().padStart(2, "0")}:${C.toString().padStart(2, "0")}`
    }, []),
        v = e.useCallback(() => {
            r(t => ({
                ...t,
                error: null
            }))
        }, []);
    return {
        ...c,
        formattedTime: P(c.elapsedSeconds),
        startCall: k,
        endCall: h,
        clearError: v,
        isActive: c.isConnecting || c.isConnected
    }
}
export {
    A as u
};