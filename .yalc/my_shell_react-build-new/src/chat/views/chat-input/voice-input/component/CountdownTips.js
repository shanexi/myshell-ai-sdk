"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
function CountdownTips() {
    const toast = (0, react_1.useToast)();
    const timerRef = (0, react_2.useRef)(null);
    const toastIdRef = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(() => {
        let time = 10;
        function addToast() {
            toastIdRef.current = toast({
                position: 'top',
                title: 'Warning!',
                description: `Stop recording after ${time} s`,
                status: 'warning',
                duration: 10000,
                isClosable: true
            });
        }
        addToast();
        timerRef.current = setInterval(() => {
            if (time >= 0) {
                if (toastIdRef.current) {
                    time--;
                    toast.update(toastIdRef.current, {
                        position: 'top',
                        title: 'Warning!',
                        description: `Stop recording after ${time} s`,
                        status: 'warning',
                        duration: 10000,
                        isClosable: true
                    });
                }
            }
        }, 1000);
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
}
exports.default = CountdownTips;
