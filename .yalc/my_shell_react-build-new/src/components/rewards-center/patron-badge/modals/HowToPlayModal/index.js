"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HowToPlayModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const button_1 = require("../../../../../common/components/ui/button.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const user_1 = require("../../../../../common/constants/enums/user.js");
const useNotification_1 = require("../../../../../common/hooks/useNotification.js");
const identityService_1 = require("../../../../../common/services/identityService.js");
const utils_1 = require("../../../../../lib/utils.js");
const store_1 = require("../../../../../services/store/index.js");
function HowToPlayModal(props) {
    const { open, onOpenChange, onFundWallet } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp.how_to_play');
    const tRoot = (0, next_intl_1.useTranslations)();
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { warning } = (0, useNotification_1.useNotification)();
    const onClickFundWallet = () => {
        if (isVisitor !== user_1.VisitorEnum.NO) {
            warning({ content: tRoot('please_login') });
            return;
        }
        onFundWallet?.();
    };
    (0, react_1.useEffect)(() => {
        identityService_1.identityService.setIsViewedHowToPlay(true);
    }, []);
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, onOpenChange: onOpenChange, title: t('title'), size: "md", modalOnly: false, children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: (0, utils_1.cn)('px-4 pb-4 overflow-scroll'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "semibold", children: t('how_do_i_launch_an_aipp') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col rounded-lg bg-surface-accent-gray-subtlest p-3 space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-2 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-4 h-4 rounded-full text-inverse bg-surface-primary-default", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "sm", weight: "medium", color: "static", children: "1" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", children: t('requirements_1_1') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-2 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-4 h-4 rounded-full text-inverse bg-surface-primary-default", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "sm", weight: "medium", color: "static", children: "2" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", children: t('requirements_1_2') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-2 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-4 h-4 rounded-full text-inverse bg-surface-primary-default", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "sm", weight: "medium", color: "static", children: "3" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", children: t('requirements_1_3') })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "border border-default w-full my-6" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "semibold", children: t('what_should_i_when_buying_aipps') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col rounded-lg bg-surface-accent-gray-subtlest p-3 space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-2 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-4 h-4 rounded-full text-inverse bg-surface-primary-default", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "sm", weight: "medium", color: "static", children: "1" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", children: t('requirements_2_1') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-2 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-4 h-4 rounded-full text-inverse bg-surface-primary-default", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "sm", weight: "medium", color: "static", children: "2" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", children: t('requirements_2_2') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-2 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-4 h-4 rounded-full text-inverse bg-surface-primary-default", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "sm", weight: "medium", color: "static", children: "3" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", children: t('requirements_2_3') })] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", isBlock: true, onClick: onClickFundWallet, children: t('fill_up_your_wallet_and_start') })] })] }) }));
}
