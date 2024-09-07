"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormEngineProvider = exports.useFormEngineContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lodash_es_1 = require("lodash-es");
const react_hook_form_1 = require("react-hook-form");
const getDefaultValueBySchema_1 = require("../../utils/getDefaultValueBySchema.js");
const uuid_1 = require("../../utils/uuid.js");
const reorder_1 = require("../../utils/reorder.js");
const lodash_1 = require("lodash");
const FormEngineContext = (0, react_1.createContext)({
    components: {},
    fields: {},
    remove: () => { },
    append: () => { },
    reorder: () => { },
    replaceKey: () => { }
});
const useFormEngineContext = () => {
    return (0, react_1.useContext)(FormEngineContext);
};
exports.useFormEngineContext = useFormEngineContext;
const Counter = {};
const FormEngineProvider = props => {
    const { children, fields, components } = props;
    const { getValues, setValue } = (0, react_hook_form_1.useFormContext)();
    const remove = (path) => {
        const { parent: parentName } = fields[path] || {};
        const parentValue = getValues(parentName);
        if (Array.isArray(parentValue)) {
            const idx = Number(path.replace(parentName + '.', ''));
            if (!isNaN(idx)) {
                setValue(parentName, parentValue.filter((_, i) => i !== idx));
            }
        }
        else {
            const key = path.replace(parentName + '.', '');
            setValue(parentName, (0, lodash_es_1.omit)(parentValue, [key]));
        }
    };
    const append = (path, key, obj) => {
        const value = getValues(path);
        const { schema } = fields[path];
        const { additionalProperties, additionalItems } = schema;
        if (additionalItems && typeof additionalItems === 'object') {
            const newItem = obj ? obj : (0, getDefaultValueBySchema_1.getDefaultValueBySchema)(additionalItems);
            setValue(path, [...(Array.isArray(value) ? value : []), newItem]);
        }
        else if (additionalProperties && typeof additionalProperties === 'object') {
            const { 'x-key': xKey } = additionalProperties;
            const newItem = obj ? obj : (0, getDefaultValueBySchema_1.getDefaultValueBySchema)(additionalProperties);
            let newKey;
            if (key) {
                newKey = key;
            }
            else if (xKey && /{{counter}}/.test(xKey)) {
                if (isNaN(Counter[path])) {
                    Counter[path] = 0;
                }
                else {
                    Counter[path]++;
                }
                newKey = xKey.replace('{{counter}}', String(Counter[path]));
            }
            else {
                newKey = (0, uuid_1.uuid)();
            }
            setValue(path, (0, lodash_es_1.set)(value || {}, newKey, newItem));
        }
    };
    const replaceKey = (path, key, value) => {
        const { parent: parentName } = fields[path] || {};
        let parentValue = getValues(parentName);
        const oldKey = path.replace(parentName + '.', '');
        const newKey = key;
        parentValue = Object.keys(parentValue).reduce((prev, curr) => {
            if (curr === oldKey) {
                const oldValue = parentValue[curr];
                prev[newKey] = typeof oldValue === 'object' && value ? (0, lodash_1.merge)(oldValue, value) : value || oldValue;
            }
            else {
                prev[curr] = parentValue[curr];
            }
            return prev;
        }, {});
        setValue(parentName, parentValue);
    };
    const reorder = (path, startIndex, endIndex) => {
        const { parent: parentName } = fields[path] || {};
        const parentValue = getValues(parentName);
        const newValue = (0, reorder_1.reorder)(parentValue, startIndex, endIndex);
        setValue(parentName, newValue);
    };
    return ((0, jsx_runtime_1.jsx)(FormEngineContext.Provider, { value: { components, fields, remove, append, replaceKey, reorder }, children: children }));
};
exports.FormEngineProvider = FormEngineProvider;
