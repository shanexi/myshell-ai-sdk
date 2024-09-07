"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const icon_1 = require("../../common/components/ui/icon.js");
const icon_button_1 = require("../../common/components/ui/icon-button.js");
const typography_1 = require("../../common/components/ui/typography.js");
const useUserSettings_1 = __importDefault(require("../../common/hooks/useUserSettings.js"));
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const identityService_1 = require("../../common/services/identityService.js");
function TagNotice() {
    const { handleUpdateFlagTagNoticeVisited } = (0, useUserSettings_1.default)();
    const tagNoticeVisited = (0, store_1.useUserStore)(state => state.tagNoticeVisited);
    const token = (0, store_1.useUserStore)(state => state.token);
    const t = (0, next_intl_1.useTranslations)('profile');
    const [visited, setVisited] = (0, react_1.useState)(tagNoticeVisited);
    const isNew = ((0, common_helper_1.isClient)() && identityService_1.identityService.getIsNewUser()) ?? '';
    const onboarding = (0, store_1.useGlobalStore)(state => state.onboarding);
    const handleClose = () => {
        handleUpdateFlagTagNoticeVisited();
        setVisited(true);
    };
    (0, react_1.useEffect)(() => {
        if (tagNoticeVisited || !token || isNew || onboarding)
            return;
        setVisited(tagNoticeVisited);
        const timer = setTimeout(() => {
            handleUpdateFlagTagNoticeVisited();
            handleClose();
            clearTimeout(timer);
        }, 10000);
    }, [handleUpdateFlagTagNoticeVisited, tagNoticeVisited, token]);
    if (!token || isNew || onboarding)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('fixed flex bottom-24 md:bottom-5 right-0 md:right-6 z-[100]', visited && 'hidden'), children: (0, jsx_runtime_1.jsxs)("div", { className: "relative flex bg-surface-search-field border border-opaque rounded-xl w-full mx-4 md:mx-0 md:w-[343px] p-3 space-x-3 shadow-modal-default space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center w-10 h-10 rounded-full bg-surface-accent-blue-subtler flex-shrink-0", children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: outline_1.InformationCircleIcon, size: "2xl", color: "brand" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h4", children: t('tag_notice_title') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtle", children: t('tag_notice_content') })] }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: handleClose, icon: outline_1.XMarkIcon, variant: "ghost", size: "sm", className: "cursor-pointer text-default rounded-full" })] }) }));
}
exports.default = TagNotice;
