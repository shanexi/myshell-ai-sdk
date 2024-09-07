"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_es_1 = require("lodash-es");
const exec_1 = require("./exec.js");
function isNestedArray(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    return (0, lodash_es_1.some)(arr, item => Array.isArray(item));
}
function flat(schema, values, path = [], parent = [], context) {
    const { type, title, properties, additionalProperties, items, additionalItems } = schema;
    const rets = [];
    const value = path.length > 0 ? (0, lodash_es_1.get)(values, path.join('.')) : values;
    const newProperties = {};
    const newItems = [];
    let newTitle = title;
    if (title && /{{.*?}}/.test(title)) {
        newTitle = title.replace(/{{(.*?)}}/, (matched, variable) => {
            if (context[variable]) {
                return context[variable];
            }
            return matched;
        });
    }
    if (type === 'object' || type === 'void') {
        if (properties) {
            Object.keys(properties).forEach(key => {
                rets.push(...flat(properties[key], values, [...(type === 'void' ? parent : path), key], type === 'void' ? parent : path, { ...context }));
            });
        }
        else if (additionalProperties && typeof additionalProperties === 'object' && value) {
            Object.keys(value).forEach($key => {
                rets.push(...flat(additionalProperties, values, [...(type === 'void' ? parent : path), $key], type === 'void' ? parent : path, { ...context, key: $key }));
                newProperties[$key] = additionalProperties;
            });
        }
    }
    else if (type === 'array') {
        if (items) {
            (Array.isArray(items) ? items : [items]).forEach((item, i) => {
                rets.push(...flat(item, values, [...path, String(i)], path, { ...context }));
            });
        }
        else if (additionalItems && typeof additionalItems === 'object' && Array.isArray(value) && value.length) {
            value.map((_, i) => {
                rets.push(...flat(additionalItems, values, [...path, String(i)], path, {
                    ...context,
                    currentIndex: i,
                    totalLength: value.length
                }));
                newItems.push(additionalItems);
            });
        }
    }
    rets.push({
        path: path.join('.'),
        parent: parent.join('.'),
        schema: {
            ...schema,
            ...(Object.keys(newProperties).length ? { properties: newProperties } : {}),
            ...(newItems.length ? { items: newItems } : {}),
            title: newTitle
        },
        error: isNestedArray(value),
        context: {
            $this: {
                value
            },
            ...context
        }
    });
    return rets;
}
function execReactions(source) {
    return Object.keys(source).reduce((prev, name) => {
        const { schema, context, parent } = source[name];
        const { 'x-reactions': xReactions } = schema;
        if (xReactions) {
            const scope = parent;
            (Array.isArray(xReactions) ? xReactions : [xReactions]).forEach((reaction) => {
                const target = [scope, reaction.target].join('.');
                const { when, fullfill, otherwise } = reaction;
                const stdout = (0, exec_1.exec)(when, context);
                prev[target] = (0, lodash_es_1.merge)(prev[target], stdout ? fullfill : otherwise);
            });
        }
        return prev;
    }, {});
}
function createFields(schema, values) {
    const dest = flat(schema, values, [], [], {}).reduce((prev, item) => {
        prev[item.path] = item;
        return prev;
    }, {});
    const source = execReactions(dest);
    return (0, lodash_es_1.merge)({}, dest, source);
}
exports.default = createFields;
