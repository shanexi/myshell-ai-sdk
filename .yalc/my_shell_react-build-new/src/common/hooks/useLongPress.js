"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useLongPress(callback, duration = 1000, startCb) {
    const loop = (0, react_1.useRef)(null);
    const handleTouchStart = (e) => {
        startCb && startCb(e);
        loop.current = setTimeout(() => callback(e), duration);
    };
    const handleTouchEnd = (e) => {
        if (loop.current)
            clearTimeout(loop.current);
    };
    const handleTouchCancel = (e) => {
        if (loop.current)
            clearTimeout(loop.current);
    };
    (0, react_1.useEffect)(() => {
        return () => {
            if (loop.current)
                clearTimeout(loop.current);
        };
    }, []);
    return {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onTouchCancel: handleTouchCancel
    };
}
exports.default = useLongPress;
