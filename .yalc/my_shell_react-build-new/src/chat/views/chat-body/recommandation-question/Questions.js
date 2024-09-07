"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Questions;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronLeftIcon"));
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const framer_motion_1 = require("framer-motion");
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const QuestionItem_1 = __importDefault(require("./QuestionItem.js"));
const container = {
    hidden: { opacity: 0, y: 100 },
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
        y: 100,
        transition: {
            duration: 0.1,
            ease: 'easeInOut'
        }
    }
};
const listContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1
        }
    }
};
function Questions({ questions, hasEnoughEnergy, handlePick, disableClick = false }) {
    const hoverRef = (0, react_1.useRef)(null);
    const isHover = (0, usehooks_ts_1.useHover)(hoverRef);
    const scrollRef = (0, react_1.useRef)(null);
    const [isAtLeft, setIsAtLeft] = (0, react_1.useState)(true);
    const [isAtRight, setIsAtRight] = (0, react_1.useState)(false);
    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            top: 0,
            left: -320,
            behavior: 'smooth'
        });
    };
    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            top: 0,
            left: 320,
            behavior: 'smooth'
        });
    };
    (0, react_1.useEffect)(() => {
        const ref = scrollRef.current;
        const handleScroll = () => {
            if (ref) {
                const { scrollLeft, clientWidth, scrollWidth } = ref;
                setIsAtLeft(scrollLeft === 0);
                setIsAtRight(Math.ceil(scrollLeft + clientWidth) === scrollWidth);
            }
        };
        if (ref) {
            ref.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (ref) {
                ref.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { ref: hoverRef, className: "w-full overflow-hidden relative py-2 px-6", variants: container, initial: "hidden", animate: "visible", exit: "exit", children: [!isAtLeft && ((0, jsx_runtime_1.jsx)("div", { className: "w-20 absolute left-0 top-2 bg-gradient-to-l from-[#FFFFFF73] dark:from-[#17181C00] to-[#FFFFFF] dark:to-[#17181C] z-10", style: {
                    height: 'calc(100% - 16px)'
                } })), isHover && !isAtLeft && ((0, jsx_runtime_1.jsx)("div", { className: "h-full flex items-center absolute left-3 top-0 z-20", children: (0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 flex justify-center items-center rounded-full border border-[#E4E9F0] dark:border-[#42434A] shadow-[0_0_2px_0_#0000001A] bg-white dark:bg-[#22242E] cursor-pointer", onClick: scrollLeft, children: (0, jsx_runtime_1.jsx)(ChevronLeftIcon_1.default, { className: "w-[14px] h-[14px] text-on-surface" }) }) })), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.ul, { ref: scrollRef, className: "flex h-full space-x-3 w-full overflow-y-hidden overflow-x-auto no-scrollbar", variants: listContainer, initial: "hidden", animate: "visible", children: questions.map(r => ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.li, { children: (0, jsx_runtime_1.jsx)(QuestionItem_1.default, { question: r, handlePickQuestion: handlePick, hasEnoughEnergy: hasEnoughEnergy, disableClick: disableClick }) }, r))) }, "questions-container"), !isAtRight && ((0, jsx_runtime_1.jsx)("div", { className: "w-20 absolute right-0 top-2 bg-gradient-to-r from-[#FFFFFF73] dark:from-[#17181C00] to-[#FFFFFF] dark:to-[#17181C] z-10", style: {
                    height: 'calc(100% - 16px)'
                } })), isHover && !isAtRight && ((0, jsx_runtime_1.jsx)("div", { className: "h-full flex items-center absolute right-3 top-0 z-20", children: (0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 flex justify-center items-center rounded-full border border-[#E4E9F0] dark:border-[#42434A] shadow-[0_0_2px_0_#0000001A] bg-white dark:bg-[#22242E] cursor-pointer", onClick: scrollRight, children: (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "w-[14px] h-[14px] text-on-surface" }) }) }))] }, "questions-wrapper"));
}
