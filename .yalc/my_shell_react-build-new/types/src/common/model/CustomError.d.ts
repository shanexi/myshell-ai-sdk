export default class CustomError extends Error {
    reason?: string;
    msg: string;
    constructor(msg: string, reason?: string);
}
