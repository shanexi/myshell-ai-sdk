var v = Object.defineProperty;
var A = (s, t, e) =>
  t in s
    ? v(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (s[t] = e);
var h = (s, t, e) => A(s, typeof t != 'symbol' ? t + '' : t, e);
import * as d from 'react';
import { jsx as L } from 'react/jsx-runtime';
class C {
  constructor(t = /* @__PURE__ */ new Map()) {
    this.map = t;
  }
  clone() {
    return new C(new Map(this.map));
  }
  increment(t) {
    const e = this.map.get(t) ?? 0;
    this.map.set(t, e + 1);
  }
  decrement(t, e) {
    let n = this.map.get(t);
    n !== void 0 && ((n -= 1), this.map.set(t, n), n === 0 && e());
  }
}
class k {
  constructor() {
    h(this, 'map', /* @__PURE__ */ new Map());
  }
  getOrCreate(t) {
    let e = this.map.get(t);
    return (
      e === void 0 && ((e = /* @__PURE__ */ new Set()), this.map.set(t, e)), e
    );
  }
  get(t) {
    return this.map.get(t);
  }
  use(t, e) {
    const n = this.get(t);
    n !== void 0 && e(n);
  }
  delete(t) {
    return this.map.delete(t);
  }
}
function f(s, t) {
  return t(s), s;
}
function x() {}
const E = 'cell',
  j = 'signal',
  K = 'pipe';
function V(s, t) {
  return s === t;
}
const M = /* @__PURE__ */ new Map();
let I;
class W {
  /**
   * Creates a new realm.
   * @param initialValues - the initial cell values that will populate the realm.
   * Those values will not trigger a recomputation cycle, and will overwrite the initial values specified for each cell.
   */
  constructor(t = {}) {
    h(this, 'subscriptions', new k());
    h(this, 'singletonSubscriptions', /* @__PURE__ */ new Map());
    h(this, 'graph', new k());
    h(this, 'state', /* @__PURE__ */ new Map());
    h(this, 'distinctNodes', /* @__PURE__ */ new Map());
    h(this, 'executionMaps', /* @__PURE__ */ new Map());
    h(this, 'definitionRegistry', /* @__PURE__ */ new Set());
    h(this, 'pipeMap', /* @__PURE__ */ new Map());
    for (const e of Object.getOwnPropertySymbols(t)) this.state.set(e, t[e]);
  }
  /**
   * Creates or resolves an existing cell instance in the realm. Useful as a joint point when building your own operators.
   * @returns a reference to the cell.
   * @param value - the initial value of the cell
   * @param distinct - true by default. Pass false to mark the signal as a non-distinct one, meaning that publishing the same value multiple times will re-trigger a recomputation cycle.
   * @param node - optional, a reference to a cell. If the cell has not been touched in the realm before, the realm will instantiate a reference to it. If it's registered already, the function will return the reference.
   */
  cellInstance(t, e = !0, n = Symbol()) {
    return (
      this.state.has(n) || this.state.set(n, t),
      e !== !1 &&
        !this.distinctNodes.has(n) &&
        this.distinctNodes.set(n, e === !0 ? V : e),
      n
    );
  }
  /**
   * Creates or resolves an existing signal instance in the realm. Useful as a joint point when building your own operators.
   * @returns a reference to the signal.
   * @param distinct - true by default. Pass false to mark the signal as a non-distinct one, meaning that publishing the same value multiple times will re-trigger a recomputation cycle.
   * @param node - optional, a reference to a signal. If the signal has not been touched in the realm before, the realm will instantiate a reference to it. If it's registered already, the function will return the reference.
   */
  signalInstance(t = !0, e = Symbol()) {
    return t !== !1 && this.distinctNodes.set(e, t === !0 ? V : t), e;
  }
  /**
   * Subscribes to the values published in the referred node.
   * @param node - the cell/signal to subscribe to.
   * @param subscription - the callback to execute when the node receives a new value.
   * @returns a function that, when called, will cancel the subscription.
   *
   * @example
   * ```ts
   * const signal$ = Signal<number>()
   * const r = new Realm()
   * const unsub = r.sub(signal$, console.log)
   * r.pub(signal$, 2)
   * unsub()
   * r.pub(signal$, 3)
   * ```
   */
  sub(t, e) {
    this.register(t);
    const n = this.subscriptions.getOrCreate(t);
    return n.add(e), () => n.delete(e);
  }
  /**
   * Subscribes exclusively to values in the referred node.
   * Calling this multiple times on a single node will remove the previous subscription created through `singletonSub`.
   * Subscriptions created through `sub` are not affected.
   * @returns a function that, when called, will cancel the subscription.
   *
   * @example
   * ```ts
   * const signal$ = Signal<number>()
   * const r = new Realm()
   * // console.log will run only once.
   * r.singletonSub(signal$, console.log)
   * r.singletonSub(signal$, console.log)
   * r.singletonSub(signal$, console.log)
   * r.pub(signal$, 2)
   * ```
   */
  singletonSub(t, e) {
    return (
      this.register(t),
      e === void 0
        ? this.singletonSubscriptions.delete(t)
        : this.singletonSubscriptions.set(t, e),
      () => this.singletonSubscriptions.delete(t)
    );
  }
  /**
   * Clears all exclusive subscriptions.
   */
  resetSingletonSubs() {
    this.singletonSubscriptions.clear();
  }
  // biome-ignore lint/suspicious/noExplicitAny: I know why we need any here
  subMultiple(t, e) {
    const n = this.signalInstance();
    return (
      this.connect({
        map:
          (i) =>
          (...r) => {
            i(r);
          },
        sink: n,
        sources: t,
      }),
      this.sub(n, e)
    );
  }
  /**
   * Publishes into multiple nodes simultaneously, triggering a single re-computation cycle.
   * @param values - a record of node references and their values.
   *
   * @example
   * ```ts
   * const foo$ = Cell('foo')
   * const bar$ = Cell('bar')
   *
   * const r = new Realm()
   * r.pubIn({[foo$]: 'foo1', [bar$]: 'bar1'})
   * ```
   */
  pubIn(t) {
    var w;
    const e = Reflect.ownKeys(t).map((a) => this.pipeMap.get(a) ?? a),
      n = Reflect.ownKeys(t).reduce((a, c) => {
        const g = c,
          b = t[g],
          p = this.pipeMap.get(g) ?? g;
        return (a[p] = b), a;
      }, {}),
      i = this.getExecutionMap(e),
      r = i.refCount.clone(),
      o = i.participatingNodes.slice(),
      u = new Map(this.state),
      l = (a) => {
        this.graph.use(a, (c) => {
          for (const { sources: g, sink: b } of c)
            g.has(a) &&
              r.decrement(b, () => {
                o.splice(o.indexOf(b), 1), l(b);
              });
        });
      };
    for (;;) {
      const a = o.shift();
      if (a === void 0) break;
      const c = a;
      let g = !1;
      const b = (p) => {
        const m = this.distinctNodes.get(c);
        if (m != null && m(u.get(c), p)) {
          g = !1;
          return;
        }
        (g = !0), u.set(c, p), this.state.has(c) && this.state.set(c, p);
      };
      if (
        (Object.hasOwn(n, c)
          ? b(n[c])
          : i.projections.use(c, (p) => {
              for (const m of p) {
                const S = [
                  ...Array.from(m.sources),
                  ...Array.from(m.pulls),
                ].map((T) => u.get(T));
                m.map(b)(...S);
              }
            }),
        g)
      ) {
        const p = u.get(c);
        this.inContext(() => {
          this.subscriptions.use(c, (m) => {
            for (const S of m) S(p);
          });
        }),
          (w = this.singletonSubscriptions.get(c)) == null || w(p);
      } else l(c);
    }
  }
  /**
   * A low-level utility that connects multiple nodes to a sink node with a map function. Used as a foundation for the higher-level operators.
   * The nodes can be active (sources) or passive (pulls).
   */
  connect({ sources: t, pulls: e = [], map: n, sink: i }) {
    const r = {
      map: n,
      pulls: new Set(e),
      sink: this.register(i),
      sources: new Set(t),
    };
    for (const o of [...t, ...e])
      this.register(o), this.graph.getOrCreate(o).add(r);
    this.executionMaps.clear();
  }
  pub(t, e) {
    this.pubIn({ [t]: e });
  }
  pipe(t, ...e) {
    return this.combineOperators(...e)(t);
  }
  transformer(...t) {
    return (e) =>
      f(this.signalInstance(), (n) => (this.link(this.pipe(n, ...t), e), n));
  }
  /**
   * Links the output of a node to the input of another node.
   */
  link(t, e) {
    this.connect({
      map: (n) => (i) => {
        n(i);
      },
      sink: e,
      sources: [t],
    });
  }
  // prettier-ignore
  combine(...t) {
    return f(this.signalInstance(), (e) => {
      this.connect({
        map: (n) => (...i) => {
          n(i);
        },
        sink: e,
        sources: t
      });
    });
  }
  // prettier-ignore
  combineCells(...t) {
    return f(
      this.cellInstance(
        t.map((e) => this.getValue(e)),
        !0
      ),
      (e) => {
        this.connect({
          map: (n) => (...i) => {
            n(i);
          },
          sink: e,
          sources: t
        });
      }
    );
  }
  /**
   * Gets the current value of a node. The node must be stateful.
   * @remark if possible, use {@link withLatestFrom} or {@link combine}, as getValue will not create a dependency to the passed node,
   * which means that if you call it within a computational cycle, you may not get the correct value.
   * @param node - the node instance.
   * @example
   * ```ts
   * const foo$ = Cell('foo')
   *
   * const r = new Realm()
   * r.getValue(foo$) // 'foo'
   * r.pub(foo$, 'bar')
   * //...
   * r.getValue(foo$) // 'bar'
   * ```
   */
  getValue(t) {
    return this.register(t), this.state.get(t);
  }
  getValues(t) {
    return t.map((e) => this.getValue(e));
  }
  /**
   * Explicitly includes the specified cell/signal/pipe reference in the realm.
   * Most of the time you don't need to do that, since any interaction with the node through a realm will register it.
   * The only exception of that rule should be when the interaction is conditional, and the node definition includes an init function that needs to be eagerly evaluated.
   */
  register(t) {
    const e = M.get(t);
    if (e === void 0) return t;
    if (!this.definitionRegistry.has(t)) {
      if ((this.definitionRegistry.add(t), e.type === E))
        return f(this.cellInstance(e.initial, e.distinct, t), (o) => {
          this.inContext(() => {
            e.init(this, o);
          });
        });
      if (e.type === j)
        return f(this.signalInstance(e.distinct, t), (o) => {
          this.inContext(() => {
            e.init(this, o);
          });
        });
      const n = this.signalInstance(e.distinct),
        i = this.cellInstance(e.initial, !0),
        r = this.cellInstance(e.initial, e.distinct, t);
      return (
        this.link(i, r),
        this.pipeMap.set(r, n),
        this.inContext(() => {
          e.init(this, n, i);
        }),
        r
      );
    }
    return t;
  }
  inContext(t) {
    const e = I;
    I = this;
    const n = t();
    return (I = e), n;
  }
  /**
   * Convenient for mutation of cells that contian non-primitive values (e.g. arrays, or objects).
   * Specifies that the cell value should be changed when source emits, with the result of the map callback parameter.
   * the map parameter gets called with the current value of the cell and the value published through the source.
   * @typeParam T - the type of the cell value.
   * @typeParam K - the type of the value published through the source.
   * @example
   * ```ts
   * const items$ = Cell<string[]([])
   * const addItem$ = Signal<string>(false, (r) => {
   *   r.changeWith(items$, addItem$, (items, item) => [...items, item])
   * })
   * const r = new Realm()
   * r.pub(addItem$, 'foo')
   * r.pub(addItem$, 'bar')
   * r.getValue(items$) // ['foo', 'bar']
   * ```
   */
  changeWith(t, e, n) {
    this.connect({
      sources: [e],
      pulls: [t],
      sink: t,
      map: (i) => (r, o) => {
        i(n(o, r));
      },
    });
  }
  calculateExecutionMap(t) {
    const e = [],
      n = /* @__PURE__ */ new Set(),
      i = new k(),
      r = new C(),
      o = new k(),
      u = (l, w = 0) => {
        r.increment(l),
          !n.has(l) &&
            (this.register(l),
            i.use(l, (a) => {
              w = Math.max(...Array.from(a).map((c) => e.indexOf(c))) + 1;
            }),
            this.graph.use(l, (a) => {
              for (const c of a)
                c.sources.has(l)
                  ? (o.getOrCreate(c.sink).add(c), u(c.sink, w))
                  : i.getOrCreate(c.sink).add(l);
            }),
            n.add(l),
            e.splice(w, 0, l));
      };
    return (
      t.forEach(u),
      { participatingNodes: e, pendingPulls: i, projections: o, refCount: r }
    );
  }
  getExecutionMap(t) {
    let e = t;
    if (t.length === 1) {
      e = t[0];
      const i = this.executionMaps.get(e);
      if (i !== void 0) return i;
    } else
      for (const [i, r] of this.executionMaps.entries())
        if (
          Array.isArray(i) &&
          i.length === t.length &&
          i.every((o) => t.includes(o))
        )
          return r;
    const n = this.calculateExecutionMap(t);
    return this.executionMaps.set(e, n), n;
  }
  combineOperators(...t) {
    return (e) => {
      for (const n of t) e = n(e, this);
      return e;
    };
  }
}
function U(s, t = x, e = !0) {
  return f(Symbol(), (n) => {
    M.set(n, { type: E, distinct: e, initial: s, init: t });
  });
}
function Y(s, t, e = !0) {
  return f(Symbol(), (n) => {
    M.set(n, { type: K, initial: s, init: t, distinct: e });
  });
}
function q(s, t, e = !0) {
  return f(Symbol(), (n) => {
    M.set(n, {
      type: E,
      distinct: e,
      initial: s,
      init: (i, r) => {
        i.link(t(i, r), r);
      },
    });
  });
}
function F(s = x, t = !1) {
  return f(Symbol(), (e) => {
    M.set(e, { type: 'signal', distinct: t, init: s });
  });
}
function G(s = x) {
  return f(Symbol(), (t) => {
    M.set(t, { type: 'signal', distinct: !1, init: s });
  });
}
function y() {
  if (!I)
    throw new Error('This function must be called within a realm instance');
  return I;
}
const z = (s, t) => {
    y().link(s, t);
  },
  B = (...s) => {
    y().pub(...s);
  },
  H = (...s) => y().sub(...s),
  J = (...s) => {
    y().pubIn(...s);
  },
  X = (...s) => y().pipe(...s),
  Z = (...s) => {
    y().changeWith(...s);
  },
  $ = (...s) => y().combine(...s),
  tt = (s) => y().getValue(s),
  O = d.createContext(null);
function et({ children: s, initWith: t, updateWith: e = {} }) {
  const n = d.useMemo(() => new W(t), []);
  return (
    d.useEffect(() => {
      n.pubIn(e);
    }, [e, n]),
    /* @__PURE__ */ L(O.Provider, { value: n, children: s })
  );
}
function R() {
  const s = d.useContext(O);
  if (s === null)
    throw new Error('useRealm must be used within a RealmContextProvider');
  return s;
}
function P(s) {
  const t = R();
  t.register(s);
  const e = d.useCallback((n) => t.sub(s, n), [t, s]);
  return d.useSyncExternalStore(
    e,
    () => t.getValue(s),
    () => t.getValue(s),
  );
}
function nt(...s) {
  const t = R();
  return P(t.combineCells.apply(t, s));
}
function _(s) {
  const t = R();
  return (
    t.register(s),
    d.useCallback(
      (e) => {
        t.pub(s, e);
      },
      [t, s],
    )
  );
}
function st(s) {
  return [P(s), _(s)];
}
function it(s) {
  return (t, e) => {
    const n = e.signalInstance();
    return (
      e.connect({
        map: (i) => (r) => {
          i(s(r));
        },
        sink: n,
        sources: [t],
      }),
      n
    );
  };
}
function rt(...s) {
  return (t, e) => {
    const n = e.signalInstance();
    return (
      e.connect({
        map:
          (i) =>
          (...r) => {
            i(r);
          },
        pulls: s,
        sink: n,
        sources: [t],
      }),
      n
    );
  };
}
function ot(s) {
  return (t, e) => {
    const n = e.signalInstance();
    return (
      e.connect({
        map: (i) => () => {
          i(s);
        },
        sink: n,
        sources: [t],
      }),
      n
    );
  };
}
function ct(s) {
  return (t, e) => {
    const n = e.signalInstance();
    return (
      e.connect({
        map: (i) => (r) => {
          s(r) && i(r);
        },
        sink: n,
        sources: [t],
      }),
      n
    );
  };
}
function ut() {
  return (s, t) => {
    const e = t.signalInstance();
    let n = !1;
    return (
      t.connect({
        map: (i) => (r) => {
          n || ((n = !0), i(r));
        },
        sink: e,
        sources: [s],
      }),
      e
    );
  };
}
function at(s, t) {
  return (e, n) => {
    const i = n.signalInstance();
    return (
      n.connect({
        map: (r) => (o) => {
          r((t = s(t, o)));
        },
        sink: i,
        sources: [e],
      }),
      i
    );
  };
}
function lt(s) {
  return (t, e) => {
    const n = e.signalInstance();
    let i,
      r = null;
    return (
      e.sub(t, (o) => {
        (i = o),
          r === null &&
            (r = setTimeout(() => {
              (r = null), e.pub(n, i);
            }, s));
      }),
      n
    );
  };
}
function pt(s) {
  return (t, e) => {
    const n = e.signalInstance();
    let i,
      r = null;
    return (
      e.sub(t, (o) => {
        (i = o),
          r !== null && clearTimeout(r),
          (r = setTimeout(() => {
            e.pub(n, i);
          }, s));
      }),
      n
    );
  };
}
function ht() {
  return (s, t) => {
    const e = t.signalInstance();
    return (
      t.sub(s, (n) => {
        queueMicrotask(() => {
          t.pub(e, n);
        });
      }),
      e
    );
  };
}
function ft(s) {
  return (t, e) => {
    const n = e.signalInstance(),
      i = Symbol();
    let r = i;
    return (
      e.connect({
        map: (o) => (u) => {
          r !== i && (o([r, u]), (r = i));
        },
        sink: n,
        sources: [s],
      }),
      e.sub(t, (o) => {
        r = o;
      }),
      n
    );
  };
}
function gt(s, t, e) {
  return (n, i) => {
    const r = i.signalInstance();
    return (
      i.sub(n, (o) => {
        o !== null && typeof o == 'object' && 'then' in o
          ? (i.pub(r, s()),
            o
              .then((u) => {
                i.pub(r, t(u));
              })
              .catch((u) => {
                i.pub(r, e(u));
              }))
          : i.pub(r, t(o));
      }),
      r
    );
  };
}
const N = { type: 'loading', isLoading: !0, data: null, error: null };
function mt(s, t) {
  return Y(N, (e, n, i) => {
    function r(o) {
      e.pub(i, N),
        s(o)
          .then((u) => {
            e.pub(i, { type: 'success', isLoading: !1, data: u, error: null });
          })
          .catch((u) => {
            e.pub(i, { type: 'error', isLoading: !1, data: null, error: u });
          });
    }
    r(t), e.sub(n, r);
  });
}
export {
  G as Action,
  mt as AsyncQuery,
  U as Cell,
  q as DerivedCell,
  Y as Pipe,
  W as Realm,
  O as RealmContext,
  et as RealmProvider,
  F as Signal,
  Z as changeWith,
  $ as combine,
  pt as debounceTime,
  V as defaultComparator,
  ht as delayWithMicrotask,
  ct as filter,
  tt as getValue,
  gt as handlePromise,
  z as link,
  it as map,
  ot as mapTo,
  ft as onNext,
  ut as once,
  X as pipe,
  B as pub,
  J as pubIn,
  at as scan,
  H as sub,
  lt as throttleTime,
  st as useCell,
  P as useCellValue,
  nt as useCellValues,
  _ as usePublisher,
  R as useRealm,
  rt as withLatestFrom,
};
