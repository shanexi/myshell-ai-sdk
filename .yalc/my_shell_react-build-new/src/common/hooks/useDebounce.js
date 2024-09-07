"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useDebounce(callback, delay) {
    const [timeoutId, setTimeoutId] = (0, react_1.useState)();
    const debouncedCallback = (0, react_1.useCallback)((...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setTimeoutId(setTimeout(() => callback(...args), delay));
    }, [callback, delay, timeoutId]);
    (0, react_1.useEffect)(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
    return debouncedCallback;
}
exports.default = useDebounce;
