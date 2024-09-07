"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useTimer = () => {
    let time = 0;
    const [timeFormatted, setTimeFormatted] = (0, react_1.useState)('00:00');
    const timer = (0, react_1.useRef)(null);
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    const startClock = () => {
        time = 0;
        setTimeFormatted(formatTime(0));
        timer.current = setInterval(() => {
            time = time + 1;
            setTimeFormatted(formatTime(time));
        }, 1000);
    };
    const stopClock = () => {
        time = 0;
        setTimeFormatted(formatTime(0));
        if (timer.current) {
            clearInterval(timer.current);
        }
    };
    return {
        timeFormatted,
        startClock,
        stopClock
    };
};
exports.default = useTimer;
