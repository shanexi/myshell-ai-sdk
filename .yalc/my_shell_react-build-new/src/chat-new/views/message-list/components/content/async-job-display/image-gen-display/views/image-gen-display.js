import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import DefaultDisplay from '../../../default-display.js';
export default function ImageGenDisplay({ message, showText = true, showAudio = false }) {
    return (_jsxs(_Fragment, { children: [_jsx(DefaultDisplay, { message: message, showText: showText, showAudio: showAudio }), ";"] }));
}
