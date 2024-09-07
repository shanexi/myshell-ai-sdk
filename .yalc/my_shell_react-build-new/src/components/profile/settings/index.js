"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsArea;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const PowerIcon_1 = __importDefault(require("@heroicons/react/24/outline/PowerIcon"));
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const wagmi_1 = require("wagmi");
const user_1 = require("../../../apis/user.js");
const ThemeSelect_1 = __importDefault(require("../../../common/components/ThemeSelect.js"));
const typography_1 = require("../../../common/components/ui/typography.js");
const useBackToProfile_1 = __importDefault(require("../../../common/hooks/useBackToProfile.js"));
const identityService_1 = require("../../../common/services/identityService.js");
const apis_1 = require("../../../forum/models/apis.js");
const usePrivyLogin_1 = __importDefault(require("../../../hooks/user/usePrivyLogin.js"));
const store_1 = require("../../../services/store/index.js");
const workshop_1 = require("../../../services/store/workshop.js");
const LanguageSwitch_1 = __importDefault(require("./LanguageSwitch.js"));
const NotificationSwitch_1 = __importDefault(require("./NotificationSwitch.js"));
const NsfwSwitcher_1 = __importDefault(require("./nsfw-switcher/NsfwSwitcher.js"));
const Timezone_1 = __importDefault(require("./timezone/Timezone.js"));
function SettingsArea() {
    const clearUser = (0, store_1.useUserStore)(state => state.clearUser);
    const { logout: privyLogout } = (0, usePrivyLogin_1.default)();
    const clearChatRecord = (0, store_1.useChatStore)(state => state.clearChatRecord);
    const clearTextInput = (0, store_1.useChatStore)(state => state.clearTextInput);
    const resetTtsContent = (0, workshop_1.useWorkshopStore)(state => state.resetTtsContent);
    const reset = (0, store_1.useBotStore)(state => state.reset);
    const { disconnectAsync } = (0, wagmi_1.useDisconnect)();
    const t = (0, next_intl_1.useTranslations)();
    async function logout() {
        try {
            const loginMethod = identityService_1.identityService.getLoginMethod();
            if (loginMethod) {
                await privyLogout({ method: loginMethod, source: 'SettingsArea:logout' });
            }
            try {
                await (0, user_1.userLogout)();
            }
            catch (e) {
                console.error(e);
            }
            identityService_1.identityService.clearAll(true);
            clearChatRecord();
            clearUser();
            reset();
            clearTextInput();
            resetTtsContent();
            window.location.href = '/';
        }
        catch (e) {
            console.error('登出失败');
        }
    }
    const { backToProfile, isMobile } = (0, useBackToProfile_1.default)();
    const setWidgetDataPush = (0, workshop_1.useWorkshopStore)(state => state.setWidgetDataPush);
    const setWidgetSearchList = (0, workshop_1.useWorkshopStore)(state => state.setWidgetSearchList);
    const setSearchList = (0, store_1.useForumStore)(state => state.setSearchList);
    const setTagFilters = (0, store_1.useForumStore)(state => state.setTagFilters);
    const setPostDetail = (0, store_1.useForumStore)(state => state.setPostDetail);
    const setLanguageList = (0, workshop_1.useWorkshopStore)(state => state.setLanguageList);
    const clearListParam = () => {
        setWidgetDataPush(false);
        setWidgetSearchList([]);
        setLanguageList([]);
        setSearchList([]);
        setTagFilters({ tagList: [], sortList: [] });
        setPostDetail({});
        apis_1.postDetailCacheMap$.clear();
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.Flex, { id: "invite", w: "100%", h: "100%", position: "relative", color: "#141718", flexDirection: "column", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('shrink-0 flex w-full text-on-surface bg-surface-default items-center h-14 md:h-15 border-0 border-b border-outline border-solid z-10', {
                    'bg-[#fff]': !isMobile,
                    'justify-start': !isMobile,
                    'justify-center': isMobile,
                    'pl-5': !isMobile
                }), children: [(0, jsx_runtime_1.jsx)("div", { onClick: backToProfile, className: (0, clsx_1.default)('absolute left-4 text-lg cursor-pointer visible', {
                            invisible: !isMobile
                        }), children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-5 h-5 stroke-surface-primary-default" }) }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t('profile.settings') })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('mt-[16px] md:mt-[45px] mb-[89px] mx-auto w-full px-4 flex flex-col items-center space-y-5 md:h-auto justify-between grow'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col md:items-center space-y-4", children: [(0, jsx_runtime_1.jsx)(LanguageSwitch_1.default, { clearListParam: clearListParam }), (0, jsx_runtime_1.jsx)(Timezone_1.default, {}), (0, jsx_runtime_1.jsx)(ThemeSelect_1.default, {}), (0, jsx_runtime_1.jsx)(NsfwSwitcher_1.default, {}), (0, jsx_runtime_1.jsx)(NotificationSwitch_1.default, {})] }), (0, jsx_runtime_1.jsx)(react_1.Button, { leftIcon: (0, jsx_runtime_1.jsx)(PowerIcon_1.default, { className: "w-4 h-4" }), display: "flex", justifyContent: "start", className: "bg-surface", h: "44px", p: "12px 24px", border: "1px solid #D82C0D", borderRadius: "full", color: "#D82C0D", fontSize: "lg", _hover: { bg: 'none' }, onClick: logout, children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", className: "text-rose-600", children: t('profile.sign_out') }) })] })] }));
}
