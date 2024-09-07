"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const voicecall_1 = require("../../apis/voicecall.js");
const useLatency = () => {
    const [latency, setLatency] = (0, react_1.useState)(-1);
    const timer = (0, react_1.useRef)(null);
    const startPing = () => {
        timer.current = setInterval(() => {
            const startTime = Date.now();
            (0, voicecall_1.voiceCallPing)().subscribe({
                next: () => {
                    const latency = Date.now() - startTime;
                    setLatency(latency);
                }
            });
        }, 1000);
    };
    const stopPing = () => {
        if (timer.current) {
            clearInterval(timer.current);
        }
    };
    return {
        latency,
        startPing,
        stopPing
    };
};
exports.default = useLatency;
