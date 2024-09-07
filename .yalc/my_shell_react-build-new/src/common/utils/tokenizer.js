"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenCount = getTokenCount;
const js_tiktoken_1 = require("js-tiktoken");
const encoding = (0, js_tiktoken_1.getEncoding)('cl100k_base');
function getTokenCount(content) {
    return encoding.encode(content ?? '').length;
}
