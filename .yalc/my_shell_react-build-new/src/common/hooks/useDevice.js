"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsMobileByWindowWidth = exports.useDevice = void 0;
const ismobilejs_1 = __importDefault(require("ismobilejs"));
const react_1 = require("react");
const useWindowWidth_1 = require("../../common/hooks/useWindowWidth");
const useDevice = () => {
    const [device, setDevice] = (0, react_1.useState)((0, ismobilejs_1.default)());
    const [isWeixin, setIsWeixin] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const device = (0, ismobilejs_1.default)();
        setDevice(device);
        setIsWeixin(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1);
    }, []);
    return {
        isMobile: device.phone || device.tablet,
        isIos: device.apple.phone || device.apple.tablet || device.apple.ipod,
        isWeixin
    };
};
exports.useDevice = useDevice;
const useIsMobileByWindowWidth = () => {
    return (0, useWindowWidth_1.useWindowWidth)() <= 768;
};
exports.useIsMobileByWindowWidth = useIsMobileByWindowWidth;
