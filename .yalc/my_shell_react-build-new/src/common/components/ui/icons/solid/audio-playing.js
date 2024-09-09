import { jsx as _jsx } from "react/jsx-runtime";
import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
export default function AudioPlaying(props) {
    const playingRef = useRef(null);
    useEffect(() => {
        const lRef = playingRef.current;
        let animation;
        if (lRef) {
            animation = Lottie.loadAnimation({
                container: playingRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('@/common/assets/audio-playing.json')
            });
        }
        return () => animation.destroy();
    }, []);
    return _jsx("div", { ref: playingRef, className: "w-[12px]" });
}
