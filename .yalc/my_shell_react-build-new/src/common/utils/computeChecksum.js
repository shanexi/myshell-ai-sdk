"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeChecksum = computeChecksum;
function computeChecksum(num) {
    const numStr = num.toString().slice(0, -1);
    let sum = 0;
    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr[i], 10);
        if (i % 2 === 0) {
            sum += digit * 2;
        }
        else {
            sum += digit * 3;
        }
    }
    const checksum = sum % 10;
    return parseInt(numStr + checksum, 10);
}
