import { jsx as _jsx } from "react/jsx-runtime";
export default function InlineVideoPlayer({ src }) {
    return (_jsx("video", { src: src, loop: true, autoPlay: true, muted: true, playsInline: true, disablePictureInPicture: true, className: "w-full h-full block object-cover" }));
}
