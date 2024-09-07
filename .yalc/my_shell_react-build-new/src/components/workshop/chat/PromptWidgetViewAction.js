"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PromptWidgetViewAction;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const framer_motion_1 = require("framer-motion");
const next_intl_1 = require("next-intl");
const usePromptWidgetAction_1 = __importDefault(require("../../../hooks/workshop/chat/usePromptWidgetAction.js"));
function PromptWidgetViewAction({ widgetInfo }) {
    const { acting, promptAction } = (0, usePromptWidgetAction_1.default)(widgetInfo);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const handleView = () => {
        promptAction({
            type: 'view'
        });
    };
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { mode: "wait", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { y: 36, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -36, opacity: 0 }, transition: { duration: 0.3 }, children: (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "w-full border border-default shadow-button-basic px-4 py-2 h-9 rounded-full bg-surface text-on-surface text-sm flex space-x-[6px]", isLoading: acting, onClick: handleView, children: (0, jsx_runtime_1.jsx)("span", { children: t('view_prompt') }) }) }, widgetInfo.hasUnlocked ? 'view' : null) }));
}
