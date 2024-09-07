"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserLevel;
const jsx_runtime_1 = require("react/jsx-runtime");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const icon_1 = require("../../../../common/components/ui/icon.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const store_1 = require("../../../../services/store/index.js");
const LevelBenefitModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./LevelBenefitModal.js'))), {
    loading: () => null,
    ssr: false
});
function UserLevel() {
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const premiumInfo = (0, store_1.useUserStore)(state => state.premiumInfo);
    const progress = (0, react_1.useMemo)(() => {
        return premiumInfo.level === 50
            ? 100
            : (premiumInfo.currentLevelExp / (premiumInfo.currentLevelExp + premiumInfo.nextLevelNeedExp)) * 100;
    }, [premiumInfo.currentLevelExp, premiumInfo.level, premiumInfo.nextLevelNeedExp]);
    const [levelBenefitModalVisible, setLevelBenefitModalVisible] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center grow space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1 items-center", children: [(0, jsx_runtime_1.jsxs)(typography_1.Text, { size: "lg", weight: "medium", children: ["Lv.", premiumInfo?.level] }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [t('premium_level.tooltip_content'), ' ', (0, jsx_runtime_1.jsx)("span", { className: "text-brand cursor-pointer z-[60]", onClick: e => {
                                                        e.preventDefault();
                                                        setLevelBenefitModalVisible(true);
                                                    }, children: t('premium_level.tooltip_view_more') })] }), children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "xs", color: "subtlest", component: InformationCircleIcon_1.default }) })] }), (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", children: premiumInfo.level === 50
                                    ? t('lv_text_max')
                                    : t('lv_text', {
                                        nextLevelNeedExp: premiumInfo?.nextLevelNeedExp
                                    }) })] }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: premiumInfo.level === 50
                            ? 'MAX'
                            : `${premiumInfo.currentLevelExp}/${premiumInfo.currentLevelExp + premiumInfo.nextLevelNeedExp} Exp`, triggerClassName: "w-full", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-surface-container-hovered w-full h-1.5 rounded-full overflow-hidden relative", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 h-full bg-surface-primary-default", style: {
                                    width: `${progress}%`,
                                    transition: 'width 2s ease'
                                } }) }) })] }), levelBenefitModalVisible && ((0, jsx_runtime_1.jsx)(LevelBenefitModal, { isOpen: levelBenefitModalVisible, onClose: () => {
                    setLevelBenefitModalVisible(false);
                } }))] }));
}
