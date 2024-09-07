"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const react_use_1 = require("react-use");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
function CustomTooltip({ children, content, customClassNames, spanClassNames, position, offset, hasArrow, closeDelay = 0, isDisabled = false, containerClassNames, withSpan = true, bg }) {
    const [isOpen, setIsOpen] = (0, react_2.useState)(false);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const tooltipRef = (0, react_2.useRef)();
    (0, react_use_1.useClickAway)(tooltipRef, () => {
        onClose();
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isMobile ? ((0, jsx_runtime_1.jsx)(react_1.Box, { ref: tooltipRef, onClick: e => {
                if (isDisabled)
                    return;
                e.stopPropagation();
                isOpen ? onClose() : onOpen();
            }, className: containerClassNames, children: (0, jsx_runtime_1.jsx)(react_1.Tooltip, { border: "1px solid var(--border)", bg: bg ?? 'var(--surface)', color: "var(--on-surface)", lineHeight: "22px", padding: "12px", placement: position || 'top', rounded: "12px", label: content, isOpen: isOpen, hasArrow: hasArrow, closeDelay: closeDelay, isDisabled: isDisabled, className: customClassNames, offset: offset || [0, 0], children: withSpan ? (0, jsx_runtime_1.jsx)("span", { className: spanClassNames, children: children }) : children }) })) : ((0, jsx_runtime_1.jsx)(react_1.Tooltip, { border: "1px solid var(--border)", bg: bg ?? 'var(--surface)', color: "var(--on-surface)", lineHeight: "22px", padding: "12px", placement: position || 'top', rounded: "12px", label: content, offset: offset || [0, 8], hasArrow: hasArrow, arrowShadowColor: "var(--border)", closeDelay: closeDelay, isDisabled: isDisabled, className: customClassNames, children: withSpan ? (0, jsx_runtime_1.jsx)("span", { className: spanClassNames, children: children }) : children })) }));
}
exports.default = CustomTooltip;
