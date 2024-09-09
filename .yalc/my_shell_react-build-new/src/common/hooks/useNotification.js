"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
exports.useNotification = useNotification;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hot_toast_1 = require("react-hot-toast");
const CustomNotificationElement_1 = __importDefault(require("../../common/components/CustomNotificationElement"));
function useNotification() {
    const addToast = (0, react_1.useCallback)((config, duration) => {
        if (config.id) {
            react_hot_toast_1.toast.remove(config.id);
        }
        react_hot_toast_1.toast.custom((t) => {
            return (0, jsx_runtime_1.jsx)(CustomNotificationElement_1.default, { tProps: { ...t, duration }, customProps: config });
        }, {
            id: config.id
        });
    }, []);
    const message = (0, react_1.useCallback)((config) => addToast({
        ...config
    }), []);
    const success = (0, react_1.useCallback)((config) => addToast({
        ...config,
        type: 'success'
    }), []);
    const error = (0, react_1.useCallback)((config) => addToast({
        ...config,
        type: 'error'
    }), []);
    const warning = (0, react_1.useCallback)((config) => addToast({
        ...config,
        type: 'warning'
    }), []);
    const info = (0, react_1.useCallback)((config, duration) => addToast({
        ...config,
        type: 'info'
    }, duration), []);
    const close = (0, react_1.useCallback)((id) => {
        react_hot_toast_1.toast.dismiss(id);
    }, []);
    return { addToast, success, error, warning, info, close, message };
}
class Message {
    static _toast(config) {
        if (config.id) {
            react_hot_toast_1.toast.remove(config.id);
        }
        const addToast = () => {
            react_hot_toast_1.toast.custom((t) => {
                return (0, jsx_runtime_1.jsx)(CustomNotificationElement_1.default, { tProps: t, customProps: config });
            }, {
                id: config.id
            });
        };
        addToast();
    }
    static success(config) {
        return this._toast({
            ...config,
            type: 'success'
        });
    }
    static error(config) {
        return this._toast({
            ...config,
            type: 'error'
        });
    }
    static info(config) {
        return this._toast({
            ...config,
            type: 'info'
        });
    }
    static warning(config) {
        return this._toast({
            ...config,
            type: 'warning'
        });
    }
    static close(id) {
        react_hot_toast_1.toast.dismiss(id);
    }
}
exports.Message = Message;
