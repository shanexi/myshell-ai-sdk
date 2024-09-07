"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSignature = void 0;
const md5_1 = __importDefault(require("md5"));
const version = 'v1.0.0';
const computeChecksum_1 = require("./computeChecksum.js");
const runtime_config_1 = require("./runtime-config.js");
function buildSignatureString(version, text, timestamp, salt) {
    return `${version}#${text}#${timestamp}#${salt}`;
}
function calculateHash(signatureString) {
    const hash = (0, md5_1.default)(signatureString);
    const reversedHash = hash.split('').reverse().join('');
    return reversedHash;
}
const addSignature = async (text) => {
    const timestamp = String((0, computeChecksum_1.computeChecksum)(Date.now()));
    const signatureString = buildSignatureString(version, text, timestamp, runtime_config_1.SALT);
    const signature = await calculateHash(signatureString);
    const obj = {};
    const s = 'signature';
    const t = 'timestamp';
    const v = 'version';
    const uu = 'prod';
    obj[s] = signature;
    obj[t] = timestamp;
    obj[v] = version;
    obj['u'] = uu;
    return obj;
};
exports.addSignature = addSignature;
