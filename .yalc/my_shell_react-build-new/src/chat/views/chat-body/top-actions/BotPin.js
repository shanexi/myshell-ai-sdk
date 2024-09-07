"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotPin;
const jsx_runtime_1 = require("react/jsx-runtime");
const StarIcon_1 = __importDefault(require("@heroicons/react/24/outline/StarIcon"));
const StarIcon_2 = __importDefault(require("@heroicons/react/24/solid/StarIcon"));
const clsx_1 = __importDefault(require("clsx"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const useChangeBotList_1 = __importDefault(require("../../../../hooks/bot/useChangeBotList.js"));
function BotPin({ botInfo }) {
    const { pinActing, setBotPinned } = (0, useChangeBotList_1.default)(botInfo);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('rounded-lg cursor-pointer text-on-surface flex justify-start items-center', pinActing && 'opacity-30 cursor-not-allowed justify-center'), onClick: () => {
            if (pinActing)
                return;
            setBotPinned(!(botInfo && botInfo.pinned));
        }, children: pinActing ? ((0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: botInfo?.pinned ? ((0, jsx_runtime_1.jsx)(StarIcon_2.default, { className: (0, clsx_1.default)('!text-[#FAAC00] w-6 h-6 text-primary') })) : ((0, jsx_runtime_1.jsx)(StarIcon_1.default, { className: "w-6 h-6 text-primary" })) })) }));
}
