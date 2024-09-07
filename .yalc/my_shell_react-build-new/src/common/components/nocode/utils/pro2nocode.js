"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodecodeData2proconfigData = exports.proconfigData2nodecodeData = void 0;
const lodash_es_1 = require("lodash-es");
const const_1 = require("./const.js");
const utils_1 = require("./utils.js");
const store_provider_1 = require("../components/store-provider/index.js");
const proconfigData2nodecodeData = ({ data, type, tree, nodes, attrs, active }) => {
    let resultData = const_1.DEFAULT_DATA;
    if (type === 'automata') {
        const newData = (0, lodash_es_1.cloneDeep)(data);
        newData.type = 'automata';
        newData.transitions = newData.transitions || {};
        newData.context = (0, lodash_es_1.mapValues)(newData.context, (value, name) => {
            if (!value) {
                return {
                    name,
                    type: 'text',
                    value: ''
                };
            }
            return value;
        });
        resultData = newData;
    }
    if (type === 'state') {
        const newData = (0, lodash_es_1.cloneDeep)(data);
        resultData = (0, store_provider_1.stringify)({ tree, nodes, attrs: { ...attrs, [active]: newData } });
    }
    if (type === 'widget') {
        const newData = (0, lodash_es_1.cloneDeep)(data);
        resultData = (0, store_provider_1.stringify)({ tree, nodes, attrs: { ...attrs, [active]: newData } });
    }
    resultData.states = (0, lodash_es_1.mapValues)(resultData.states, (state, name) => ({
        ...state,
        type: 'state',
        name: state.name || name,
        render: {
            ...state?.render,
            buttons: (0, utils_1.isNestedArray)(state?.render?.buttons)
                ? state.render?.buttons
                : state.render?.buttons?.map(btn => ({
                    ...btn,
                    on_click: typeof btn.on_click === 'string' ? { event: btn.on_click, payload: {} } : btn.on_click
                }))
        },
        tasks: (0, lodash_es_1.map)(state?.tasks, task => ({
            ...task,
            type: 'widget'
        }))
    }));
    return resultData;
};
exports.proconfigData2nodecodeData = proconfigData2nodecodeData;
const removeKeys = (obj, objKeys) => {
    for (const key in obj) {
        if (objKeys.includes(key)) {
            delete obj[key];
        }
        else if (typeof obj[key] === 'object' && obj[key] !== null) {
            removeKeys(obj[key], objKeys);
        }
    }
};
const nodecodeData2proconfigData = (data, type, path) => {
    const [id, stateKey, widgetIndex] = path.split('.');
    const newData = (0, lodash_es_1.cloneDeep)(data);
    if (type === 'automata' && !(0, lodash_es_1.isUndefined)(id)) {
        const newAutomata = (0, lodash_es_1.pick)(newData, ['id', 'type', 'initial', 'states', 'context', 'transitions']);
        removeKeys(newAutomata, ['_key']);
        (0, lodash_es_1.mapValues)(newAutomata?.states, state => {
            state.render = (0, lodash_es_1.pick)(state.render, ['text', 'image', 'audio', 'video', 'buttons']);
            state?.tasks?.forEach(task => {
                removeKeys(task, ['type']);
            });
        });
        return newAutomata;
    }
    if (type === 'state' && !(0, lodash_es_1.isUndefined)(stateKey)) {
        const newState = newData.states?.[stateKey];
        removeKeys(newState, ['_key']);
        newState.tasks?.forEach(task => removeKeys(task, ['type']));
        return {
            type,
            name: newState?.name,
            inputs: newState.inputs,
            tasks: newState.tasks,
            outputs: newState.outputs,
            render: (0, lodash_es_1.pick)(newState.render, ['text', 'image', 'audio', 'video', 'buttons']),
            transitions: newState.transitions
        };
    }
    if (type === 'widget' && !(0, lodash_es_1.isUndefined)(widgetIndex)) {
        const task = (newData.states?.[stateKey]?.tasks?.[Number(widgetIndex)] || const_1.DEFAULT_WIDGET_DATA);
        const { widget_id, ...restConfig } = task.module_config || {};
        return {
            ...(0, lodash_es_1.omit)(task, ['type']),
            module_config: {
                widget_id,
                ...restConfig
            }
        };
    }
    return const_1.DEFAULT_PROCONFIG_DATA;
};
exports.nodecodeData2proconfigData = nodecodeData2proconfigData;
