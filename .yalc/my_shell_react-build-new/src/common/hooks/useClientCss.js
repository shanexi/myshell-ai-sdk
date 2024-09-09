import { useEffect } from 'react';
let clientStyles;
const getClientStyles = () => {
    if (!clientStyles) {
        clientStyles = new Map();
    }
    return clientStyles;
};
export const useClientCss = typeof window !== 'undefined'
    ? (url) => {
        useEffect(() => {
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
