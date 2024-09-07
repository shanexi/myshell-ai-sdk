"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineArrayBuffers = combineArrayBuffers;
function combineArrayBuffers(arrayBuffers) {
    const totalLength = arrayBuffers.reduce((sum, arr) => sum + arr.byteLength, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    arrayBuffers.forEach(arr => {
        result.set(new Uint8Array(arr), offset);
        offset += arr.byteLength;
    });
    return result.buffer;
}
