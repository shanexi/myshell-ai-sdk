import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
function VideoPlayer({ src, triggerPlay }) {
    return (_jsx("div", { className: "w-full h-full flex justify-center items-center", children: _jsx("video", { src: src, className: "w-auto h-auto max-w-full max-h-full object-scale-down", disablePictureInPicture: true, controls: true, controlsList: "nodownload", autoPlay: triggerPlay }) }));
}
const MemorizedVideoPlayer = memo(VideoPlayer);
export default MemorizedVideoPlayer;
