"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckCircleIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const agentPump_1 = require("../../../../../apis/agentPump.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const input_1 = require("../../../../../common/components/ui/input.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const useNotification_1 = require("../../../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../../../common/hooks/usePathLocale.js");
const maxTextLength = 300;
function CommentModal({ curveId, isOpen, onClose, tickerName, needReloadCurrentPage }) {
    const router = (0, navigation_1.useRouter)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const [text, setText] = (0, react_1.useState)('');
    const [creating, setCreating] = (0, react_1.useState)(false);
    const t = (0, next_intl_1.useTranslations)('reward_center.comment_modal');
    const { error: errorNotification } = (0, useNotification_1.useNotification)();
    const handleCommentSuccessJump = (0, react_1.useCallback)(() => {
        if (needReloadCurrentPage) {
            window.location.reload();
        }
        else {
            router.push(isMobile
                ? `/m/rewards-center/rewards-aipp-store/${tickerName}`
                : `/rewards-center/rewards-aipp-store/${tickerName}`);
        }
    }, [isMobile, tickerName, router, needReloadCurrentPage]);
    const handleSendComment = (0, react_1.useCallback)(async () => {
        if (!text.trim()) {
            onClose();
            return;
        }
        if (creating || text.length > maxTextLength) {
            return;
        }
        try {
            setCreating(true);
            const res = await (0, agentPump_1.createCurveComment)({
                curveId,
                content: text
            });
            if (res.success) {
                setText('');
                handleCommentSuccessJump();
            }
            else {
                errorNotification({
                    content: t('comment_fail')
                });
            }
        }
        catch (error) {
            errorNotification({
                content: t('comment_fail')
            });
        }
        finally {
            setCreating(false);
            onClose();
        }
    }, [creating, curveId, text, errorNotification, handleCommentSuccessJump, t]);
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: onClose, size: "sm", modalOnly: true, children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col justify-center p-5", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 flex-grow-0 bg-surface-accent-green-subtler", children: (0, jsx_runtime_1.jsx)(CheckCircleIcon_1.default, { className: "text-icon-success w-6 h-6" }) }), (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", className: "mt-3", children: t('trade_success') }), (0, jsx_runtime_1.jsx)("div", { className: "rounded-md mt-3 mb-5", children: (0, jsx_runtime_1.jsx)(input_1.Input, { onChange: e => setText(e.target.value), placeholder: t('add_comment_placeholder') }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { isBlock: true, onClick: () => {
                        handleSendComment();
                    }, loading: creating, children: t('confirm') })] }) }));
}
CommentModal.defaultProps = {
    needReloadCurrentPage: false
};
