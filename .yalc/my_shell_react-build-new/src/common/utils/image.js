"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divideToFraction = divideToFraction;
function divideToFraction(dividend, divisor) {
    function gcd(a, b) {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    }
    const commonDivisor = gcd(dividend, divisor);
    const numerator = dividend / commonDivisor;
    const denominator = divisor / commonDivisor;
    return {
        numerator,
        denominator,
        text: `${numerator}/${denominator}`
    };
}
