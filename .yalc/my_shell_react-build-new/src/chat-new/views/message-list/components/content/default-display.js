import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import AudioDisplay from './audio-display/audio-display.js';
import TextDisplay from './text-display/text-display.js';
const DefaultDisplay = ({ message, showText = true, showAudio = false }) => {
    return (_jsxs(_Fragment, { children: [showText && _jsx(TextDisplay, {}), _jsx(AudioDisplay, { message: message, showAudio: showAudio })] }));
};
export default DefaultDisplay;
