import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { Button } from '../../../../common/components/ui/button.js';
import { Modal, ModalBody } from '../../../../common/components/ui/modal.js';
import { Display, Text } from '../../../../common/components/ui/typography.js';
import { PropTypeEnum } from '../../../../common/constants/enums/task.js';
import { camelToSnake } from '../../../../common/utils/common-helper.js';
import { getValueFromSubType } from '../../../../common/utils/reward-center/index.js';
export default function SuccessTipModal({ isOpen, onClose, rewardInfo, count, isLoading = false }) {
    const commonT = useTranslations('common');
    const t = useTranslations('reward_center.reward_redemption_content.rewards');
    return (_jsx(Modal, { open: isOpen, onClose: onClose, size: "sm", modalOnly: true, children: _jsxs(ModalBody, { className: "p-5", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx(Display, { size: "xl", children: `🎉` }), _jsx(Display, { size: "sm", className: "mt-3", children: commonT('congrats_verb') }), _jsx(Text, { className: "mt-1.5", children: rewardInfo.propType === PropTypeEnum.seasonBadge ||
                                (rewardInfo.propType === PropTypeEnum.standardBattlePass && !rewardInfo.subType.includes('m')) ||
                                (rewardInfo.propType === PropTypeEnum.energyPack && !rewardInfo.subType.includes('bonus'))
                                ? t(`${camelToSnake(rewardInfo.propType)}.use_success_tip`, {
                                    count: Number(getValueFromSubType(rewardInfo.subType)) * count
                                })
                                : t(`${camelToSnake(rewardInfo.subType)}.use_success_tip`, {
                                    count: Number(getValueFromSubType(rewardInfo.subType)) * count
                                }) })] }), _jsx("div", { className: "w-full flex justify-center items-center mt-5", children: _jsx(Button, { variant: "primary", size: "lg", isBlock: true, loading: isLoading, onClick: onClose, tabIndex: -1, children: commonT('got_it') }) })] }) }));
}
