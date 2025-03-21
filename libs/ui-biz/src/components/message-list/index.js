import { jsx as E, jsxs as en, Fragment as fo } from 'react/jsx-runtime';
import {
  Cell as u,
  Signal as x,
  map as p,
  filter as m,
  withLatestFrom as S,
  scan as se,
  debounceTime as be,
  mapTo as F,
  throttleTime as Ft,
  delayWithMicrotask as Bt,
  onNext as tn,
  Action as _t,
  useCellValue as C,
  useRealm as Ht,
  Realm as ho,
  RealmContext as go,
  useCellValues as mo,
} from './gurx';
import h from 'react';
function Ie(e, t) {
  const n = u(e, (o) => {
    o.link(t(o), n);
  });
  return n;
}
const Te = { lvl: 0 };
function nn(e, t, n, o = Te, i = Te) {
  return { k: e, l: o, lvl: n, r: i, v: t };
}
function I(e) {
  return e === Te;
}
function Me() {
  return Te;
}
function Et(e, t) {
  if (I(e)) return Te;
  const { k: n, l: o, r: i } = e;
  if (t === n) {
    if (I(o)) return i;
    if (I(i)) return o;
    const [s, r] = on(o);
    return et(M(e, { k: s, l: sn(o), v: r }));
  }
  return t < n ? et(M(e, { l: Et(o, t) })) : et(M(e, { r: Et(i, t) }));
}
function ae(e, t, n = 'k') {
  if (I(e)) return [Number.NEGATIVE_INFINITY, void 0];
  if (e[n] === t) return [e.k, e.v];
  if (e[n] < t) {
    const o = ae(e.r, t, n);
    return o[0] === Number.NEGATIVE_INFINITY ? [e.k, e.v] : o;
  }
  return ae(e.l, t, n);
}
function B(e, t, n) {
  return I(e)
    ? nn(t, n, 1)
    : t === e.k
    ? M(e, { k: t, v: n })
    : t < e.k
    ? qt(M(e, { l: B(e.l, t, n) }))
    : qt(M(e, { r: B(e.r, t, n) }));
}
function $t(e, t, n) {
  if (I(e)) return [];
  const { k: o, v: i, l: s, r } = e;
  let l = [];
  return (
    o > t && (l = l.concat($t(s, t, n))),
    o >= t && o <= n && l.push({ k: o, v: i }),
    o <= n && (l = l.concat($t(r, t, n))),
    l
  );
}
function bo(e, t, n, o) {
  if (I(e)) return Te;
  let i = Me();
  for (const { k: s, v: r } of ve(e))
    s > t && s <= n ? (i = B(i, ...o(s, r))) : (i = B(i, s, r));
  return i;
}
function vo(e, t, n) {
  let o = Me(),
    i = -1;
  for (const { start: s, end: r, value: l } of Io(e))
    s < t
      ? ((o = B(o, s, l)), (i = l))
      : s > t + n
      ? (o = B(o, s - n, l))
      : r >= t + n && i !== l && (o = B(o, t, l));
  return o;
}
function ve(e) {
  return I(e) ? [] : [...ve(e.l), { k: e.k, v: e.v }, ...ve(e.r)];
}
function on(e) {
  return I(e.r) ? [e.k, e.v] : on(e.r);
}
function sn(e) {
  return I(e.r) ? e.l : et(M(e, { r: sn(e.r) }));
}
function M(e, t) {
  return nn(t.k ?? e.k, t.v ?? e.v, t.lvl ?? e.lvl, t.l ?? e.l, t.r ?? e.r);
}
function xt(e) {
  return I(e) || e.lvl > e.r.lvl;
}
function qt(e) {
  return wt(cn(e));
}
function et(e) {
  const { l: t, r: n, lvl: o } = e;
  if (n.lvl >= o - 1 && t.lvl >= o - 1) return e;
  if (o > n.lvl + 1) {
    if (xt(t)) return cn(M(e, { lvl: o - 1 }));
    if (!I(t) && !I(t.r))
      return M(t.r, {
        l: M(t, { r: t.r.l }),
        lvl: o,
        r: M(e, {
          l: t.r.r,
          lvl: o - 1,
        }),
      });
    throw new Error('Unexpected empty nodes');
  }
  if (xt(e)) return wt(M(e, { lvl: o - 1 }));
  if (!I(n) && !I(n.l)) {
    const i = n.l,
      s = xt(i) ? n.lvl - 1 : n.lvl;
    return M(i, {
      l: M(e, {
        lvl: o - 1,
        r: i.l,
      }),
      lvl: i.lvl + 1,
      r: wt(M(n, { l: i.r, lvl: s })),
    });
  }
  throw new Error('Unexpected empty nodes');
}
function Io(e) {
  return un(ve(e));
}
function rn(e, t, n) {
  if (I(e)) return [];
  const o = ae(e, t)[0];
  return un($t(e, o, n));
}
function ln(e, t) {
  const n = e.length;
  if (n === 0) return [];
  let { index: o, value: i } = t(e[0]);
  const s = [];
  for (let r = 1; r < n; r++) {
    const { index: l, value: c } = t(e[r]);
    s.push({ end: l - 1, start: o, value: i }), (o = l), (i = c);
  }
  return s.push({ end: Number.POSITIVE_INFINITY, start: o, value: i }), s;
}
function un(e) {
  return ln(e, ({ k: t, v: n }) => ({ index: t, value: n }));
}
function wt(e) {
  const { r: t, lvl: n } = e;
  return !I(t) && !I(t.r) && t.lvl === n && t.r.lvl === n
    ? M(t, { l: M(e, { r: t.l }), lvl: n + 1 })
    : e;
}
function cn(e) {
  const { l: t } = e;
  return !I(t) && t.lvl === e.lvl ? M(t, { r: M(e, { l: t.r }) }) : e;
}
function lt(e, t, n, o = 0) {
  let i = e.length - 1;
  for (; o <= i; ) {
    const s = Math.floor((o + i) / 2),
      r = e[s],
      l = n(r, t);
    if (l === 0) return s;
    if (l === -1) {
      if (i - o < 2) return s - 1;
      i = s - 1;
    } else {
      if (i === o) return s;
      o = s + 1;
    }
  }
  throw new Error(
    `Failed binary finding record in array - ${e.join(',')}, searched for ${t}`,
  );
}
function an(e, t, n) {
  return e[lt(e, t, n)];
}
function ko(e, t, n, o) {
  const i = lt(e, t, o),
    s = lt(e, n, o, i);
  return e.slice(i, s + 1);
}
function Wt({ index: e }, t) {
  return t === e ? 0 : t < e ? -1 : 1;
}
function So({ offset: e }, t) {
  return t === e ? 0 : t < e ? -1 : 1;
}
function xo(e) {
  return { index: e.index, value: e };
}
function To(e, t, n, o = 0) {
  return (
    o > 0 && (t = Math.max(t, an(e, o, Wt).offset)),
    (t = Math.max(0, t)),
    ln(ko(e, t, n, So), xo)
  );
}
const ye = [[], 0, 0, 0];
function yo(e, [t, n]) {
  let o = 0,
    i = 0,
    s = 0,
    r = 0;
  if (n !== 0) {
    (r = lt(e, n - 1, Wt)), (s = e[r].offset);
    const c = ae(t, n - 1);
    (o = c[0]),
      (i = c[1]),
      e.length && e[r].height === ae(t, n)[1] && (r -= 1),
      (e = e.slice(0, r + 1));
  } else e = [];
  for (const { start: l, value: c } of rn(t, n, Number.POSITIVE_INFINITY)) {
    const a = (l - o) * i + s;
    e.push({ height: c, index: l, offset: a }), (o = l), (s = a), (i = c);
  }
  return [e, i, s, o];
}
function Eo(e) {
  const { size: t, startIndex: n, endIndex: o } = e;
  return (i) =>
    i.start === n &&
    (i.end === o || i.end === Number.POSITIVE_INFINITY) &&
    i.value === t;
}
function $o(e, t) {
  let n = I(e) ? 0 : Number.POSITIVE_INFINITY;
  for (const o of t) {
    const { size: i, startIndex: s, endIndex: r } = o;
    if (((n = Math.min(n, s)), I(e))) {
      e = B(e, 0, i);
      continue;
    }
    const l = rn(e, s - 1, r + 1);
    if (l.some(Eo(o))) continue;
    let c = !1,
      a = !1;
    for (const { start: g, end: b, value: v } of l)
      c ? (r >= g || i === v) && (e = Et(e, g)) : ((a = v !== i), (c = !0)),
        b > r && r >= g && v !== i && (e = B(e, r + 1, v));
    a && (e = B(e, s, i));
  }
  return [e, n];
}
const ft = [Me(), 0];
function wo(e, [t, n]) {
  if (n.length > 0 && I(e) && t.length === 2) {
    const o = t[0].size,
      i = t[1].size;
    return [n.reduce((s, r) => B(B(s, r, o), r + 1, i), Me()), 0];
  }
  return $o(e, t);
}
const me = x();
u([]);
u([]);
u(0);
u(null);
u(Number.NaN);
const Ee = u(!1),
  pe = u(ft, (e) => {
    e.link(
      e.pipe(
        me,
        m((t) => t.length > 0),
        S(G),
        p(([t, n]) => wo(n, [t, []])),
      ),
      pe,
    );
  }),
  G = u(ft[0], (e) => {
    e.link(
      e.pipe(
        pe,
        p(([t]) => t),
      ),
      G,
    );
  }),
  pn = u(ft[1], (e) => {
    e.link(
      e.pipe(
        pe,
        p(([, t]) => t),
      ),
      pn,
    );
  }),
  $e = u(ye[1]),
  we = u(ye[0]),
  Fe = u(ye, (e) => {
    e.link(
      e.pipe(
        G,
        S(pn),
        se(([t], [n, o]) => yo(t, [n, o]), ye),
      ),
      Fe,
    ),
      e.link(
        e.pipe(
          Fe,
          p(([, t]) => t),
        ),
        $e,
      ),
      e.link(
        e.pipe(
          Fe,
          p(([t]) => t),
        ),
        we,
      );
  }),
  fn = u(ye[2], (e) => {
    e.link(
      e.pipe(
        Fe,
        p(([, , t]) => t),
      ),
      fn,
    );
  }),
  hn = u(ye[3], (e) => {
    e.link(
      e.pipe(
        Fe,
        p(([, , , t]) => t),
      ),
      hn,
    );
  }),
  Ae = u(0, (e) => {
    e.link(
      e.pipe(
        e.combine(ke, hn, fn, $e),
        p(([t, n, o, i]) => o + (t - n) * i),
      ),
      Ae,
    );
  });
function gn(e, t) {
  if (t.length === 0) return [0, 0];
  const { offset: n, index: o, height: i } = an(t, e, Wt);
  return [i * (e - o) + n, i];
}
function Lt(e, t) {
  return gn(e, t)[0];
}
function dn(e, t) {
  return Math.abs(e - t) < 1.01;
}
function mn() {
  return typeof navigator > 'u'
    ? !1
    : (/Macintosh/i.test(navigator.userAgent) &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 1) ||
        (/iP(ad|od|hone)/i.test(navigator.userAgent) &&
          /WebKit/i.test(navigator.userAgent));
}
function bn(e) {
  return !e;
}
function Lo(e) {
  return e === 1 ? 1 : 1 - 2 ** (-10 * e);
}
function vn(e = 1) {
  return (t, n) => {
    const o = n.signalInstance();
    return (
      n.sub(t, (i) => {
        let s = e;
        function r() {
          s > 0 ? (s--, requestAnimationFrame(r)) : n.pub(o, i);
        }
        r();
      }),
      o
    );
  };
}
const In = 'up',
  Tt = 'down',
  Ro = 'none',
  Mo = {
    atBottom: !1,
    notAtBottomBecause: 'NOT_SHOWING_LAST_ITEM',
    state: {
      offsetBottom: 0,
      scrollTop: 0,
      viewportHeight: 0,
      viewportWidth: 0,
      scrollHeight: 0,
    },
  },
  Ao = 0,
  Oo = 4;
function Gt(e) {
  return (t, n) => {
    const o = n.signalInstance();
    return (
      n.sub(t, (i) => {
        e > 0 ? e-- : n.pub(o, i);
      }),
      o
    );
  };
}
u(!1);
const kn = u(!0);
x();
const de = u(!1),
  No = x((e) => {
    e.link(e.pipe(kn, Ft(50)), No);
  }),
  Sn = u(Oo),
  Vo = u(Ao, (e) => {
    e.link(
      e.pipe(
        e.combine($, Vo),
        p(([t, n]) => t <= n),
      ),
      kn,
    );
  }),
  We = u(!1, (e) => {
    e.link(e.pipe($, Gt(1), F(!0)), We),
      e.link(e.pipe($, Gt(1), F(!1), be(100)), We);
  }),
  Rt = u(!1, (e) => {
    e.link(e.pipe(re, F(!0)), Rt), e.link(e.pipe(re, F(!1), be(200)), Rt);
  }),
  xn = u(!1),
  tt = u(
    null,
    (e) => {
      e.link(
        e.pipe(
          e.combine(j, $, Z, $n, Sn, at, gt, G),
          m(([, , , , , , , t]) => !I(t)),
          se((t, [n, o, i, s, r, l]) => {
            const a = o + i - n + l > -r,
              g = {
                viewportWidth: s,
                viewportHeight: i,
                scrollTop: o,
                scrollHeight: n,
                listMarginTop: l,
              };
            if (a) {
              let v, T;
              return (
                o > t.state.scrollTop
                  ? ((v = 'SCROLLED_DOWN'), (T = t.state.scrollTop - o))
                  : ((v = n === i ? 'LIST_TOO_SHORT' : 'SIZE_DECREASED'),
                    (T = t.state.scrollTop - o || t.scrollTopDelta)),
                {
                  atBottom: !0,
                  state: g,
                  atBottomBecause: v,
                  scrollTopDelta: T,
                }
              );
            }
            let b;
            return (
              i < t.state.viewportHeight
                ? (b = 'VIEWPORT_HEIGHT_DECREASING')
                : s < t.state.viewportWidth
                ? (b = 'VIEWPORT_WIDTH_DECREASING')
                : o < t.state.scrollTop
                ? (b = 'SCROLLING_UPWARDS')
                : g.scrollHeight > t.state.scrollHeight ||
                  g.listMarginTop < t.state.listMarginTop
                ? t.atBottom
                  ? (b = 'SIZE_INCREASED')
                  : (b = t.notAtBottomBecause)
                : t.atBottom
                ? (b = 'NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM')
                : (b = t.notAtBottomBecause),
              {
                atBottom: !1,
                notAtBottomBecause: b,
                state: g,
              }
            );
          }, Mo),
        ),
        tt,
      ),
        e.link(
          e.pipe(
            tt,
            se(
              ({ prev: t }, n) => {
                const o = !!(
                  t &&
                  n &&
                  t.atBottom &&
                  !n.atBottom &&
                  n.notAtBottomBecause === 'SIZE_INCREASED'
                );
                return {
                  prev: n,
                  shouldScroll: o,
                };
              },
              { prev: null, shouldScroll: !1 },
            ),
            p(({ shouldScroll: t }) => t),
          ),
          xn,
        ),
        e.sub(
          e.pipe(
            Z,
            S(tt),
            se(
              (t, [n, o]) => {
                let i = 0;
                return (
                  t.viewportHeight > n &&
                    o &&
                    !o.atBottom &&
                    o.notAtBottomBecause === 'VIEWPORT_HEIGHT_DECREASING' &&
                    (i = t.viewportHeight - n),
                  { viewportHeight: n, delta: i }
                );
              },
              { viewportHeight: 0, delta: 0 },
            ),
          ),
          (t) => {
            t.delta && e.pub(re, t.delta);
          },
        );
    },
    (e, t) =>
      !e || e.atBottom !== (t == null ? void 0 : t.atBottom)
        ? !1
        : !e.atBottom && !t.atBottom
        ? e.notAtBottomBecause === t.notAtBottomBecause
        : !0,
  ),
  Tn = u(0, (e) => {
    e.link(
      e.pipe(
        e.combine($, j, Z),
        se(
          (t, [n, o, i]) => {
            if (!dn(t.scrollHeight, o)) {
              const s = o - (n + i) < 1;
              return t.scrollTop !== n && s
                ? {
                    scrollHeight: o,
                    scrollTop: n,
                    jump: t.scrollTop - n,
                    changed: !0,
                  }
                : {
                    scrollHeight: o,
                    scrollTop: n,
                    jump: 0,
                    changed: !0,
                  };
            }
            return {
              scrollTop: n,
              scrollHeight: o,
              jump: 0,
              changed: !1,
            };
          },
          { scrollHeight: 0, jump: 0, scrollTop: 0, changed: !1 },
        ),
        m((t) => t.changed),
        p((t) => t.jump),
      ),
      Tn,
    );
  }),
  ut = u(Tt, (e) => {
    e.link(
      e.pipe(
        $,
        se(
          (t, n) =>
            e.getValue(Rt)
              ? { direction: t.direction, prevScrollTop: n }
              : { direction: n < t.prevScrollTop ? In : Tt, prevScrollTop: n },
          { direction: Tt, prevScrollTop: 0 },
        ),
        p((t) => t.direction),
      ),
      ut,
    ),
      e.link(e.pipe($, be(100), F(Ro)), ut);
  }),
  Zt = u(0, (e) => {
    e.link(e.pipe(We, m(bn), F(0)), Zt),
      e.link(
        e.pipe(
          $,
          Ft(100),
          S(We),
          m(([, t]) => !!t),
          se(([, t], [n]) => [t, n], [0, 0]),
          p(([t, n]) => n - t),
        ),
        Zt,
      );
  });
function Pt(e, t) {
  if (typeof e == 'number')
    return {
      index: e,
      offset: 0,
      behavior: 'auto',
      align: 'start-no-overflow',
    };
  const n = {
    index: Number.NaN,
    align: e.align ?? 'start-no-overflow',
    behavior: e.behavior ?? 'auto',
    offset: e.offset ?? 0,
  };
  return (
    e.index === 'LAST'
      ? (n.index = t)
      : e.index < 0
      ? (n.index = t + e.index)
      : (n.index = e.index),
    n
  );
}
function yn({
  location: e,
  sizeTree: t,
  offsetTree: n,
  totalHeight: o,
  totalCount: i,
  viewportHeight: s,
  headerHeight: r,
  stickyHeaderHeight: l,
  stickyFooterHeight: c,
}) {
  const { align: a, behavior: g, offset: b, index: v } = Pt(e, i - 1);
  function T() {
    const W = ae(t, v)[1];
    if (W === void 0) throw new Error(`Item at index ${v} not found`);
    return W;
  }
  s -= l + c;
  let k = Lt(v, n) + r - l;
  a === 'end' ? (k = k - s + T()) : a === 'center' && (k = k - s / 2 + T() / 2),
    b && (k += b);
  let d = 0;
  return (
    a === 'start' && (d = Math.max(0, Math.min(k - (o - s)))),
    (k = Math.max(0, k)),
    { top: k, behavior: g, align: a, forceBottomSpace: d }
  );
}
const De = u(null),
  Do = u(!1),
  nt = u(!0),
  Mt = x((e) => {
    e.link(
      e.pipe(
        Mt,
        p(() => !0),
      ),
      nt,
    ),
      e.link(
        e.pipe(
          Mt,
          p(() => null),
        ),
        De,
      );
  }),
  En = x((e) => {
    e.link(
      e.pipe(
        En,
        S(ke, we, qe),
        p(([t, n, o, i]) => {
          let { align: s, behavior: r, offset: l, index: c } = Pt(t, n - 1);
          const a = typeof t != 'number' ? t.done : void 0,
            [g, b] = gn(c, o);
          return g < -i.listOffset
            ? ((typeof t == 'number' || t.align === void 0) &&
                (s = 'start-no-overflow'),
              { index: c, align: s, behavior: r, offset: l, done: a })
            : g + b > -i.listOffset + i.visibleListHeight
            ? ((typeof t == 'number' || t.align === void 0) && (s = 'end'),
              { index: c, align: s, behavior: r, offset: l, done: a })
            : null;
        }),
        m((t) => t !== null),
      ),
      // @ts-expect-error contra variance
      te,
    );
  }),
  te = x((e) => {
    const t = e.pipe(
      te,
      S(G, we, ke, Z, ht, Ke, Ue, Ae),
      p(([n, o, i, s, r, l, c, a, g]) => {
        try {
          return yn({
            location: n,
            totalHeight: g,
            sizeTree: o,
            offsetTree: i,
            totalCount: s,
            viewportHeight: r,
            headerHeight: l,
            stickyHeaderHeight: c,
            stickyFooterHeight: a,
          });
        } catch {
          return null;
        }
      }),
      m((n) => n !== null),
    );
    e.link(te, De),
      e.link(t, Re),
      e.link(
        e.pipe(
          te,
          m((n) => typeof n != 'number' && n.index === 'LAST'),
          F(!0),
        ),
        de,
      ),
      e.link(e.pipe(t, F(!1)), nt),
      e.link(e.pipe(t, F(!1)), Do),
      e.link(
        e.pipe(
          G,
          // wait for the list to render with the specified sizeTree, so that enough space is available to scroll by
          be(0),
          S(nt, De),
          m(([, n, o]) => !n && o !== null),
          p(([, , n]) => n),
        ),
        te,
      ),
      e.sub(e.pipe(ze, be(10)), () => {
        const n = e.getValue(De);
        n !== null && typeof n != 'number' && n.done !== void 0 && n.done(),
          e.pubIn({
            [De]: null,
            [nt]: !0,
          });
      }),
      e.link(
        e.pipe(
          it,
          // wait for the list to render with the specified scrollOffset, so that enough space is available to scroll by
          Bt(),
          m((n) => n !== 0),
        ),
        re,
      ),
      e.link(
        e.pipe(
          it,
          tn($),
          p(() => 0),
        ),
        it,
      );
  }),
  Be = u(null),
  Le = u(null, (e) => {
    e.link(
      e.pipe(
        Le,
        m((n) => n !== null),
      ),
      Be,
    );
    const t = e.pipe(
      e.combine(Le, G),
      S(Be),
      m(([[n, o], i]) => n !== null && !I(o) && i !== null),
      p(([[n]]) => n),
    );
    e.link(e.pipe(t, Bt()), te),
      e.link(
        e.pipe(
          t,
          tn(e.pipe(Ye, m(bn))),
          F(null),
          // unset the location after the scroll completes
        ),
        Be,
      );
  });
function Co(e, t) {
  return [
    {
      data: t == null ? void 0 : t[e],
      prevData: (t == null ? void 0 : t[e - 1]) ?? null,
      nextData: (t == null ? void 0 : t[e + 1]) ?? null,
      height: 0,
      index: e,
      offset: 0,
      type: 'flat',
    },
  ];
}
const Fo = [],
  Ce = {
    items: Fo,
    listBottom: 0,
    listTop: 0,
    offsetTree: [],
    paddingBottom: 0,
    paddingTop: 0,
    totalCount: 0,
    totalHeight: 0,
    deviationDelta: 0,
    data: null,
  },
  Oe = u(Ce, (e) => {
    e.link(
      e.pipe(
        e.combine(Bo, Rn, G, we, ke, Ae, L, it, Le, Be, je, Ke, Ue, H, Ee, q),
        m((t) => {
          const n = t[t.length - 2],
            o = t[t.length - 1];
          return !n && !o;
        }),
        se((t, [n, o, i, s, r, l, c, a, g, b, v, T, k, d]) => {
          var fe;
          if ((c == null ? void 0 : c.length) === 0) return Ce;
          if (I(i)) {
            let X = 0;
            return (
              g !== null && (X = Pt(g, r - 1).index),
              { ...Ce, items: Co(X, c), offsetTree: s, totalCount: r, data: c }
            );
          }
          let W = 0;
          b !== null &&
            n === 0 &&
            (W =
              yn({
                totalHeight: l,
                location: b,
                sizeTree: i,
                offsetTree: s,
                totalCount: r,
                viewportHeight: e.getValue(Z),
                headerHeight: e.getValue(ht),
                stickyHeaderHeight: T,
                stickyFooterHeight: k,
              }).top ?? 0);
          let U = 0;
          e.getValue($) !== 0 &&
            !e.getValue(Ye) &&
            e.getValue(ut) === In &&
            t.totalCount === r &&
            t.items.length > 0 &&
            ((U = l - t.totalHeight), U !== 0 && (U += e.getValue(Tn)));
          const P = Math.min(Math.max(n + W + a - d - v + U, 0), l - o),
            J = P + o;
          if (
            t.offsetTree === s &&
            t.totalCount === r &&
            t.data === c &&
            P >= t.listTop &&
            J <= t.listBottom
          )
            return t;
          const Y = [],
            ne = r - 1,
            y = 0,
            le = To(s, P, J, y);
          let D = 0,
            Ge = 0,
            w = !1;
          for (const X of le) {
            const {
              value: { offset: Se, height: ie },
            } = X;
            let Q = X.start;
            (D = Se),
              Se < P &&
                ((Q += Math.floor((P - Se) / ie)), (D += (Q - X.start) * ie)),
              Q < y && ((D += (y - Q) * ie), (Q = y));
            const vt = Math.min(X.end, ne);
            for (let ee = Q; ee <= vt && !(D >= J); ee++) {
              const Ze = {
                data: c == null ? void 0 : c[ee],
                prevData: (c == null ? void 0 : c[ee - 1]) ?? null,
                nextData: (c == null ? void 0 : c[ee + 1]) ?? null,
                height: ie,
                index: ee,
                offset: D,
                type: 'flat',
              };
              w || ((w = !0), (Ge = D)), Y.push(Ze), (D += ie);
            }
          }
          const oe = l - D,
            bt = ((fe = Y[0]) == null ? void 0 : fe.offset) || 0;
          return {
            items: Y,
            listBottom: D,
            listTop: Ge,
            offsetTree: s,
            paddingBottom: oe,
            paddingTop: bt,
            totalCount: r,
            totalHeight: l,
            data: c,
            deviationDelta: U,
          };
        }, Ce),
      ),
      Oe,
    );
  }),
  ct = Ie([], (e) =>
    e.pipe(
      e.combine(Oe, $),
      p(([t, n]) => {
        const o = t.items.slice();
        for (; o.length > 0 && o[0].offset + o[0].height < n; ) o.shift();
        return o.map((i) => i.data);
      }),
    ),
  ),
  q = u(!1),
  _e = u(!1),
  ot = x((e) => {
    e.link(
      e.pipe(
        Oe,
        p((t) => t.deviationDelta),
        m((t) => t !== 0),
      ),
      ot,
    ),
      mn()
        ? (e.sub(e.pipe(ot, S(H, $)), ([t, n]) => {
            e.pub(H, n - t);
          }),
          e.sub(e.pipe(e.combine($, H, Ee, _e)), ([t, n, o, i]) => {
            o ||
              i ||
              (n > 0 && t < n
                ? (e.pub(q, !0),
                  e.pub(Re, { top: 0, behavior: 'instant' }),
                  setTimeout(() => {
                    e.pubIn({
                      [q]: !1,
                      [H]: 0,
                    });
                  }))
                : n < 0 &&
                  t <= 0 &&
                  (e.pubIn({
                    [q]: !0,
                    [H]: 0,
                  }),
                  setTimeout(() => {
                    e.pub(Re, { top: 0, behavior: 'instant' }), e.pub(q, !1);
                  })));
          }),
          e.sub(
            e.pipe(
              e.combine(We, H, q, Ee, _e),
              m(([t, n, o, i, s]) => !t && n !== 0 && !o && !i && !s),
              Ft(100),
            ),
            ([, t]) => {
              e.pub(q, !0),
                t < 0
                  ? requestAnimationFrame(() => {
                      e.pub(re, -t),
                        e.pub(H, 0),
                        requestAnimationFrame(() => {
                          e.pub(q, !1);
                        });
                    })
                  : requestAnimationFrame(() => {
                      e.pub(re, -t),
                        e.pub(H, 0),
                        requestAnimationFrame(() => {
                          e.pub(q, !1);
                        });
                    });
            },
          ))
        : e.link(ot, re);
  }),
  Ye = x(),
  Yt = u(!1),
  ze = x((e) => {
    e.link(e.pipe(ze, F(!1)), Ye);
  }, !1),
  $ = u(0),
  Z = u(0),
  $n = u(0),
  j = u(0),
  Bo = $,
  it = u(0),
  Ke = u(0),
  je = u(0),
  Ue = u(0),
  zt = u(0),
  At = u(null),
  wn = _t(),
  _o = Lo,
  Ho = 50,
  ht = Ie(0, (e) =>
    e.pipe(
      e.combine(Ke, je),
      p(([t, n]) => t + n),
    ),
  ),
  Ln = Ie(0, (e) =>
    e.pipe(
      e.combine(Ue, zt),
      p(([t, n]) => t + n),
    ),
  ),
  Wo = Ie(0, (e) =>
    e.pipe(
      e.combine(Ke, je, $),
      p(([t, n, o]) => t + Math.max(n - o, 0)),
    ),
  ),
  Po = Ie(0, (e) =>
    e.pipe(
      e.combine(Ue, zt, $, Z, j),
      p(([t, n, o, i, s]) => {
        o = Math.min(o, s - i);
        const r = Math.max(n - (s - (o + i)), 0);
        return t + r;
      }),
    ),
  ),
  Rn = Ie(0, (e) =>
    e.pipe(
      e.combine(Z, Wo, Po),
      p(([t, n, o]) => t - n - o),
    ),
  ),
  gt = u(0),
  Mn = u(0, (e) => {
    e.link(
      e.pipe(
        e.combine(Mn, Ae, Z),
        p(([t, n, o]) => (t === 0 ? 0 : Math.max(0, Math.min(t - (n - o))))),
      ),
      gt,
    );
  }),
  Re = x((e) => {
    e.link(
      e.pipe(
        Re,
        p((t) => (t.align === 'start' ? t.top ?? 0 : 0)),
      ),
      Mn,
    ),
      e.link(
        e.pipe(
          Re,
          S($),
          m(([t, n]) => t.top !== n),
          F(!0),
        ),
        Ye,
      );
  }),
  qe = Ie(
    {
      listOffset: 0,
      visibleListHeight: 0,
      scrollHeight: 0,
      bottomOffset: 0,
      isAtBottom: !1,
    },
    (e) =>
      e.pipe(
        e.combine($, ht, Ln, je, Rn, j, gt, Ee, Be, q, de),
        m(([, , , , , , , t, n, o]) => !t && n === null && !o),
        p(([t, n, o, i, s, r, l, c, a, g, b]) => {
          const v = e.getValue(Sn),
            T = r - n - o,
            k = -t + i,
            d = T + Math.min(0, k) - s - l;
          return {
            scrollHeight: T,
            listOffset: k,
            visibleListHeight: s,
            bottomOffset: d,
            isAtBottom: b || d <= v,
          };
        }),
      ),
  ),
  Ot = x((e) => {
    e.link(
      e.pipe(
        $,
        be(0),
        S(qe),
        m(([, t]) => t.scrollHeight > 0),
        p(([, t]) => t),
      ),
      Ot,
    );
  }),
  re = x(),
  H = u(0),
  st = u(0),
  at = u(0),
  An = u(''),
  Kt = x(),
  On = _t(),
  Nn = _t();
function Yo(e, t) {
  var r, l;
  const n = t.slice();
  let o = 0;
  const i = [];
  for (const { k: c, v: a } of ve(e)) {
    for (; n.length && n[0] < c; ) n.shift(), o++;
    const g = Math.max(0, c - o),
      b = ((r = i.at(-1)) == null ? void 0 : r.k) ?? -1;
    g === b
      ? (((l = i.at(-2)) == null ? void 0 : l.v) ?? -1) === a
        ? i.pop()
        : (i[i.length - 1].v = a)
      : i.push({ k: g, v: a });
  }
  let s = Me();
  for (const { k: c, v: a } of i) s = B(s, c, a);
  return s;
}
const ke = u(0),
  Pe = u(null),
  L = u(null, (e) => {
    e.link(
      e.pipe(
        L,
        m((t) => t !== null),
        p((t) => t.length),
      ),
      ke,
    );
  }),
  Ve = u(null),
  ue = x((e) => {
    e.link(
      e.pipe(
        ue,
        S($e),
        p(([n, o]) => -(o * n.length)),
      ),
      H,
    ),
      e.link(e.pipe(ue, F(!0)), _e),
      e.link(e.pipe(ue, Bt()), Ve);
    function t(n, o) {
      e.pubIn({
        [re]: n,
        [st]: n,
      }),
        o
          ? requestAnimationFrame(() => {
              e.pubIn({
                [H]: 0,
                [st]: 0,
                [Ve]: null,
                [_e]: !1,
              });
            })
          : e.pubIn({
              [H]: 0,
              [st]: 0,
              [Ve]: null,
              [_e]: !1,
            });
    }
    e.sub(
      e.pipe(
        we,
        S(Ve),
        m(([, n]) => n !== null),
        p(([n, o]) => {
          if (o === null) throw new Error('Unexpected null items');
          return Lt(o.length, n);
        }),
      ),
      (n) => {
        t(n, !1);
      },
    ),
      e.sub(
        e.pipe(
          ue,
          vn(2),
          S(we, Ve),
          m(([, , n]) => n !== null),
          p(([n, o]) => Lt(n.length, o)),
        ),
        (n) => {
          t(n, !0);
        },
      ),
      e.changeWith(L, ue, (n, o) => (n ? [...o, ...n] : o.slice())),
      e.link(
        e.pipe(
          ue,
          S(G, $e),
          p(([n, o, i]) => {
            const s = n.length,
              r = i;
            return ve(o).reduce(
              (c, { k: a, v: g }) => ({
                ranges: [
                  ...c.ranges,
                  {
                    startIndex: c.prevIndex,
                    endIndex: a + s - 1,
                    size: c.prevSize,
                  },
                ],
                prevIndex: a + s,
                prevSize: g,
              }),
              {
                ranges: [],
                prevIndex: 0,
                prevSize: r,
              },
            ).ranges;
          }),
        ),
        me,
      );
  }),
  dt = x((e) => {
    const t = e.pipe(
      dt,
      S(qe, Yt, Pe, G),
      m(([, , , , o]) => !I(o)),
      p(([{ data: o, scrollToBottom: i }, s, r, l]) => {
        if (i === !1 || i === void 0) return null;
        let c = 'auto';
        const a = s.isAtBottom;
        if (typeof i == 'function') {
          const g = i({
            data: o,
            scrollLocation: s,
            scrollInProgress: r,
            context: l,
            atBottom: a,
          });
          if (!g) return null;
          if (typeof g == 'object') return g;
          if (typeof g == 'number')
            return { index: g, align: 'end', behavior: 'auto' };
          c = g;
        } else {
          if (!a) return null;
          c = i;
        }
        return (
          c === !0 && (c = 'auto'), { index: 'LAST', align: 'end', behavior: c }
        );
      }),
    );
    e.link(
      e.pipe(
        t,
        m((o) => o !== null),
        p(() => !0),
      ),
      de,
    ),
      e.link(
        e.pipe(
          ze,
          S(de),
          m(([o, i]) => i),
          p(() => !1),
        ),
        de,
      );
    const n = e.pipe(
      Kt,
      S(de),
      m(([o, i]) => o === 'up' && i),
    );
    e.link(
      e.pipe(
        n,
        p(() => !1),
      ),
      de,
    ),
      e.link(e.pipe(n, F(!0)), Mt),
      e.link(
        e.pipe(
          t,
          m((o) => o !== null),
          be(20),
        ),
        te,
      );
  }),
  pt = x((e) => {
    e.changeWith(L, pt, (t, n) => (t ? [...t, ...n.data] : n.data.slice())),
      e.link(pt, dt);
  }),
  rt = x((e) => {
    e.changeWith(L, rt, (t, n) =>
      t
        ? [...t.slice(0, n.offset), ...n.data, ...t.slice(n.offset)]
        : n.data.slice(),
    ),
      e.changeWith(pe, rt, ([t], n) => {
        const i = ae(t, n.offset, 'k')[0],
          s = n.data.length;
        return [bo(t, i, Number.POSITIVE_INFINITY, (l, c) => [l + s, c]), i];
      }),
      e.link(rt, dt);
  }),
  Nt = x((e) => {
    e.changeWith(L, Nt, (t, { offset: n, count: o }) =>
      t ? t.slice(0, n).concat(t.slice(n + o)) : [],
    ),
      e.changeWith(pe, Nt, ([t], { offset: n, count: o }) => [vo(t, n, o), n]);
  }),
  yt = u(null),
  He = x((e) => {
    e.sub(
      e.pipe(
        He,
        S(L),
        m(([{ purgeItemSizes: t }, n]) => !!t || n === null || n.length === 0),
      ),
      ([t, n]) => {
        n === null || n.length === 0
          ? e.pubIn({
              ...(t.initialLocation ? { [Le]: t.initialLocation } : {}),
              [L]: t.data.slice(),
            })
          : e.pubIn({
              ...(t.initialLocation ? { [Le]: t.initialLocation } : {}),
              [pe]: ft,
              [Oe]: Ce,
              [yt]: t.data.slice(),
            });
      },
    ),
      e.sub(
        e.pipe(
          Nn,
          S(yt),
          m(([, t]) => t !== null),
        ),
        ([, t]) => {
          e.pubIn({
            [L]: t,
            [yt]: null,
          });
        },
      ),
      e.link(
        e.pipe(
          He,
          m(({ purgeItemSizes: t }) => !t),
          S($e),
          m(([, t]) => t > 0),
          p(([{ data: t }, n]) => [
            {
              size: n,
              startIndex: t.length,
              endIndex: Number.POSITIVE_INFINITY,
            },
          ]),
        ),
        me,
      ),
      e.sub(
        e.pipe(
          He,
          m(({ purgeItemSizes: t }) => !t),
        ),
        ({ data: t, initialLocation: n, suppressItemMeasure: o }) => {
          requestAnimationFrame(() => {
            o || e.pub(On),
              requestAnimationFrame(() => {
                n &&
                  e.pubIn({
                    [te]: n,
                  });
              });
          }),
            e.pubIn({
              [L]: t.slice(),
            });
        },
      );
  }),
  Jt = x((e) => {
    e.changeWith(L, Jt, (t, n) => (t ? t.slice(n) : [])),
      e.changeWith(pe, Jt, ([t], n) => [
        ve(t).reduce((i, { k: s, v: r }) => B(i, Math.max(0, s - n), r), Me()),
        0,
      ]);
  }),
  Xt = x((e) => {
    e.changeWith(L, Xt, (t, n) => (t ? t.slice(0, t.length - n) : [])),
      e.link(
        e.pipe(
          Xt,
          S(ke, $e),
          p(([, t, n]) => [
            {
              size: n,
              startIndex: t,
              endIndex: Number.POSITIVE_INFINITY,
            },
          ]),
        ),
        me,
      );
  }),
  Vn = x((e) => {
    const t = e.pipe(
      Vn,
      S(L),
      p(([n, o]) => {
        if (!o) return [];
        const i = [];
        return (
          o.forEach((s, r) => {
            n(s, r) && i.push(r);
          }),
          i
        );
      }),
    );
    e.changeWith(L, t, (n, o) => (n ? n.filter((i, s) => !o.includes(s)) : [])),
      e.changeWith(pe, t, ([n], o) => [Yo(n, o), 0]);
  }),
  Vt = x((e) => {
    e.changeWith(L, Vt, (t, { mapper: n }) => (t ? t.map(n) : [])),
      e.link(
        e.pipe(
          Vt,
          vn(3),
          S(xn),
          m(([{ autoscrollToBottomBehavior: t }, n]) => n && !!t),
          p(([{ autoscrollToBottomBehavior: t }]) =>
            typeof t == 'object'
              ? t.location()
              : { index: 'LAST', align: 'end', behavior: t },
          ),
          m((t) => !!t),
        ),
        te,
      );
  }),
  zo = ({ item: e, ItemContent: t, mount: n, unmount: o }) => {
    const i = C(Pe),
      s = h.useRef(null),
      r = h.useCallback(
        (l) => {
          l
            ? ((s.current = l), n(l))
            : s.current && (o(s.current), (s.current = null));
        },
        [n, o],
      );
    return /* @__PURE__ */ E('div', {
      ref: r,
      'data-index': e.index,
      'data-known-size': e.height,
      style: {
        overflowAnchor: 'none',
        position: 'absolute',
        width: '100%',
        top: e.offset,
      },
      children: /* @__PURE__ */ E(t, {
        index: e.index,
        prevData: e.prevData,
        nextData: e.nextData,
        data: e.data,
        context: i,
      }),
    });
  };
function Ko(e) {
  return jo(qo(Go(Uo(e), 8 * e.length))).toLowerCase();
}
function jo(e) {
  for (var t, n = '0123456789ABCDEF', o = '', i = 0; i < e.length; i++)
    (t = e.charCodeAt(i)), (o += n.charAt((t >>> 4) & 15) + n.charAt(15 & t));
  return o;
}
function Uo(e) {
  for (var t = Array(e.length >> 2), n = 0; n < t.length; n++) t[n] = 0;
  for (n = 0; n < 8 * e.length; n += 8)
    t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
  return t;
}
function qo(e) {
  for (var t = '', n = 0; n < 32 * e.length; n += 8)
    t += String.fromCharCode((e[n >> 5] >>> n % 32) & 255);
  return t;
}
function Go(e, t) {
  (e[t >> 5] |= 128 << t % 32), (e[14 + (((t + 64) >>> 9) << 4)] = t);
  for (
    var n = 1732584193, o = -271733879, i = -1732584194, s = 271733878, r = 0;
    r < e.length;
    r += 16
  ) {
    const l = n,
      c = o,
      a = i,
      g = s;
    (o = V(
      (o = V(
        (o = V(
          (o = V(
            (o = N(
              (o = N(
                (o = N(
                  (o = N(
                    (o = O(
                      (o = O(
                        (o = O(
                          (o = O(
                            (o = A(
                              (o = A(
                                (o = A(
                                  (o = A(
                                    o,
                                    (i = A(
                                      i,
                                      (s = A(
                                        s,
                                        (n = A(
                                          n,
                                          o,
                                          i,
                                          s,
                                          e[r + 0],
                                          7,
                                          -680876936,
                                        )),
                                        o,
                                        i,
                                        e[r + 1],
                                        12,
                                        -389564586,
                                      )),
                                      n,
                                      o,
                                      e[r + 2],
                                      17,
                                      606105819,
                                    )),
                                    s,
                                    n,
                                    e[r + 3],
                                    22,
                                    -1044525330,
                                  )),
                                  (i = A(
                                    i,
                                    (s = A(
                                      s,
                                      (n = A(
                                        n,
                                        o,
                                        i,
                                        s,
                                        e[r + 4],
                                        7,
                                        -176418897,
                                      )),
                                      o,
                                      i,
                                      e[r + 5],
                                      12,
                                      1200080426,
                                    )),
                                    n,
                                    o,
                                    e[r + 6],
                                    17,
                                    -1473231341,
                                  )),
                                  s,
                                  n,
                                  e[r + 7],
                                  22,
                                  -45705983,
                                )),
                                (i = A(
                                  i,
                                  (s = A(
                                    s,
                                    (n = A(
                                      n,
                                      o,
                                      i,
                                      s,
                                      e[r + 8],
                                      7,
                                      1770035416,
                                    )),
                                    o,
                                    i,
                                    e[r + 9],
                                    12,
                                    -1958414417,
                                  )),
                                  n,
                                  o,
                                  e[r + 10],
                                  17,
                                  -42063,
                                )),
                                s,
                                n,
                                e[r + 11],
                                22,
                                -1990404162,
                              )),
                              (i = A(
                                i,
                                (s = A(
                                  s,
                                  (n = A(n, o, i, s, e[r + 12], 7, 1804603682)),
                                  o,
                                  i,
                                  e[r + 13],
                                  12,
                                  -40341101,
                                )),
                                n,
                                o,
                                e[r + 14],
                                17,
                                -1502002290,
                              )),
                              s,
                              n,
                              e[r + 15],
                              22,
                              1236535329,
                            )),
                            (i = O(
                              i,
                              (s = O(
                                s,
                                (n = O(n, o, i, s, e[r + 1], 5, -165796510)),
                                o,
                                i,
                                e[r + 6],
                                9,
                                -1069501632,
                              )),
                              n,
                              o,
                              e[r + 11],
                              14,
                              643717713,
                            )),
                            s,
                            n,
                            e[r + 0],
                            20,
                            -373897302,
                          )),
                          (i = O(
                            i,
                            (s = O(
                              s,
                              (n = O(n, o, i, s, e[r + 5], 5, -701558691)),
                              o,
                              i,
                              e[r + 10],
                              9,
                              38016083,
                            )),
                            n,
                            o,
                            e[r + 15],
                            14,
                            -660478335,
                          )),
                          s,
                          n,
                          e[r + 4],
                          20,
                          -405537848,
                        )),
                        (i = O(
                          i,
                          (s = O(
                            s,
                            (n = O(n, o, i, s, e[r + 9], 5, 568446438)),
                            o,
                            i,
                            e[r + 14],
                            9,
                            -1019803690,
                          )),
                          n,
                          o,
                          e[r + 3],
                          14,
                          -187363961,
                        )),
                        s,
                        n,
                        e[r + 8],
                        20,
                        1163531501,
                      )),
                      (i = O(
                        i,
                        (s = O(
                          s,
                          (n = O(n, o, i, s, e[r + 13], 5, -1444681467)),
                          o,
                          i,
                          e[r + 2],
                          9,
                          -51403784,
                        )),
                        n,
                        o,
                        e[r + 7],
                        14,
                        1735328473,
                      )),
                      s,
                      n,
                      e[r + 12],
                      20,
                      -1926607734,
                    )),
                    (i = N(
                      i,
                      (s = N(
                        s,
                        (n = N(n, o, i, s, e[r + 5], 4, -378558)),
                        o,
                        i,
                        e[r + 8],
                        11,
                        -2022574463,
                      )),
                      n,
                      o,
                      e[r + 11],
                      16,
                      1839030562,
                    )),
                    s,
                    n,
                    e[r + 14],
                    23,
                    -35309556,
                  )),
                  (i = N(
                    i,
                    (s = N(
                      s,
                      (n = N(n, o, i, s, e[r + 1], 4, -1530992060)),
                      o,
                      i,
                      e[r + 4],
                      11,
                      1272893353,
                    )),
                    n,
                    o,
                    e[r + 7],
                    16,
                    -155497632,
                  )),
                  s,
                  n,
                  e[r + 10],
                  23,
                  -1094730640,
                )),
                (i = N(
                  i,
                  (s = N(
                    s,
                    (n = N(n, o, i, s, e[r + 13], 4, 681279174)),
                    o,
                    i,
                    e[r + 0],
                    11,
                    -358537222,
                  )),
                  n,
                  o,
                  e[r + 3],
                  16,
                  -722521979,
                )),
                s,
                n,
                e[r + 6],
                23,
                76029189,
              )),
              (i = N(
                i,
                (s = N(
                  s,
                  (n = N(n, o, i, s, e[r + 9], 4, -640364487)),
                  o,
                  i,
                  e[r + 12],
                  11,
                  -421815835,
                )),
                n,
                o,
                e[r + 15],
                16,
                530742520,
              )),
              s,
              n,
              e[r + 2],
              23,
              -995338651,
            )),
            (i = V(
              i,
              (s = V(
                s,
                (n = V(n, o, i, s, e[r + 0], 6, -198630844)),
                o,
                i,
                e[r + 7],
                10,
                1126891415,
              )),
              n,
              o,
              e[r + 14],
              15,
              -1416354905,
            )),
            s,
            n,
            e[r + 5],
            21,
            -57434055,
          )),
          (i = V(
            i,
            (s = V(
              s,
              (n = V(n, o, i, s, e[r + 12], 6, 1700485571)),
              o,
              i,
              e[r + 3],
              10,
              -1894986606,
            )),
            n,
            o,
            e[r + 10],
            15,
            -1051523,
          )),
          s,
          n,
          e[r + 1],
          21,
          -2054922799,
        )),
        (i = V(
          i,
          (s = V(
            s,
            (n = V(n, o, i, s, e[r + 8], 6, 1873313359)),
            o,
            i,
            e[r + 15],
            10,
            -30611744,
          )),
          n,
          o,
          e[r + 6],
          15,
          -1560198380,
        )),
        s,
        n,
        e[r + 13],
        21,
        1309151649,
      )),
      (i = V(
        i,
        (s = V(
          s,
          (n = V(n, o, i, s, e[r + 4], 6, -145523070)),
          o,
          i,
          e[r + 11],
          10,
          -1120210379,
        )),
        n,
        o,
        e[r + 2],
        15,
        718787259,
      )),
      s,
      n,
      e[r + 9],
      21,
      -343485551,
    )),
      (n = ce(n, l)),
      (o = ce(o, c)),
      (i = ce(i, a)),
      (s = ce(s, g));
  }
  return [n, o, i, s];
}
function mt(e, t, n, o, i, s) {
  return ce(Zo(ce(ce(t, e), ce(o, s)), i), n);
}
function A(e, t, n, o, i, s, r) {
  return mt((t & n) | (~t & o), e, t, i, s, r);
}
function O(e, t, n, o, i, s, r) {
  return mt((t & o) | (n & ~o), e, t, i, s, r);
}
function N(e, t, n, o, i, s, r) {
  return mt(t ^ n ^ o, e, t, i, s, r);
}
function V(e, t, n, o, i, s, r) {
  return mt(n ^ (t | ~o), e, t, i, s, r);
}
function ce(e, t) {
  const n = (65535 & e) + (65535 & t);
  return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
}
function Zo(e, t) {
  return (e << t) | (e >>> (32 - t));
}
const Dn = Symbol('INVALID_KEY');
function Jo(e) {
  const t = e.slice(0, 32),
    n = e.slice(32),
    o = atob(n);
  if (t !== Ko(n)) return Dn;
  const [i, s] = o.split(';'),
    r = i.slice(2),
    l = new Date(Number(s.slice(2)));
  return { orderNumber: r, expiryDate: l };
}
const Xo = {
    valid: !1,
    consoleMessage:
      'The VirtuosoMessageList license wrapper component is missing. Enclose the VirtuosoMessageList with VirtuosoMessageListLicense and add your key at the lisenceKey property.',
    watermarkMessage:
      'The VirtuosoMessageList license wrapper component is missing. Enclose the VirtuosoMessageList with VirtuosoMessageListLicense and add your key at the lisenceKey property.',
  },
  Qo = {
    valid: !1,
    consoleMessage:
      'Your VirtuosoMessageListLicense is missing a license key. Purchase one from https://virtuoso.dev/pricing/',
    watermarkMessage:
      'Your VirtuosoMessageListLicense is missing a license key. Purchase one from https://virtuoso.dev/pricing/',
  },
  ei = {
    valid: !1,
    consoleMessage:
      'Your VirtuosoMessageListLicense component is missing a license key - this component will not work if deployed in production. Purchase a key from https://virtuoso.dev/pricing/ before you deploy to production.',
  },
  Cn = {
    valid: !0,
  },
  ti = {
    valid: !1,
    consoleMessage:
      'Your Virtuoso Message List license key is invalid. Ensure that you have copy-pasted the key from the purchase email correctly.',
    watermarkMessage: 'Your Virtuoso Message List license key is invalid',
  },
  ni = {
    valid: !1,
    consoleMessage:
      'Your annual license key to use Virtuoso Message List in non-production environments has expired. You can still use it in production. To keep using it in development, purchase a new key from https://virtuoso.dev/pricing/',
    watermarkMessage:
      'Your annual license key to use Virtuoso Message List in non-production environments has expired. You can still use it in production. To keep using it in development, purchase a new key from https://virtuoso.dev/pricing/',
  },
  oi = {
    valid: !1,
    consoleMessage:
      'You have installed a version of `@virtuoso.dev/message-list` that is newer than the period of your license key. Either downgrade to a supported version, or purchase a new license from https://virtuoso.dev/pricing/',
    watermarkMessage:
      'You have installed a version of `@virtuoso.dev/message-list` that is newer than the period of your license key. Either downgrade to a supported version, or purchase a new license from https://virtuoso.dev/pricing/',
  },
  ii = Cn,
  si = /^(?:127\.0\.0\.1|localhost|0\.0\.0\.0|.+\.local)$/,
  ri = ['virtuoso.dev', 'csb.app', 'codesandbox.io'];
function li({ licenseKey: e, now: t, hostname: n, packageTimestamp: o }) {
  const i = n.match(si),
    s = ri.some((l) => n.endsWith(l));
  if (!e) return s ? ii : i ? ei : Qo;
  const r = Jo(e);
  if (r === Dn) return ti;
  if (r.expiryDate.getTime() < t.getTime()) {
    if (i) return ni;
    if (r.expiryDate.getTime() < o) return oi;
  }
  return Cn;
}
const Fn = h.createContext(Xo),
  ui = ({ licenseKey: e, children: t }) => {
    const n = li({
      licenseKey: e,
      hostname: typeof window < 'u' ? window.location.hostname : 'localhost',
      now: /* @__PURE__ */ new Date(),
      packageTimestamp: 1740169352098,
    });
    return /* @__PURE__ */ E(Fn.Provider, { value: n, children: t });
  };
ui.displayName = Math.random().toString(36).slice(2, 8);
const ci = h.createContext(void 0),
  Bn = u(null),
  _n = u(null),
  Hn = u(null),
  Wn = u(null),
  Pn = u(null),
  Yn = u('div'),
  ai = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  Xe = {
    overflowAnchor: 'none',
  },
  pi = {
    position: 'sticky',
    bottom: 0,
  },
  zn = h.forwardRef((e, t) =>
    /* @__PURE__ */ E('div', { style: { zIndex: 1 }, ...e, ref: t }),
  ),
  Kn = h.forwardRef((e, t) => /* @__PURE__ */ E('div', { ...e, ref: t })),
  jn = h.forwardRef(({ style: e, ...t }, n) =>
    /* @__PURE__ */ E('div', { ...t, style: { ...ai, ...e }, ref: n }),
  ),
  Un = h.forwardRef(({ style: e, ...t }, n) =>
    /* @__PURE__ */ E('div', { ...t, style: { ...pi, ...e }, ref: n }),
  ),
  qn = u(zn),
  Gn = u(jn),
  Zn = u(Kn),
  Jn = u(Un),
  Xn = ({ index: e }) =>
    /* @__PURE__ */ en('div', {
      children: ['Item ', e],
    }),
  Qn = ({ index: e }) => e,
  Dt = u(Xn),
  eo = u(Qn),
  Ct = u('top', (e) => {
    e.link(
      e.pipe(
        e.combine(Ct, Ae, Z, ht, Ln),
        m(([t]) => t === 'bottom' || t === 'bottom-smooth'),
        p(([, t, n, o, i]) => Math.max(0, n - t - o - i)),
      ),
      at,
    ),
      e.link(
        e.pipe(
          e.combine(at, Ct),
          m(([, t]) => t === 'bottom-smooth'),
          se((t, [n]) => [t[1], n], [0, 0]),
          p(([t, n]) => (t > 0 && n > 0 ? 'margin-top 0.2s ease-out' : '')),
        ),
        An,
      );
  });
function Qe(e) {
  const t = h.useRef(null);
  return [
    h.useCallback(
      (o) => {
        o
          ? ((t.current = o), e == null || e.observe(o, { box: 'border-box' }))
          : t.current &&
            (e == null || e.unobserve(t.current), (t.current = null));
      },
      [e],
    ),
    t,
  ];
}
function fi(e, t, n) {
  const o = Ht(),
    i = h.useRef(null),
    s = h.useRef(null),
    r = h.useCallback(() => {
      i.current &&
        (cancelAnimationFrame(i.current),
        (i.current = null),
        (s.current = null));
    }, []);
  h.useEffect(
    () =>
      o.sub(Kt, (a) => {
        a !== s.current && r();
      }),
    [o, r],
  ),
    h.useEffect(() => o.sub(wn, r), [o, r]);
  const l = h.useCallback(
    (a, g, b) => {
      var W;
      i.current && r();
      const v = ((W = e.current) == null ? void 0 : W.scrollTop) ?? 0;
      s.current = v < a ? 'down' : 'up';
      let T = 0,
        k = 0;
      function d() {
        var P, J;
        const U = v + (a - v) * g(T);
        (P = e.current) == null || P.scrollTo({ top: U, behavior: 'instant' }),
          (T += 1 / b),
          (k += 1),
          k < b
            ? (i.current = requestAnimationFrame(d))
            : ((J = e.current) == null ||
                J.scrollTo({ top: a, behavior: 'instant' }),
              (i.current = null),
              (s.current = null));
      }
      d();
    },
    [e, r],
  );
  return h.useCallback(
    (a) => {
      var g, b, v, T;
      if (a.top === ((g = e.current) == null ? void 0 : g.scrollTop)) {
        o.pub(ze, (b = e.current) == null ? void 0 : b.scrollTop);
        return;
      }
      if (
        (a.top !== void 0 && ((n.current = a.top), o.pub(Yt, !0)),
        a.forceBottomSpace !== void 0 &&
          t.current &&
          (t.current.style.paddingBottom = `${a.forceBottomSpace}px`),
        a.behavior === 'smooth')
      )
        l(a.top ?? 0, _o, Ho);
      else if (
        a.behavior === 'auto' ||
        a.behavior === 'instant' ||
        a.behavior === void 0
      )
        r(), (v = e.current) == null || v.scrollTo(a);
      else {
        const { easing: k, animationFrameCount: d } = a.behavior(
          ((T = e.current) == null ? void 0 : T.scrollTop) ?? 0,
          a.top ?? 0,
        );
        l(a.top ?? 0, k, d);
      }
    },
    [o, l, t, e, n, r],
  );
}
function to(e) {
  return {
    data: {
      prepend: (t) => {
        e.pub(ue, t);
      },
      append: (t, n) => {
        e.pub(pt, {
          data: t,
          scrollToBottom: n,
        });
      },
      replace: (t, n) => {
        e.pub(He, {
          ...n,
          data: t,
        });
      },
      map: (t, n) => {
        e.pub(Vt, {
          mapper: t,
          autoscrollToBottomBehavior: n,
        });
      },
      findAndDelete: (t) => {
        e.pub(Vn, t);
      },
      findIndex: (t) => e.getValue(L).findIndex(t),
      find: (t) => e.getValue(L).find(t),
      insert: (t, n, o) => {
        e.pub(rt, {
          data: t,
          offset: n,
          scrollToBottom: o,
        });
      },
      deleteRange: (t, n) => {
        e.pub(Nt, {
          offset: t,
          count: n,
        });
      },
      batch: (t, n) => {
        e.pub(Ee, !0),
          t(),
          e.pub(Ee, !1),
          e.pub(dt, { data: [], scrollToBottom: n });
      },
      get: () => e.getValue(L).slice(),
      getCurrentlyRendered: () => e.getValue(ct),
    },
    scrollToItem: (t) => {
      e.pub(te, t);
    },
    scrollIntoView: (t) => {
      e.pub(En, t);
    },
    scrollerElement: () => e.getValue(At),
    getScrollLocation() {
      return e.getValue(qe);
    },
    cancelSmoothScroll() {
      e.pub(wn);
    },
    height: (t) => {
      var i;
      const n = ((i = e.getValue(L)) == null ? void 0 : i.indexOf(t)) ?? -1;
      if (n === -1) return 0;
      const o = e.getValue(G);
      return ae(o, n)[1] ?? 0;
    },
  };
}
let Qt = !1;
const hi = h.forwardRef(
  (
    {
      initialData: e = [],
      computeItemKey: t = Qn,
      context: n = null,
      initialLocation: o = null,
      shortSizeAlign: i = 'top',
      onScroll: s,
      onRenderedDataChange: r,
      ItemContent: l = Xn,
      Header: c = null,
      StickyHeader: a = null,
      Footer: g = null,
      StickyFooter: b = null,
      EmptyPlaceholder: v = null,
      HeaderWrapper: T = zn,
      StickyHeaderWrapper: k = jn,
      FooterWrapper: d = Kn,
      StickyFooterWrapper: W = Un,
      ScrollElement: U = 'div',
      ...P
    },
    J,
  ) => {
    const Y = h.useMemo(() => {
      const y = new ho();
      return (
        y.register(Oe),
        y.register(Ye),
        y.register(ut),
        y.register(ot),
        y.register(tt),
        y.register(pt),
        y.register(ue),
        y.register(He),
        y.pubIn({
          [L]: e.slice(),
          [Pe]: n,
          [eo]: t,
          [Le]: o,
          [Dt]: l,
          [Bn]: c,
          [Hn]: g,
          [_n]: a,
          [Wn]: b,
          [Pn]: v,
          [Yn]: U,
          [Jn]: W,
          [Gn]: k,
          [Zn]: d,
          [qn]: T,
          [Ct]: i,
        }),
        y.singletonSub(Ot, s),
        y.singletonSub(ct, r),
        y
      );
    }, []);
    h.useImperativeHandle(J, () => to(Y), [Y]),
      h.useEffect(() => {
        Y.pubIn({
          [Pe]: n,
          [Dt]: l,
        }),
          Y.singletonSub(Ot, s),
          Y.singletonSub(ct, r);
      });
    const ne = h.useContext(Fn);
    return (
      h.useEffect(() => {
        ne.consoleMessage &&
          (Qt || ((Qt = !0), console.warn(ne.consoleMessage)));
      }, [ne]),
      h.useEffect(() => {
        const y = (le) => {
          var D;
          (D = le.message) != null &&
            D.includes('ResizeObserver loop') &&
            (le.preventDefault(),
            le.stopPropagation(),
            le.stopImmediatePropagation());
        };
        return (
          window.addEventListener('error', y, { capture: !0 }),
          () => {
            window.removeEventListener('error', y);
          }
        );
      }, []),
      typeof window < 'u' && ne.watermarkMessage
        ? /* @__PURE__ */ E('div', {
            style: {
              color: 'red',
              pointerEvents: 'none',
            },
            children: ne.watermarkMessage,
          })
        : /* @__PURE__ */ E(go.Provider, {
            value: Y,
            children: /* @__PURE__ */ E(gi, { ...P }),
          })
    );
  },
);
hi.displayName = 'VirtuosoMessageList';
const gi = ({ style: e, ...t }) => {
  const n = Ht(),
    o = h.useContext(ci),
    [i, s, r, l, c, a, g, b, v, T, k] = mo(
      Bn,
      _n,
      qn,
      Gn,
      Hn,
      Wn,
      Zn,
      Jn,
      Dt,
      Pn,
      Yn,
    ),
    [d] = h.useState(() => {
      if (typeof window < 'u' && typeof ResizeObserver > 'u')
        throw new Error(
          'ResizeObserver not found. Please ensure that you have a polyfill installed.',
        );
      if (!(typeof ResizeObserver > 'u'))
        return new ResizeObserver((f) => {
          var Je, xe, Ne, jt;
          const z = f.length,
            _ = [];
          let R = {};
          for (let It = 0; It < z; It++) {
            const ge = f[It],
              K = ge.target;
            if (K === ne.current) {
              R = {
                ...R,
                [je]: ge.contentRect.height,
                [j]: (Je = w.current) == null ? void 0 : Je.scrollHeight,
              };
              continue;
            }
            if (K === le.current) {
              R = {
                ...R,
                [Ke]: ge.contentRect.height,
                [j]: (xe = w.current) == null ? void 0 : xe.scrollHeight,
              };
              continue;
            }
            if (K === U.current) {
              R = {
                ...R,
                [zt]: ge.contentRect.height,
                [j]: (Ne = w.current) == null ? void 0 : Ne.scrollHeight,
              };
              continue;
            }
            if (K === J.current) {
              R = {
                ...R,
                [Ue]: ge.contentRect.height,
                [j]: (jt = w.current) == null ? void 0 : jt.scrollHeight,
              };
              continue;
            }
            if (K === w.current) {
              R = {
                ...R,
                [$]: K.scrollTop,
                [j]: K.scrollHeight,
                [Z]: ge.contentRect.height,
                [$n]: K.clientWidth,
              };
              continue;
            }
            if (K === oe.current) {
              w.current &&
                (R = {
                  ...R,
                  [j]: w.current.scrollHeight,
                });
              continue;
            }
            if (K.dataset.index === void 0) continue;
            const kt = Number.parseInt(K.dataset.index),
              po = Number.parseFloat(K.dataset.knownSize ?? ''),
              St = ge.contentRect.height;
            if (St === po) continue;
            const Ut = _[_.length - 1];
            _.length === 0 || Ut.size !== St || Ut.endIndex !== kt - 1
              ? _.push({ endIndex: kt, size: St, startIndex: kt })
              : _[_.length - 1].endIndex++;
          }
          _.length > 0 &&
            (R = {
              ...R,
              [me]: _,
            }),
            n.pubIn(R);
        });
    }),
    [W, U] = Qe(d),
    [P, J] = Qe(d),
    [Y, ne] = Qe(d),
    [y, le] = Qe(d),
    D = h.useCallback(
      (f) => {
        if (o) {
          const z = Number.parseInt(f.dataset.index ?? '');
          n.pub(me, [
            {
              startIndex: z,
              endIndex: z,
              size: o.itemHeight,
            },
          ]);
        }
        d == null || d.observe(f);
      },
      [d, n, o],
    ),
    Ge = h.useCallback(
      (f) => {
        d == null || d.unobserve(f);
      },
      [d],
    ),
    w = h.useRef(null),
    oe = h.useRef(null),
    bt = h.useCallback(
      (f) => {
        f
          ? ((oe.current = f), d == null || d.observe(f, { box: 'border-box' }))
          : oe.current &&
            (d == null || d.unobserve(oe.current), (oe.current = null));
      },
      [d],
    ),
    fe = h.useRef(null),
    X = fi(w, oe, fe),
    Se = h.useCallback((f) => {
      w.current && (w.current.scrollTop += f);
    }, []),
    ie = h.useCallback(() => {
      const f = w.current;
      if (f !== null) {
        if (fe.current !== null) {
          const z = f.scrollHeight - f.clientHeight;
          dn(f.scrollTop, Math.min(z, fe.current)) &&
            ((fe.current = null), n.pub(Yt, !1), n.pub(ze, f.scrollTop));
        }
        n.pub($, f.scrollTop);
      }
    }, [n]),
    Q = h.useCallback(
      (f) => {
        n.pub(Kt, f.deltaY > 0 ? 'down' : 'up');
      },
      [n],
    ),
    vt = h.useCallback(
      (f) => {
        f
          ? (n.pub(At, f),
            (w.current = f),
            f.addEventListener('scroll', ie),
            f.addEventListener('wheel', Q),
            o &&
              n.pubIn({
                [Z]: o.viewportHeight,
                [j]: o.viewportHeight,
                [$]: 0,
              }),
            d == null || d.observe(f, { box: 'border-box' }))
          : w.current &&
            (w.current.removeEventListener('scroll', ie),
            w.current.removeEventListener('wheel', Q),
            n.pub(At, null),
            d == null || d.unobserve(w.current),
            (w.current = null));
      },
      [d, n, ie, Q, o],
    ),
    { items: ee } = C(Oe);
  h.useLayoutEffect(() => {
    if (!mn()) return;
    const f = setInterval(() => {
      var z;
      n.pub(j, (z = w.current) == null ? void 0 : z.scrollHeight);
    }, 1e3);
    return () => {
      clearInterval(f);
    };
  }, [n]),
    h.useLayoutEffect(() => n.sub(Re, X), [X, n]),
    h.useLayoutEffect(() => n.sub(re, Se), [Se, n]);
  const Ze = h.useCallback(() => {
    var z;
    const f = [];
    for (const _ of ((z = oe.current) == null ? void 0 : z.children) ?? []) {
      if (_.dataset.index === void 0) continue;
      const R = Number.parseInt(_.dataset.index),
        Je = Number.parseFloat(_.dataset.knownSize ?? ''),
        xe = _.getBoundingClientRect().height;
      if (xe === Je) continue;
      const Ne = f[f.length - 1];
      f.length === 0 || Ne.size !== xe || Ne.endIndex !== R - 1
        ? f.push({ endIndex: R, size: xe, startIndex: R })
        : f[f.length - 1].endIndex++;
    }
    n.pub(me, f);
  }, [n]);
  h.useLayoutEffect(() => n.sub(On, Ze), [Ze, n]);
  const no = C(H),
    oo = C(st),
    io = C(q),
    so = C(at),
    ro = C(gt),
    lo = C(An),
    he = C(Pe),
    uo = C(eo),
    co = C(ke),
    ao = C(Ae);
  return (
    h.useLayoutEffect(() => {
      ee.length === 0 && n.pub(Nn);
    }, [ee, n]),
    /* @__PURE__ */ E(fo, {
      children: /* @__PURE__ */ en(k, {
        ...t,
        ref: vt,
        'data-testid': 'virtuoso-scroller',
        style: {
          overflowY: io ? 'hidden' : 'scroll',
          boxSizing: 'border-box',
          ...e,
        },
        ...(k === 'div' ? { context: he } : {}),
        children: [
          s &&
            /* @__PURE__ */ E(l, {
              ref: y,
              style: Xe,
              children: /* @__PURE__ */ E(s, { context: he }),
            }),
          i &&
            /* @__PURE__ */ E(r, {
              ref: Y,
              style: Xe,
              children: /* @__PURE__ */ E(i, { context: he }),
            }),
          co > 0
            ? /* @__PURE__ */ E('div', {
                ref: bt,
                'data-testid': 'virtuoso-list',
                style: {
                  boxSizing: 'content-box',
                  height: ao,
                  paddingBottom: ro,
                  overflowAnchor: 'none',
                  marginTop: so,
                  transition: lo,
                  position: 'relative',
                  transform: `translateY(${no + oo}px)`,
                },
                children: ee.map((f) =>
                  /* @__PURE__ */ E(
                    zo,
                    {
                      mount: D,
                      unmount: Ge,
                      item: f,
                      ItemContent: v,
                    },
                    uo({ index: f.index, data: f.data, context: he }),
                  ),
                ),
              })
            : T
            ? /* @__PURE__ */ E(T, { context: he })
            : null,
          c &&
            /* @__PURE__ */ E(g, {
              ref: W,
              style: Xe,
              children: /* @__PURE__ */ E(c, { context: he }),
            }),
          a &&
            /* @__PURE__ */ E(b, {
              ref: P,
              style: Xe,
              children: /* @__PURE__ */ E(a, { context: he }),
            }),
        ],
      }),
    })
  );
};
function vi() {
  return C(qe);
}
function Ii() {
  return C(ct);
}
function ki() {
  const e = Ht();
  return h.useMemo(() => to(e), [e]);
}
export {
  hi as VirtuosoMessageList,
  ui as VirtuosoMessageListLicense,
  ci as VirtuosoMessageListTestingContext,
  Ii as useCurrentlyRenderedData,
  vi as useVirtuosoLocation,
  ki as useVirtuosoMethods,
};
