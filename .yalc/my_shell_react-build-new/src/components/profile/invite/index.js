"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronLeftIcon"));
const FireIcon_1 = __importDefault(require("@heroicons/react/24/solid/FireIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const useBackToProfile_1 = __importDefault(require("../../../common/hooks/useBackToProfile.js"));
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const useGetInvitation_1 = __importDefault(require("../../../hooks/user/useGetInvitation.js"));
const store_1 = require("../../../services/store/index.js");
const CopyToClipboard_1 = __importDefault(require("./CopyToClipboard.js"));
function Invite() {
    const { backToProfile, isMobile } = (0, useBackToProfile_1.default)();
    const inviteCode = (0, store_1.useUserStore)(state => state.inviteCode);
    const validInvitationCount = (0, store_1.useUserStore)(state => state.validInvitationCount);
    const inviteLink = (0, store_1.useUserStore)(state => state.inviteLink);
    const t = (0, next_intl_1.useTranslations)('profile');
    const isKol = (0, common_helper_1.isClient)() && identityService_1.identityService.getIsKol();
    (0, useGetInvitation_1.default)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "invite-card flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('shrink-0 flex w-full text-on-surface bg-surface-default items-center h-[56px] md:h-[60px] border-0 border-b border-default border-solid z-10', {
                    'bg-[#fff]': !isMobile,
                    'justify-start': !isMobile,
                    'justify-center': isMobile,
                    'pl-5': !isMobile
                }), children: [(0, jsx_runtime_1.jsx)("div", { onClick: backToProfile, className: (0, clsx_1.default)('absolute left-4 text-lg cursor-pointer visible', {
                            invisible: !isMobile
                        }), children: (0, jsx_runtime_1.jsx)(ChevronLeftIcon_1.default, { className: "w-8 h-8 fill-on-surface" }) }), (0, jsx_runtime_1.jsx)("h2", { className: "text-lg md:text-xl font-semibold text-on-surface", children: t('invite') })] }), (0, jsx_runtime_1.jsx)("div", { className: "px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "mt-10 w-full xl:w-[640px] lg:w-[500px] flex flex-col justify-center items-center gap-y-6 px-5 pt-5 pb-12 rounded-xl border border-default", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-5 flex flex-col items-center gap-y-[10px] bg-surface-container rounded-xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-lg flex justify-start items-center gap-x-1.5 text-on-surface", children: t('valid_invite') }), isKol && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[#FDA500]", children: t('invite_tip_boost') }), (0, jsx_runtime_1.jsx)(FireIcon_1.default, { className: "w-[18px] h-[18px] fill-[#FF0F0F]" })] })), (0, jsx_runtime_1.jsx)("h1", { className: "font-ppt text-[72px] font-[800] leading-[120%] text-primary", children: validInvitationCount || 0 }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-secondary-container", children: t('invite_tip') })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full ", children: (0, jsx_runtime_1.jsx)(CopyToClipboard_1.default, { title: t('invite_link'), text: inviteLink }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full ", children: (0, jsx_runtime_1.jsx)(CopyToClipboard_1.default, { title: t('invite_code'), text: inviteCode }) })] }) })] }));
}
exports.default = Invite;
