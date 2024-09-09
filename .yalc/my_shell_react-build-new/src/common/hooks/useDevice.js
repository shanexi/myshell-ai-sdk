import isMobile from 'ismobilejs';
import { useState, useEffect } from 'react';
import { useWindowWidth } from '../../common/hooks/useWindowWidth.js';
export const useDevice = () => {
    const [device, setDevice] = useState(isMobile());
    const [isWeixin, setIsWeixin] = useState(false);
    useEffect(() => {
        const device = isMobile();
        setDevice(device);
        setIsWeixin(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1);
    }, []);
    return {
        isMobile: device.phone || device.tablet,
        isIos: device.apple.phone || device.apple.tablet || device.apple.ipod,
        isWeixin
    };
};
export const useIsMobileByWindowWidth = () => {
    return useWindowWidth() <= 768;
};
