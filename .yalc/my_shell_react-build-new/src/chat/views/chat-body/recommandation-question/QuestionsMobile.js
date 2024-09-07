"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionsMobile;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const framer_motion_1 = require("framer-motion");
const react_1 = require("swiper/react");
const QuestionItem_1 = __importDefault(require("./QuestionItem.js"));
require("swiper/css");
const container = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: 50,
        transition: {
            duration: 0.2,
            ease: 'easeInOut'
        }
    }
};
function QuestionsMobile({ questions, hasEnoughEnergy, handlePick, disableClick = false }) {
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: (0, clsx_1.default)('w-full overflow-hidden relative pt-1'), variants: container, initial: "hidden", animate: "visible", exit: "exit", children: (0, jsx_runtime_1.jsx)(react_1.Swiper, { spaceBetween: 8, freeMode: true, touchRatio: 1, slidesPerView: "auto", centeredSlides: true, className: "flex h-full w-full", children: questions.map(r => ((0, jsx_runtime_1.jsx)(react_1.SwiperSlide, { style: {
                    width: 'calc(100% - 32px)',
                    flexShrink: 0
                }, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "h-full", children: (0, jsx_runtime_1.jsx)(QuestionItem_1.default, { question: r, handlePickQuestion: handlePick, hasEnoughEnergy: hasEnoughEnergy, isMobile: true, disableClick: disableClick }) }) }, r))) }) }));
}
