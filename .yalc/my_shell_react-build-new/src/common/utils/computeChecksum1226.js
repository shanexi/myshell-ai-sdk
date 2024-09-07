"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeChecksum1226 = computeChecksum1226;
function computeChecksum1226(rawTimestamp) {
    const timestamp = (rawTimestamp - (rawTimestamp % 10)) / 10;
    let flag = false;
    let sum = 0;
    let t = timestamp;
    while (t) {
        const mod = t % 10;
        sum += (flag ? 5 : 2) * mod;
        t = (t - mod) / 10;
        flag = !flag;
    }
    const checkBit = sum % 10;
    return timestamp * 10 + checkBit;
}
