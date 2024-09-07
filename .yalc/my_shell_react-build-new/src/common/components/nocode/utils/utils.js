"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNestedArray = isNestedArray;
const lodash_es_1 = require("lodash-es");
function isNestedArray(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    return (0, lodash_es_1.some)(arr, item => Array.isArray(item));
}
