import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import Hammer from 'hammerjs';
import { useEffect, useRef, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import Spinner from '../../../../../../../common/components/ui/spinner.js';
export default function PinchZoomImage({ imgObj, onPinchStart, onPinchEnd }) {
    const containerRef = useRef(null);
    const [scaleValue, setScaleValue] = useState(1);
    const prevScale = useRef(1);
    const imageRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const handleLoaded = () => {
        setLoaded(true);
    };
    useEffectOnce(() => {
        const image = imageRef.current;
        if (image) {
            image.addEventListener('load', handleLoaded, {
                once: true
            });
        }
    });
    useEffect(() => {
        if (containerRef.current) {
            const hammer = new Hammer(containerRef.current);
            hammer.get('pinch').set({ enable: true });
            hammer.on('pinchstart', () => {
                onPinchStart();
            });
            hammer.on('pinch', e => {
                e.srcEvent.stopPropagation();
                const newScale = Math.min(3, Math.max(0.5, prevScale.current * e.scale));
                setScaleValue(newScale);
            });
            hammer.on('pinchend', e => {
                onPinchEnd();
                prevScale.current *= e.scale;
            });
            return () => {
                hammer.destroy();
            };
        }
    }, []);
    return (_jsxs("div", { style: {
            scale: scaleValue
        }, ref: containerRef, className: "w-full h-full relative flex justify-center items-center", children: [!loaded && (_jsx("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-[#00000033] backdrop-blur-2xl", children: _jsx("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: _jsx(Spinner, { size: "md", speed: "slow", className: "text-white" }) }) })), _jsx("img", { ref: imageRef, alt: "image", src: imgObj.url, width: imgObj.mediaFileMetadata?.width || 9999, height: imgObj.mediaFileMetadata?.height || 9999, className: clsx('h-auto max-w-full max-h-full object-scale-down touch-none z-20', imgObj.mediaFileMetadata?.width ? `w-[${imgObj.mediaFileMetadata.width}px]` : 'w-auto', imgObj.mediaFileMetadata?.height ? `h-[${imgObj.mediaFileMetadata.height}px]` : 'h-auto') })] }));
}
