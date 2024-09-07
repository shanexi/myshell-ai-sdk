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
exports.RewardsInfo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const react_1 = require("react");
const button_1 = require("../../../../common/components/ui/button.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const task_1 = require("../../../../common/constants/enums/task.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const useGetPoints_1 = __importDefault(require("../../../../hooks/rewards-center/useGetPoints.js"));
const useSeason_1 = __importDefault(require("../../../../hooks/rewards-center/useSeason.js"));
const useShellCoin_1 = __importDefault(require("../../../../hooks/user/useShellCoin.js"));
const store_1 = require("../../../../services/store/index.js");
const bg_dark_2x_png_1 = __importDefault(require("./assets/images/bg-dark@2x.png"));
const bg_2x_png_1 = __importDefault(require("./assets/images/bg@2x.png"));
const skeleton_1 = __importDefault(require("./skeleton.js"));
const shell_coin_1 = require("../shell-coin/index.js");
const shell_point_1 = require("../shell-point/index.js");
const ChevronRightIcon = (props) => ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", ...props, children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z", clipRule: "evenodd" }) }));
const PointMap = {
    [task_1.PointTypeEnum.USER_POINT_TYPE_GENERAL]: {
        i18n: 'general_points'
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_CREATOR]: {
        i18n: 'creator_points'
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR]: {
        i18n: 'advocator_points'
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_INVESTOR]: {
        i18n: 'investor_points'
    }
};
const DEFAULT_POINTS = [
    {
        type: task_1.PointTypeEnum.USER_POINT_TYPE_GENERAL,
        point: NaN,
        text: ''
    },
    {
        type: task_1.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR,
        point: NaN,
        text: ''
    },
    {
        type: task_1.PointTypeEnum.USER_POINT_TYPE_CREATOR,
        point: NaN,
        text: ''
    },
    {
        type: task_1.PointTypeEnum.USER_POINT_TYPE_INVESTOR,
        point: NaN,
        text: ''
    }
];
const ShellRecordlModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../shell-record/index.js'))), {
    ssr: false
});
const RewardsInfo = (props) => {
    const { isVisitor } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const { seasonPoints, queryPoints } = (0, useGetPoints_1.default)();
    const { queryShellCoins, shellCoins } = (0, useShellCoin_1.default)();
    const { seasonName } = (0, useSeason_1.default)();
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const [shellRecordVisible, setShellRecordVisible] = (0, react_1.useState)(false);
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    (0, react_1.useEffect)(() => {
        if (!isVisitor && (0, common_helper_1.isNullOrUndefined)(shellCoins)) {
            queryShellCoins();
        }
    }, [isVisitor]);
    (0, react_1.useEffect)(() => {
        if (!isVisitor && (0, common_helper_1.isNullOrUndefined)(seasonPoints)) {
            queryPoints();
        }
    }, [isVisitor]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "relative pt-6 pb-4 px-3 bg-surface-default rounded-xl overflow-hidden", children: (isVisitor ? seasonName : seasonName && !(0, common_helper_1.isNullOrUndefined)(seasonPoints) && !(0, common_helper_1.isNullOrUndefined)(shellCoins)) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: isDark ? bg_dark_2x_png_1.default.src : bg_2x_png_1.default.src, alt: "bg", className: "absolute top-0 left-0 right-0 bottom-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between px-4", children: [(0, jsx_runtime_1.jsx)(shell_coin_1.ShellCoin, { size: 112, varient: "large" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center flex-col flex-1 space-y-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center space-x-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", className: "text-warning", children: t('my_shell_coins') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('my_shell_coins_tip'), children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "xs", className: "text-warning", component: InformationCircleIcon_1.default }) })] }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "xl", className: "text-warning", children: !(0, common_helper_1.isNullOrUndefined)(shellCoins)
                                                        ? (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(shellCoins ?? 0)
                                                        : '-' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center mt-4 relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1 border-b border-default" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center space-x-0.5 px-3 relative", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "disabled", children: seasonName ? `${seasonName} ${t('points')}` : null }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('my_shell_points_tip'), children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "xs", color: "disabled", component: InformationCircleIcon_1.default }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 border-b border-default" })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-3 mt-4", children: (seasonPoints || DEFAULT_POINTS).map(({ type, point }, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-end px-1.5 py-2 bg-surface-container-selected-default border-opaque rounded-lg", children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { size: 36, type: type }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col space-y-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", className: "text-brand text-right opacity-60", children: t(PointMap[type].i18n) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "semibold", color: "brand", className: "text-right", children: !isNaN(point) ? (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(point) : '-' })] })] }, `${type}_${index}`))) }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mt-4", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "brand", variant: "plain", icon: ChevronRightIcon, iconDirection: "right", onClick: () => {
                                            if (isVisitor) {
                                                toggleLoginModal(true);
                                            }
                                            else {
                                                setShellRecordVisible(true);
                                            }
                                        }, children: t('view_details') }) })] })] })) : ((0, jsx_runtime_1.jsx)(skeleton_1.default, {})) }), shellRecordVisible && ((0, jsx_runtime_1.jsx)(ShellRecordlModal, { isOpen: shellRecordVisible, onClose: () => {
                    setShellRecordVisible(false);
                } }))] }));
};
exports.RewardsInfo = RewardsInfo;
