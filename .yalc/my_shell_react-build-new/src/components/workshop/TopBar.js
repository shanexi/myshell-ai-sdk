"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const driver_js_1 = require("driver.js");
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const link_1 = __importDefault(require("../../common/components/ui/link.js"));
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
require("driver.js/dist/driver.css");
const identityService_1 = require("../../common/services/identityService.js");
const TopBarSkeleton_1 = __importDefault(require("../../components/skeleton/workshop/TopBarSkeleton.js"));
const store_1 = require("../../services/store/index.js");
function TopBar({ botId, active, onBack }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const router = (0, navigation_1.useRouter)();
    const { locale, isMobile, pathname } = (0, usePathLocale_1.usePathLocale)();
    const activeType = active || (pathname.includes('setting') ? 'setting' : 'chat');
    const isChat = activeType === 'chat';
    const isSetting = activeType === 'setting';
    const isCreate = activeType === 'create';
    const myBotList = (0, store_1.useWorkshopStore)(state => state.sidebarMyBotList);
    const botInfo = (0, react_1.useMemo)(() => myBotList?.find(bot => bot.id === botId), [botId, myBotList]);
    const guideRef = (0, react_1.useRef)(null);
    const driverObj = (0, react_1.useRef)(null);
    const [isGuiding, setIsGuiding] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const startUserGuide = () => {
            setIsGuiding(true);
            driverObj.current = (0, driver_js_1.driver)({
                allowClose: true,
                popoverClass: 'workshop-topbar-guide',
                onDestroyed: () => setIsGuiding(false)
            });
            guideRef.current = setTimeout(() => {
                driverObj.current.highlight({
                    element: `#workshopTopbar`,
                    popover: {
                        side: 'bottom',
                        align: 'start',
                        title: t('guide_topbar_title'),
                        description: t('guide_topbar_description')
                    }
                });
            }, 1000);
            const userGuide = identityService_1.identityService.getUserGuide()?.split(',') || [];
            userGuide.push('topbar');
            identityService_1.identityService.setUserGuide(userGuide.join(','));
        };
        if (botInfo && !botInfo?.isOfficalAssistantBot && isChat) {
            const userGuide = identityService_1.identityService.getUserGuide()?.split(',') || [];
            const hasGuide = userGuide.includes('topbar');
            if (!hasGuide) {
                if (isGuiding)
                    driverObj.current.destroy();
                if (guideRef.current)
                    clearTimeout(guideRef.current);
                startUserGuide();
            }
        }
        return () => {
            if (driverObj.current)
                driverObj.current.destroy();
        };
    }, [pathname, botInfo, isChat, isGuiding, t]);
    const renderButton = (type, label, isActive, href) => ((0, jsx_runtime_1.jsx)(link_1.default, { href: href, passHref: isGuiding, children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, clsx_1.default)('flex h-full items-center justify-center min-w-[100px] md:min-w-[172px] text-center px-3 py-2.5 text-[14px] leading-[1.3] font-semibold rounded-full', isActive ? 'border-[1px] border-default text-primary bg-surface' : 'text-secondary'), style: { boxShadow: isActive ? '0px 0px 2px 0px #B8B5FE' : '' }, children: label }) }));
    if (!botInfo && !isCreate) {
        return (0, jsx_runtime_1.jsx)(TopBarSkeleton_1.default, {});
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (botInfo && !botInfo?.isOfficalAssistantBot) || isCreate ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('topbar flex-shrink-0 relative md:rounded-t-[24px] bg-surface-default text-on-surface flex justify-center items-center w-full h-[56px] md:h-[76px] md:border-b-[1px] border-default md:pl-[60px]', isCreate ? 'md:justify-start' : ''), children: [isMobile && !isChat && ((0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "absolute left-4 w-8 h-8 stroke-primary", onClick: () => {
                        router.push('/m/robot-workshop');
                    } })), isCreate ? ((0, jsx_runtime_1.jsx)("p", { className: "flex-shrink-0 leading-[1.3] font-medium text-[20px] md:text-[24px]", children: t('create_robot') })) : ((0, jsx_runtime_1.jsxs)("div", { id: "workshopTopbar", className: "flex h-[36px] md:h-12 border-default border-[1px] rounded-full bg-[--surface-create-bg] md:bg-surface", children: [renderButton('chat', t('chat'), isChat, `/robot-workshop/bot/${botId}/chat`), renderButton('setting', t('setting'), isSetting, `/robot-workshop/bot/${botId}/setting`)] }))] })) : null }));
}
