import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useToast } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
function CountdownTips() {
    const toast = useToast();
    const timerRef = useRef(null);
    const toastIdRef = useRef(null);
    useEffect(() => {
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
    return _jsx(_Fragment, {});
}
export default CountdownTips;
