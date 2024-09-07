"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = uuid;
function uuid() {
    const timestamp = new Date().getTime().toString();
    const randomString = timestamp.slice(-16);
    return `key_${randomString}`;
}
