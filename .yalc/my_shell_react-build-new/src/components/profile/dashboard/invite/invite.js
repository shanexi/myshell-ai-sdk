"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const store_1 = require("../../../../services/store/index.js");
const InviteBox_1 = __importDefault(require("./InviteBox.js"));
const RewardsInviteCard_1 = __importDefault(require("./RewardsInviteCard.js"));
function InviteArea() {
    const invitationCount = (0, store_1.useUserStore)(state => state.invitationCount);
    const validInvitationCount = (0, store_1.useUserStore)(state => state.validInvitationCount);
    const inviteLink = (0, store_1.useUserStore)(state => state.inviteLink);
    const t = (0, next_intl_1.useTranslations)('profile');
    const rewardT = (0, next_intl_1.useTranslations)('reward_center');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 w-full h-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-default text-sm", children: t('dashboard_items.invite_to_earn') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[12px] rounded-xl flex-col items-center h-auto md:h-[306px] overflow-auto shadow-background-default border border-default bg-surface-default", style: {
                    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10)'
                }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-col gap-3 p-3 pb-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full pt-6 pb-3 px-3 flex-col rounded-2xl overflow-hidden bg-surface-container-selected-default", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center", children: [(0, jsx_runtime_1.jsx)(RewardsInviteCard_1.default, { title: rewardT('invitations'), answer: rewardT('invitations_hover'), count: invitationCount || 0 }), (0, jsx_runtime_1.jsx)("div", { className: "border-r border-default w-[1px] h-[76px]" }), (0, jsx_runtime_1.jsx)(RewardsInviteCard_1.default, { title: rewardT('valid_invitations'), answer: rewardT('valid_invitations_hover'), count: validInvitationCount || 0 })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-subtlest text-sm text-center mt-3 md:px-[10%]", children: t('dashboard_items.share_tip') })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-3 mb-3 w-full", children: (0, jsx_runtime_1.jsx)(InviteBox_1.default, { title: t('invite_link'), text: inviteLink }) })] })] }));
}
exports.default = InviteArea;
