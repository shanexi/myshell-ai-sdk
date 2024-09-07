"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RewardsPopoverWrap;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../common/components/ui/button.js");
const utils_1 = require("../../../lib/utils.js");
function RewardsPopoverWrap({ onCheck, children, onClose, isOpen, isMob }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.reward_popup');
    return ((0, jsx_runtime_1.jsxs)(react_1.Popover, { isOpen: isOpen, placement: `${isMob ? 'top' : 'right'}`, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: children }), (0, jsx_runtime_1.jsx)("div", { className: "text-left", children: (0, jsx_runtime_1.jsxs)(react_1.PopoverContent, { className: "w-[274px] mx-4 !outline-offset-0 !outline-0 bg-surface-default border-opaque !shadow-modal-bolder", tabIndex: -1, onClick: e => {
                        e.stopPropagation();
                        e.preventDefault();
                    }, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverArrow, { className: (0, utils_1.cn)('!outline-offset-0 !border-opaque !bg-surface-default dark:shadow', isMob ? 'arrow' : 'arrow-left') }), (0, jsx_runtime_1.jsxs)(react_1.PopoverBody, { className: "text-subtle text-sm p-3", children: [(0, jsx_runtime_1.jsx)("div", { children: "\uD83C\uDF81" }), t('content')] }), (0, jsx_runtime_1.jsxs)(react_1.PopoverFooter, { className: "!pt-0 pb-2 flex justify-end items-center border-0 space-x-3", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", noStyle: true, onClick: onClose, className: "text-sm text-subtler border-0", children: t('later') }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: onCheck, size: "sm", className: "font-medium text-sm text-static", children: t('check_now') })] })] }) })] }));
}
