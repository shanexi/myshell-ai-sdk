"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SuccessTipModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../common/components/ui/button");
const modal_1 = require("../../../../common/components/ui/modal");
const typography_1 = require("../../../../common/components/ui/typography");
const task_1 = require("../../../../common/constants/enums/task");
const common_helper_1 = require("../../../../common/utils/common-helper");
const reward_center_1 = require("../../../../common/utils/reward-center");
function SuccessTipModal({ isOpen, onClose, rewardInfo, count, isLoading = false }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('reward_center.reward_redemption_content.rewards');
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: onClose, size: "sm", modalOnly: true, children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: "p-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "xl", children: `🎉` }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", className: "mt-3", children: commonT('congrats_verb') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "mt-1.5", children: rewardInfo.propType === task_1.PropTypeEnum.seasonBadge ||
                                (rewardInfo.propType === task_1.PropTypeEnum.standardBattlePass && !rewardInfo.subType.includes('m')) ||
                                (rewardInfo.propType === task_1.PropTypeEnum.energyPack && !rewardInfo.subType.includes('bonus'))
                                ? t(`${(0, common_helper_1.camelToSnake)(rewardInfo.propType)}.use_success_tip`, {
                                    count: Number((0, reward_center_1.getValueFromSubType)(rewardInfo.subType)) * count
                                })
                                : t(`${(0, common_helper_1.camelToSnake)(rewardInfo.subType)}.use_success_tip`, {
                                    count: Number((0, reward_center_1.getValueFromSubType)(rewardInfo.subType)) * count
                                }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-center items-center mt-5", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: "lg", isBlock: true, loading: isLoading, onClick: onClose, tabIndex: -1, children: commonT('got_it') }) })] }) }));
}
