import isMobile from 'ismobilejs';
import { v4 as uuidv4 } from 'uuid';
import { formatEther } from 'viem';
import { CDN_URL } from '../../common/utils/runtime-config.js';
import { FeedbackSateEnum } from '../../chat/model/interfaces.js';
export function getAssetsUrl(url, prefix) {
    if (url?.includes('image/user/avatar')) {
        return getAssetsUrlV2(url);
    }
    if (!isString(url) || !(url || '').trim()) {
        return url;
    }
    if (url.startsWith('http')) {
        return url;
    }
    return `${prefix || CDN_URL}${url}`;
}
export function getAssetsUrlV2(url) {
    if (!isString(url) || !(url || '').trim()) {
        return url;
    }
    if (url.startsWith('http')) {
        return url;
    }
    return `https://image.myshell.ai/${url}`;
}
export function isClient() {
    return typeof window !== 'undefined';
}
export function isString(str) {
    return typeof str === 'string' || str instanceof String;
}
export function isNullOrUndefined(value) {
    return value == null || value === undefined;
}
export function generateUUID() {
    return uuidv4();
}
export function isMobileDevice() {
    const device = isMobile();
    return device.phone || device.tablet;
}
export function isWeixin() {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
}
export function isIos() {
    const device = isMobile();
    return device.apple.phone || device.apple.tablet || device.apple.ipod;
}
export function checkSupportedMimeType() {
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
export function urlSearchParamsToObj(searchParams) {
    const obj = {};
    for (const [key, value] of searchParams.entries()) {
        obj[key] = value;
    }
    return obj;
}
export function checkAudioRecordSupport() {
    return (!!navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || !!window.MediaRecorder;
}
export function requestAudioRecordAccess() {
    return navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    });
}
export function secondsConverter(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${(minutes < 10 && minutes > 0 ? '0' : '') + minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
export function durationFormatter(seconds) {
    if (isNaN(seconds) || seconds === Infinity) {
        return '';
    }
    const _seconds = Math.floor(seconds);
    return secondsConverter(_seconds);
}
export function timeFormatter(seconds) {
    const _seconds = Math.floor(seconds);
    return `${_seconds}`;
}
export function hasEmoji(str) {
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    return emojiRegex.test(str);
}
export function getFileExtension(fileName) {
    const parts = fileName.split('.');
    if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase();
    }
    return '';
}
export function camelToSnake(camelCase) {
    return camelCase.replace(/([A-Z])/g, '_$1').toLowerCase();
}
export function strToLowerCase(str) {
    return str.toLowerCase();
}
export function isVideo(fileSuffix) {
    const videoTypes = ['mp4'];
    return videoTypes.some(t => t === fileSuffix);
}
export function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}
export function isValidInviteLink(link) {
    const regex = /\/(invite|bot)\/([^/]+)\/([^/]+)(?:\/([^/]+))?/;
    const inviteCodeRegex = /\/inviteCode\/([^/]+)$/;
    return regex.test(link) || inviteCodeRegex.test(link);
}
export function tryJsonParse(text) {
    try {
        return JSON.parse(text);
    }
    catch (e) {
        console.error(e);
        return {};
    }
}
export function isKOL() {
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
export function searchByParam(param) {
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams?.get(param) || '';
    }
    return '';
}
export function isOpenKOL() {
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const chatBodyType = searchParams?.get('chatBodyType');
        return chatBodyType === 'kol';
    }
}
export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
export const getPercent = (time, duration) => {
    if (!time || !duration) {
        return 0;
    }
    const ratio = time / duration;
    return ratio >= 1 ? 1 : ratio;
};
export const getFeedbackStatus = (state) => {
    return FeedbackSateEnum[state] || 0;
};
export const numberArraySum = (numberArr) => {
    return numberArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
};
export const formatNumberWithSeparator = (num) => {
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
export const formatNumberToPercentage = (num) => {
    return `${(num * 100).toFixed(2)}%`;
};
export const getSuffix = (fileName) => {
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
export const isObjEmpty = (obj) => {
    if (!obj)
        return true;
    return Object.keys(obj).length === 0;
};
export function processText(text) {
    const convertedText = text.replace(/\n+/g, ' ');
    if (convertedText.length > 250) {
        return `${convertedText.slice(0, 250)}...`;
    }
    return convertedText;
}
export function formatFloatNumberToOneDecimalAndRemoveDecimalZero(value) {
    const v = Number(value);
    const floored = Math.floor(v * 10) / 10;
    return floored % 1 === 0 ? floored.toFixed(0) : floored.toFixed(1);
}
export function stringCaplitalization(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const openCenteredWindow = ({ url, title, w, h }) => {
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
export const getRandomString = (e) => {
    e = e || 8;
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const a = t.length;
    let n = '';
    for (let i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n;
};
export const sleep = async (ms) => {
    await new Promise(resolve => setTimeout(resolve, ms));
};
export const formatTokenValue = (value, digits) => {
    return parseFloat(formatEther(value)).toFixed(digits);
};
export const extractPublicKey = (keyString) => {
    const keyRegex = /-----BEGIN RSA PUBLIC KEY-----\n([\s\S]+)\n-----END RSA PUBLIC KEY-----/;
    const matches = keyRegex.exec(keyString);
    if (matches && matches.length > 1) {
        return matches[1];
    }
    throw new Error('Invalid public key format.');
};
export const formatBalance = (balance) => {
    if (!balance) {
        return '0';
    }
    const balanceInEther = formatEther(balance);
    const formattedBalance = parseFloat(balanceInEther)
        .toFixed(4)
        .replace(/(\.\d*?[1-9])0+$/, '$1')
        .replace(/\.0+$/, '');
    return formattedBalance === '0.0000' ? '< 0.0001' : formattedBalance;
};
export const formatWalletAddress = (address) => {
    if (!address)
        return '--';
    return `${address.slice(0, 4)}..${address.slice(-4)}`;
};
