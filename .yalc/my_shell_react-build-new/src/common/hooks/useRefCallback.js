"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefCallback = void 0;
const react_1 = require("react");
const useRefCallback = (callback) => {
    const fnRef = (0, react_1.useRef)(callback);
    (0, react_1.useEffect)(() => {
        fnRef.current = callback;
    }, [callback]);
    return (0, react_1.useCallback)(((...args) => {
        const fn = fnRef.current;
        fn && fn(...args);
    }), []);
};
exports.useRefCallback = useRefCallback;
