"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetCopyBtn = WidgetCopyBtn;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const EllipsisHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/EllipsisHorizontalIcon"));
const clsx_1 = __importDefault(require("clsx"));
const lucide_react_1 = require("lucide-react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_use_1 = require("react-use");
const workshop_1 = require("../../../../../apis/workshop.js");
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const useCopyClipboard_1 = __importDefault(require("../../../../../common/hooks/useCopyClipboard.js"));
const useNotification_1 = require("../../../../../common/hooks/useNotification.js");
function WidgetCopyBtn({ widgetId }) {
    const isMiddle = (0, react_use_1.useMedia)('(min-width: 768px)');
    const { error } = (0, useNotification_1.useNotification)();
    const { onCopy } = (0, useCopyClipboard_1.default)('');
    const [loading, setLoading] = (0, react_2.useState)(false);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const r = (0, next_intl_1.useTranslations)('request');
    const handleCopyId = () => {
        onCopy(widgetId);
    };
    const handleCopyProConfig = async () => {
        setLoading(true);
        const { template, reason } = (await (0, workshop_1.getWidgetProConfig)(widgetId)) || {};
        setLoading(false);
        if (template) {
            onCopy(template);
        }
        else if (reason !== 'request-400') {
            error({ content: r('error.network') });
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.Popover, { trigger: "hover", offset: [0, 10], placement: isMiddle ? 'left' : 'bottom-end', isLazy: true, closeOnBlur: true, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: EllipsisHorizontalIcon_1.default, size: isMiddle ? 'md' : 'sm', variant: "ghost", className: "text-brand" }) }), (0, jsx_runtime_1.jsxs)(react_1.PopoverContent, { outline: "none", className: (0, clsx_1.default)('bg-surface-default rounded-xl p-2 border-none dark:border dark:border-default dark:border-solid focus-visible:shadow-none shadow-modal-default w-full'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "max-w-[280px] rounded-lg px-3 py-1 space-x-2 cursor-pointer hover:bg-surface-container flex justify-start items-center", onClick: handleCopyId, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { className: "w-[20px] h-[20px] mr-1.5 mt-0.5" }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: t('copy_widget_id') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-[280px] rounded-lg px-3 py-1 space-x-2 cursor-pointer hover:bg-surface-container flex justify-start items-center", onClick: handleCopyProConfig, children: [!loading ? ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "w-[20px] h-[20px] mr-1.5 mt-0.5", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" }) })) : ((0, jsx_runtime_1.jsx)(react_1.Spinner, { color: "var(--primary)", emptyColor: "#E3E3E3", className: "mr-1.5 mt-0.5", width: "20px", height: "20px" })), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: t('copy_widget_pro_config') })] })] })] }));
}
