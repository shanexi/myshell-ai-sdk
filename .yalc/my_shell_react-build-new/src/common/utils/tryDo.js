"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryDo = void 0;
const tryDo = (fn) => {
    try {
        return fn();
    }
    catch (e) {
        return undefined;
    }
};
exports.tryDo = tryDo;
