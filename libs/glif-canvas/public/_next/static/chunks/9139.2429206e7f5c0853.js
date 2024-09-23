!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
      , t = Error().stack;
    t && (e._sentryDebugIds = e._sentryDebugIds || {},
      e._sentryDebugIds[t] = "8c38f438-6cfe-40ea-837b-34e1ab19607d",
      e._sentryDebugIdIdentifier = "sentry-dbid-8c38f438-6cfe-40ea-837b-34e1ab19607d")
  } catch (e) {}
}();
"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[9139], {
  69139: function(e, t, n) {
    let a;
    n.r(t),
      n.d(t, {
        default: function() {
          return eI
        }
      });
    var i = n(33741);
    function s(e) {
      let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
        , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1 / 0;
      return Math.max(t, Math.min(n, e))
    }
    var o = n(75480)
      , r = n(67197)
      , l = n(95159)
      , c = n(64026);
    let d = (0,
      r.kP)("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10)
      , u = "selectionArea"
      , h = "canvasResizeHandle"
      , f = e => (0,
      l.M)()((0,
      c.XR)( (t, n) => ({
      variables: [],
      currentInteraction: "idle",
      panOffset: {
        x: 0,
        y: 0
      },
      panOffsetBeforeTransform: null,
      setPanOffset: e => t(t => ({
        panOffset: {
          x: t.panOffset.x + e.x,
          y: t.panOffset.y + e.y
        }
      })),
      centerCanvas: e => t(t => ({
        panOffset: {
          x: (e.width - t.canvas.width) / 2,
          y: (e.height - t.canvas.height) / 2
        }
      })),
      canvas: {
        width: 0,
        height: 0,
        backgroundColor: "#ffffff"
      },
      canvasBeforeTransform: null,
      setCanvasProperties: e => t(t => ({
        canvas: {
          ...t.canvas,
          ...e
        }
      })),
      startCanvasTransform: () => t(e => ({
        currentInteraction: "resizing-canvas",
        canvasBeforeTransform: e.canvas,
        panOffsetBeforeTransform: e.panOffset
      })),
      stopCanvasTransform: () => t({
        currentInteraction: "idle",
        canvasBeforeTransform: null,
        panOffsetBeforeTransform: null
      }),
      resizeCanvas: function() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
          x: 0,
          y: 0
        }
          , n = arguments.length > 1 ? arguments[1] : void 0;
        return t(t => {
            var a, i;
            let o = null !== (a = t.canvasBeforeTransform) && void 0 !== a ? a : t.canvas
              , r = null !== (i = t.panOffsetBeforeTransform) && void 0 !== i ? i : t.panOffset;
            return "n" === n ? {
              canvas: {
                ...t.canvas,
                height: s(o.height + -1 * e.y, 0, 4e3)
              },
              panOffset: {
                x: r.x,
                y: r.y + e.y
              }
            } : "s" === n ? {
              canvas: {
                ...t.canvas,
                height: s(o.height + e.y, 0, 4e3)
              }
            } : "e" === n ? {
              canvas: {
                ...t.canvas,
                width: s(o.width + e.x, 0, 4e3)
              }
            } : "w" === n ? {
              canvas: {
                ...t.canvas,
                width: s(o.width + -1 * e.x, 0, 4e3)
              },
              panOffset: {
                x: r.x + e.x,
                y: r.y
              }
            } : t
          }
        )
      },
      selectionArea: null,
      selectionAreaOrigin: null,
      startSelectionArea: e => t({
        currentInteraction: "selecting-nodes",
        selectionAreaOrigin: e
      }),
      stopSelectionArea: () => t({
        currentInteraction: "idle",
        selectionArea: null,
        selectionAreaOrigin: null
      }),
      resizeSelectionArea: function() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
          x: 0,
          y: 0
        };
        return t(t => {
            var n;
            let a = null !== (n = t.selectionAreaOrigin) && void 0 !== n ? n : {
              left: 0,
              top: 0,
              width: 0,
              height: 0
            }
              , i = {
              x: a.left + e.x,
              y: a.top + e.y
            };
            return {
              selectionArea: {
                left: Math.min(a.left, i.x),
                top: Math.min(a.top, i.y),
                width: Math.abs(a.left - i.x),
                height: Math.abs(a.top - i.y)
              }
            }
          }
        )
      },
      clearSelectionArea: () => t({
        selectionArea: null
      }),
      selectAllNodesInSelectionArea: e => t(t => {
          if (!t.selectionArea)
            return t;
          let n = {
            x: t.selectionArea.left - t.panOffset.x,
            y: t.selectionArea.top - t.panOffset.y
          }
            , a = {
            x: t.selectionArea.left - t.panOffset.x + t.selectionArea.width,
            y: t.selectionArea.top - t.panOffset.y + t.selectionArea.height
          }
            , i = t.nodesBeforeTransform.filter(e => e._selected).map(e => e.id)
            , s = t.nodes.filter(e => {
              let t = {
                x: e.left + e.width,
                y: e.top + e.height
              };
              return n.x <= t.x && a.x >= e.left && n.y <= t.y && a.y >= e.top
            }
          ).map(e => e.id);
          return {
            nodes: t.nodes.map(t => {
                let n = !1;
                if (e) {
                  let e = i.includes(t.id)
                    , a = s.includes(t.id);
                  n = e ? !a : a
                } else
                  n = s.includes(t.id);
                return {
                  ...t,
                  _selected: n
                }
              }
            )
          }
        }
      ),
      nodes: [],
      getSelectionBounds: () => n().nodes.reduce( (e, t, n, a) => {
          if (0 === a.length)
            return null;
          if (!t._selected)
            return e;
          let i = null != e ? e : {
            width: -1 / 0,
            height: -1 / 0,
            left: 1 / 0,
            top: 1 / 0
          }
            , {left: s, top: o, width: r, height: l} = t
            , c = s + r
            , d = o + l;
          return s < i.left && (i.left = s),
          c > i.width && (i.width = c),
          o < i.top && (i.top = o),
          d > i.height && (i.height = d),
            e
        }
        , null),
      selectNode: (e, n) => t(t => n ? {
        nodes: t.nodes.map(t => ({
          ...t,
          _selected: t.id === e || t._selected
        }))
      } : {
        nodes: t.nodes.map(t => ({
          ...t,
          _selected: t.id === e
        }))
      }),
      deselect: () => t(e => e.nodes.some(e => e._selected) ? {
        nodes: e.nodes.map(e => ({
          ...e,
          _selected: !1,
          _status: "idle"
        }))
      } : e),
      startEditing: e => t(t => ({
        nodes: t.nodes.map(t => ({
          ...t,
          _status: t.id === e ? "editing" : t._status,
          _selected: t.id === e
        }))
      })),
      stopEditing: () => t(e => ({
        nodes: e.nodes.map(e => ({
          ...e,
          _status: "editing" === e._status ? "idle" : e._status
        }))
      })),
      nodesBeforeTransform: [],
      startNodeTransform: (e, n) => t(t => {
          let a = t.nodes.filter(e => e._selected).map(e => e.id)
            , i = n && !a.includes(n) ? [n] : a
            , s = t.nodes.map(t => ({
            ...t,
            _status: i.includes(t.id) ? e : "idle",
            _selected: i.includes(t.id)
          }));
          return {
            currentInteraction: "moving" === e ? "moving-node" : "resizing-node",
            nodes: s,
            nodesBeforeTransform: t.nodes.map(e => ({
              ...e,
              _selected: i.includes(e.id)
            }))
          }
        }
      ),
      stopNodeTransform: () => t(e => ({
        currentInteraction: "idle",
        nodes: e.nodes.map(t => {
            var n;
            let a = null !== (n = e.nodesBeforeTransform.find(e => e.id === t.id)) && void 0 !== n ? n : t;
            return {
              ...t,
              _status: "idle",
              _selected: a._selected
            }
          }
        ),
        nodesBeforeTransform: []
      })),
      moveNodes: function(e) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
          x: 0,
          y: 0
        };
        return t(t => {
            let a = null != e ? e : t.nodes.filter(e => e._selected).map(e => e.id);
            return {
              nodes: t.nodes.map(e => {
                  var i;
                  if (!a.includes(e.id) || e.locked)
                    return e;
                  let s = null !== (i = t.nodesBeforeTransform.find(t => t.id === e.id)) && void 0 !== i ? i : e
                    , o = s.left + n.x
                    , r = s.top + n.y;
                  return {
                    ...e,
                    left: o,
                    top: r
                  }
                }
              )
            }
          }
        )
      },
      resizeNode: function(e) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
          x: 0,
          y: 0
        }
          , a = arguments.length > 2 ? arguments[2] : void 0;
        return t(t => {
            var i;
            let o = null != e ? e : null === (i = t.nodes.find(e => "resizing" === e._status)) || void 0 === i ? void 0 : i.id;
            return {
              nodes: t.nodes.map(e => {
                  var i;
                  if (e.id !== o || e.locked)
                    return e;
                  let r = null !== (i = t.nodesBeforeTransform.find(t => t.id === e.id)) && void 0 !== i ? i : e
                    , l = r.width
                    , c = r.height
                    , d = r.left
                    , u = r.top
                    , h = ["w", "nw", "sw"].includes(null != a ? a : "")
                    , f = ["e", "ne", "se"].includes(null != a ? a : "")
                    , p = ["n", "nw", "ne"].includes(null != a ? a : "")
                    , g = ["s", "sw", "se"].includes(null != a ? a : "")
                    , m = h || f
                    , x = p || g;
                  m && !x ? n.y = 0 : x && !m && (n.x = 0);
                  let v = m ? l + (f ? n.x : -n.x) : l
                    , w = x ? c + (g ? n.y : -n.y) : c
                    , b = m ? d + (h ? n.x : 0) : d + n.x
                    , y = x ? u + (p ? n.y : 0) : u + n.y;
                  return {
                    ...e,
                    width: Math.round(s(v)),
                    height: Math.round(s(w)),
                    left: b,
                    top: y
                  }
                }
              )
            }
          }
        )
      },
      moveNodeLayerUp: e => t(t => {
          let n = t.nodes.find(t => t.id === e);
          if (!n || n.locked)
            return t;
          let a = t.nodes.indexOf(n);
          if (-1 === a || a === t.nodes.length - 1)
            return t;
          let i = [...t.nodes]
            , s = i[a]
            , o = i[a + 1];
          return s && o && (i[a] = o,
            i[a + 1] = s),
            i.forEach( (e, t) => e.layerIndex = t),
            {
              nodes: i
            }
        }
      ),
      moveNodeLayerDown: e => t(t => {
          let n = t.nodes.find(t => t.id === e);
          if (!n || n.locked)
            return t;
          let a = t.nodes.indexOf(n);
          if (-1 === a || 0 === a)
            return t;
          let i = [...t.nodes]
            , s = i[a]
            , o = i[a - 1];
          return s && o && (i[a] = o,
            i[a - 1] = s),
            i.forEach( (e, t) => e.layerIndex = t),
            {
              nodes: i
            }
        }
      ),
      duplicateNode: function(e) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
          x: 10,
          y: 10
        };
        return t(t => {
            let a = t.nodes.find(t => t.id === e);
            if (!a)
              return t;
            let i = d()
              , s = [...t.nodes]
              , o = {
              ...a,
              id: i,
              left: a.left + n.x,
              top: a.top + n.y,
              locked: !1
            };
            return s.splice(a.layerIndex + 1, 0, o),
              s.forEach( (e, t) => {
                  e._selected = e.id === i,
                    e.layerIndex = t
                }
              ),
              {
                nodes: s
              }
          }
        )
      },
      lockNodes: e => t(t => {
          let n = null != e ? e : t.nodes.filter(e => e._selected).map(e => e.id);
          return {
            nodes: t.nodes.map(e => n.includes(e.id) ? {
              ...e,
              locked: !0
            } : e)
          }
        }
      ),
      unlockNodes: e => t(t => {
          let n = null != e ? e : t.nodes.filter(e => e._selected).map(e => e.id);
          return {
            nodes: t.nodes.map(e => n.includes(e.id) ? {
              ...e,
              locked: !1
            } : e)
          }
        }
      ),
      deleteNodes: e => t(t => {
          let n = null != e ? e : t.nodes.filter(e => e._selected).map(e => e.id);
          return {
            nodes: t.nodes.filter(e => !n.includes(e.id)).map( (e, t) => ({
              ...e,
              layerIndex: t,
              selected: !1
            }))
          }
        }
      ),
      addNode: (e, n) => t(t => {
          let a = d()
            , i = [...t.nodes]
            , s = {
            ...e,
            id: a
          }
            , r = {
            _status: "idle",
            _selected: null != n && n
          };
          switch (s.type) {
            case "text":
            {
              let e = o.kZ.safeParse(s);
              e.success && i.push({
                ...e.data,
                ...r
              });
              break
            }
            case "image":
            {
              let e = o.Ei.safeParse(s);
              e.success && i.push({
                ...e.data,
                ...r
              });
              break
            }
            case "shape":
            {
              let e = o.wy.safeParse(s);
              e.success && i.push({
                ...e.data,
                ...r
              })
            }
          }
          return i.forEach( (e, t) => e.layerIndex = t),
            {
              nodes: i
            }
        }
      ),
      setNodeData: (e, n) => t(t => ({
        nodes: t.nodes.map(t => t.id !== e ? t : {
          ...t,
          ...n
        })
      })),
      ...e
    })));
    var p = n(16565)
      , g = n(24441);
    let m = (0,
      p.createContext)(null);
    function x(e) {
      let {children: t, variables: n, initialCanvas: a, initialNodes: s} = e
        , o = (0,
        p.useRef)(f({
        variables: null != n ? n : [],
        canvas: {
          width: 500,
          height: 500,
          backgroundColor: "#ffffff",
          ...a
        },
        nodes: s ? s.map(e => ({
          ...e,
          _status: "idle",
          _selected: !1
        })) : []
      })).current;
      return (0,
        p.useEffect)( () => {
          o.setState({
            variables: null != n ? n : []
          })
        }
        , [o, n]),
        (0,
          i.jsx)(m.Provider, {
          value: o,
          children: t
        })
    }
    function v(e, t) {
      let n = (0,
        p.useContext)(m);
      if (!n)
        throw Error("useCanvas must be used within a CanvasProvider");
      return (0,
        g.oR)(n, e, t)
    }
    function w(e, t) {
      let n = (0,
        p.useContext)(m);
      if (!n)
        throw Error("useSubscribeCanvas must be used within a CanvasProvider");
      (0,
        p.useEffect)( () => n.subscribe(e, t), [n, e, t])
    }
    var b = n(47344)
      , y = n(84875)
      , j = n.n(y);
    function k(e) {
      let {direction: t, ...n} = e
        , a = "".concat(h, "-").concat(t)
        , {attributes: s, listeners: o, setNodeRef: r} = (0,
        b.O1)({
        id: a
      })
        , l = {};
      switch (t) {
        case "n":
          l = {
            top: -10,
            left: -2,
            width: "calc(100% + 4px)",
            alignItems: "flex-end",
            justifyContent: "center",
            cursor: "ns-resize",
            paddingBottom: 5
          };
          break;
        case "e":
          l = {
            top: 0,
            right: -10,
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            cursor: "ew-resize",
            paddingLeft: 5
          };
          break;
        case "s":
          l = {
            bottom: -10,
            left: -2,
            width: "calc(100% + 4px)",
            alignItems: "flex-start",
            justifyContent: "center",
            cursor: "ns-resize",
            paddingTop: 5
          };
          break;
        case "w":
          l = {
            top: 0,
            left: -10,
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "ew-resize",
            paddingRight: 5
          };
          break;
        case "nw":
          l = {
            top: -16,
            left: -16,
            alignItems: "center",
            justifyContent: "center",
            cursor: "nwse-resize"
          };
          break;
        case "ne":
          l = {
            top: -16,
            right: -16,
            alignItems: "center",
            justifyContent: "center",
            cursor: "nesw-resize"
          };
          break;
        case "sw":
          l = {
            bottom: -16,
            left: -16,
            alignItems: "center",
            justifyContent: "center",
            cursor: "nesw-resize"
          };
          break;
        case "se":
          l = {
            bottom: -16,
            right: -16,
            alignItems: "center",
            justifyContent: "center",
            cursor: "nwse-resize"
          }
      }
      let c = ["n", "e", "s", "w"].includes(t)
        , d = ["nw", "ne", "sw", "se"].includes(t);
      return (0,
        i.jsxs)("div", {
        ref: r,
        ...o,
        ...s,
        "data-direction": t,
        style: {
          position: "absolute",
          display: "flex",
          width: c ? 15 : 30,
          height: c ? 15 : 30,
          pointerEvents: "all",
          ...l
        },
        ...n,
        children: [c && (0,
          i.jsx)("div", {
          className: j()("bg-canvas-controls", ["e", "w"].includes(t) ? "h-full w-[2px]" : "h-[2px] w-full")
        }), d && (0,
          i.jsx)("div", {
          style: {
            width: 8,
            height: 8,
            backgroundColor: "white"
          },
          className: "border-canvas-controls rotate-45 transform border-2 bg-white"
        })]
      })
    }
    function C(e) {
      let {width: t, height: n} = e;
      return (0,
        i.jsxs)("div", {
        className: j()("bg-canvas-controls absolute -bottom-8 left-1/2 w-max -translate-x-1/2 rounded-sm p-1 text-xs tabular-nums text-white"),
        children: [t, " \xd7 ", n]
      })
    }
    function N(e) {
      let {className: t} = e
        , n = v(e => e.canvas)
        , a = v(e => e.currentInteraction)
        , [s,o] = (0,
        p.useState)(!1)
        , r = {
        onMouseEnter: () => {
          o("idle" === a)
        }
        ,
        onMouseLeave: () => o(!1)
      };
      return (0,
        i.jsxs)("div", {
        className: j()("pointer-events-none relative", s || "resizing-canvas" === a ? "opacity-100" : "opacity-0", t),
        children: [(0,
          i.jsx)(k, {
          ...r,
          direction: "n"
        }), (0,
          i.jsx)(k, {
          ...r,
          direction: "w"
        }), (0,
          i.jsx)(k, {
          ...r,
          direction: "s"
        }), (0,
          i.jsx)(k, {
          ...r,
          direction: "e"
        }), (0,
          i.jsx)(C, {
          width: n.width,
          height: n.height
        })]
      })
    }
    var z = n(5359)
      , F = n(44291);
    function P() {
      let e = v(e => e.canvas)
        , t = v(e => e.setCanvasProperties)
        , n = (0,
        F.y)(e => {
          t(e)
        }
        , [t], 1e3);
      return (0,
        i.jsxs)("div", {
        className: "flex min-w-[240px] max-w-[253px] flex-col gap-4 rounded-lg border border-glif-stone-300 bg-white p-4 pb-5",
        children: [(0,
          i.jsx)("h3", {
          className: "sr-only",
          children: "Canvas Properties"
        }), (0,
          i.jsx)(z.Z, {
          innerLeftLabel: (0,
            i.jsx)("span", {
            className: "whitespace-nowrap",
            children: "Background"
          }),
          innerRightLabel: (0,
            i.jsx)("input", {
            type: "color",
            className: "bg-transparent",
            onChange: e => {
              t({
                backgroundColor: e.currentTarget.value
              })
            }
          }),
          value: e.backgroundColor,
          onChange: e => t({
            backgroundColor: e.currentTarget.value
          })
        }), (0,
          i.jsxs)("div", {
          className: "flex gap-3",
          children: [(0,
            i.jsx)(z.Z, {
            innerLeftLabel: "w",
            innerRightLabel: "px",
            defaultValue: e.width.toString(),
            onChange: e => n({
              width: parseInt(e.currentTarget.value, 10)
            }),
            type: "number"
          }), (0,
            i.jsx)(z.Z, {
            innerLeftLabel: "h",
            innerRightLabel: "px",
            defaultValue: e.height.toString(),
            onChange: e => n({
              height: parseInt(e.currentTarget.value, 10)
            }),
            type: "number"
          })]
        })]
      })
    }
    var I = n(78641)
      , S = n(85061)
      , L = n(79446);
    async function E(e) {
      console.log("Uploading to cloudinary");
      let t = await (0,
        L.DS)(a, e)
        , n = e instanceof File ? e.name : "uploaded.".concat(t.format);
      return {
        url: t.secure_url,
        name: n
      }
    }
    a = "canvas-block-production";
    var A = n(42924);
    function _(e) {
      let {selectedNode: t} = e
        , n = v(e => e.setNodeData)
        , [a,s] = (0,
        p.useState)(!1)
        , [o,r] = (0,
        p.useState)(!1);
      async function l(e) {
        s(!0);
        try {
          let a = await E(e);
          n(t.id, {
            src: a.url,
            variable: void 0
          })
        } catch (e) {
          throw "string" == typeof e ? e : "Error uploading image"
        } finally {
          s(!1)
        }
      }
      let {getRootProps: c, getInputProps: d, open: u} = (0,
        I.uI)({
        disabled: a,
        maxSize: 2e7,
        maxFiles: 1,
        noClick: !0,
        onDropAccepted: e => {
          if (0 === e.length)
            return;
          let t = e[0];
          t instanceof File && l(t)
        }
        ,
        onDropRejected: () => {}
      });
      return (0,
        i.jsxs)("div", {
        ...c(),
        className: a ? "cursor-not-allowed" : "",
        children: [(0,
          i.jsx)("div", {
          className: "mb-2 text-sm",
          children: "Replace image"
        }), (0,
          i.jsx)("input", {
          ...d()
        }), (0,
          i.jsxs)("div", {
          className: "relative flex items-center gap-2",
          children: [(0,
            i.jsx)(S.Z, {
            disabled: a,
            iconName: "uploadImage",
            label: "Pick an image",
            isAccessibilityLabel: !0,
            onClick: e => {
              e.stopPropagation(),
                r(!1),
                u()
            }
          }), (0,
            i.jsx)(S.Z, {
            disabled: a,
            onClick: e => {
              e.stopPropagation(),
                r(!o)
            }
            ,
            theme: o ? "dark" : "light",
            iconName: "link",
            label: "Paste an image or URL",
            isAccessibilityLabel: !0
          })]
        }), o && (0,
          i.jsx)("div", {
          className: "mt-4",
          children: (0,
            i.jsx)(A.Z, {
            maxSize: 2e7,
            onUpload: l
          })
        })]
      })
    }
    var Z = n(10773)
      , O = n(83376)
      , T = n(40261)
      , D = n(3847)
      , B = n(37176)
      , R = n(87689);
    let M = R.z.object({
      family: R.z.string(),
      variants: R.z.array(R.z.string()),
      subsets: R.z.array(R.z.string()),
      version: R.z.string(),
      lastModified: R.z.string(),
      files: R.z.record(R.z.string()),
      category: R.z.string(),
      kind: R.z.string(),
      menu: R.z.string()
    })
      , U = R.z.object({
      kind: R.z.string(),
      items: R.z.array(M)
    })
      , G = R.z.object({
      family: R.z.string(),
      stylesheetUrl: R.z.string(),
      stylesheetContents: R.z.string()
    })
      , V = G.extend({
      isPreview: R.z.literal(!0)
    })
      , W = G.extend({
      isPreview: R.z.literal(!1)
    });
    R.z.union([V, W]);
    class H {
      async addFonts(e) {
        let {families: t, loadPreviews: n, loadFullFonts: a} = e;
        if (0 !== t.length)
          try {
            await this.fetchGoogleFonts(t),
            n && await this.loadPreviews(t),
            a && await this.loadFonts(t)
          } catch (e) {
            console.error(e)
          }
      }
      getGoogleFontsMap() {
        return this.googleFonts
      }
      getGoogleFontsList() {
        return [...this.googleFonts.values()].sort( (e, t) => e.family.localeCompare(t.family))
      }
      getFonts() {
        return [...this.fonts.values()].sort( (e, t) => e.family.localeCompare(t.family))
      }
      getPreviewFonts() {
        return [...this.previewFonts.values()].sort( (e, t) => e.family.localeCompare(t.family))
      }
      getFontsForStylesheets() {
        let e = this.getFonts()
          , t = this.getPreviewFonts().filter(t => !e.find(e => e.family === t.family));
        return [...e, ...t]
      }
      async fetchGoogleFonts(e) {
        let t = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
        for (let n of (t.searchParams.append("key", "AIzaSyA-EkTtPWUTlortvdMxzcTB2vXnKJyeup0"),
          t.searchParams.append("sort", "alpha"),
          t.searchParams.append("capability", "WOFF2"),
          e))
          t.searchParams.append("family", n);
        let n = await fetch(t.toString());
        if (!n.ok)
          throw Error("Failed to fetch fonts from Google Fonts API: ".concat(e.join(", ")));
        let a = U.parse(await n.json());
        for (let e of a.items)
          this.googleFonts.set(e.family, e);
        return a.items
      }
      async makeGoogleFontStylesheetUrl(e, t) {
        let n = this.googleFonts.get(e);
        if (n || (await this.fetchGoogleFonts([e]),
          n = this.googleFonts.get(e)),
          !n)
          throw Error("Failed to request font ".concat(e));
        let a = new URL("https://fonts.googleapis.com/css");
        return a.searchParams.append("family", "".concat(n.family, ":").concat(n.variants.join(","))),
          a.searchParams.append("display", "swap"),
        t && a.searchParams.append("text", t),
          a.toString()
      }
      async loadPreviews(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
          , n = e.map(e => this.makeGoogleFontStylesheetUrl(e, t))
          , a = await Promise.all(n);
        for (let t of e) {
          if (this.previewFonts.has(t))
            continue;
          let n = a[e.indexOf(t)];
          if (!n)
            continue;
          let i = await fetch(n);
          if (!i.ok)
            throw Error("Failed to load preview font stylesheet for font: ".concat(t));
          let s = await i.text();
          this.previewFonts.set(t, {
            family: t,
            stylesheetContents: s,
            stylesheetUrl: n,
            isPreview: !0
          })
        }
      }
      async loadFonts(e) {
        let t = e.map(e => this.makeGoogleFontStylesheetUrl(e))
          , n = await Promise.all(t);
        for (let t of e) {
          if (this.fonts.has(t))
            continue;
          let a = n[e.indexOf(t)];
          if (!a)
            continue;
          let i = await fetch(a);
          if (!i.ok)
            throw Error("Failed to load font stylesheet for font: ".concat(t));
          let s = await i.text();
          this.fonts.set(t, {
            family: t,
            stylesheetContents: s,
            stylesheetUrl: a,
            isPreview: !1
          })
        }
      }
      constructor() {
        this.googleFonts = new Map,
          this.fonts = new Map,
          this.previewFonts = new Map
      }
    }
    let X = [{
      name: "Anton"
    }, {
      name: "Caveat"
    }, {
      name: "DM Sans"
    }, {
      name: "EB Garamond"
    }, {
      name: "Lora"
    }, {
      name: "Lato"
    }, {
      name: "Roboto Mono"
    }, {
      name: "Playfair Display"
    }, {
      name: "Space Grotesk"
    }, {
      name: "UnifrakturCook",
      variant: "700"
    }]
      , Y = (0,
      p.createContext)(null);
    function Q(e) {
      let {children: t, initialFonts: n=[]} = e
        , a = (0,
        p.useRef)(!1)
        , [s,o] = (0,
        p.useState)([])
        , [r,l] = (0,
        p.useState)([])
        , [c,d] = (0,
        p.useState)([])
        , u = (0,
        p.useRef)(new H);
      (0,
        p.useEffect)( () => {
          (async () => {
              a.current || (await u.current.addFonts({
                families: n,
                loadPreviews: !0,
                loadFullFonts: !0
              }),
                await u.current.addFonts({
                  families: X.map(e => e.name),
                  loadPreviews: !0,
                  loadFullFonts: !1
                }),
                o(u.current.getFonts()),
                l(u.current.getPreviewFonts()),
                d(u.current.getFontsForStylesheets()),
                a.current = !0)
            }
          )().catch(e => {
              console.error("Failed to initialize font loader"),
                console.error(e)
            }
          )
        }
        , [a, u, n]);
      let h = (0,
        p.useCallback)(async e => {
          await u.current.addFonts({
            families: [e],
            loadPreviews: !0,
            loadFullFonts: !0
          }),
            o(u.current.getFonts()),
            l(u.current.getPreviewFonts()),
            d(u.current.getFontsForStylesheets())
        }
        , [u]);
      return (0,
        i.jsxs)(Y.Provider, {
        value: {
          fonts: s,
          previews: r,
          addFullFont: h
        },
        children: [(0,
          i.jsx)("link", {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        }), (0,
          i.jsx)("link", {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: ""
        }), c.map(e => (0,
          i.jsx)("link", {
          id: "font-loader-".concat(e.isPreview ? "preview-" : "").concat(e.family),
          rel: "stylesheet",
          href: e.stylesheetUrl
        }, e.family)), t]
      })
    }
    var q = n(60330);
    function K(e) {
      let {active: t, className: n, showLabel: a=!1, withIcon: i} = e;
      return j()("flex flex-row gap-1 justify-center items-center h-[32px] min-w-[32px]", "rounded-sm", "text-sm whitespace-nowrap", "disabled:cursor-not-allowed disabled:bg-[--theme-button-secondary-bg-disabled] disabled:text-[--theme-button-secondary-fg-disabled]", "enabled:focus:outline-0", "transition-colors", "data-[state=open]:bg-[--theme-button-primary-bg-active] data-[state=open]:text-[--theme-button-primary-fg-active]", ...t ? ["bg-[--theme-button-primary-bg-active] text-[--theme-button-primary-fg-active]", "hover:bg-[--theme-button-primary-bg-active] hover:text-[--theme-button-primary-fg-active]", "focus-visible:bg-[--theme-button-primary-bg-active] focus-visible:text-[--theme-button-primary-fg-active]"] : ["text-white", "hover:bg-[--theme-button-secondary-bg-active] hover:text-[--theme-button-secondary-fg-active]", "focus-visible:bg-[--theme-button-secondary-bg-active] focus-visible:text-[--theme-button-secondary-fg-active]"], !!i && !a && "w-[32px]", !i && "px-3", i && a && "px-2 pr-3", n)
    }
    function J() {
      var e;
      let t = v(e => e.variables)
        , n = v(e => e.canvas)
        , a = v(e => e.nodes)
        , s = v(e => e.setNodeData)
        , o = v(e => e.addNode)
        , r = v(e => e.moveNodeLayerUp)
        , l = v(e => e.moveNodeLayerDown)
        , c = v(e => e.lockNodes)
        , d = v(e => e.unlockNodes)
        , u = v(e => e.duplicateNode)
        , h = v(e => e.deleteNodes)
        , {previews: f, addFullFont: g} = function() {
        let e = (0,
          p.useContext)(Y);
        if (!e)
          throw Error("useGoogleFonts must be used within a GoogleFontsProvider");
        return e
      }()
        , m = a.filter(e => e._selected)
        , x = m.length > 0
        , w = a.filter(e => "editing" === e._status)[0]
        , b = 1 === m.length && !w
        , y = 1 === m.length && !!w
        , j = null !== (e = m[0]) && void 0 !== e ? e : null
        , k = m.length > 1
        , C = "w-max mx-auto flex flex-row items-center justify-between gap-2 rounded-b-md bg-gray-700 p-2 relative z-20 text-white z-[100]"
        , N = "w-[1px] h-[24px] bg-gray-500"
        , z = null;
      if (x || (z = (0,
        i.jsxs)(B.fC, {
        className: C,
        "aria-label": "Canvas controls",
        children: [(0,
          i.jsxs)(D.fC, {
          children: [(0,
            i.jsx)(D.xz, {
            asChild: !0,
            children: (0,
              i.jsxs)(B.zx, {
              "aria-label": "Canvas",
              className: K({
                withIcon: !1,
                showLabel: !0,
                className: "group"
              }),
              children: [(0,
                i.jsx)(Z.Z, {
                name: "canvasSize"
              }), " Canvas ", (0,
                i.jsx)(en, {})]
            })
          }), (0,
            i.jsx)(D.h_, {
            children: (0,
              i.jsx)(D.VY, {
              className: "z-[200]",
              sideOffset: 10,
              children: (0,
                i.jsx)(P, {})
            })
          })]
        }), (0,
          i.jsx)(B.Z0, {
          className: N
        }), (0,
          i.jsx)("span", {
          children: "Insert:"
        }), (0,
          i.jsx)(T.Z, {
          tip: "Insert text",
          children: (0,
            i.jsx)(B.zx, {
            "aria-label": "Insert text",
            className: K({
              withIcon: !0,
              showLabel: !1
            }),
            onClick: e => {
              e.stopPropagation(),
                o({
                  type: "text",
                  width: 200,
                  height: 40,
                  left: n.width / 2 - 100,
                  top: n.height / 2 - 20,
                  text: "New text"
                }, !0)
            }
            ,
            children: (0,
              i.jsx)(Z.Z, {
              name: "insertText"
            })
          })
        }), (0,
          i.jsx)(T.Z, {
          tip: "Insert image",
          children: (0,
            i.jsx)(B.zx, {
            "aria-label": "Insert Image",
            className: K({
              withIcon: !1,
              showLabel: !0
            }),
            onClick: e => {
              e.stopPropagation();
              let t = $(100, 300)
                , a = $(100, 300);
              o({
                type: "image",
                width: t,
                height: a,
                left: n.width / 2 - t / 2,
                top: n.height / 2 - a / 2,
                src: "https://placekitten.com/".concat(2 * t, "/").concat(2 * a)
              }, !0)
            }
            ,
            children: (0,
              i.jsx)(Z.Z, {
              name: "insertImage"
            })
          })
        })]
      })),
      (b || y) && j && (z = (0,
        i.jsxs)(B.fC, {
        className: C,
        "aria-label": "Layer controls for ".concat(j.id),
        children: ["text" === j.type && (0,
          i.jsxs)(i.Fragment, {
          children: [(0,
            i.jsxs)(D.fC, {
            children: [(0,
              i.jsx)(D.xz, {
              asChild: !0,
              children: (0,
                i.jsxs)(B.zx, {
                "aria-label": "Change text source",
                className: K({
                  withIcon: !1,
                  showLabel: !0,
                  className: "group"
                }),
                onClick: e => e.stopPropagation(),
                children: [(0,
                  i.jsx)(Z.Z, {
                  name: "insertText"
                }), " Source ", (0,
                  i.jsx)(en, {})]
              })
            }), (0,
              i.jsx)(D.h_, {
              children: (0,
                i.jsx)(D.VY, {
                className: "z-[200]",
                sideOffset: 10,
                align: "start",
                children: (0,
                  i.jsx)("div", {
                  className: "flex min-w-[320px] max-w-[420px] flex-col gap-4 rounded-lg border border-glif-stone-300 bg-white p-4 pb-5",
                  children: t && t.length > 0 ? (0,
                    i.jsxs)("div", {
                    children: [(0,
                      i.jsx)("div", {
                      className: "mb-2 text-sm",
                      children: "Variables"
                    }), (0,
                      i.jsx)("div", {
                      className: "flex flex-wrap gap-2",
                      children: null == t ? void 0 : t.map(e => (0,
                        i.jsx)(O.Z, {
                        variable: e,
                        onClick: () => {
                          s(j.id, {
                            text: "{".concat(e.name, "}")
                          })
                        }
                      }, e.name))
                    })]
                  }) : null
                })
              })
            })]
          }), (0,
            i.jsx)(B.Z0, {
            className: N
          }), (0,
            i.jsxs)(D.fC, {
            children: [(0,
              i.jsx)(D.xz, {
              asChild: !0,
              onClick: e => e.stopPropagation(),
              children: (0,
                i.jsxs)(B.zx, {
                "aria-label": "Font",
                className: K({
                  withIcon: !1,
                  showLabel: !0,
                  className: "group w-[142px]"
                }),
                style: {
                  fontFamily: "'".concat(j.fontFamily, "'")
                },
                children: [(0,
                  i.jsx)("span", {
                  className: "mr-auto truncate",
                  children: j.fontFamily
                }), (0,
                  i.jsx)(en, {})]
              })
            }), (0,
              i.jsx)(D.h_, {
              children: (0,
                i.jsx)(D.VY, {
                className: "z-[200]",
                sideOffset: 10,
                align: "start",
                children: (0,
                  i.jsx)("div", {
                  className: "flex min-w-[240px] flex-col gap-4 rounded-lg border border-glif-stone-300 bg-white p-2 pb-3",
                  children: (0,
                    i.jsx)("div", {
                    className: "flex flex-col",
                    children: f.map(e => (0,
                      i.jsx)("button", {
                      type: "button",
                      value: e.family,
                      style: {
                        fontFamily: "'".concat(e.family, "'")
                      },
                      className: "w-full rounded-md p-2 text-left text-sm hover:bg-gray-100",
                      onClick: async t => {
                        t.stopPropagation(),
                          s(j.id, {
                            fontFamily: e.family
                          }),
                          await g(e.family)
                      }
                      ,
                      children: e.family
                    }, e.family))
                  })
                })
              })
            })]
          }), (0,
            i.jsx)(et, {
            value: parseInt(j.fontSize),
            onChange: e => {
              s(j.id, {
                fontSize: "".concat(e, "px")
              })
            }
          }), (0,
            i.jsx)(B.zx, {
            "aria-label": "Text colour",
            className: K({
              withIcon: !1,
              showLabel: !0
            }),
            onClick: e => e.stopPropagation(),
            children: (0,
              i.jsx)("input", {
              type: "color",
              className: "h-8 w-8 bg-transparent",
              value: j.color,
              onChange: e => {
                e.stopPropagation(),
                  s(j.id, {
                    color: e.currentTarget.value
                  })
              }
            })
          }), (0,
            i.jsx)(B.tX, {
            type: "single",
            "aria-label": "Bold text",
            children: (0,
              i.jsx)(B.HP, {
              value: "bold",
              "aria-label": "Bold",
              className: K({
                withIcon: !0,
                active: "bold" === j.fontWeight
              }),
              onClick: e => {
                e.stopPropagation(),
                  s(j.id, {
                    fontWeight: "bold" === j.fontWeight ? "normal" : "bold"
                  })
              }
              ,
              children: (0,
                i.jsx)(Z.Z, {
                name: "textBold"
              })
            })
          }), (0,
            i.jsx)(B.tX, {
            type: "single",
            "aria-label": "Italic text",
            children: (0,
              i.jsx)(B.HP, {
              value: "italic",
              "aria-label": "Italic",
              className: K({
                withIcon: !0,
                active: j.italic
              }),
              onClick: e => {
                e.stopPropagation(),
                  s(j.id, {
                    italic: !j.italic
                  })
              }
              ,
              children: (0,
                i.jsx)(Z.Z, {
                name: "textItalic"
              })
            })
          }), (0,
            i.jsx)(B.tX, {
            type: "single",
            "aria-label": "Underline text",
            children: (0,
              i.jsx)(B.HP, {
              value: "underline",
              "aria-label": "Underline",
              className: K({
                withIcon: !0,
                active: j.underline
              }),
              onClick: e => {
                e.stopPropagation(),
                  s(j.id, {
                    underline: !j.underline
                  })
              }
              ,
              children: (0,
                i.jsx)(Z.Z, {
                name: "textUnderline"
              })
            })
          }), (0,
            i.jsx)(B.Z0, {
            className: N
          }), (0,
            i.jsxs)(B.zx, {
            "aria-label": "Text align",
            className: K({
              withIcon: !0
            }),
            onClick: e => {
              e.stopPropagation();
              let t = j.textAlign;
              switch (j.textAlign) {
                case "left":
                  t = "center";
                  break;
                case "center":
                  t = "right";
                  break;
                case "right":
                  t = "left"
              }
              s(j.id, {
                textAlign: t
              })
            }
            ,
            children: ["center" === j.textAlign && (0,
              i.jsx)(Z.Z, {
              name: "textAlignCenter"
            }), "left" === j.textAlign && (0,
              i.jsx)(Z.Z, {
              name: "textAlignLeft"
            }), "right" === j.textAlign && (0,
              i.jsx)(Z.Z, {
              name: "textAlignRight"
            })]
          }), (0,
            i.jsx)(B.zx, {
            "aria-label": "Vertical align",
            className: K({
              withIcon: !1,
              showLabel: !0
            }),
            onClick: e => {
              e.stopPropagation();
              let t = j.verticalAlign;
              switch (j.verticalAlign) {
                case "top":
                  t = "middle";
                  break;
                case "middle":
                  t = "bottom";
                  break;
                case "bottom":
                  t = "top"
              }
              s(j.id, {
                verticalAlign: t
              })
            }
            ,
            children: (0,
              i.jsx)(Z.Z, {
              name: {
                top: "alignTop",
                middle: "alignCenter",
                bottom: "alignBottom"
              }[j.verticalAlign]
            })
          }), (0,
            i.jsx)(B.tX, {
            type: "single",
            "aria-label": "Clip bounds",
            children: (0,
              i.jsx)(T.Z, {
              tip: "Clip extra text",
              children: (0,
                i.jsx)(B.HP, {
                value: "clipBounds",
                "aria-label": "Clip bounds",
                className: K({
                  withIcon: !1,
                  showLabel: !0,
                  active: j.clipBounds
                }),
                onClick: e => {
                  e.stopPropagation(),
                    s(j.id, {
                      clipBounds: !j.clipBounds
                    })
                }
                ,
                children: (0,
                  i.jsx)(Z.Z, {
                  name: "textClip"
                })
              })
            })
          })]
        }), "image" === j.type && (0,
          i.jsxs)(i.Fragment, {
          children: [(0,
            i.jsxs)(D.fC, {
            children: [(0,
              i.jsx)(T.Z, {
              tip: "Image source",
              children: (0,
                i.jsx)(D.xz, {
                asChild: !0,
                children: (0,
                  i.jsxs)(B.zx, {
                  "aria-label": "Change image source",
                  className: K({
                    withIcon: !1,
                    showLabel: !0,
                    className: "group"
                  }),
                  onClick: e => e.stopPropagation(),
                  children: [(0,
                    i.jsx)(Z.Z, {
                    name: "insertImage"
                  }), " Source ", (0,
                    i.jsx)(en, {})]
                })
              })
            }), (0,
              i.jsx)(D.h_, {
              children: (0,
                i.jsx)(D.VY, {
                className: "z-[200]",
                sideOffset: 10,
                align: "start",
                children: (0,
                  i.jsxs)("div", {
                  className: "flex min-w-[320px] max-w-[420px] flex-col gap-4 rounded-lg border border-glif-stone-300 bg-white p-4 pb-5",
                  children: [t && t.length > 0 ? (0,
                    i.jsxs)("div", {
                    children: [(0,
                      i.jsx)("div", {
                      className: "mb-2 text-sm",
                      children: "Variables"
                    }), (0,
                      i.jsx)("div", {
                      className: "flex flex-wrap gap-2",
                      children: null == t ? void 0 : t.map(e => (0,
                        i.jsx)(O.Z, {
                        variable: e,
                        onClick: () => {
                          s(j.id, {
                            src: "{".concat(e.name, "}"),
                            variable: e
                          })
                        }
                      }, e.name))
                    })]
                  }) : null, (0,
                    i.jsx)(_, {
                    selectedNode: j
                  })]
                })
              })
            })]
          }), (0,
            i.jsx)(B.Z0, {
            className: N
          }), (0,
            i.jsx)(B.zx, {
            "aria-label": "Image fit",
            className: K({
              withIcon: !1,
              showLabel: !0
            }),
            onClick: e => {
              e.stopPropagation();
              let t = j.objectFit;
              switch (j.objectFit) {
                case "cover":
                  t = "contain";
                  break;
                case "contain":
                  t = "stretch";
                  break;
                case "stretch":
                  t = "cover"
              }
              s(j.id, {
                objectFit: t
              })
            }
            ,
            children: j.objectFit.charAt(0).toUpperCase() + j.objectFit.slice(1)
          }), (0,
            i.jsx)(ee, {
            value: j.borderRadius,
            onChange: e => {
              s(j.id, {
                borderRadius: e
              })
            }
          })]
        }), (0,
          i.jsx)(B.Z0, {
          className: N
        }), (0,
          i.jsx)(T.Z, {
          tip: "Move to front",
          children: (0,
            i.jsx)(B.zx, {
            "aria-label": "Move to front",
            className: K({
              withIcon: !0
            }),
            onClick: e => {
              e.stopPropagation(),
                r(j.id)
            }
            ,
            children: (0,
              i.jsx)("div", {
              className: "scale-y-[-1]",
              children: (0,
                i.jsx)(Z.Z, {
                name: "moveFront"
              })
            })
          })
        }), (0,
          i.jsx)(T.Z, {
          tip: "Move layer back",
          children: (0,
            i.jsx)(B.zx, {
            "aria-label": "Move layer back",
            className: K({
              withIcon: !0
            }),
            onClick: e => {
              e.stopPropagation(),
                l(j.id)
            }
            ,
            children: (0,
              i.jsx)(Z.Z, {
              name: "moveFront"
            })
          })
        }), (0,
          i.jsx)(T.Z, {
          tip: "Duplicate layer",
          children: (0,
            i.jsx)(B.zx, {
            "aria-label": "Duplicate layer",
            className: K({
              withIcon: !0
            }),
            onClick: e => {
              e.stopPropagation(),
                u(j.id)
            }
            ,
            children: (0,
              i.jsx)(Z.Z, {
              name: "duplicate"
            })
          })
        }), (0,
          i.jsx)(B.tX, {
          type: "single",
          "aria-label": "Lock layer",
          children: (0,
            i.jsx)(T.Z, {
            tip: j.locked ? "Lock" : "Unlock",
            children: (0,
              i.jsx)(B.HP, {
              value: "unlocked",
              "aria-label": "Lock",
              className: K({
                withIcon: !0,
                active: j.locked
              }),
              onClick: e => {
                e.stopPropagation(),
                  j.locked ? d([j.id]) : c([j.id])
              }
              ,
              children: (0,
                i.jsx)(Z.Z, {
                name: j.locked ? "padlockLocked" : "padlockUnlocked"
              })
            })
          })
        }), (0,
          i.jsx)(B.Z0, {
          className: N
        }), (0,
          i.jsx)(T.Z, {
          tip: "Delete layer",
          children: (0,
            i.jsx)(B.zx, {
            "aria-label": "Delete layer",
            className: K({
              withIcon: !0
            }),
            onClick: e => {
              e.stopPropagation(),
                h([j.id])
            }
            ,
            children: (0,
              i.jsx)(Z.Z, {
              name: "trash"
            })
          })
        })]
      })),
        k) {
        let e = m.every(e => e.locked)
          , t = m.map(e => e.id);
        z = (0,
          i.jsxs)(B.fC, {
          className: C,
          "aria-label": "Layer controls for multiple layers",
          children: [(0,
            i.jsx)(B.tX, {
            type: "single",
            "aria-label": e ? "Unlock layer" : "Lock layer",
            children: (0,
              i.jsx)(B.HP, {
              value: "unlocked",
              "aria-label": "Lock",
              className: K({
                withIcon: !0,
                active: e
              }),
              onClick: n => {
                n.stopPropagation(),
                  e ? d(t) : c(t)
              }
              ,
              children: (0,
                i.jsx)(Z.Z, {
                name: e ? "padlockLocked" : "padlockUnlocked"
              })
            })
          }), (0,
            i.jsx)(B.Z0, {
            className: N
          }), (0,
            i.jsx)(B.zx, {
            "aria-label": "Delete layers",
            className: K({
              withIcon: !0
            }),
            onClick: e => {
              e.stopPropagation(),
                h(t)
            }
            ,
            children: (0,
              i.jsx)(Z.Z, {
              name: "trash"
            })
          })]
        })
      }
      return z ? (0,
        i.jsx)("div", {
        className: "",
        children: z
      }) : null
    }
    function $(e, t) {
      return Math.floor(Math.random() * (t - e + 1)) + e
    }
    function ee(e) {
      let {value: t, onChange: n} = e
        , [a,s] = (0,
        p.useState)(t.toString());
      return (0,
        p.useEffect)( () => {
          s(t.toString())
        }
        , [t]),
        (0,
          q.b)( () => {
            let e = parseInt(a, 10);
            e > 0 && e < 1e3 && n(e)
          }
          , [a], 500),
        (0,
          i.jsxs)("div", {
          className: "flex items-center gap-2 text-white",
          children: [(0,
            i.jsx)(Z.Z, {
            name: "shapeRadius"
          }), (0,
            i.jsx)("div", {
            className: "grid w-[60px] grid-cols-[1fr,max-content] items-center rounded-md border border-white/50 text-white focus-within:border-white hover:border-white",
            children: (0,
              i.jsx)("input", {
              type: "number",
              className: "h-[27px] w-full border-none bg-transparent px-1 text-white focus:outline-none focus:ring-0 focus:ring-transparent",
              value: a,
              onChange: e => {
                e.stopPropagation(),
                  s(e.currentTarget.value)
              }
              ,
              onClick: e => e.stopPropagation(),
              onFocus: e => e.stopPropagation(),
              onBlur: e => {
                e.stopPropagation(),
                  s(t.toString())
              }
            })
          })]
        })
    }
    function et(e) {
      let {value: t, onChange: n} = e
        , [a,s] = (0,
        p.useState)(t.toString());
      (0,
        p.useEffect)( () => {
          s(t.toString())
        }
        , [t]),
        (0,
          q.b)( () => {
            let e = parseInt(a, 10);
            e > 0 && e < 1e3 && n(e)
          }
          , [a], 500);
      let o = (e, t) => {
          e.stopPropagation(),
            n(t)
        }
      ;
      return (0,
        i.jsxs)("div", {
        className: "grid w-[80px] grid-cols-[1fr,max-content] items-center rounded-md border border-white/50 text-white focus-within:border-white hover:border-white",
        children: [(0,
          i.jsx)("input", {
          type: "number",
          className: "h-[27px] w-full border-none bg-transparent pr-0 text-white focus:outline-none focus:ring-0 focus:ring-transparent",
          value: a,
          onChange: e => {
            e.stopPropagation(),
              s(e.currentTarget.value)
          }
          ,
          onClick: e => e.stopPropagation(),
          onFocus: e => e.stopPropagation(),
          onBlur: e => {
            e.stopPropagation(),
              s(t.toString())
          }
        }), (0,
          i.jsxs)(D.fC, {
          children: [(0,
            i.jsx)(D.xz, {
            asChild: !0,
            onClick: e => e.stopPropagation(),
            children: (0,
              i.jsx)(B.zx, {
              "aria-label": "Font size menu",
              className: "group flex w-full items-center pr-2",
              children: (0,
                i.jsx)(en, {})
            })
          }), (0,
            i.jsx)(D.h_, {
            children: (0,
              i.jsx)(D.VY, {
              className: "z-[200]",
              sideOffset: 10,
              align: "end",
              children: (0,
                i.jsx)("div", {
                className: "flex flex-col gap-4 rounded-lg border border-glif-stone-300 bg-white p-2 pb-3",
                children: (0,
                  i.jsx)("div", {
                  className: "flex flex-col",
                  children: [10, 12, 14, 16, 18, 24, 36, 48, 60].map(e => (0,
                    i.jsx)(D.x8, {
                    asChild: !0,
                    children: (0,
                      i.jsx)("button", {
                      type: "button",
                      value: e,
                      className: "w-full rounded-md p-2 text-left text-sm hover:bg-gray-100",
                      onClick: t => o(t, e),
                      children: e
                    })
                  }, e))
                })
              })
            })
          })]
        })]
      })
    }
    function en() {
      return (0,
        i.jsxs)(i.Fragment, {
        children: [(0,
          i.jsx)(Z.Z, {
          className: "hidden group-data-[state=open]:inline-block",
          name: "chevronUp"
        }), (0,
          i.jsx)(Z.Z, {
          className: "hidden group-data-[state=closed]:inline-block",
          name: "chevronDown"
        })]
      })
    }
    function ea(e) {
      var t;
      let {containerRef: n} = e
        , a = v(e => e.canvas)
        , i = v(e => e.nodes)
        , s = v(e => e.addNode)
        , o = v(e => e.deselect)
        , r = v(e => e.startEditing)
        , l = v(e => e.stopEditing)
        , c = v(e => e.moveNodes)
        , d = v(e => e.moveNodeLayerUp)
        , u = v(e => e.moveNodeLayerDown)
        , h = v(e => e.lockNodes)
        , f = v(e => e.unlockNodes)
        , g = v(e => e.duplicateNode)
        , m = v(e => e.deleteNodes)
        , x = v(e => e.setNodeData)
        , w = i.filter(e => e._selected)
        , b = w.map(e => e.id)
        , y = i.filter(e => "editing" === e._status)[0]
        , j = 1 === w.length && (null === (t = w[0]) || void 0 === t ? void 0 : t.id)
        , k = !!j && (null == y ? void 0 : y.id) === j
        , C = (0,
        p.useCallback)(e => {
          if (!(null == n ? void 0 : n.current) || !n.current.contains(document.activeElement))
            return;
          let t = e.shiftKey
            , a = t ? 10 : 1;
          j && !k && (e.preventDefault(),
          "Enter" === e.key && r(j),
          "[" === e.key && u(j),
          "]" === e.key && d(j),
          "j" === e.key.toLowerCase() && t && g(j)),
          k || (e.preventDefault(),
          "l" === e.key.toLowerCase() && t && (w.every(e => e.locked) ? f(b) : h(b)),
          ("Delete" === e.key || "Backspace" === e.key) && m(b),
          "ArrowUp" === e.key && c(void 0, {
            x: 0,
            y: -a
          }),
          "ArrowDown" === e.key && c(void 0, {
            x: 0,
            y: a
          }),
          "ArrowLeft" === e.key && c(void 0, {
            x: -a,
            y: 0
          }),
          "ArrowRight" === e.key && c(void 0, {
            x: a,
            y: 0
          })),
          "Escape" === e.key && (e.preventDefault(),
            k ? l() : o())
        }
        , [n, w, b, j, k, r, u, d, g, l, h, f, m, c, o]);
      return (0,
        p.useEffect)( () => {
          let e = e => {
              C(e)
            }
          ;
          return window.addEventListener("keydown", e),
            () => {
              window.removeEventListener("keydown", e)
            }
        }
        , [C]),
        (0,
          p.useEffect)( () => {
            let e = e => {
                var t, i, o;
                if ((null == n ? void 0 : n.current) === document.activeElement || (null == n ? void 0 : null === (t = n.current) || void 0 === t ? void 0 : t.contains(document.activeElement)))
                  for (let t of null !== (o = null === (i = e.clipboardData) || void 0 === i ? void 0 : i.items) && void 0 !== o ? o : []) {
                    if ("string" === t.kind) {
                      t.getAsString(e => {
                          try {
                            let t = new URL(e);
                            j ? x(j, {
                              src: t.toString()
                            }) : s({
                              type: "image",
                              src: t.toString(),
                              left: a.width / 2 - 150,
                              top: a.height / 2 - 150,
                              width: 300,
                              height: 300
                            })
                          } catch (e) {
                            console.log("Not a valid url"),
                              console.error(e)
                          }
                        }
                      );
                      return
                    }
                    if ("file" === t.kind) {
                      let e = t.getAsFile();
                      if (!e)
                        return;
                      let n = new FileReader;
                      n.onload = function(e) {
                        var t, n, i;
                        let o = null !== (i = null === (n = e.target) || void 0 === n ? void 0 : null === (t = n.result) || void 0 === t ? void 0 : t.toString()) && void 0 !== i ? i : null;
                        o && (j ? x(j, {
                          src: o
                        }) : s({
                          type: "image",
                          src: o,
                          left: a.width / 2 - 150,
                          top: a.height / 2 - 150,
                          width: 300,
                          height: 300
                        }))
                      }
                        ,
                        n.readAsDataURL(e);
                      return
                    }
                  }
              }
            ;
            return window.addEventListener("paste", e),
              () => {
                window.removeEventListener("paste", e)
              }
          }
          , [n, j, x, a.width, a.height, s]),
        null
    }
    var ei = n(23460);
    function es(e) {
      var t;
      let {node: n} = e
        , [a,s] = (0,
        p.useState)(!0)
        , o = null === (t = n.variable) || void 0 === t ? void 0 : t.category
        , r = "contain" === n.objectFit;
      return (0,
        i.jsx)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: n.width,
          height: n.height,
          backgroundColor: a ? "rgba(0,0,0,0.05)" : "transparent",
          overflow: n.clipBounds ? "hidden" : void 0,
          borderRadius: n.borderRadius,
          ...o ? (0,
            ei._9)(o) : {}
        },
        children: n.variable ? (0,
          i.jsx)("div", {
          className: "flex h-full w-full items-center justify-center bg-[--theme-100] p-1 text-[--theme-700]",
          children: n.variable.name
        }) : (0,
          i.jsx)("img", {
          src: n.src,
          alt: "",
          style: {
            width: r ? "auto" : n.width,
            height: r ? "auto" : n.height,
            maxWidth: r ? "100%" : void 0,
            maxHeight: r ? "100%" : void 0,
            objectFit: "stretch" === n.objectFit ? void 0 : n.objectFit,
            borderRadius: n.borderRadius,
            userSelect: "none"
          },
          draggable: !1,
          onLoad: () => {
            s(!1)
          }
          ,
          onError: () => {
            console.error("Image loading error"),
              s(!1)
          }
        })
      })
    }
    var eo = n(90778)
      , er = n(22836)
      , el = n(75533)
      , ec = n(35850)
      , ed = n(41699)
      , eu = n(37822);
    function eh(e) {
      let {className: t, editorRef: n, disabled: a, onChange: s, onInput: o, variables: r, defaultValue: l} = e
        , c = (0,
        p.useRef)(l).current
        , [d,u] = (0,
        p.useState)(null)
        , h = (0,
        p.useMemo)( () => {
          let e = [el.Wl.high(ef), ec.tk.lineWrapping];
          return r && e.push(ed.jN.init( () => r), ed.ZP, (0,
            er.ys)({
            addToOptions: [{
              render(e) {
                let {name: t, variable: n} = (0,
                  eo.QO)(e.label, r);
                return (0,
                  O.U)(t, n)
              },
              position: 0
            }],
            override: [(0,
              er.Mb)(null == r ? void 0 : r.map(eo.Gc))]
          })),
          a && e.push(ec.tk.editable.of(!1)),
            e
        }
        , [a, r]);
      return (0,
        p.useEffect)( () => {
          null != r && (null == d || d.dispatch({
            effects: ed.Pi.of(r)
          }))
        }
        , [r, d]),
        (0,
          p.useEffect)( () => {
            d && null != n && (n.current = d)
          }
          , [d, n]),
        (0,
          i.jsx)(eu.Z, {
          value: null != c ? c : "",
          extensions: h,
          onUpdate: e => {
            if (e.docChanged) {
              let t = e.state.doc.toString();
              null == o || o(t),
              null == s || s(t)
            }
          }
          ,
          onEditorViewChange: u,
          elementProps: {
            style: {
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              lineHeight: "inherit",
              color: "inherit"
            },
            className: j()("w-full", t)
          }
        })
    }
    let ef = ec.tk.theme({
      "&, & *": {
        backgroundColor: "transparent",
        padding: 0,
        margin: 0
      },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#d6d3d1 !important"
      },
      "& .cm-selectionBackground": {
        backgroundColor: "#e7e5e4 !important"
      },
      "&.cm-editor": {
        resize: "none",
        overflow: "hidden",
        padding: 0,
        margin: 0
      },
      "&.cm-editor:has(.cm-tooltip-autocomplete)": {
        overflow: "visible"
      },
      ".cm-scroller": {
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        color: "inherit"
      },
      ".cm-content": {
        padding: 0,
        margin: 0
      },
      ".cm-line": {
        padding: 0,
        margin: 0
      },
      "&.cm-focused": {
        outline: "none"
      },
      ".cm-tooltip-autocomplete": {
        fontSize: "14px"
      }
    });
    function ep(e) {
      let {node: t, isEditing: n} = e
        , a = (0,
        p.useRef)(null)
        , s = v(e => e.variables)
        , o = v(e => e.setNodeData)
        , [r,l] = (0,
        p.useState)(t.text)
        , c = t.text;
      return (0,
        p.useEffect)( () => {
          let e = a.current;
          null != e && c !== r && e.dispatch(e.state.update({
            changes: {
              from: 0,
              to: e.state.doc.length,
              insert: c
            }
          }))
        }
        , [c, r]),
        (0,
          p.useEffect)( () => {
            let e = a.current;
            if (e) {
              if (n) {
                e.focus();
                let t = e.state.doc.length;
                e.dispatch({
                  selection: {
                    anchor: t,
                    head: t
                  }
                })
              } else
                e.dispatch({
                  selection: {
                    anchor: 0,
                    head: 0
                  }
                })
            }
          }
          , [n]),
        (0,
          i.jsx)("div", {
          style: {
            display: "flex",
            width: t.width,
            height: t.height,
            alignItems: function(e) {
              switch (e) {
                case "top":
                default:
                  return "flex-start";
                case "middle":
                  return "center";
                case "bottom":
                  return "flex-end"
              }
            }(t.verticalAlign),
            justifyContent: function(e) {
              switch (e) {
                case "left":
                default:
                  return "flex-start";
                case "center":
                  return "center";
                case "right":
                  return "flex-end"
              }
            }(t.textAlign),
            overflow: t.clipBounds ? "hidden" : void 0,
            borderRadius: t.borderRadius,
            fontSize: t.fontSize,
            fontFamily: t.fontFamily,
            fontWeight: t.fontWeight,
            color: t.color,
            textAlign: t.textAlign,
            fontStyle: t.italic ? "italic" : "normal",
            textDecoration: t.underline ? "underline" : "none",
            outline: "none",
            userSelect: n ? "text" : "none",
            pointerEvents: n ? "auto" : "none"
          },
          children: (0,
            i.jsx)(eh, {
            editorRef: a,
            defaultValue: r,
            variables: s,
            disabled: !n,
            onChange: e => {
              l(e),
                o(t.id, {
                  text: e
                })
            }
          })
        })
    }
    function eg(e) {
      let {className: t, node: n} = e
        , a = v(e => e.panOffset)
        , s = v(e => e.currentInteraction)
        , o = v(e => e.nodes)
        , r = v(e => e.selectNode)
        , l = v(e => e.startEditing)
        , c = o.filter(e => e._selected).length > 1
        , d = n._selected
        , u = "moving" === n._status
        , h = "editing" === n._status
        , f = !d && !h && "idle" === s
        , {attributes: p, listeners: g, setNodeRef: m} = (0,
        b.O1)({
        id: n.id,
        disabled: n.locked
      })
        , x = null;
      switch (n.type) {
        case "text":
          x = (0,
            i.jsx)(ep, {
            node: n,
            isEditing: h
          });
          break;
        case "image":
          x = (0,
            i.jsx)(es, {
            node: n
          });
          break;
        case "shape":
          x = (0,
            i.jsx)("div", {})
      }
      return (0,
        i.jsxs)(i.Fragment, {
        children: [(0,
          i.jsx)("div", {
          "data-node-id": n.id,
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            transform: "translate(".concat(n.left + a.x, "px, ").concat(n.top + a.y, "px)"),
            width: n.width,
            height: n.height,
            zIndex: h ? 9999 : n.layerIndex
          },
          onClick: e => {
            e.stopPropagation(),
            h || (d && !c ? l(n.id) : r(n.id))
          }
          ,
          className: j()("outline outline-1", u ? "outline-canvas-controls will-change-transform" : "outline-transparent", f && !n.locked && "hover:outline-canvas-controls", f && n.locked && "hover:outline-canvas-controls-locked", !n.locked && "active:outline-canvas-controls active:outline-2", t),
          children: (0,
            i.jsx)("div", {
            ref: m,
            style: {
              height: "100%",
              cursor: h ? "inherit" : u ? "grabbing" : "grab",
              outline: "none"
            },
            ...g,
            ...p,
            children: x
          })
        }), u && (0,
          i.jsx)("div", {
          style: {
            position: "absolute",
            zIndex: 9999,
            left: n.left + a.x,
            top: n.top + a.y,
            width: n.width,
            height: n.height,
            cursor: "grabbing"
          },
          className: j()("outline-canvas-controls hover:outline-canvas-controls outline outline-2")
        })]
      })
    }
    function em(e) {
      let {id: t, direction: n} = e
        , {attributes: a, listeners: s, setNodeRef: o} = (0,
        b.O1)({
        id: "".concat(t, "-").concat(n)
      })
        , r = {};
      switch (n) {
        case "n":
          r = {
            top: -10,
            left: 0,
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            cursor: "ns-resize"
          };
          break;
        case "e":
          r = {
            top: 0,
            right: -10,
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            cursor: "ew-resize"
          };
          break;
        case "s":
          r = {
            bottom: -10,
            left: 0,
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            cursor: "ns-resize"
          };
          break;
        case "w":
          r = {
            top: 0,
            left: -10,
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "ew-resize"
          };
          break;
        case "nw":
          r = {
            top: -16,
            left: -16,
            alignItems: "center",
            justifyContent: "center",
            cursor: "nwse-resize"
          };
          break;
        case "ne":
          r = {
            top: -16,
            right: -16,
            alignItems: "center",
            justifyContent: "center",
            cursor: "nesw-resize"
          };
          break;
        case "sw":
          r = {
            bottom: -16,
            left: -16,
            alignItems: "center",
            justifyContent: "center",
            cursor: "nesw-resize"
          };
          break;
        case "se":
          r = {
            bottom: -16,
            right: -16,
            alignItems: "center",
            justifyContent: "center",
            cursor: "nwse-resize"
          }
      }
      let l = ["n", "e", "s", "w"].includes(n)
        , c = ["nw", "ne", "sw", "se"].includes(n);
      return (0,
        i.jsx)("div", {
        ref: o,
        ...s,
        ...a,
        "data-direction": n,
        style: {
          position: "absolute",
          display: "flex",
          width: l ? 15 : 30,
          height: l ? 15 : 30,
          pointerEvents: "all",
          ...r
        },
        children: c && (0,
          i.jsx)("div", {
          style: {
            width: 8,
            height: 8,
            backgroundColor: "white"
          },
          className: "border-canvas-controls rotate-45 transform border-2 bg-white"
        })
      })
    }
    function ex(e) {
      let {className: t} = e
        , n = v(e => e.panOffset)
        , a = v(e => e.nodes).filter(e => e._selected)
        , s = a.length > 1
        , o = v(e => e.getSelectionBounds)();
      return (0,
        i.jsxs)(i.Fragment, {
        children: [a.map(e => {
            let a = "moving" === e._status
              , o = "editing" === e._status
              , r = e.locked;
            return (0,
              i.jsxs)("div", {
              "data-node-id-controls": e.id,
              style: {
                position: "absolute",
                left: e.left,
                top: e.top,
                width: e.width,
                height: e.height,
                zIndex: 10,
                pointerEvents: "none",
                "--translate-x": "".concat(n.x, "px"),
                "--translate-y": "".concat(n.y, "px")
              },
              className: j()("translate-x-[var(--translate-x)] translate-y-[var(--translate-y)]", t),
              children: [(0,
                i.jsx)("div", {
                style: {
                  position: "absolute",
                  width: e.width,
                  height: e.height,
                  top: 0,
                  left: 0
                },
                className: j()("outline", r ? "outline-canvas-controls-locked" : "outline-canvas-controls", a ? "hidden" : "outline-2", o ? "outline-dotted" : "outline-solid")
              }), !s && !a && !r && !o && (0,
                i.jsxs)(i.Fragment, {
                children: [(0,
                  i.jsx)(em, {
                  id: e.id,
                  direction: "n"
                }), (0,
                  i.jsx)(em, {
                  id: e.id,
                  direction: "w"
                }), (0,
                  i.jsx)(em, {
                  id: e.id,
                  direction: "s"
                }), (0,
                  i.jsx)(em, {
                  id: e.id,
                  direction: "e"
                }), (0,
                  i.jsx)(em, {
                  id: e.id,
                  direction: "nw"
                }), (0,
                  i.jsx)(em, {
                  id: e.id,
                  direction: "ne"
                }), (0,
                  i.jsx)(em, {
                  id: e.id,
                  direction: "sw"
                }), (0,
                  i.jsx)(em, {
                  id: e.id,
                  direction: "se"
                }), (0,
                  i.jsx)(C, {
                  width: e.width,
                  height: e.height
                })]
              })]
            }, "".concat(e.id, "-controls"))
          }
        ), s && o && (0,
          i.jsx)("div", {
          "data-multi-selection-indicator": !0,
          style: {
            position: "absolute",
            top: o.top,
            left: o.left,
            width: o.width,
            height: o.height,
            zIndex: 10,
            pointerEvents: "none"
          },
          className: t,
          children: (0,
            i.jsx)("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%"
            },
            className: "outline-canvas-controls outline-dotted outline-2"
          })
        })]
      })
    }
    function ev() {
      var e, t, n, a;
      let s = v(e => e.selectionArea)
        , {attributes: o, listeners: r, setNodeRef: l} = (0,
        b.O1)({
        id: u
      });
      return (0,
        i.jsx)("div", {
        "data-selection-area": !0,
        className: "absolute left-0 top-0 h-full w-full",
        children: (0,
          i.jsx)("div", {
          ref: l,
          className: "h-full w-full cursor-default outline-none",
          ...r,
          ...o,
          children: !!s && (0,
            i.jsx)("div", {
            style: {
              left: null !== (e = null == s ? void 0 : s.left) && void 0 !== e ? e : 0,
              top: null !== (t = null == s ? void 0 : s.top) && void 0 !== t ? t : 0,
              width: null !== (n = null == s ? void 0 : s.width) && void 0 !== n ? n : "100%",
              height: null !== (a = null == s ? void 0 : s.height) && void 0 !== a ? a : "100%",
              zIndex: 99999
            },
            className: "outline-canvas-controls bg-canvas-select-area-fill absolute outline outline-1"
          })
        })
      })
    }
    function ew(e) {
      return e !== u && e !== h
    }
    function eb() {
      let e = v(e => e.canvas)
        , t = v(e => e.startCanvasTransform)
        , n = v(e => e.resizeCanvas)
        , a = v(e => e.stopCanvasTransform)
        , s = v(e => e.panOffset)
        , o = v(e => e.centerCanvas)
        , r = v(e => e.startSelectionArea)
        , l = v(e => e.resizeSelectionArea)
        , c = v(e => e.selectAllNodesInSelectionArea)
        , d = v(e => e.stopSelectionArea)
        , f = v(e => e.nodes)
        , g = v(e => e.startNodeTransform)
        , m = v(e => e.moveNodes)
        , x = v(e => e.resizeNode)
        , w = v(e => e.stopNodeTransform)
        , y = v(e => e.deselect)
        , j = (0,
        p.useRef)(null);
      (0,
        p.useEffect)( () => {
          var e, t;
          let n = j.current
            , a = null !== (e = null == n ? void 0 : n.clientWidth) && void 0 !== e ? e : 0
            , i = null !== (t = null == n ? void 0 : n.clientHeight) && void 0 !== t ? t : 0;
          n && o({
            width: a,
            height: i,
            top: 0,
            left: 0
          })
        }
        , [j, o]);
      let[k,C] = (0,
        p.useState)(!1);
      (0,
        p.useEffect)( () => {
          let e = e => {
              "Shift" === e.key && C(!0)
            }
            , t = e => {
              "Shift" === e.key && C(!1)
            }
          ;
          return window.addEventListener("keydown", e),
            window.addEventListener("keyup", t),
            () => {
              window.removeEventListener("keydown", e),
                window.removeEventListener("keyup", t)
            }
        }
        , []);
      let z = (0,
        p.useRef)(null)
        , F = (0,
        b.VT)(b.MA, {
        activationConstraint: {
          distance: 1
        }
      })
        , P = (0,
        b.VT)(b.LO, {
        activationConstraint: {
          distance: 1
        }
      })
        , I = (0,
        b.Dy)(F, P);
      return (0,
        i.jsxs)("div", {
        className: "relative",
        children: [(0,
          i.jsx)("div", {
          className: "sticky top-0 z-[1000] flex h-0 justify-center",
          children: (0,
            i.jsx)(J, {})
        }), (0,
          i.jsx)(b.LB, {
          sensors: I,
          onDragStart: e => {
            let {active: n} = e
              , [a,i] = n.id.toString().split("-");
            a && (a === h && i && t(),
            ew(a) && g(i ? "resizing" : "moving", a))
          }
          ,
          onDragMove: e => {
            let {active: t, delta: a} = e
              , [i,s] = t.id.toString().split("-");
            if (i) {
              if (i === u) {
                l(a),
                  c(k);
                return
              }
              if (i === h && s) {
                n(a, s);
                return
              }
              ew(i) && (s ? x(i, a, s) : m(void 0, a))
            }
          }
          ,
          onDragEnd: () => {
            d(),
              a(),
              w()
          }
          ,
          children: (0,
            i.jsxs)("div", {
            ref: j,
            className: "relative min-h-[40rem] w-full gap-7 overflow-hidden rounded-md after:pointer-events-none after:absolute after:inset-0 after:z-[999] after:shadow-inner",
            onMouseDown: e => {
              let {top: t, left: n} = e.currentTarget.getBoundingClientRect();
              r({
                width: 0,
                height: 0,
                left: e.clientX - n,
                top: e.clientY - t
              })
            }
            ,
            onClick: () => y(),
            style: {
              "--canvas-background-color": e.backgroundColor,
              "--canvas-width": "".concat(e.width, "px"),
              "--canvas-height": "".concat(e.height, "px"),
              "--canvas-offset-x": "".concat(s.x, "px"),
              "--canvas-offset-y": "".concat(s.y, "px")
            },
            children: [(0,
              i.jsx)("div", {
            }), (0,
              i.jsx)("div", {
              ref: z,
              className: "absolute h-[var(--canvas-height)] w-[var(--canvas-width)] translate-x-[var(--canvas-offset-x)] translate-y-[var(--canvas-offset-y)] bg-[var(--canvas-background-color)] shadow-[0_5px_10px_rgba(0,0,0,0.05)]"
            }), (0,
              i.jsx)(ev, {}), f.map(e => (0,
              i.jsx)(eg, {
              node: e
            }, e.id)), (0,
              i.jsx)(ex, {}), (0,
              i.jsx)(N, {
              className: "h-[var(--canvas-height)] w-[var(--canvas-width)] translate-x-[var(--canvas-offset-x)] translate-y-[var(--canvas-offset-y)]"
            }), (0,
              i.jsx)(ea, {
              containerRef: j
            })]
          })
        })]
      })
    }
    function ey(e) {
      let {onCanvasPropertiesChange: t, onNodesChange: n} = e;
      return w(e => e.canvas, t),
        w(e => e.nodes, n),
        null
    }
    var ej = n(76164)
      , ek = n(53306)
      , eC = n(8994)
      , eN = n(87851)
      , ez = n(54284)
      , eF = n(18030)
      , eP = n(37056)
      , eI = e => {
        var t;
        let {block: n} = e
          , {setParam: a} = (0,
          ek.r)(n)
          , {variables: s} = (0,
          ej.OQ)({
          block: n,
          includeLora: !1
        })
          , [o,r] = (0,
          p.useState)(!1)
          , {lastSavedDate: l} = (0,
          eC.Z)()
          , c = n.params.nodes.reduce( (e, t) => ("text" === t.type && t.fontFamily && e.add(t.fontFamily),
          e), new Set);
        return (0,
          i.jsx)("div", {
          children: (0,
            i.jsx)(x, {
            variables: s,
            initialCanvas: {
              width: n.params.width,
              height: n.params.height,
              backgroundColor: n.params.backgroundColor
            },
            initialNodes: null !== (t = n.params.nodes) && void 0 !== t ? t : [],
            children: (0,
              i.jsxs)(Q, {
              initialFonts: [...c],
              children: [(0,
                i.jsx)("div", {
                children: (0,
                  i.jsx)("div", {
                  children: (0,
                    i.jsx)(eb, {})
                })
              }), (0,
                i.jsx)(ey, {
                onCanvasPropertiesChange: (0,
                  F.y)(e => {
                    a("width", e.width),
                      a("height", e.height),
                      a("backgroundColor", e.backgroundColor)
                  }
                  , [a], 1e3),
                onNodesChange: (0,
                  F.y)(e => {
                    a("nodes", e)
                  }
                  , [a], 1e3)
              })]
            })
          })
        })
      }
    ;
    function eS(e) {
      let {lastSavedDate: t} = e
        , n = (0,
        ez.S)();
      (0,
        eF.n)( () => {
          n()
        }
        , 1500);
      let a = null != t && 1e4 > Math.abs(t.getTime() - Date.now());
      return (0,
        i.jsx)("span", {
        "aria-hidden": !a,
        className: j()("transition-opacity ease-out", a ? "opacity-100" : "opacity-0"),
        children: "Saved"
      })
    }
  },
  41699: function(e, t, n) {
    n.d(t, {
      Pi: function() {
        return d
      },
      jN: function() {
        return c
      }
    });
    var a = n(35850)
      , i = n(90778)
      , s = n(75533)
      , o = n(83376);
    let r = i.C7;
    function l(e) {
      let t = e.effects.find(e => e.is(d));
      return null != t && t.is(d) ? t.value : null
    }
    let c = s.QQ.define({
      create: () => [],
      update: (e, t) => {
        let n = l(t);
        return null == n ? e : n
      }
    })
      , d = s.Py.define()
      , u = new a.Y1({
      regexp: r,
      decoration: (e, t) => {
        let n = t.state.field(c)
          , {type: s, variableName: o} = (0,
          i.yN)(e)
          , r = n.find(e => e.name === o);
        return null == o || null == r && "lora" === s ? null : a.p.replace({
          widget: new f(o,r)
        })
      }
    })
      , h = a.lg.fromClass(class {
        update(e) {
          let t = !1;
          e.transactions.forEach(e => {
              null != l(e) && (t = !0)
            }
          ),
            this.placeholders = t ? u.createDeco(e.view) : u.updateDeco(e, this.placeholders)
        }
        constructor(e) {
          this.placeholders = u.createDeco(e)
        }
      }
      , {
        decorations: e => e.placeholders,
        provide: e => a.tk.atomicRanges.of(t => {
            var n;
            return (null === (n = t.plugin(e)) || void 0 === n ? void 0 : n.placeholders) || a.p.none
          }
        )
      });
    class f extends a.l9 {
      eq(e) {
        return this.name == e.name && this.variable == e.variable
      }
      toDOM() {
        return (0,
          o.U)(this.name, this.variable)
      }
      constructor(e, t) {
        super(),
          this.name = e,
          this.variable = t,
          this.variable = t
      }
    }
    let p = a.tk.theme({
      ".cm-tooltip.cm-tooltip-autocomplete": {
        width: "max-content",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 4px 24px rgba(41, 37, 36, 0.08)",
        border: "none",
        "& > ul": {
          minWidth: "auto",
          width: "max-content",
          padding: "14px 0",
          "& > li": {
            backgroundColor: "#fff",
            padding: "8px 8px",
            "& > .cm-completionLabel": {
              color: "red",
              display: "none"
            }
          },
          "& > li[aria-selected]": {
            background: "#f5f5f4",
            color: "#000"
          }
        }
      }
    });
    t.ZP = [h, p]
  },
  53306: function(e, t, n) {
    n.d(t, {
      r: function() {
        return o
      }
    });
    var a = n(67929)
      , i = n.n(a)
      , s = n(55153);
    function o(e) {
      return (0,
        s.R)(e),
        {
          name: e.name,
          replaceParams: function(t) {
            i()(e, {
              params: t
            })
          },
          setParam: function(t, n) {
            if (!t)
              throw Error("param ".concat(String(t), " is missing"));
            if (!(t in e.params))
              throw Error("invalid parameter ".concat(String(t)));
            e.params[t] = n
          }
        }
    }
  }
}]);
