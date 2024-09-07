"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableProvider = exports.useVariableContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_es_1 = require("lodash-es");
const react_1 = require("react");
const store_provider_1 = require("../store-provider/index.js");
const VariableContext = (0, react_1.createContext)({});
const useVariableContext = () => {
    return (0, react_1.useContext)(VariableContext);
};
exports.useVariableContext = useVariableContext;
function flattenObject(obj, parentKey = '') {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(result, flattenObject(obj[key], newKey));
            }
            else {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}
function createWidgetVariableScope(widget, scope, prefix) {
    const rets = {};
    const key = [prefix, 'module_config'].join('.');
    rets[key] = [...scope];
    return rets;
}
function createClickVariableScope(state, scope, prefix) {
    const rets = {};
    const { transitions } = state;
    scope.push(...Object.keys({ ...transitions }).reduce((memo, key) => {
        if (!['CHAT', 'ALWAYS'].includes(key)) {
            memo.push({
                name: key,
                variable: key
            });
        }
        return memo;
    }, []));
    rets[[prefix, 'render', 'buttons'].join('.')] = (0, lodash_es_1.uniqBy)(scope, 'variable');
    return rets;
}
function createEventVariableScope(states, scope) {
    const stateValueList = Object.values({ ...states });
    const events = stateValueList.reduce((prev, item) => {
        item.render?.buttons?.forEach(button => {
            const { event, payload } = button?.on_click || {};
            if (event) {
                prev[event] = (0, lodash_es_1.merge)(prev[event] || {}, payload || {});
            }
        });
        return prev;
    }, {});
    return stateValueList.reduce((prev, item) => {
        Object.keys({ ...item.transitions }).map(event => {
            prev[`transitions.${event}`] = [
                ...(prev[`transitions.${event}`] || []),
                ...Object.keys({ ...flattenObject(events[event]) }).map(key => ({
                    name: `payload.${key}`,
                    variable: `payload.${key}`
                })),
                ...scope
            ];
        });
        return prev;
    }, {});
}
function createStateVariableScope(state, scope, prefix, eventVariableScope) {
    let rets = {};
    const { inputs = {}, tasks = [], outputs = {} } = state;
    scope.push(...Object.keys(inputs).map(name => {
        const input = inputs[name];
        return {
            name: input?.name || name,
            variable: name
        };
    }));
    scope.push(...Object.keys(outputs).map(name => {
        const output = outputs[name];
        return {
            name: output.name || name,
            variable: name?.startsWith('context.') ? `__${name.replace(/^context\./, 'context__')}__` : name
        };
    }));
    tasks.forEach((task, i) => {
        const { module_config } = task;
        const { output_name } = module_config || {};
        rets = {
            ...rets,
            ...createWidgetVariableScope(task, [...scope], [prefix, i].join('.'))
        };
        if (output_name) {
            const { name, label } = output_name;
            scope.push({
                name: label,
                variable: name
            });
        }
    });
    rets[[prefix, 'render'].join('.')] = scope;
    rets[[prefix, 'outputs'].join('.')] = scope;
    Object.keys(eventVariableScope).forEach(key => {
        rets[[prefix, key].join('.')] = [...eventVariableScope[key], ...scope];
    });
    return rets;
}
function createVariableScope(automata, scope = []) {
    let rets = {};
    const { id, states = {}, context = {}, transitions } = automata;
    const prefix = id;
    const contextVariableScope = Object.keys(context).map(variable => {
        const ctx = context[variable];
        return {
            name: `context.${ctx.name || variable}`,
            variable: `__context__${variable}__`
        };
    });
    scope.push(...contextVariableScope);
    const clickVariableScope = Object.keys({ ...transitions }).map(key => {
        return {
            name: key,
            variable: key
        };
    });
    const eventVariableScope = createEventVariableScope(states, [...contextVariableScope]);
    scope.push(...Object.keys(states).map(name => {
        const state = states[name];
        rets = {
            ...rets,
            ...createStateVariableScope(state, [...scope], [prefix, name].join('.'), eventVariableScope),
            ...createClickVariableScope(state, [...clickVariableScope], [prefix, name].join('.'))
        };
        return {
            name: state.name || name,
            variable: name
        };
    }));
    rets[[prefix, 'initial'].join('.')] = scope;
    Object.keys(transitions || {}).forEach(key => {
        rets[[prefix, 'transitions', key].join('.')] = eventVariableScope?.[`transitions.${key}`] || [
            ...contextVariableScope
        ];
    });
    return rets;
}
const getVariableList = (scope) => {
    return Object.values(scope).reduce((prev, arr) => {
        arr.forEach(item => {
            if (item.variable && !prev.includes(item.variable)) {
                prev.push(item.variable);
            }
        });
        return prev;
    }, []);
};
const replaceVariable = (attrs, deletedList) => {
    const newAttrs = (0, lodash_es_1.cloneDeep)(attrs);
    const deleteKey = (obj, key) => {
        if (obj.hasOwnProperty(key)) {
            delete obj[key];
        }
    };
    const deleteValue = (obj, value) => {
        const regex = new RegExp(`{{\\s*${value}\\s*.*}}`, 'g');
        for (const prop in obj) {
            if (typeof obj[prop] === 'object') {
                deleteValue(obj[prop], value);
            }
            else if (typeof obj[prop] === 'string' && regex.test(obj[prop])) {
                obj[prop] = obj[prop].replace(regex, '');
            }
        }
    };
    const recursiveDelete = (obj) => {
        for (const prop in obj) {
            if (deletedList.includes(prop)) {
                deleteKey(obj, prop);
            }
            else if (typeof obj[prop] === 'object') {
                recursiveDelete(obj[prop]);
            }
            else if (typeof obj[prop] === 'string') {
                deleteValue(obj, deletedList[0]);
            }
        }
    };
    recursiveDelete(newAttrs);
    return newAttrs;
};
const VariableProvider = props => {
    const { children } = props;
    const store = (0, store_provider_1.useStoreContext)();
    const tree = (0, store_provider_1.useStore)(store, state => state.tree);
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes);
    const attrs = (0, store_provider_1.useStore)(store, state => state.attrs);
    const active = (0, store_provider_1.useStore)(store, state => state.active);
    const override = (0, store_provider_1.useStore)(store, state => state.override);
    const prevVariableMap = (0, react_1.useRef)({
        id: 0,
        context: [],
        variable: []
    });
    if (!(tree && nodes && attrs)) {
        return null;
    }
    const automata = (0, store_provider_1.stringify)({ tree, nodes, attrs });
    if (!automata) {
        return null;
    }
    let scope = createVariableScope(automata);
    const variableList = getVariableList(scope);
    const { context } = automata;
    const contextList = Object.keys(context || {}).map(v => `__context__${v}__`);
    if (!(0, lodash_es_1.isEqual)(variableList, prevVariableMap.current.variable) ||
        !(0, lodash_es_1.isEqual)(contextList, prevVariableMap.current.context)) {
        const deletedVariableList = [
            ...prevVariableMap.current?.context?.filter(context => !contextList.includes(context)),
            ...prevVariableMap.current?.variable?.filter(variable => !variableList.includes(variable))
        ];
        if (deletedVariableList.length) {
            const newAttrs = replaceVariable(attrs, deletedVariableList);
            if (!(0, lodash_es_1.isEqual)(newAttrs, attrs)) {
                override({ attrs: newAttrs });
            }
        }
        prevVariableMap.current = {
            context: contextList,
            variable: variableList,
            id: Date.now()
        };
    }
    scope = Object.keys(scope)
        .filter(key => active && key.indexOf(active) === 0)
        .reduce((prev, key) => {
        const newKey = key.replace(active || '', '').replace(/^\./, '');
        prev[newKey] = scope[key];
        return prev;
    }, {});
    return ((0, jsx_runtime_1.jsx)(VariableContext.Provider, { value: {
            id: prevVariableMap.current?.id,
            scope
        }, children: children }));
};
exports.VariableProvider = VariableProvider;
