!function() {
    try {
        var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
          , n = Error().stack;
        n && (e._sentryDebugIds = e._sentryDebugIds || {},
        e._sentryDebugIds[n] = "448290d2-dcb3-4bc9-b040-2c35f5d54c0d",
        e._sentryDebugIdIdentifier = "sentry-dbid-448290d2-dcb3-4bc9-b040-2c35f5d54c0d")
    } catch (e) {}
}(),
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[8233], {
    6368: function(e, n, d) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/glifs/[id]/edit", function() {
            return d(18498)
        }
        ])
    },
    18498: function(e, n, d) {
        "use strict";
        d.r(n),
        d.d(n, {
            default: function() {
                return _
            }
        });
        var i = d(33741)
          , r = d(86386)
          , t = d(96089)
          , s = d(44020)
          , u = d(90606)
          , l = d(35921)
          , o = d(1340)
          , a = d(21341)
          , c = d(21309)
          , f = d(77305);
        function _() {
            let e = (0,
            r.useRouter)()
              , {data: n, status: d} = (0,
            a.useSession)()
              , _ = (0,
            o.Z)(e.query.id)
              , b = t.h.spell.getDraftVersion.useQuery({
                id: null != _ ? _ : ""
            }, {
                enabled: !!_,
                retry: !1,
                useErrorBoundary: !1,
                onError: n => {
                    var d, i;
                    if ((0,
                    f.x)(n) && (null === (d = n.data) || void 0 === d ? void 0 : d.code) === "UNAUTHORIZED") {
                        let n = e.asPath.replace("/edit", "/source");
                        e.push(n)
                    } else if ((0,
                    f.x)(n) && (null === (i = n.data) || void 0 === i ? void 0 : i.code) == "NOT_FOUND")
                        c.ZP.error("404 glif not found :(");
                    else
                        throw n
                }
            })
              , y = null == b ? void 0 : b.data;
            return y && "loading" !== d && _ ? (0,
            i.jsx)(s.ZP, {
                title: "glif - ".concat(y.name),
                nav: "inline",
                children: (0,
                i.jsx)("div", {
                    className: "w-full",
                    children: (0,
                    i.jsx)(u.Z, {
                        spell: y,
                        isOwner: y.userId === (null == n ? void 0 : n.user.id)
                    })
                })
            }) : (0,
            i.jsx)(s.ZP, {
                children: (0,
                i.jsx)(l.Z, {})
            })
        }
        _.displayName = "SpellsEdit"
    }
}, function(e) {
    e.O(0, [2984, 8641, 9914, 2611, 100, 755, 4020, 497, 6325, 7177, 7954, 606, 2888, 9774, 179], function() {
        return e(e.s = 6368)
    }),
    _N_E = e.O()
}
]);
