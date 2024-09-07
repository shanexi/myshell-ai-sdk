"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    reason;
    msg;
    constructor(msg, reason) {
        super(msg);
        this.reason = reason;
        this.msg = msg;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.default = CustomError;
