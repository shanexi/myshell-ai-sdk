"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLocaleCookie = exports.setLocaleCookie = void 0;
exports.getMessages = getMessages;
const navigation_1 = require("next/navigation");
const constants_1 = require("../../../middlewares/constants");
async function getMessages(locale) {
    try {
        return (await Promise.resolve(`${`/messages/${locale}.json`}`).then(s => __importStar(require(s)))).default;
    }
    catch (error) {
        (0, navigation_1.notFound)();
    }
}
const setLocaleCookie = (locale) => {
    document.cookie = `${constants_1.COOKIE_LOCALE_NAME}=${locale}; max-age=31536000; path=/`;
};
exports.setLocaleCookie = setLocaleCookie;
const clearLocaleCookie = () => {
    document.cookie = `${constants_1.COOKIE_LOCALE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
exports.clearLocaleCookie = clearLocaleCookie;
