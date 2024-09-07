"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExitConfirmation = useExitConfirmation;
const react_1 = require("react");
function useExitConfirmation({ enabled, showConfirm }) {
    const confirmed = (0, react_1.useRef)(false);
    const [url, setUrl] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const shouldByPassConfirmation = () => !enabled || confirmed.current;
        const handleWindowClose = (e) => {
            if (shouldByPassConfirmation()) {
                return;
            }
            e.preventDefault();
            return (e.returnValue = 'Confirm');
        };
        const handleBrowseAway = (url) => {
            setUrl(url);
            if (shouldByPassConfirmation()) {
                return;
            }
            showConfirm();
        };
        window.addEventListener('beforeunload', handleWindowClose);
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, [enabled, showConfirm]);
    return {
        url,
        bypassExitConfirmation(value = true) {
            confirmed.current = value;
        }
    };
}
