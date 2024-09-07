"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowRightIcon"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const enums_1 = require("../../../../chat/model/enums.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const LoadingIcon_1 = __importDefault(require("../../icons/LoadingIcon.js"));
function LuiButtonDisplay({ content, style, disabled, loading = false, onClick, energy: restEnergy }) {
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { warning } = (0, useNotification_1.useNotification)();
    const isDark = resolvedTheme === 'dark';
    const energy = Number(content.iconLabel?.replace('+', '') || 0);
    const handleClick = () => {
        if (!onClick) {
            return;
        }
        onClick();
    };
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled || loading, className: "min-w-9 shadow-button_shadow rounded-3xl px-4 py-2 flex space-x-1.5 justify-center items-center disabled:cursor-not-allowed disabled:opacity-70", style: {
            background: isDark ? style.darkModeBackgroundColorHex : style.backgroundColorHex,
            color: isDark ? style.darkModeFontColorHex : style.fontColorHex,
            borderWidth: style.borderColorHex ? '1px' : 'none',
            borderStyle: 'solid',
            borderColor: isDark ? style.darkModeBorderColorHex : style.borderColorHex
        }, onClick: handleClick, children: loading ? ((0, jsx_runtime_1.jsx)(LoadingIcon_1.default, {})) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [content.direction && content.direction === enums_1.MessageComponentsButtonContentDirectionEnum.LEFT && ((0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-5 h-5 shrink-0" })), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-left", children: content.text }), content.iconUrl && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 border-r-[0.5px] shrink-0 pl-0.5", style: {
                                borderColor: isDark ? style.darkModeIconLineColorHex : style.iconLineColorHex
                            } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-0.5 items-center shrink-0 text-xs font-medium", children: [(0, jsx_runtime_1.jsx)(image_1.default, { alt: "button icon", src: content.iconUrl, width: 16, height: 16, className: "w-4 h-4 rounded-[4px]" }), (0, jsx_runtime_1.jsx)("span", { className: "tracking-widest", children: content.iconLabel ?? '' })] })] })), content.direction && content.direction === enums_1.MessageComponentsButtonContentDirectionEnum.RIGHT && ((0, jsx_runtime_1.jsx)(ArrowRightIcon_1.default, { className: "w-5 h-5 shrink-0" }))] })) }));
}
function Display(props) {
    const { content } = props;
    return content.description ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { showArrow: false, description: content.description, children: (0, jsx_runtime_1.jsx)(LuiButtonDisplay, { ...props }) })) : ((0, jsx_runtime_1.jsx)(LuiButtonDisplay, { ...props }));
}
exports.default = Display;
