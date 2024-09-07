"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowRightIcon"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
function QuestionItem({ question, handlePickQuestion, hasEnoughEnergy, isMobile = false, disableClick = false }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('py-2 px-4 max-h-[76px] h-full border border-[#E4E9F0] dark:border-[#42434A] rounded-xl text-[#414345] dark:text-[#B8BCCF] bg-white hover:bg-[#F6F6F7] dark:bg-[#1C1E26] dark:hover:bg-[#232533] text-sm flex space-x-[6px] items-center shadow-button-basic shrink-0', hasEnoughEnergy && !disableClick ? 'cursor-pointer' : 'cursor-not-allowed opacity-50', isMobile ? 'w-full' : ' w-[320px]'), onClick: () => {
            if (!hasEnoughEnergy || disableClick)
                return;
            handlePickQuestion(question);
        }, children: [(0, jsx_runtime_1.jsx)("div", { className: "grow line-clamp-3", children: question }), (0, jsx_runtime_1.jsx)(ArrowRightIcon_1.default, { className: "w-5 h-5 text-[#6D7175] dark-[#868996] shrink-0" })] }));
}
exports.default = (0, react_1.memo)(QuestionItem);
