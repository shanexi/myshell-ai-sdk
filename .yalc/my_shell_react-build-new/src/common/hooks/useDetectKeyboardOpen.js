"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDetectKeyboardOpen = void 0;
const react_1 = require("react");
const useDetectKeyboardOpen = ({ minKeyboardHeight = 300, defaultValue = false, callback }) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = (0, react_1.useState)(defaultValue);
    const cbRef = (0, react_1.useRef)(callback);
    const isKeyboardOpenRef = (0, react_1.useRef)(isKeyboardOpen);
    (0, react_1.useEffect)(() => {
        cbRef.current = callback;
    }, [callback]);
    (0, react_1.useEffect)(() => {
        const listener = () => {
            const visualHeight = window.visualViewport.height;
            const screenHeight = window.screen.height;
            const newState = screenHeight - minKeyboardHeight > visualHeight;
            if (isKeyboardOpenRef.current !== newState) {
                setIsKeyboardOpen(newState);
                isKeyboardOpenRef.current = newState;
                if (cbRef.current) {
                    cbRef.current(newState, screenHeight, visualHeight);
                }
            }
        };
        if (typeof visualViewport !== 'undefined') {
            window.visualViewport.addEventListener('resize', listener);
        }
        return () => {
            if (typeof visualViewport !== 'undefined') {
                window.visualViewport.removeEventListener('resize', listener);
            }
        };
    }, []);
    return isKeyboardOpen;
};
exports.useDetectKeyboardOpen = useDetectKeyboardOpen;
