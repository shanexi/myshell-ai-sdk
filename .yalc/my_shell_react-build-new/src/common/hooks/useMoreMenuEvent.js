"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMoreMenuEvent = void 0;
const react_1 = require("react");
const useLongPress_1 = __importDefault(require("../../common/hooks/useLongPress.js"));
const common_helper_1 = require("../../common/utils/common-helper.js");
const useMoreMenuEvent = (callback, startCb) => {
    const [moreMenuVisible, setMoreMenuVisible] = (0, react_1.useState)(false);
    const { onTouchEnd, onTouchCancel, onTouchStart } = (0, useLongPress_1.default)((e) => {
        callback(e);
    }, 800, startCb);
    const [events, setEvents] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        if ((0, common_helper_1.isMobileDevice)()) {
            setEvents({
                onTouchStart: onTouchStart,
                onTouchEnd: onTouchEnd,
                onTouchCancel: onTouchCancel
            });
        }
    }, []);
    return { moreMenuEvents: events, moreMenuVisible };
};
exports.useMoreMenuEvent = useMoreMenuEvent;
