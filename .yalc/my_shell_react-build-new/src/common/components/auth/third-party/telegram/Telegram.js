import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
export const TelegramButton = ({ botName, widgetVersion = 19, dataOnAuth, dataAuthUrl, buttonSize = 'large', className, cornerRadius, requestAccess = true, lang = 'en', userPic = false, children }) => {
    const telegramRef = useRef(null);
    useEffect(() => {
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
    return (_jsx(_Fragment, { children: _jsx("button", { ref: telegramRef, className: `absolute right-0 bottom-0 overflow-hidden ${className}`, children: children }) }));
};
