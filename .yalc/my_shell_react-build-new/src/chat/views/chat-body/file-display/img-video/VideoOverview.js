import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import clsx from 'clsx';
import { useRef, useState, memo } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import Spinner from '../../../../../common/components/ui/spinner.js';
function VideoOverview({ url, onViewVideo, customClass, showPlayBtn = true, showRadius = true, showLoading = true }) {
    const videoRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const handleLoaded = () => {
        setLoaded(true);
    };
    useEffectOnce(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadedmetadata', handleLoaded, {
                once: true
            });
        }
    });
    return (_jsxs("div", { className: clsx('relative w-full h-full', customClass, showRadius ? 'rounded-md overflow-hidden' : ''), children: [!loaded && showLoading && (_jsx("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-[1] bg-[#00000033] backdrop-blur-2xl", children: _jsx("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: _jsx(Spinner, { size: "md", speed: "slow", className: "text-white" }) }) })), _jsxs("div", { className: "relative w-full h-full min-h-[240px]", children: [_jsx("video", { ref: videoRef, src: url, muted: true, playsInline: true, disablePictureInPicture: true, className: "w-full h-full object-cover", preload: "metadata" }), showPlayBtn && (_jsx("div", { className: "w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#00000033]", children: _jsx(PlayIcon, { className: "w-10 h-10 text-white cursor-pointer", onClick: () => onViewVideo && onViewVideo() }) }))] })] }));
}
const MemorizedVideoOverview = memo(VideoOverview);
export default MemorizedVideoOverview;
