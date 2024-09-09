export default class CustomError extends Error {
    reason;
    msg;
    constructor(msg, reason) {
        super(msg);
        this.reason = reason;
        this.msg = msg;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
