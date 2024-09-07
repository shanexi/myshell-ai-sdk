"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RedemptionSuccessModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const task_1 = require("../../../../../common/constants/enums/task.js");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const useUseProp_1 = __importDefault(require("../../../../../hooks/rewards-center/useUseProp.js"));
const useSeason_1 = __importDefault(require("../../../../../hooks/rewards-center/useSeason.js"));
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const media_1 = require("../../../components/media/index.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const reward_success_bg_png_1 = __importDefault(require("./assets/images/reward-success-bg.png"));
function RedemptionSuccessModal({ isOpen, onClose, onUse, rewardInfo, redeemedCount }) {
    const { seasonName } = (0, useSeason_1.default)();
    const t = (0, next_intl_1.useTranslations)('reward_center.reward_redemption_content.rewards');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const rT = (0, next_intl_1.useTranslations)('reward_center');
    const { acting, handleUseProp } = (0, useUseProp_1.default)();
    const usePropHandler = (0, react_1.useCallback)(() => {
        handleUseProp(rewardInfo.propId, rewardInfo, redeemedCount, () => {
            onUse(redeemedCount);
        });
    }, [handleUseProp, onUse, redeemedCount, rewardInfo]);
    return ((0, jsx_runtime_1.jsxs)(modal_1.ModalRoot, { open: isOpen, children: [(0, jsx_runtime_1.jsx)(modal_1.ModalOverlay, { onClick: onClose, children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full", children: (0, jsx_runtime_1.jsx)("img", { src: reward_success_bg_png_1.default.src, className: "w-full h-full object-cover", alt: "success background" }) }) }), (0, jsx_runtime_1.jsx)(modal_1.ModalContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center w-[350px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center text-center space-y-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "lg", className: "text-static", children: commonT('congratulations') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "static", className: "opacity-80", children: rewardInfo.propType === task_1.PropTypeEnum.seasonBadge ||
                                        (rewardInfo.propType === task_1.PropTypeEnum.standardBattlePass && !rewardInfo.subType.includes('m')) ||
                                        (rewardInfo.propType === task_1.PropTypeEnum.energyPack && !rewardInfo.subType.includes('bonus'))
                                        ? t(`${(0, common_helper_1.camelToSnake)(rewardInfo.propType)}.success_tip`, {
                                            season: rewardInfo.seasonId
                                        })
                                        : t(`${(0, common_helper_1.camelToSnake)(rewardInfo.subType)}.success_tip`) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "aspect-square w-full relative mt-5 rounded-xl overflow-hidden", children: [(0, jsx_runtime_1.jsx)(media_1.Media, { src: rewardInfo.media }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-3 right-3 rounded-md border border-[rgba(0,0,0,0.08)] px-1.5 py-0.5 bg-[rgba(255,255,255,.4)]", children: (0, jsx_runtime_1.jsxs)(typography_1.Text, { weight: "medium", size: "sm", color: "static-black", children: ["x", (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(redeemedCount)] }) })] }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", color: "static", className: "mt-2", children: rewardInfo.name }), ((seasonName &&
                            rewardInfo.propType === task_1.PropTypeEnum.standardBattlePass &&
                            rewardInfo.subType.includes(seasonName)) ||
                            rewardInfo.propType === task_1.PropTypeEnum.energyPack) && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full mt-5", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { size: "lg", loading: acting, isBlock: true, onClick: usePropHandler, children: rT('use_now') }), (0, jsx_runtime_1.jsx)("div", { className: "text-center text-sm text-static py-3 cursor-pointer", onClick: onClose, children: rT('later') })] }))] }) })] }));
}
