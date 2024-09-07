"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWalletAddress = exports.formatBalance = exports.extractPublicKey = exports.formatTokenValue = exports.sleep = exports.getRandomString = exports.openCenteredWindow = exports.isObjEmpty = exports.getSuffix = exports.formatNumberToPercentage = exports.formatNumberWithSeparator = exports.numberArraySum = exports.getFeedbackStatus = exports.getPercent = void 0;
exports.getAssetsUrl = getAssetsUrl;
exports.getAssetsUrlV2 = getAssetsUrlV2;
exports.isClient = isClient;
exports.isString = isString;
exports.isNullOrUndefined = isNullOrUndefined;
exports.generateUUID = generateUUID;
exports.isMobileDevice = isMobileDevice;
exports.isWeixin = isWeixin;
exports.isIos = isIos;
exports.checkSupportedMimeType = checkSupportedMimeType;
exports.urlSearchParamsToObj = urlSearchParamsToObj;
exports.checkAudioRecordSupport = checkAudioRecordSupport;
exports.requestAudioRecordAccess = requestAudioRecordAccess;
exports.secondsConverter = secondsConverter;
exports.durationFormatter = durationFormatter;
exports.timeFormatter = timeFormatter;
exports.hasEmoji = hasEmoji;
exports.getFileExtension = getFileExtension;
exports.camelToSnake = camelToSnake;
exports.strToLowerCase = strToLowerCase;
exports.isVideo = isVideo;
exports.clamp = clamp;
exports.isValidInviteLink = isValidInviteLink;
exports.tryJsonParse = tryJsonParse;
exports.isKOL = isKOL;
exports.searchByParam = searchByParam;
exports.isOpenKOL = isOpenKOL;
exports.shuffleArray = shuffleArray;
exports.processText = processText;
exports.formatFloatNumberToOneDecimalAndRemoveDecimalZero = formatFloatNumberToOneDecimalAndRemoveDecimalZero;
exports.stringCaplitalization = stringCaplitalization;
const ismobilejs_1 = __importDefault(require("ismobilejs"));
const uuid_1 = require("uuid");
const viem_1 = require("viem");
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const interfaces_1 = require("../../chat/model/interfaces.js");
function getAssetsUrl(url, prefix) {
    if (url?.includes('image/user/avatar')) {
        return getAssetsUrlV2(url);
    }
    if (!isString(url) || !(url || '').trim()) {
        return url;
    }
    if (url.startsWith('http')) {
        return url;
    }
    return `${prefix || runtime_config_1.CDN_URL}${url}`;
}
function getAssetsUrlV2(url) {
    if (!isString(url) || !(url || '').trim()) {
        return url;
    }
    if (url.startsWith('http')) {
        return url;
    }
    return `https://image.myshell.ai/${url}`;
}
function isClient() {
    return typeof window !== 'undefined';
}
function isString(str) {
    return typeof str === 'string' || str instanceof String;
}
function isNullOrUndefined(value) {
    return value == null || value === undefined;
}
function generateUUID() {
    return (0, uuid_1.v4)();
}
function isMobileDevice() {
    const device = (0, ismobilejs_1.default)();
    return device.phone || device.tablet;
}
function isWeixin() {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
}
function isIos() {
    const device = (0, ismobilejs_1.default)();
    return device.apple.phone || device.apple.tablet || device.apple.ipod;
}
function checkSupportedMimeType() {
    const mimeTypes = [
        'audio/mp4',
        'audio/mpeg',
        'audio/wav',
        'audio/webm',
        'audio/webm;codecs=opus',
        'audio/webm;codecs=pcm',
        'audio/ogg',
        'audio/ogg;codecs=opus',
        'audio/ogg;codecs=vorbis'
    ];
    let supportedType = '';
    try {
        for (const type of mimeTypes) {
            if (MediaRecorder.isTypeSupported(type)) {
                supportedType = type;
                break;
            }
        }
    }
    catch (e) {
    }
    return supportedType;
}
function urlSearchParamsToObj(searchParams) {
    const obj = {};
    for (const [key, value] of searchParams.entries()) {
        obj[key] = value;
    }
    return obj;
}
function checkAudioRecordSupport() {
    return (!!navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || !!window.MediaRecorder;
}
function requestAudioRecordAccess() {
    return navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    });
}
function secondsConverter(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${(minutes < 10 && minutes > 0 ? '0' : '') + minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
function durationFormatter(seconds) {
    if (isNaN(seconds) || seconds === Infinity) {
        return '';
    }
    const _seconds = Math.floor(seconds);
    return secondsConverter(_seconds);
}
function timeFormatter(seconds) {
    const _seconds = Math.floor(seconds);
    return `${_seconds}`;
}
function hasEmoji(str) {
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    return emojiRegex.test(str);
}
function getFileExtension(fileName) {
    const parts = fileName.split('.');
    if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase();
    }
    return '';
}
function camelToSnake(camelCase) {
    return camelCase.replace(/([A-Z])/g, '_$1').toLowerCase();
}
function strToLowerCase(str) {
    return str.toLowerCase();
}
function isVideo(fileSuffix) {
    const videoTypes = ['mp4'];
    return videoTypes.some(t => t === fileSuffix);
}
function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}
function isValidInviteLink(link) {
    const regex = /\/(invite|bot)\/([^/]+)\/([^/]+)(?:\/([^/]+))?/;
    const inviteCodeRegex = /\/inviteCode\/([^/]+)$/;
    return regex.test(link) || inviteCodeRegex.test(link);
}
function tryJsonParse(text) {
    try {
        return JSON.parse(text);
    }
    catch (e) {
        console.error(e);
        return {};
    }
}
function isKOL() {
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const channel = searchParams?.get('channel');
        const inviteCode = searchParams?.get('inviteCode');
        const invite = searchParams?.get('invite');
        return ((inviteCode === 'whixer' && invite === '1') ||
            (inviteCode === 'supac' && invite === '1') ||
            (inviteCode === 'animetm' && invite === '1'));
    }
    return false;
}
function searchByParam(param) {
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams?.get(param) || '';
    }
    return '';
}
function isOpenKOL() {
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const chatBodyType = searchParams?.get('chatBodyType');
        return chatBodyType === 'kol';
    }
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
const getPercent = (time, duration) => {
    if (!time || !duration) {
        return 0;
    }
    const ratio = time / duration;
    return ratio >= 1 ? 1 : ratio;
};
exports.getPercent = getPercent;
const getFeedbackStatus = (state) => {
    return interfaces_1.FeedbackSateEnum[state] || 0;
};
exports.getFeedbackStatus = getFeedbackStatus;
const numberArraySum = (numberArr) => {
    return numberArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
};
exports.numberArraySum = numberArraySum;
const formatNumberWithSeparator = (num) => {
    const numberString = num.toString();
    const decimalIndex = numberString.indexOf('.');
    const integerPart = decimalIndex === -1 ? numberString : numberString.slice(0, decimalIndex);
    const decimalPart = decimalIndex === -1 ? '' : numberString.slice(decimalIndex);
    let result = '';
    let counter = 0;
    for (let i = integerPart.length - 1; i >= 0; i--) {
        if (counter !== 0 && counter % 3 === 0) {
            result = `,${result}`;
        }
        result = integerPart[i] + result;
        counter++;
    }
    return result + decimalPart;
};
exports.formatNumberWithSeparator = formatNumberWithSeparator;
const formatNumberToPercentage = (num) => {
    return `${(num * 100).toFixed(2)}%`;
};
exports.formatNumberToPercentage = formatNumberToPercentage;
const getSuffix = (fileName) => {
    if (typeof fileName !== 'string') {
        console.log('File name should be a string!');
        return;
    }
    const lastDotIdx = fileName.lastIndexOf('.');
    if (lastDotIdx < 0) {
        console.log('Invalid file name!');
        return;
    }
    return fileName.substring(lastDotIdx);
};
exports.getSuffix = getSuffix;
const isObjEmpty = (obj) => {
    if (!obj)
        return true;
    return Object.keys(obj).length === 0;
};
exports.isObjEmpty = isObjEmpty;
function processText(text) {
    const convertedText = text.replace(/\n+/g, ' ');
    if (convertedText.length > 250) {
        return `${convertedText.slice(0, 250)}...`;
    }
    return convertedText;
}
function formatFloatNumberToOneDecimalAndRemoveDecimalZero(value) {
    const v = Number(value);
    const floored = Math.floor(v * 10) / 10;
    return floored % 1 === 0 ? floored.toFixed(0) : floored.toFixed(1);
}
function stringCaplitalization(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const openCenteredWindow = ({ url, title, w, h }) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;
    const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;
    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(url, title, `
    scrollbars=yes,
    width=${w / systemZoom}, 
    height=${h / systemZoom}, 
    top=${top}, 
    left=${left}
    `);
    newWindow?.focus();
};
exports.openCenteredWindow = openCenteredWindow;
const getRandomString = (e) => {
    e = e || 8;
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const a = t.length;
    let n = '';
    for (let i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n;
};
exports.getRandomString = getRandomString;
const sleep = async (ms) => {
    await new Promise(resolve => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const formatTokenValue = (value, digits) => {
    return parseFloat((0, viem_1.formatEther)(value)).toFixed(digits);
};
exports.formatTokenValue = formatTokenValue;
const extractPublicKey = (keyString) => {
    const keyRegex = /-----BEGIN RSA PUBLIC KEY-----\n([\s\S]+)\n-----END RSA PUBLIC KEY-----/;
    const matches = keyRegex.exec(keyString);
    if (matches && matches.length > 1) {
        return matches[1];
    }
    throw new Error('Invalid public key format.');
};
exports.extractPublicKey = extractPublicKey;
const formatBalance = (balance) => {
    if (!balance) {
        return '0';
    }
    const balanceInEther = (0, viem_1.formatEther)(balance);
    const formattedBalance = parseFloat(balanceInEther)
        .toFixed(4)
        .replace(/(\.\d*?[1-9])0+$/, '$1')
        .replace(/\.0+$/, '');
    return formattedBalance === '0.0000' ? '< 0.0001' : formattedBalance;
};
exports.formatBalance = formatBalance;
const formatWalletAddress = (address) => {
    if (!address)
        return '--';
    return `${address.slice(0, 4)}..${address.slice(-4)}`;
};
exports.formatWalletAddress = formatWalletAddress;
