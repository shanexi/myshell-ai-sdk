"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProvider = exports.useStore = exports.useStoreContext = void 0;
exports.stringify = stringify;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_es_1 = require("lodash-es");
const react_1 = require("react");
const zustand_1 = require("zustand");
Object.defineProperty(exports, "useStore", { enumerable: true, get: function () { return zustand_1.useStore; } });
const tree_1 = require("../../utils/tree.js");
function replaceContext2Form(data) {
    const jsonString = JSON.stringify(data);
    const replacedString = jsonString.replace(/context.([a-z]{36})/g, '__context__$1__');
    const replacedData = JSON.parse(replacedString);
    return replacedData;
}
function replaceContext2Api(data) {
    const jsonString = JSON.stringify(data);
    const replacedString = jsonString.replace(/__context__([a-z0-9_]+)__/g, 'context.$1');
    const replacedData = JSON.parse(replacedString);
    return replacedData;
}
function parse(item, root) {
    if (item.type === 'automata') {
        item = replaceContext2Form(item);
    }
    const path = (item.type === 'automata' ? [...root, item.id] : [...root]).join('.');
    const name = item.type === 'automata' ? item.id : root[root.length - 1];
    const title = item.type === 'automata' ? item.id : item.name;
    let children;
    if (item.type === 'automata') {
        children = Object.keys(item.states || {}).map(key => {
            return parse({
                ...(item.states || {})[key],
                type: 'state'
            }, [path, key]);
        });
    }
    else if (item.type === 'state') {
        children = (item.tasks || []).map((child, i) => {
            return parse({ ...child, type: 'widget' }, [path, String(i)]);
        });
    }
    else {
        children = [];
    }
    const tree = {
        path,
        children: children.map(_ => _.tree)
    };
    const attrs = {
        [path]: (0, lodash_es_1.omit)(item, ['states', 'tasks']),
        ...children.reduce((prev, item) => {
            return {
                ...prev,
                ...item.attrs
            };
        }, {})
    };
    const nodes = {
        [path]: {
            type: item.type,
            name,
            title: title || '',
            pkg: item.type === 'widget' ? `widget_${item.module_config?.widget_id}` : item.type
        },
        ...children.reduce((prev, item) => {
            return {
                ...prev,
                ...item.nodes
            };
        }, {})
    };
    return { tree, attrs, nodes, active: path };
}
function stringify(store) {
    let { tree, nodes, attrs } = store;
    const { path, children } = tree;
    if (!(attrs[path] && nodes[path])) {
        return;
    }
    const { type } = nodes[path];
    switch (type) {
        case 'automata':
            attrs = replaceContext2Api(attrs);
            return {
                ...attrs[path],
                states: children.reduce((prev, $tree) => {
                    const { path: $path } = $tree;
                    if (nodes[$path] && attrs[$path]) {
                        const { name: $name } = nodes[$path];
                        const $result = stringify({ tree: $tree, nodes, attrs });
                        if ($result) {
                            prev[$name] = $result;
                        }
                    }
                    return prev;
                }, {})
            };
        case 'state':
            return {
                ...attrs[path],
                tasks: children.map($tree => {
                    const { path: $path } = $tree;
                    if (nodes[$path] && attrs[$path]) {
                        return stringify({ tree: $tree, nodes, attrs });
                    }
                })
            };
        case 'widget':
            return {
                ...attrs[path]
            };
    }
}
const store = (0, zustand_1.create)(set => ({
    init: (automata) => set(() => parse(automata, [])),
    setActive: (active) => set(() => {
        return {
            active
        };
    }),
    modify: (path, { attr = {} }) => set(state => {
        const { nodes = {} } = state;
        const { type } = nodes[path];
        if (type === 'automata') {
            return {
                attrs: {
                    ...state.attrs,
                    [path]: attr
                },
                nodes: {
                    ...state.nodes,
                    [path]: {
                        ...(state.nodes || {})[path],
                        name: attr.id,
                        title: attr.id
                    }
                }
            };
        }
        if (type === 'state') {
            return {
                attrs: {
                    ...state.attrs,
                    [path]: attr
                },
                nodes: {
                    ...state.nodes,
                    [path]: {
                        ...(state.nodes || {})[path],
                        title: attr.name
                    }
                }
            };
        }
        if (type === 'widget') {
            return {
                attrs: {
                    ...state.attrs,
                    [path]: attr
                }
            };
        }
        return state;
    }),
    append: (parent, { attr, node }) => set(state => {
        if (!(attr && node)) {
            return state;
        }
        const { type, name } = node;
        let path = parent;
        if (type === 'automata') {
        }
        else if (type === 'state') {
            path = [path, node.name].join('.');
            return {
                attrs: {
                    ...state.attrs,
                    [path]: attr
                },
                nodes: {
                    ...state.nodes,
                    [path]: node
                },
                tree: state.tree ? (0, tree_1.append)(state.tree, parent, { path, children: [] }) : { path, children: [] },
                active: path
            };
        }
        else if (type === 'widget') {
            const idx = state.tree ? (0, tree_1.count)(state.tree, parent) : 0;
            path = [path, idx].join('.');
            return {
                attrs: {
                    ...state.attrs,
                    [path]: attr
                },
                nodes: {
                    ...state.nodes,
                    [path]: node
                },
                tree: state.tree ? (0, tree_1.append)(state.tree, parent, { path, children: [] }) : { path, children: [] },
                active: path
            };
        }
        return state;
    }),
    remove: (path) => set(state => {
        const pathList = path.split('.');
        return {
            attrs: (0, lodash_es_1.omitBy)(state.attrs, (value, key) => key === path || path.startsWith(`${path}.`)),
            nodes: (0, lodash_es_1.omitBy)(state.nodes, (value, key) => key === path || path.startsWith(`${path}.`)),
            tree: state.tree ? (0, tree_1.remove)(path, state.tree) : { path: 'APP', children: [] },
            active: pathList.length > 2 ? pathList.splice(0, 2).join('.') : pathList[0]
        };
    }),
    reorder: (path, { startIndex, endIndex }) => set(state => {
        const tree = state.tree ? (0, tree_1.reorder)(state.tree, path, startIndex, endIndex) : state.tree;
        return {
            tree
        };
    }),
    override: (state) => set(() => {
        return state;
    })
}));
const StoreContext = (0, react_1.createContext)(store);
const useStoreContext = () => {
    return (0, react_1.useContext)(StoreContext);
};
exports.useStoreContext = useStoreContext;
const StoreProvider = props => {
    const { children, automata } = props;
    const init = store(state => state.init);
    (0, react_1.useEffect)(() => {
        init(automata);
    }, []);
    return (0, jsx_runtime_1.jsx)(StoreContext.Provider, { value: store, children: children });
};
exports.StoreProvider = StoreProvider;
