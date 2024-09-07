"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const TelegramButton = ({ botName, widgetVersion = 19, dataOnAuth, dataAuthUrl, buttonSize = 'large', className, cornerRadius, requestAccess = true, lang = 'en', userPic = false, children }) => {
    const telegramRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!!dataAuthUrl === !!dataOnAuth) {
            throw new Error('One of this props should be defined: dataAuthUrl (Redirect URL), dataOnAuth (callback fn) should be defined.');
        }
        if (dataOnAuth) {
            window.TelegramLoginWidgetCb = dataOnAuth;
        }
        const script = document.createElement('script');
        script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`;
        script.async = true;
        const attributes = {
            'data-telegram-login': botName,
            'data-size': buttonSize,
            'data-radius': cornerRadius,
            'data-request-access': requestAccess ? 'write' : undefined,
            'data-userpic': userPic,
            'data-lang': lang,
            'data-auth-url': dataAuthUrl,
            'data-onauth': 'TelegramLoginWidgetCb(user)'
        };
        for (const [k, v] of Object.entries(attributes)) {
            v !== undefined && script.setAttribute(k, `${v}`);
        }
        telegramRef.current.appendChild(script);
        return () => {
            if (telegramRef.current) {
                telegramRef.current.innerHTML = '';
            }
            if (window.TelegramLoginWidgetCb) {
                delete window.TelegramLoginWidgetCb;
            }
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("button", { ref: telegramRef, className: `absolute right-0 bottom-0 overflow-hidden ${className}`, children: children }) }));
};
exports.TelegramButton = TelegramButton;
