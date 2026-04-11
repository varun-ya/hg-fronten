const c = (a, t) => {
    typeof window < "u" && window.posthog && window.posthog.capture(`website_${a}`, {
        ...t,
        page_url: window.location.href,
        page_path: window.location.pathname
    })
},
    i = (a, t, e) => {
        c("cta_clicked", {
            cta_name: a,
            cta_location: t,
            target_url: e || "https://dashboard.sarvam.ai",
            is_dashboard_link: !0
        })
    },
    n = (a, t) => {
        c("pricing_cta_clicked", {
            plan_name: a,
            cta_text: t
        })
    },
    o = (a, t) => {
        c("playground_cta_clicked", {
            playground_type: a,
            action: t
        })
    },
    r = a => {
        c("experience_sarvam_clicked", {
            location: a,
            target_url: "https://dashboard.sarvam.ai/"
        })
    },
    s = (a, t) => {
        c("api_page_cta_clicked", {
            api_name: a,
            cta_text: t
        })
    },
    _ = (a, t, e) => {
        c("outbound_click", {
            link_url: a,
            link_text: t,
            location: e
        })
    };
export {
    _ as a, n as b, r as c, o as d, i as e, s as t
};