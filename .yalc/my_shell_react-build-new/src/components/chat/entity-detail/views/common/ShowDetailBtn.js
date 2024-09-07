"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShowDetailBtn;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronDoubleDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDoubleDownIcon"));
const ChevronDoubleUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDoubleUpIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const context_1 = __importDefault(require("../../../../../chat/layouts/context.js"));
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const tooltip_1 = require("../../../../../common/components/ui/tooltip.js");
function ShowDetailBtn() {
    const t = (0, next_intl_1.useTranslations)('chat');
    const isMiddle = (0, react_use_1.useMedia)('(min-width: 768px)');
    const [value, setValue] = (0, react_use_1.useLocalStorage)('showDetailBtnVisited');
    const { isSticky = false, manuallyScrollDetailToTop, scrollLayoutToTop } = (0, react_1.useContext)(context_1.default);
    const onClicked = (0, react_1.useCallback)(() => {
        if (!value) {
            setValue(1);
        }
    }, [setValue, value]);
    const handleClick = (0, react_1.useCallback)(() => {
        onClicked();
        if (!isSticky) {
            manuallyScrollDetailToTop?.();
        }
        else {
            scrollLayoutToTop?.();
        }
    }, [isSticky, manuallyScrollDetailToTop, onClicked, scrollLayoutToTop]);
    if (!isMiddle)
        return null;
    if (isSticky)
        return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", className: "text-brand", icon: ChevronDoubleDownIcon_1.default, onClick: handleClick }));
    if (!value) {
        return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { open: true, variant: "message", showArrow: false, description: t('view_more_detail'), children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", className: "text-brand", icon: ChevronDoubleUpIcon_1.default, onClick: handleClick }) }));
    }
    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { variant: "message", contentClassName: "w-fit", showArrow: false, description: t('view_more_detail'), children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", className: "text-brand", icon: ChevronDoubleUpIcon_1.default, onClick: handleClick }) }));
}
