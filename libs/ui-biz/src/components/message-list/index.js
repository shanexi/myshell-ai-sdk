import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import {
  Cell,
  Signal,
  map,
  filter,
  withLatestFrom,
  scan,
  debounceTime,
  mapTo,
  throttleTime,
  delayWithMicrotask,
  onNext,
  Action,
  useCellValue,
  useRealm,
  Realm,
  RealmContext,
  useCellValues,
} from '@virtuoso.dev/gurx';
import React from 'react';

// uncomment this line to disable warning in ssr
React.useLayoutEffect = React.useEffect

function Ie(e, t) {
  const n = Cell(e, (o) => {
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
  for (; o <= i;) {
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
    let c = false,
      a = false;
    for (const { start: g, end: b, value: v } of l)
      c ? (r >= g || i === v) && (e = Et(e, g)) : ((a = v !== i), (c = true)),
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
const me = Signal();
Cell([]);
Cell([]);
Cell(0);
Cell(null);
Cell(Number.NaN);
const Ee = Cell(false),
  pe = Cell(ft, (e) => {
    e.link(
      e.pipe(
        me,
        filter((t) => t.length > 0),
        withLatestFrom(sizeTree$),
        map(([t, n]) => wo(n, [t, []])),
      ),
      pe,
    );
  }),
  sizeTree$ = Cell(ft[0], (e) => {
    e.link(
      e.pipe(
        pe,
        map(([t]) => t),
      ),
      sizeTree$,
    );
  }),
  pn = Cell(ft[1], (e) => {
    e.link(
      e.pipe(
        pe,
        map(([, t]) => t),
      ),
      pn,
    );
  }),
  $e = Cell(ye[1]),
  offsetTree$ = Cell(ye[0]),
  Fe = Cell(ye, (e) => {
    e.link(
      e.pipe(
        sizeTree$,
        withLatestFrom(pn),
        scan(([t], [n, o]) => yo(t, [n, o]), ye),
      ),
      Fe,
    ),
      e.link(
        e.pipe(
          Fe,
          map(([, t]) => t),
        ),
        $e,
      ),
      e.link(
        e.pipe(
          Fe,
          map(([t]) => t),
        ),
        offsetTree$,
      );
  }),
  fn = Cell(ye[2], (e) => {
    e.link(
      e.pipe(
        Fe,
        map(([, , t]) => t),
      ),
      fn,
    );
  }),
  hn = Cell(ye[3], (e) => {
    e.link(
      e.pipe(
        Fe,
        map(([, , , t]) => t),
      ),
      hn,
    );
  }),
  totalHeight$ = Cell(0, (e) => {
    e.link(
      e.pipe(
        e.combine(totalCount$, hn, fn, $e),
        map(([t, n, o, i]) => o + (t - n) * i),
      ),
      totalHeight$,
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
    ? false
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
    atBottom: false,
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
Cell(false);
const kn = Cell(true);
Signal();
const de = Cell(false),
  No = Signal((e) => {
    e.link(e.pipe(kn, throttleTime(50)), No);
  }),
  Sn = Cell(Oo),
  Vo = Cell(Ao, (e) => {
    e.link(
      e.pipe(
        e.combine($, Vo),
        map(([t, n]) => t <= n),
      ),
      kn,
    );
  }),
  We = Cell(false, (e) => {
    e.link(e.pipe($, Gt(1), mapTo(true)), We),
      e.link(e.pipe($, Gt(1), mapTo(false), debounceTime(100)), We);
  }),
  Rt = Cell(false, (e) => {
    e.link(e.pipe(re, mapTo(true)), Rt), e.link(e.pipe(re, mapTo(false), debounceTime(200)), Rt);
  }),
  xn = Cell(false),
  tt = Cell(
    null,
    (e) => {
      e.link(
        e.pipe(
          e.combine(j, $, viewportHeight, $n, Sn, marginTop$, paddingBottom$, sizeTree$),
          filter(([, , , , , , , t]) => !I(t)),
          scan((t, [n, o, i, s, r, l]) => {
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
                  atBottom: true,
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
                atBottom: false,
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
            scan(
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
              { prev: null, shouldScroll: false },
            ),
            map(({ shouldScroll: t }) => t),
          ),
          xn,
        ),
        e.sub(
          e.pipe(
            viewportHeight,
            withLatestFrom(tt),
            scan(
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
        ? false
        : !e.atBottom && !t.atBottom
          ? e.notAtBottomBecause === t.notAtBottomBecause
          : true,
  ),
  Tn = Cell(0, (e) => {
    e.link(
      e.pipe(
        e.combine($, j, viewportHeight),
        scan(
          (t, [n, o, i]) => {
            if (!dn(t.scrollHeight, o)) {
              const s = o - (n + i) < 1;
              return t.scrollTop !== n && s
                ? {
                  scrollHeight: o,
                  scrollTop: n,
                  jump: t.scrollTop - n,
                  changed: true,
                }
                : {
                  scrollHeight: o,
                  scrollTop: n,
                  jump: 0,
                  changed: true,
                };
            }
            return {
              scrollTop: n,
              scrollHeight: o,
              jump: 0,
              changed: false,
            };
          },
          { scrollHeight: 0, jump: 0, scrollTop: 0, changed: false },
        ),
        filter((t) => t.changed),
        map((t) => t.jump),
      ),
      Tn,
    );
  }),
  ut = Cell(Tt, (e) => {
    e.link(
      e.pipe(
        $,
        scan(
          (t, n) =>
            e.getValue(Rt)
              ? { direction: t.direction, prevScrollTop: n }
              : { direction: n < t.prevScrollTop ? In : Tt, prevScrollTop: n },
          { direction: Tt, prevScrollTop: 0 },
        ),
        map((t) => t.direction),
      ),
      ut,
    ),
      e.link(e.pipe($, debounceTime(100), mapTo(Ro)), ut);
  }),
  Zt = Cell(0, (e) => {
    e.link(e.pipe(We, filter(bn), mapTo(0)), Zt),
      e.link(
        e.pipe(
          $,
          throttleTime(100),
          withLatestFrom(We),
          filter(([, t]) => !!t),
          scan(([, t], [n]) => [t, n], [0, 0]),
          map(([t, n]) => n - t),
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
  location,
  sizeTree,
  offsetTree,
  totalHeight,
  totalCount,
  viewportHeight,
  headerHeight,
  stickyHeaderHeight,
  stickyFooterHeight,
}) {
  const { align, behavior, offset, index } = Pt(location, totalCount - 1);
  function T() {
    const W = ae(sizeTree, index)[1];
    if (W === void 0) throw new Error(`Item at index ${index} not found`);
    return W;
  }
  viewportHeight -= stickyHeaderHeight + stickyFooterHeight;
  let k = Lt(index, offsetTree) + headerHeight - stickyHeaderHeight;
  align === 'end' ? (k = k - viewportHeight + T()) : align === 'center' && (k = k - viewportHeight / 2 + T() / 2),
    offset && (k += offset);
  let d = 0;
  return (
    align === 'start' && (d = Math.max(0, Math.min(k - (totalHeight - viewportHeight)))),
    (k = Math.max(0, k)),
    { top: k, behavior: behavior, align: align, forceBottomSpace: d }
  );
}
const De = Cell(null),
  Do = Cell(false),
  nt = Cell(true),
  Mt = Signal((e) => {
    e.link(
      e.pipe(
        Mt,
        map(() => true),
      ),
      nt,
    ),
      e.link(
        e.pipe(
          Mt,
          map(() => null),
        ),
        De,
      );
  }),
  En = Signal((e) => {
    e.link(
      e.pipe(
        En,
        withLatestFrom(totalCount$, offsetTree$, qe),
        map(([t, n, o, i]) => {
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
        filter((t) => t !== null),
      ),
      // @ts-expect-error contra variance
      te,
    );
  }),
  te = Signal((e) => {
    const t = e.pipe(
      te,
      withLatestFrom(sizeTree$, offsetTree$, totalCount$, viewportHeight, headerHeight$, stickyHeaderHeight$, stickyFooterHeight$, totalHeight$),
      map(([n, o, i, s, r, l, c, a, g]) => {
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
      filter((n) => n !== null),
    );
    e.link(te, De),
      e.link(t, Re),
      e.link(
        e.pipe(
          te,
          filter((n) => typeof n != 'number' && n.index === 'LAST'),
          mapTo(true),
        ),
        de,
      ),
      e.link(e.pipe(t, mapTo(false)), nt),
      e.link(e.pipe(t, mapTo(false)), Do),
      e.link(
        e.pipe(
          sizeTree$,
          // wait for the list to render with the specified sizeTree, so that enough space is available to scroll by
          debounceTime(0),
          withLatestFrom(nt, De),
          filter(([, n, o]) => !n && o !== null),
          map(([, , n]) => n),
        ),
        te,
      ),
      e.sub(e.pipe(ze, debounceTime(10)), () => {
        const n = e.getValue(De);
        n !== null && typeof n != 'number' && n.done !== void 0 && n.done(),
          e.pubIn({
            [De]: null,
            [nt]: true,
          });
      }),
      e.link(
        e.pipe(
          anchorOffset$,
          // wait for the list to render with the specified scrollOffset, so that enough space is available to scroll by
          delayWithMicrotask(),
          filter((n) => n !== 0),
        ),
        re,
      ),
      e.link(
        e.pipe(
          anchorOffset$,
          onNext($),
          map(() => 0),
        ),
        anchorOffset$,
      );
  }),
  location$ = Cell(null),
  initialLocation$ = Cell(null, (e) => {
    e.link(
      e.pipe(
        initialLocation$,
        filter((n) => n !== null),
      ),
      location$,
    );
    const t = e.pipe(
      e.combine(initialLocation$, sizeTree$),
      withLatestFrom(location$),
      filter(([[n, o], i]) => n !== null && !I(o) && i !== null),
      map(([[n]]) => n),
    );
    e.link(e.pipe(t, delayWithMicrotask()), te),
      e.link(
        e.pipe(
          t,
          onNext(e.pipe(Ye, filter(bn))),
          mapTo(null),
          // unset the location after the scroll completes
        ),
        location$,
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
const Fo = []
const initialValues = {
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
}
const initialValues$ = Cell(initialValues, (r) => {
  r.link(
    r.pipe(
      r.combine(scrollTop$, viewportHeight$, sizeTree$, offsetTree$, totalCount$, totalHeight$, items$, anchorOffset$, initialLocation$, location$, scrollOffset$, stickyHeaderHeight$, stickyFooterHeight$, scrollDelta$, Ee, q),
      filter((t) => {
        const n = t[t.length - 2],
          o = t[t.length - 1];
        return !n && !o;
      }),
      scan((t, [scrollTop, viewportHeight, sizeTree, offsetTree, totalCount, totalHeight, itemsData, anchorOffset, initialLocation, location, scrollOffset, stickyHeaderHeight, stickyFooterHeight, scrollDelta]) => {
        var fe;
        if ((itemsData == null ? void 0 : itemsData.length) === 0) return initialValues;
        if (I(sizeTree)) {
          let X = 0;
          return (
            initialLocation !== null && (X = Pt(initialLocation, totalCount - 1).index),
            { ...initialValues, items: Co(X, itemsData), offsetTree: offsetTree, totalCount: totalCount, data: itemsData }
          );
        }
        let W = 0;
        location !== null &&
          scrollTop === 0 &&
          (W =
            yn({
              totalHeight,
              location,
              sizeTree,
              offsetTree,
              totalCount,
              viewportHeight: r.getValue(viewportHeight),
              headerHeight: r.getValue(headerHeight$),
              stickyHeaderHeight,
              stickyFooterHeight,
            }).top ?? 0);
        let deviationDelta = 0;
        r.getValue($) !== 0 &&
          !r.getValue(Ye) &&
          r.getValue(ut) === In &&
          t.totalCount === totalCount &&
          t.items.length > 0 &&
          ((deviationDelta = totalHeight - t.totalHeight), deviationDelta !== 0 && (deviationDelta += r.getValue(Tn)));
        const P = Math.min(Math.max(scrollTop + W + anchorOffset - scrollDelta - scrollOffset + deviationDelta, 0), totalHeight - viewportHeight),
          J = P + viewportHeight;
        if (
          t.offsetTree === offsetTree &&
          t.totalCount === totalCount &&
          t.data === itemsData &&
          P >= t.listTop &&
          J <= t.listBottom
        )
          return t;
        const items = [],
          ne = totalCount - 1,
          y = 0,
          le = To(offsetTree, P, J, y);
        let listBottom = 0,
          listTop = 0,
          w = false;
        for (const X of le) {
          const {
            value: { offset, height },
          } = X;
          let Q = X.start;
          (listBottom = offset),
            offset < P &&
            ((Q += Math.floor((P - offset) / height)), (listBottom += (Q - X.start) * height)),
            Q < y && ((listBottom += (y - Q) * height), (Q = y));
          const vt = Math.min(X.end, ne);
          for (let i = Q; i <= vt && !(listBottom >= J); i++) {
            const item = {
              data: itemsData == null ? void 0 : itemsData[i],
              prevData: (itemsData == null ? void 0 : itemsData[i - 1]) ?? null,
              nextData: (itemsData == null ? void 0 : itemsData[i + 1]) ?? null,
              height: height,
              index: i,
              offset: listBottom,
              type: 'flat',
            };
            w || ((w = true), (listTop = listBottom)), items.push(item), (listBottom += height);
          }
        }
        const paddingBottom = totalHeight - listBottom,
          paddingTop = ((fe = items[0]) == null ? void 0 : fe.offset) || 0;
        return {
          items,
          listBottom,
          listTop,
          offsetTree,
          paddingBottom,
          paddingTop,
          totalCount,
          totalHeight,
          data: itemsData,
          deviationDelta,
        };
      }, initialValues),
    ),
    initialValues$,
  );
}),
  ct = Ie([], (e) =>
    e.pipe(
      e.combine(initialValues$, $),
      map(([t, n]) => {
        const o = t.items.slice();
        for (; o.length > 0 && o[0].offset + o[0].height < n;) o.shift();
        return o.map((i) => i.data);
      }),
    ),
  ),
  q = Cell(false),
  _e = Cell(false),
  ot = Signal((r) => {
    r.link(
      r.pipe(
        initialValues$,
        map((t) => t.deviationDelta),
        filter((t) => t !== 0),
      ),
      ot,
    ),
      mn()
      ? (r.sub(r.pipe(ot, withLatestFrom(scrollDelta$, $)), ([t, n]) => {
        r.pub(scrollDelta$, n - t);
        }),
        r.sub(r.pipe(r.combine($, scrollDelta$, Ee, _e)), ([t, n, o, i]) => {
            o ||
              i ||
              (n > 0 && t < n
              ? (r.pub(q, true),
                r.pub(Re, { top: 0, behavior: 'instant' }),
                  setTimeout(() => {
                    r.pubIn({
                      [q]: false,
                      [scrollDelta$]: 0,
                    });
                  }))
                : n < 0 &&
                t <= 0 &&
              (r.pubIn({
                [q]: true,
                  [scrollDelta$]: 0,
                }),
                  setTimeout(() => {
                    r.pub(Re, { top: 0, behavior: 'instant' }), r.pub(q, false);
                  })));
          }),
        r.sub(
          r.pipe(
            r.combine(We, scrollDelta$, q, Ee, _e),
              filter(([t, n, o, i, s]) => !t && n !== 0 && !o && !i && !s),
              throttleTime(100),
            ),
            ([, t]) => {
              r.pub(q, true),
                t < 0
                  ? requestAnimationFrame(() => {
                    r.pub(re, -t),
                      r.pub(scrollDelta$, 0),
                      requestAnimationFrame(() => {
                        r.pub(q, false);
                      });
                  })
                  : requestAnimationFrame(() => {
                    r.pub(re, -t),
                      r.pub(scrollDelta$, 0),
                      requestAnimationFrame(() => {
                        r.pub(q, false);
                      });
                  });
            },
          ))
        : r.link(ot, re);
  }),
  Ye = Signal(),
  Yt = Cell(false),
  ze = Signal((e) => {
    e.link(e.pipe(ze, mapTo(false)), Ye);
  }, false),
  $ = Cell(0),
  viewportHeight = Cell(0),
  $n = Cell(0),
  j = Cell(0),
  scrollTop$ = $,
  anchorOffset$ = Cell(0),
  stickyHeaderHeight$ = Cell(0),
  scrollOffset$ = Cell(0),
  stickyFooterHeight$ = Cell(0),
  zt = Cell(0),
  At = Cell(null),
  wn = Action(),
  _o = Lo,
  Ho = 50,
  headerHeight$ = Ie(0, (e) =>
    e.pipe(
      e.combine(stickyHeaderHeight$, scrollOffset$),
      map(([t, n]) => t + n),
    ),
  ),
  Ln = Ie(0, (e) =>
    e.pipe(
      e.combine(stickyFooterHeight$, zt),
      map(([t, n]) => t + n),
    ),
  ),
  Wo = Ie(0, (e) =>
    e.pipe(
      e.combine(stickyHeaderHeight$, scrollOffset$, $),
      map(([t, n, o]) => t + Math.max(n - o, 0)),
    ),
  ),
  Po = Ie(0, (e) =>
    e.pipe(
      e.combine(stickyFooterHeight$, zt, $, viewportHeight, j),
      map(([t, n, o, i, s]) => {
        o = Math.min(o, s - i);
        const r = Math.max(n - (s - (o + i)), 0);
        return t + r;
      }),
    ),
  ),
  viewportHeight$ = Ie(0, (e) =>
    e.pipe(
      e.combine(viewportHeight, Wo, Po),
      map(([t, n, o]) => t - n - o),
    ),
  ),
  paddingBottom$ = Cell(0),
  Mn = Cell(0, (e) => {
    e.link(
      e.pipe(
        e.combine(Mn, totalHeight$, viewportHeight),
        map(([t, n, o]) => (t === 0 ? 0 : Math.max(0, Math.min(t - (n - o))))),
      ),
      paddingBottom$,
    );
  }),
  Re = Signal((e) => {
    e.link(
      e.pipe(
        Re,
        map((t) => (t.align === 'start' ? t.top ?? 0 : 0)),
      ),
      Mn,
    ),
      e.link(
        e.pipe(
          Re,
          withLatestFrom($),
          filter(([t, n]) => t.top !== n),
          mapTo(true),
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
      isAtBottom: false,
    },
    (e) =>
      e.pipe(
        e.combine($, headerHeight$, Ln, scrollOffset$, viewportHeight$, j, paddingBottom$, Ee, location$, q, de),
        filter(([, , , , , , , t, n, o]) => !t && n === null && !o),
        map(([t, n, o, i, s, r, l, c, a, g, b]) => {
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
  Ot = Signal((e) => {
    e.link(
      e.pipe(
        $,
        debounceTime(0),
        withLatestFrom(qe),
        filter(([, t]) => t.scrollHeight > 0),
        map(([, t]) => t),
      ),
      Ot,
    );
  }),
  re = Signal(),
  scrollDelta$ = Cell(0),
  st = Cell(0),
  marginTop$ = Cell(0),
  transition$ = Cell(''),
  Kt = Signal(),
  On = Action(),
  Nn = Action();
function Yo(e, t) {
  var r, l;
  const n = t.slice();
  let o = 0;
  const i = [];
  for (const { k: c, v: a } of ve(e)) {
    for (; n.length && n[0] < c;) n.shift(), o++;
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
const totalCount$ = Cell(0),
  context$ = Cell(null),
  items$ = Cell(null, (e) => {
    e.link(
      e.pipe(
        items$,
        filter((t) => t !== null),
        map((t) => t.length),
      ),
      totalCount$,
    );
  }),
  Ve = Cell(null),
  ue = Signal((e) => {
    e.link(
      e.pipe(
        ue,
        withLatestFrom($e),
        map(([n, o]) => -(o * n.length)),
      ),
      scrollDelta$,
    ),
      e.link(e.pipe(ue, mapTo(true)), _e),
      e.link(e.pipe(ue, delayWithMicrotask()), Ve);
    function t(n, o) {
      e.pubIn({
        [re]: n,
        [st]: n,
      }),
        o
          ? requestAnimationFrame(() => {
            e.pubIn({
              [scrollDelta$]: 0,
              [st]: 0,
              [Ve]: null,
              [_e]: false,
            });
          })
          : e.pubIn({
            [scrollDelta$]: 0,
            [st]: 0,
            [Ve]: null,
            [_e]: false,
          });
    }
    e.sub(
      e.pipe(
        offsetTree$,
        withLatestFrom(Ve),
        filter(([, n]) => n !== null),
        map(([n, o]) => {
          if (o === null) throw new Error('Unexpected null items');
          return Lt(o.length, n);
        }),
      ),
      (n) => {
        t(n, false);
      },
    ),
      e.sub(
        e.pipe(
          ue,
          vn(2),
          withLatestFrom(offsetTree$, Ve),
          filter(([, , n]) => n !== null),
          map(([n, o]) => Lt(n.length, o)),
        ),
        (n) => {
          t(n, true);
        },
      ),
      e.changeWith(items$, ue, (n, o) => (n ? [...o, ...n] : o.slice())),
      e.link(
        e.pipe(
          ue,
          withLatestFrom(sizeTree$, $e),
          map(([n, o, i]) => {
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
  dt = Signal((e) => {
    const t = e.pipe(
      dt,
      withLatestFrom(qe, Yt, context$, sizeTree$),
      filter(([, , , , o]) => !I(o)),
      map(([{ data: o, scrollToBottom: i }, s, r, l]) => {
        if (i === false || i === void 0) return null;
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
          c === true && (c = 'auto'), { index: 'LAST', align: 'end', behavior: c }
        );
      }),
    );
    e.link(
      e.pipe(
        t,
        filter((o) => o !== null),
        map(() => true),
      ),
      de,
    ),
      e.link(
        e.pipe(
          ze,
          withLatestFrom(de),
          filter(([o, i]) => i),
          map(() => false),
        ),
        de,
      );
    const n = e.pipe(
      Kt,
      withLatestFrom(de),
      filter(([o, i]) => o === 'up' && i),
    );
    e.link(
      e.pipe(
        n,
        map(() => false),
      ),
      de,
    ),
      e.link(e.pipe(n, mapTo(true)), Mt),
      e.link(
        e.pipe(
          t,
          filter((o) => o !== null),
          debounceTime(20),
        ),
        te,
      );
  }),
  pt = Signal((e) => {
    e.changeWith(items$, pt, (t, n) => (t ? [...t, ...n.data] : n.data.slice())),
      e.link(pt, dt);
  }),
  rt = Signal((e) => {
    e.changeWith(items$, rt, (t, n) =>
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
  Nt = Signal((e) => {
    e.changeWith(items$, Nt, (t, { offset: n, count: o }) =>
      t ? t.slice(0, n).concat(t.slice(n + o)) : [],
    ),
      e.changeWith(pe, Nt, ([t], { offset: n, count: o }) => [vo(t, n, o), n]);
  }),
  yt = Cell(null),
  He = Signal((e) => {
    e.sub(
      e.pipe(
        He,
        withLatestFrom(items$),
        filter(([{ purgeItemSizes: t }, n]) => !!t || n === null || n.length === 0),
      ),
      ([t, n]) => {
        n === null || n.length === 0
          ? e.pubIn({
            ...(t.initialLocation ? { [initialLocation$]: t.initialLocation } : {}),
            [items$]: t.data.slice(),
          })
          : e.pubIn({
            ...(t.initialLocation ? { [initialLocation$]: t.initialLocation } : {}),
            [pe]: ft,
            [initialValues$]: initialValues,
            [yt]: t.data.slice(),
          });
      },
    ),
      e.sub(
        e.pipe(
          Nn,
          withLatestFrom(yt),
          filter(([, t]) => t !== null),
        ),
        ([, t]) => {
          e.pubIn({
            [items$]: t,
            [yt]: null,
          });
        },
      ),
      e.link(
        e.pipe(
          He,
          filter(({ purgeItemSizes: t }) => !t),
          withLatestFrom($e),
          filter(([, t]) => t > 0),
          map(([{ data: t }, n]) => [
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
          filter(({ purgeItemSizes: t }) => !t),
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
              [items$]: t.slice(),
            });
        },
      );
  }),
  Jt = Signal((e) => {
    e.changeWith(items$, Jt, (t, n) => (t ? t.slice(n) : [])),
      e.changeWith(pe, Jt, ([t], n) => [
        ve(t).reduce((i, { k: s, v: r }) => B(i, Math.max(0, s - n), r), Me()),
        0,
      ]);
  }),
  Xt = Signal((e) => {
    e.changeWith(items$, Xt, (t, n) => (t ? t.slice(0, t.length - n) : [])),
      e.link(
        e.pipe(
          Xt,
          withLatestFrom(totalCount$, $e),
          map(([, t, n]) => [
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
  Vn = Signal((e) => {
    const t = e.pipe(
      Vn,
      withLatestFrom(items$),
      map(([n, o]) => {
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
    e.changeWith(items$, t, (n, o) => (n ? n.filter((i, s) => !o.includes(s)) : [])),
      e.changeWith(pe, t, ([n], o) => [Yo(n, o), 0]);
  }),
  Vt = Signal((e) => {
    e.changeWith(items$, Vt, (t, { mapper: n }) => (t ? t.map(n) : [])),
      e.link(
        e.pipe(
          Vt,
          vn(3),
          withLatestFrom(xn),
          filter(([{ autoscrollToBottomBehavior: t }, n]) => n && !!t),
          map(([{ autoscrollToBottomBehavior: t }]) =>
            typeof t == 'object'
              ? t.location()
              : { index: 'LAST', align: 'end', behavior: t },
          ),
          filter((t) => !!t),
        ),
        te,
      );
  }),
  zo = ({ item, ItemContent, mount, unmount }) => {
    const i = useCellValue(context$),
      s = React.useRef(null),
      r = React.useCallback(
        (l) => {
          l
            ? ((s.current = l), mount(l))
            : s.current && (unmount(s.current), (s.current = null));
        },
        [mount, unmount],
      );
    return /* @__PURE__ */ jsx('div', {
      ref: r,
      'data-index': item.index,
      'data-known-size': item.height,
      style:
        typeof window === 'undefined' ? {} :
          {
            overflowAnchor: 'none',
            position: 'absolute',
            width: '100%',
            top: item.offset,
          },
      children: /* @__PURE__ */ jsx(ItemContent, {
        index: item.index,
        prevData: item.prevData,
        nextData: item.nextData,
        data: item.data,
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
  valid: false,
  consoleMessage:
    'The VirtuosoMessageList license wrapper component is missing. Enclose the VirtuosoMessageList with VirtuosoMessageListLicense and add your key at the lisenceKey property.',
  watermarkMessage:
    'The VirtuosoMessageList license wrapper component is missing. Enclose the VirtuosoMessageList with VirtuosoMessageListLicense and add your key at the lisenceKey property.',
},
  Qo = {
    valid: false,
    consoleMessage:
      'Your VirtuosoMessageListLicense is missing a license key. Purchase one from https://virtuoso.dev/pricing/',
    watermarkMessage:
      'Your VirtuosoMessageListLicense is missing a license key. Purchase one from https://virtuoso.dev/pricing/',
  },
  ei = {
    valid: false,
    consoleMessage:
      'Your VirtuosoMessageListLicense component is missing a license key - this component will not work if deployed in production. Purchase a key from https://virtuoso.dev/pricing/ before you deploy to production.',
  },
  Cn = {
    valid: true,
  },
  ti = {
    valid: false,
    consoleMessage:
      'Your Virtuoso Message List license key is invalid. Ensure that you have copy-pasted the key from the purchase email correctly.',
    watermarkMessage: 'Your Virtuoso Message List license key is invalid',
  },
  ni = {
    valid: false,
    consoleMessage:
      'Your annual license key to use Virtuoso Message List in non-production environments has expired. You can still use it in production. To keep using it in development, purchase a new key from https://virtuoso.dev/pricing/',
    watermarkMessage:
      'Your annual license key to use Virtuoso Message List in non-production environments has expired. You can still use it in production. To keep using it in development, purchase a new key from https://virtuoso.dev/pricing/',
  },
  oi = {
    valid: false,
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
const VirtuosoMessageListLicenseContext = React.createContext(Xo),
  VirtuosoMessageListLicense = ({ licenseKey: e, children: t }) => {
    const n = li({
      licenseKey: e,
      hostname: typeof window < 'u' ? window.location.hostname : 'localhost',
      now: /* @__PURE__ */ new Date(),
      packageTimestamp: 1740169352098,
    });
    return /* @__PURE__ */ jsx(VirtuosoMessageListLicenseContext.Provider, { value: n, children: t });
  };
VirtuosoMessageListLicense.displayName = Math.random().toString(36).slice(2, 8);
const VirtuosoMessageListTestingContext = React.createContext(void 0),
  Header$ = Cell(null),
  StickyHeader$ = Cell(null),
  Footer$ = Cell(null),
  StickyFooter$ = Cell(null),
  EmptyPlaceholder$ = Cell(null),
  ScrollElement$ = Cell('div'),
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
  HeaderWrapperDefault = React.forwardRef((e, t) =>
    /* @__PURE__ */ jsx('div', { style: { zIndex: 1 }, ...e, ref: t }),
  ),
  FooterWrapperDefault = React.forwardRef((e, t) => /* @__PURE__ */ jsx('div', { ...e, ref: t })),
  StickyHeaderWrapperDefault = React.forwardRef(({ style: e, ...t }, n) =>
    /* @__PURE__ */ jsx('div', { ...t, style: { ...ai, ...e }, ref: n }),
  ),
  StickFooterWrapperDefault = React.forwardRef(({ style: e, ...t }, n) =>
    /* @__PURE__ */ jsx('div', { ...t, style: { ...pi, ...e }, ref: n }),
  ),
  HeaderWrapper$ = Cell(HeaderWrapperDefault),
  StickyHeaderWrapper$ = Cell(StickyHeaderWrapperDefault),
  FooterWrapper$ = Cell(FooterWrapperDefault),
  StickFooterWrapper$ = Cell(StickFooterWrapperDefault),
  ItemContentDefault = ({ index: e }) =>
    /* @__PURE__ */ jsxs('div', {
    children: ['Item ', e],
  }),
  computerKeyDefault = ({ index: e }) => e,
  ItemContent$ = Cell(ItemContentDefault),
  computeItemKey$ = Cell(computerKeyDefault),
  shortSizeAlign$ = Cell('top', (r) => {
    r.link(
      r.pipe(
        r.combine(shortSizeAlign$, totalHeight$, viewportHeight, headerHeight$, Ln),
        filter(([t]) => t === 'bottom' || t === 'bottom-smooth'),
        map(([, t, n, o, i]) => Math.max(0, n - t - o - i)),
      ),
      marginTop$,
    ),
      r.link(
        r.pipe(
          r.combine(marginTop$, shortSizeAlign$),
          filter(([, t]) => t === 'bottom-smooth'),
          scan((t, [n]) => [t[1], n], [0, 0]),
          map(([t, n]) => (t > 0 && n > 0 ? 'margin-top 0.2s ease-out' : '')),
        ),
        transition$,
      );
  });
function Qe(e) {
  const t = React.useRef(null);
  return [
    React.useCallback(
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
  const o = useRealm(),
    i = React.useRef(null),
    s = React.useRef(null),
    r = React.useCallback(() => {
      i.current &&
        (cancelAnimationFrame(i.current),
          (i.current = null),
          (s.current = null));
    }, []);
  React.useEffect(
    () =>
      o.sub(Kt, (a) => {
        a !== s.current && r();
      }),
    [o, r],
  ),
    React.useEffect(() => o.sub(wn, r), [o, r]);
  const l = React.useCallback(
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
  return React.useCallback(
    (a) => {
      var g, b, v, T;
      if (a.top === ((g = e.current) == null ? void 0 : g.scrollTop)) {
        o.pub(ze, (b = e.current) == null ? void 0 : b.scrollTop);
        return;
      }
      if (
        (a.top !== void 0 && ((n.current = a.top), o.pub(Yt, true)),
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
      findIndex: (t) => e.getValue(items$).findIndex(t),
      find: (t) => e.getValue(items$).find(t),
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
        e.pub(Ee, true),
          t(),
          e.pub(Ee, false),
          e.pub(dt, { data: [], scrollToBottom: n });
      },
      get: () => e.getValue(items$).slice(),
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
      const n = ((i = e.getValue(items$)) == null ? void 0 : i.indexOf(t)) ?? -1;
      if (n === -1) return 0;
      const o = e.getValue(sizeTree$);
      return ae(o, n)[1] ?? 0;
    },
  };
}
let Qt = false;
const VirtuosoMessageList = React.forwardRef(
  (
    {
      initialData = [],
      computeItemKey = computerKeyDefault,
      context = null,
      initialLocation = null,
      shortSizeAlign = 'top',
      onScroll,
      onRenderedDataChange,
      ItemContent = ItemContentDefault,
      Header = null,
      StickyHeader = null,
      Footer = null,
      StickyFooter = null,
      EmptyPlaceholder = null,
      HeaderWrapper = HeaderWrapperDefault,
      StickyHeaderWrapper = StickyHeaderWrapperDefault,
      FooterWrapper = FooterWrapperDefault,
      StickyFooterWrapper = StickFooterWrapperDefault,
      ScrollElement = 'div',
      ...P
    },
    J,
  ) => {
    const Y = React.useMemo(() => {
      const y = new Realm();
      return (
        y.register(initialValues$),
        y.register(Ye),
        y.register(ut),
        y.register(ot),
        y.register(tt),
        y.register(pt),
        y.register(ue),
        y.register(He),
        y.pubIn({
          [items$]: initialData.slice(),
          [context$]: context,
          [computeItemKey$]: computeItemKey,
          [initialLocation$]: initialLocation,
          [ItemContent$]: ItemContent,
          [Header$]: Header,
          [Footer$]: Footer,
          [StickyHeader$]: StickyHeader,
          [StickyFooter$]: StickyFooter,
          [EmptyPlaceholder$]: EmptyPlaceholder,
          [ScrollElement$]: ScrollElement,
          [StickFooterWrapper$]: StickyFooterWrapper,
          [StickyHeaderWrapper$]: StickyHeaderWrapper,
          [FooterWrapper$]: FooterWrapper,
          [HeaderWrapper$]: HeaderWrapper,
          [shortSizeAlign$]: shortSizeAlign,
        }),
        y.singletonSub(Ot, onScroll),
        y.singletonSub(ct, onRenderedDataChange),
        y
      );
    }, []);
    React.useImperativeHandle(J, () => to(Y), [Y]),
      React.useEffect(() => {
        Y.pubIn({
          [context$]: context,
          [ItemContent$]: ItemContent,
        }),
          Y.singletonSub(Ot, onScroll),
          Y.singletonSub(ct, onRenderedDataChange);
      });
    const ne = React.useContext(VirtuosoMessageListLicenseContext);
    return (
      React.useEffect(() => {
        ne.consoleMessage &&
          (Qt || ((Qt = true), console.warn(ne.consoleMessage)));
      }, [ne]),
      React.useEffect(() => {
        const y = (le) => {
          var D;
          (D = le.message) != null &&
            D.includes('ResizeObserver loop') &&
            (le.preventDefault(),
              le.stopPropagation(),
              le.stopImmediatePropagation());
        };
        return (
          window.addEventListener('error', y, { capture: true }),
          () => {
            window.removeEventListener('error', y);
          }
        );
      }, []),
      typeof window < 'u' && ne.watermarkMessage
        ? /* @__PURE__ */ jsx('div', {
          style: {
            color: 'red',
            pointerEvents: 'none',
          },
          children: ne.watermarkMessage,
        })
        : /* @__PURE__ */ jsx(RealmContext.Provider, {
          value: Y,
          children: /* @__PURE__ */ jsx(gi, { ...P }),
        })
    );
  },
);
VirtuosoMessageList.displayName = 'VirtuosoMessageList';
const gi = ({ style: e, ...t }) => {
  const curRealm = useRealm(),
    o = React.useContext(VirtuosoMessageListTestingContext),
    [Header, StickyHeader, HeaderWrapper, StickyHeaderWrapper, Footer, StickyFooter, FooterWrapper, StickFooterWrapper, ItemContent, EmptyPlaceholder, ScrollElement] = useCellValues(
      Header$,
      StickyHeader$,
      HeaderWrapper$,
      StickyHeaderWrapper$,
      Footer$,
      StickyFooter$,
      FooterWrapper$,
      StickFooterWrapper$,
      ItemContent$,
      EmptyPlaceholder$,
      ScrollElement$,
    ),
    [resizeObs] = React.useState(() => {
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
                [scrollOffset$]: ge.contentRect.height,
                [j]: (Je = w.current) == null ? void 0 : Je.scrollHeight,
              };
              continue;
            }
            if (K === le.current) {
              R = {
                ...R,
                [stickyHeaderHeight$]: ge.contentRect.height,
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
                [stickyFooterHeight$]: ge.contentRect.height,
                [j]: (jt = w.current) == null ? void 0 : jt.scrollHeight,
              };
              continue;
            }
            if (K === w.current) {
              R = {
                ...R,
                [$]: K.scrollTop,
                [j]: K.scrollHeight,
                [viewportHeight]: ge.contentRect.height,
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
            curRealm.pubIn(R);
        });
    }),
    [W, U] = Qe(resizeObs),
    [P, J] = Qe(resizeObs),
    [Y, ne] = Qe(resizeObs),
    [y, le] = Qe(resizeObs),
    D = React.useCallback(
      (f) => {
        if (o) {
          const z = Number.parseInt(f.dataset.index ?? '');
          curRealm.pub(me, [
            {
              startIndex: z,
              endIndex: z,
              size: o.itemHeight,
            },
          ]);
        }
        resizeObs == null || resizeObs.observe(f);
      },
      [resizeObs, curRealm, o],
    ),
    Ge = React.useCallback(
      (f) => {
        resizeObs == null || resizeObs.unobserve(f);
      },
      [resizeObs],
    ),
    w = React.useRef(null),
    oe = React.useRef(null),
    virtuosoListRef = React.useCallback(
      (f) => {
        f
          ? ((oe.current = f), resizeObs == null || resizeObs.observe(f, { box: 'border-box' }))
          : oe.current &&
          (resizeObs == null || resizeObs.unobserve(oe.current), (oe.current = null));
      },
      [resizeObs],
    ),
    fe = React.useRef(null),
    X = fi(w, oe, fe),
    Se = React.useCallback((f) => {
      w.current && (w.current.scrollTop += f);
    }, []),
    ie = React.useCallback(() => {
      const f = w.current;
      if (f !== null) {
        if (fe.current !== null) {
          const z = f.scrollHeight - f.clientHeight;
          dn(f.scrollTop, Math.min(z, fe.current)) &&
            ((fe.current = null), curRealm.pub(Yt, false), curRealm.pub(ze, f.scrollTop));
        }
        curRealm.pub($, f.scrollTop);
      }
    }, [curRealm]),
    Q = React.useCallback(
      (f) => {
        curRealm.pub(Kt, f.deltaY > 0 ? 'down' : 'up');
      },
      [curRealm],
    ),
    virtuosoListRefCb = React.useCallback(
      (f) => {
        f
          ? (curRealm.pub(At, f),
            (w.current = f),
            f.addEventListener('scroll', ie),
            f.addEventListener('wheel', Q),
            o &&
          curRealm.pubIn({
            [viewportHeight]: o.viewportHeight,
              [j]: o.viewportHeight,
              [$]: 0,
            }),
            resizeObs == null || resizeObs.observe(f, { box: 'border-box' }))
          : w.current &&
          (w.current.removeEventListener('scroll', ie),
            w.current.removeEventListener('wheel', Q),
            curRealm.pub(At, null),
            resizeObs == null || resizeObs.unobserve(w.current),
            (w.current = null));
      },
      [resizeObs, curRealm, ie, Q, o],
    ),
    { items } = useCellValue(initialValues$);
  React.useLayoutEffect(() => {
    if (!mn()) return;
    const f = setInterval(() => {
      var z;
      curRealm.pub(j, (z = w.current) == null ? void 0 : z.scrollHeight);
    }, 1e3);
    return () => {
      clearInterval(f);
    };
  }, [curRealm]),
    React.useLayoutEffect(() => curRealm.sub(Re, X), [X, curRealm]),
    React.useLayoutEffect(() => curRealm.sub(re, Se), [Se, curRealm]);
  const Ze = React.useCallback(() => {
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
    curRealm.pub(me, f);
  }, [curRealm]);
  React.useLayoutEffect(() => curRealm.sub(On, Ze), [Ze, curRealm]);
  const scrollDelta = useCellValue(scrollDelta$),
    oo = useCellValue(st),
    io = useCellValue(q),
    marginTop = useCellValue(marginTop$),
    paddingBottom = useCellValue(paddingBottom$),
    transition = useCellValue(transition$),
    conetxt = useCellValue(context$),
    computeItemKey = useCellValue(computeItemKey$),
    totalCount = useCellValue(totalCount$),
    totalHeight = useCellValue(totalHeight$);
  return (
    React.useLayoutEffect(() => {
      items.length === 0 && curRealm.pub(Nn);
    }, [items, curRealm]),
    /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsxs(ScrollElement, {
        ...t,
        ref: virtuosoListRefCb,
        'data-testid': 'virtuoso-scroller',
        style: {
          overflowY: io ? 'hidden' : 'scroll',
          boxSizing: 'border-box',
          ...e,
        },
        ...(ScrollElement === 'div' ? { context: conetxt } : {}),
        children: [
          StickyHeader &&
            /* @__PURE__ */ jsx(StickyHeaderWrapper, {
            ref: y,
            style: Xe,
              children: /* @__PURE__ */ jsx(StickyHeader, { context: conetxt }),
          }),
          Header &&
            /* @__PURE__ */ jsx(HeaderWrapper, {
            ref: Y,
            style: Xe,
              children: /* @__PURE__ */ jsx(Header, { context: conetxt }),
          }),
          totalCount > 0
            ? /* @__PURE__ */ jsx('div', {
              ref: virtuosoListRef,
              'data-testid': 'virtuoso-list',
              style:
                typeof window === 'undefined' ? {} :
                  {
                    boxSizing: 'content-box',
                    height: totalHeight,
                    paddingBottom,
                    overflowAnchor: 'none',
                    marginTop,
                    transition,
                    position: 'relative',
                    transform: `translateY(${scrollDelta + oo}px)`,
                  },
              children: items.map((f) => {
                return /* @__PURE__ */ jsx(
                  zo,
                  {
                    mount: D,
                    unmount: Ge,
                    item: f,
                    ItemContent: ItemContent,
                  },
                  computeItemKey({ index: f.index, data: f.data, context: conetxt }),
                )
              },
              ),
            })
            : EmptyPlaceholder
              ? /* @__PURE__ */ jsx(EmptyPlaceholder, { context: conetxt })
              : null,
          Footer &&
            /* @__PURE__ */ jsx(FooterWrapper, {
            ref: W,
            style: Xe,
              children: /* @__PURE__ */ jsx(Footer, { context: conetxt }),
          }),
          StickyFooter &&
            /* @__PURE__ */ jsx(StickFooterWrapper, {
            ref: P,
            style: Xe,
              children: /* @__PURE__ */ jsx(StickyFooter, { context: conetxt }),
          }),
        ],
      }),
    })
  );
};
function useVirtuosoLocation() {
  return useCellValue(qe);
}
function useCurrentlyRenderedData() {
  return useCellValue(ct);
}
function useVirtuosoMethods() {
  const e = useRealm();
  return React.useMemo(() => to(e), [e]);
}
export {
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListTestingContext,
  useCurrentlyRenderedData,
  useVirtuosoLocation,
  useVirtuosoMethods,
};
