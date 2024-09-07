"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultValueBySchema = getDefaultValueBySchema;
const lodash_es_1 = require("lodash-es");
const uuid_1 = require("./uuid.js");
function getDefaultValueBySchema(schema, initializeDefaults = true) {
    const { type, default: defaultValue, properties, items } = schema;
    if ('default' in schema) {
        return defaultValue === '{{uuid}}' ? (0, uuid_1.uuid)() : defaultValue;
    }
    if (type === 'string') {
        return initializeDefaults ? '' : undefined;
    }
    else if (type === 'number') {
        return initializeDefaults ? 0 : undefined;
    }
    else if (type === 'boolean') {
        return initializeDefaults ? false : undefined;
    }
    else if (type === 'object' || type === 'void') {
        const result = {};
        if (properties) {
            Object.keys(properties).map((key) => {
                if (properties[key].type === 'void') {
                    (0, lodash_es_1.merge)(result, getDefaultValueBySchema(properties[key]));
                }
                else {
                    result[key] = getDefaultValueBySchema(properties[key]);
                }
            });
        }
        if (Object.keys(result).length === 0) {
            return initializeDefaults ? result : undefined;
        }
        return result;
    }
    else if (type === 'array') {
        const result = [];
        if (items) {
            if (Array.isArray(items)) {
                items.forEach(item => {
                    result.push(getDefaultValueBySchema(item));
                });
            }
            else {
                result.push(getDefaultValueBySchema(items));
            }
        }
        if (result.length === 0) {
            return initializeDefaults ? result : undefined;
        }
        return result;
    }
    else {
        return null;
    }
}
