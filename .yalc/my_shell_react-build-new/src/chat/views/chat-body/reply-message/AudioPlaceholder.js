"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const button_1 = require("../../../../common/components/ui/button.js");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const separator_1 = require("../../../../common/components/ui/separator.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
function AudioPlaceholder({ blobDuration, loading, onRegenerate, showProgressBar, showEnergyCost = true, energyCost = 1 }) {
    const UIDuration = !blobDuration
        ? (0, common_helper_1.durationFormatter)(0)
        : blobDuration < 1
            ? (0, common_helper_1.durationFormatter)(1)
            : (0, common_helper_1.durationFormatter)(blobDuration);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('audio-player pb-3 leading-7 flex flex-col justify-start items-start', {
            'w-full': showProgressBar,
            'w-[120px]': !showProgressBar
        }), children: [showProgressBar && (0, jsx_runtime_1.jsx)("div", { className: "h-[1px] w-full" }), (0, jsx_runtime_1.jsx)("div", { className: "w-full mt-2 pl-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-start space-x-2 text-xs", children: [showEnergyCost ? ((0, jsx_runtime_1.jsx)(button_1.Button, { className: "bg-primary hover:bg-primary active:bg-primary", size: "sm", "aria-label": "regenerate tts", onClick: onRegenerate, loading: loading, children: (0, jsx_runtime_1.jsxs)("span", { className: "space-x-1.5 inline-flex justify-center items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-4 h-4 rounded-full bg-white inline-flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "fill-primary w-3 h-3" }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { orientation: "vertical", className: "h-2 w-[0.5px]" }), (0, jsx_runtime_1.jsx)("img", { src: "/icons/thunder.svg", alt: "thunder", className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-white", children: energyCost })] }) })) : ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "bg-primary hover:bg-primary active:bg-primary w-5 h-5", size: "sm", "aria-label": "regenerate tts", onClick: onRegenerate, loading: loading, children: (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "ml-[2px] w-4 h-4" }) })), (0, jsx_runtime_1.jsx)("span", { className: "w-10 text-secondary text-sm", children: UIDuration })] }) })] }));
}
exports.default = AudioPlaceholder;
