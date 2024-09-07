"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GoBackIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const navigation_1 = require("next/navigation");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
function GoBackIcon() {
    const router = (0, navigation_1.useRouter)();
    const goBack = () => {
        router.back();
    };
    return (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", variant: "ghost", className: "rounded-none", icon: ArrowLeftIcon_1.default, onClick: goBack });
}
