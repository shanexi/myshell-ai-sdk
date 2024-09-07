"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScamAlertModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const next_intl_1 = require("next-intl");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const BadgeInfo_1 = __importDefault(require("../BadgeInfo.js"));
function ScamAlertModal({ isOpen, curves, onClose }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, { open: isOpen, onClose: onClose, size: "sm", modalOnly: false, children: [(0, jsx_runtime_1.jsx)(modal_1.ModalHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full flex items-center justify-center bg-surface-accent-yellow-subtler flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "w-6 h-6 stroke-icon-warning" }) }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-default font-ppt", children: t('scam_alert_modal_title') })] }) }), (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: "flex flex-col max-h-[500px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full flex flex-col justify-center space-y-2 px-4 flex-shrink-0 flex-grow-0", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col text-default space-y-2", children: (0, jsx_runtime_1.jsx)("p", { className: "text-subtle text-sm", children: t('scam_alert_modal_desc') }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-auto", children: (0, jsx_runtime_1.jsx)("ul", { children: curves?.map((curve) => {
                                return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(BadgeInfo_1.default, { avatar: curve?.botSummary?.logoUrl, botName: curve?.botSummary?.name, badgeName: curve?.symbol, author: curve?.creator?.name || curve?.botSummary?.author?.name }) }, curve.id));
                            }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full border-t border-default py-4 text-center flex-shrink-0 flex-grow-0", children: t.rich('own_keys', {
                            count: curves?.reduce((sum, curve) => sum + curve?.holdInfo.holdCount, 0),
                            highlight: text => (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "brand", children: text })
                        }) })] })] }));
}
