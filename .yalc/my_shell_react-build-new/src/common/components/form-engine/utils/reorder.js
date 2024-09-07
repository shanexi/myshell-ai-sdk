"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorder = void 0;
const reorder = (value, start, end) => {
    if (value instanceof Array) {
        const result = Array.from(value);
        const [removed] = result.splice(start, 1);
        result.splice(end, 0, removed);
        return result;
    }
    else if (value instanceof Object) {
        const result = Object.keys(value);
        const [removed] = result.splice(start, 1);
        result.splice(end, 0, removed);
        return result.reduce((prev, key) => {
            prev[key] = value[key];
            return prev;
        }, {});
    }
    return value;
};
exports.reorder = reorder;
