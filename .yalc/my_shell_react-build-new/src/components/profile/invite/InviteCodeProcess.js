"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const rxjs_1 = require("rxjs");
const user_1 = require("../../../apis/user.js");
const Close_1 = __importDefault(require("../../../common/components/icons/Close.js"));
const InviteGift_1 = __importDefault(require("../../../common/components/icons/InviteGift.js"));
const button_1 = require("../../../common/components/ui/button.js");
const link_1 = __importDefault(require("../../../common/components/ui/link.js"));
const useGetProps_1 = __importDefault(require("../../../hooks/rewards-center/useGetProps.js"));
const store_1 = require("../../../services/store/index.js");
function InviteCodeProcess() {
    const toggleInvitecodeModal = (0, store_1.useGlobalStore)(state => state.toggleInvitecodeModal);
    const [inviteCodeStep, setInviteCodeStep] = [
        (0, store_1.useGlobalStore)(state => state.inviteCodeStep),
        (0, store_1.useGlobalStore)(state => state.setInviteCodeStep)
    ];
    const t = (0, next_intl_1.useTranslations)('profile.invite_process');
    const [inviteCode, setInviteCode] = (0, react_2.useState)('');
    const [checking, setChecking] = (0, react_2.useState)(false);
    const { queryProps } = (0, useGetProps_1.default)();
    const handleInviteCodeChange = (e) => {
        setInviteCode(e.target.value);
    };
    const handleCheck = async () => {
        if (inviteCode) {
            setChecking(true);
            try {
                await (0, rxjs_1.lastValueFrom)((0, user_1.kolUseInviteCode)(inviteCode));
                queryProps();
                setInviteCodeStep(4);
            }
            catch (error) {
                if (error.response.data.error === 'invalid_invite_code') {
                    setInviteCodeStep(3);
                }
                if (error.response.data.error === 'over_use_limit') {
                    setInviteCodeStep(5);
                }
            }
            finally {
                setChecking(false);
            }
        }
    };
    const handleClose = () => {
        toggleInvitecodeModal(false);
        setInviteCodeStep(1);
    };
    const goToInputInviteCode = () => {
        setInviteCodeStep(2);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex bg-surface-search-field border border-opaque rounded-xl w-full mx-4 md:mx-0 md:w-[343px] p-4 space-x-3 shadow-modal-default", children: [(0, jsx_runtime_1.jsx)(InviteGift_1.default, { className: "w-[60px] h-[60px] flex-shrink-0" }), inviteCodeStep !== 1 && ((0, jsx_runtime_1.jsx)(Close_1.default, { fontSize: "16px", className: "absolute top-2 right-2 cursor-pointer text-subtle rounded-full w-4.5 h-4.5", onClick: handleClose })), (0, jsx_runtime_1.jsxs)("div", { className: "flex-grow text-on-surface min-h-[60px]", children: [inviteCodeStep === 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-default text-sm", children: t('step1_title') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[12px]", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "border border-primary px-3 py-1 h-[28px] min-w-[69px] rounded-full text-brand text-sm", onClick: handleClose, children: t('no') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "px-3 py-1 h-[28px] min-w-[69px] rounded-full bg-primary text-static text-sm", onClick: goToInputInviteCode, children: t('yes') })] })] })), inviteCodeStep === 2 && ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-default text-sm", children: t('enter_invite_code') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3 items-end", children: [(0, jsx_runtime_1.jsx)(react_1.Input, { variant: "unstyled", value: inviteCode, onChange: handleInviteCodeChange, className: "border-b border-default text-on-surface rounded-none text-sm" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "shrink-0 border border-primary px-3 py-1 h-[28px] min-w-[69px] rounded-full text-brand text-sm flex justify-center items-center", onClick: handleCheck, loading: checking, children: t('confirm') })] })] })), inviteCodeStep === 3 && ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-default text-sm", children: t('enter_invite_code') }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex space-x-3 justify-between items-end", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-[#EC2F0D]", children: t('invalid_code') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "shrink-0 border border-primary px-3 py-1 h-[28px] min-w-[69px] rounded-full text-brand text-sm flex justify-center items-center", onClick: () => {
                                            setInviteCode('');
                                            setInviteCodeStep(2);
                                        }, children: t('retry') })] })] })), inviteCodeStep === 4 && ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col justify-evenly space-y-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-default text-sm", children: t('success_title') }), (0, jsx_runtime_1.jsxs)("p", { className: "text-subtle text-sm", children: [t('success_text_1'), (0, jsx_runtime_1.jsx)(link_1.default, { className: "text-brand underline cursor-pointer", href: "/rewards-center/my-rewards", children: t('my_prop') }), t('success_text_2')] })] })), inviteCodeStep === 5 && ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col justify-between space-y-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-default text-sm", children: t('fully_title') }), (0, jsx_runtime_1.jsxs)("p", { className: "text-subtle text-sm", children: [t('fully_text_1'), (0, jsx_runtime_1.jsx)(link_1.default, { className: "text-brand underline", href: "/rewards-center", children: t('rewards_center') }), t('fully_text_2')] })] }))] })] }));
}
exports.default = InviteCodeProcess;
