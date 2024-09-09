import { useEffect, useRef, useState } from 'react';
export const useDetectKeyboardOpen = ({ minKeyboardHeight = 300, defaultValue = false, callback }) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue);
    const cbRef = useRef(callback);
    const isKeyboardOpenRef = useRef(isKeyboardOpen);
    useEffect(() => {
        cbRef.current = callback;
    }, [callback]);
    useEffect(() => {
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
