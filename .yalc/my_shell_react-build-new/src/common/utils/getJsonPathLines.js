"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonPathLine = getJsonPathLine;
const json_source_map_1 = __importDefault(require("json-source-map"));
const json5_1 = __importDefault(require("json5"));
const jsonpath_plus_1 = require("jsonpath-plus");
function getJsonPathLine(jsonStr, query) {
    if (!jsonStr) {
        return -1;
    }
    try {
        const jsonData = json5_1.default.parse(jsonStr);
        const sourceMap = json_source_map_1.default.stringify(jsonData, null, 2);
        const result = (0, jsonpath_plus_1.JSONPath)({ json: jsonData, path: query });
        if (result.length === 0) {
            return -1;
        }
        const pointer = (0, jsonpath_plus_1.JSONPath)({ json: jsonData, path: query, resultType: 'pointer' })[0];
        if (pointer in sourceMap.pointers) {
            const location = sourceMap.pointers[pointer];
            return (location.key ? location.key.line : location.value.line) + 1;
        }
    }
    catch (error) {
        console.error('Get Jsonpath Line Error:', error);
    }
    return -1;
}
