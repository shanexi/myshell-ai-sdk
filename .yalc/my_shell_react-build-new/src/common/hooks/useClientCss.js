"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClientCss = void 0;
const react_1 = require("react");
let clientStyles;
const getClientStyles = () => {
    if (!clientStyles) {
        clientStyles = new Map();
    }
    return clientStyles;
};
exports.useClientCss = typeof window !== 'undefined'
    ? (url) => {
        (0, react_1.useEffect)(() => {
            const clientStyles = getClientStyles();
            let item = clientStyles.get(url);
            if (!item) {
                const styleLink = document.createElement('link');
                styleLink.rel = 'stylesheet';
                styleLink.href = url;
                document.head.appendChild(styleLink);
                item = { el: styleLink, count: 0 };
                clientStyles.set(url, item);
            }
            item.count++;
            return () => {
                if (item.count > 1) {
                    item.count--;
                }
                else {
                    document.head.removeChild(item.el);
                    clientStyles.delete(url);
                }
            };
        }, [url]);
    }
    : () => {
    };
