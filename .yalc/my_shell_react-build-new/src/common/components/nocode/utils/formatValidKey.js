"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValidkey = formatValidkey;
function uuid() {
    const timestamp = new Date().getTime().toString();
    const randomString = timestamp.slice(-16);
    return `key_${randomString}`;
}
function formatValidkey(newInput, oldOutput) {
    const prefix = newInput
        .toLocaleLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '_');
    if (oldOutput?.indexOf(prefix) === 0) {
        return oldOutput;
    }
    return `${prefix}_${uuid()}`;
}
