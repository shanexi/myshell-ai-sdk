"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyProps;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const task_1 = require("../../../apis/task.js");
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useBackToRewardsCenter_1 = __importDefault(require("../../../hooks/rewards-center/useBackToRewardsCenter.js"));
const useGetProps_1 = __importDefault(require("../../../hooks/rewards-center/useGetProps.js"));
const utils_1 = require("../../../lib/utils.js");
const store_1 = require("../../../services/store/index.js");
const my_props_list_1 = __importDefault(require("./components/my-props-list/index.js"));
const Skeleton_1 = require("./components/my-props-list/Skeleton.js");
function MyProps() {
    const isMobileDevice = (0, react_use_1.useMedia)('(max-width: 768px)');
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const inviteCodeStep = (0, store_1.useGlobalStore)(state => state.inviteCodeStep);
    const toggleInvitecodeModal = (0, store_1.useGlobalStore)(state => state.toggleInvitecodeModal);
    const { backToProfile } = (0, useBackToRewardsCenter_1.default)();
    const setNewlyPropsCount = (0, store_1.useTaskStore)(state => state.setNewlyPropsCount);
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const { queryProps, querying } = (0, useGetProps_1.default)();
    const [slientQuerying, setSlientQuerying] = (0, react_1.useState)(false);
    const load = async () => {
        setNewlyPropsCount(0);
        (0, task_1.clearNewlyMyPropsCount)();
        if (inviteCodeStep === 4) {
            toggleInvitecodeModal(false);
        }
        await queryProps();
        setSlientQuerying(true);
    };
    (0, react_1.useEffect)(() => {
        load();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full overflow-hidden relative", children: [!(isMobile || isMobileDevice) ? ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('shrink-0 flex items-center w-ful h-15 bg-surface-default border-b border-default z-10 px-6 py-4'), children: (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t('my_rewards') }) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('shrink-0 flex  items-center justify-center bg-surface-default px-4 h-14 border-b border-default'), children: (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "xs", children: t('my_rewards') }) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: backToProfile, variant: "ghost", color: "brand", size: "md", icon: ArrowLeftIcon_1.default, className: (0, utils_1.cn)('fixed left-4 top-2.5 z-50 flex') })] })), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col overflow-auto", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col px-4 py-3 pb-[80px] md:px-6 md:py-4", children: querying && !slientQuerying ? (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, {}) : (0, jsx_runtime_1.jsx)(my_props_list_1.default, {}) }) })] }));
}
