"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UseEnergyPackModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const task_1 = require("../../../apis/task.js");
const lowBattery_svg_1 = __importDefault(require("@/common/assets/icons/voice/lowBattery.svg"));
const modal_1 = require("../../../common/components/ui/modal.js");
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const reward_center_1 = require("../../../common/utils/reward-center/index.js");
function UseEnergyPackModal(props) {
    const { isOpen, onResume, onStop, propItem } = props;
    const t = (0, next_intl_1.useTranslations)('chat');
    const wt = (0, next_intl_1.useTranslations)('workshop');
    const rt = (0, next_intl_1.useTranslations)('reward_center.reward_redemption_content.rewards');
    const [isConsuming, setIsConsuming] = (0, react_1.useState)(false);
    const { error } = (0, useNotification_1.useNotification)();
    const onUseEnergyPack = async () => {
        if (!propItem) {
            return;
        }
        try {
            setIsConsuming(true);
            await (0, task_1.onUseProp)(propItem.id, 1);
            onResume();
        }
        catch (e) {
            error({
                content: 'Use Energy Pack Failed',
                id: 'energyPackConsumeFailed'
            });
        }
        finally {
            setIsConsuming(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: () => { }, children: (0, jsx_runtime_1.jsx)(modal_1.ModalBody, { children: (0, jsx_runtime_1.jsxs)("div", { className: "py-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-5 py-2 flex flex-col gap-y-2", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(image_1.default, { src: lowBattery_svg_1.default, alt: "low battery", className: "w-[40px] h-[40px]", style: {
                                        borderRadius: 'var(--redius-12, 12px)',
                                        background: 'var(--white, #FFF)'
                                    } }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-lg text-on-surface", children: t('voice_call_feedback_low_battery') }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary", children: t('voice_call_feedback_energy_pack', {
                                    title: rt(`energy_pack.title`, {
                                        energy: propItem ? (0, reward_center_1.getValueFromSubType)(propItem.subType) : 0
                                    })
                                }) })] }), (0, jsx_runtime_1.jsx)("hr", { className: "py-2" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row justify-around w-full px-2 py-2 pb-4", children: [(0, jsx_runtime_1.jsx)("button", { className: "flex py-2 h-9 min-w-[120px] justify-center items-center rounded-4xl border border-default text-on-surface space-x-1.5", onClick: onStop, children: wt('cancel') }), (0, jsx_runtime_1.jsx)("button", { className: "flex py-2 h-9 min-w-[120px] justify-center items-center rounded-4xl border border-default bg-primary text-white space-x-1.5", onClick: onUseEnergyPack, children: isConsuming ? (0, jsx_runtime_1.jsx)(spinner_1.default, {}) : wt('confirm') })] })] }) }) }));
}
