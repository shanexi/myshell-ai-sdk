"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSideBar;
const ChatBubbleLeftRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChatBubbleLeftRightIcon"));
const ChatBubbleOvalLeftEllipsisIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChatBubbleOvalLeftEllipsisIcon"));
const RocketLaunchIcon_1 = __importDefault(require("@heroicons/react/24/outline/RocketLaunchIcon"));
const UserIcon_1 = __importDefault(require("@heroicons/react/24/outline/UserIcon"));
const WrenchScrewdriverIcon_1 = __importDefault(require("@heroicons/react/24/outline/WrenchScrewdriverIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const user_1 = require("../common/constants/enums/user.js");
const usePathLocale_1 = require("../common/hooks/usePathLocale.js");
const useRestoreScrollPosition_1 = require("../common/hooks/useRestoreScrollPosition.js");
const useUserSettings_1 = __importDefault(require("../common/hooks/useUserSettings.js"));
const identityService_1 = require("../common/services/identityService.js");
const sensors_1 = require("../lib/sensors/index.js");
const store_1 = require("../services/store/index.js");
const useSeason_1 = __importDefault(require("./rewards-center/useSeason.js"));
function useSideBar({ setSelectedTab, isMobile = false }) {
    const t = (0, next_intl_1.useTranslations)();
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { handleUpdateRewardsCenterVisited } = (0, useUserSettings_1.default)();
    const { handleUpdateForumCenterVisited } = (0, useUserSettings_1.default)();
    const { seasonName } = (0, useSeason_1.default)();
    const sensors = (0, sensors_1.useSensors)();
    const tabs = (0, react_1.useMemo)(() => {
        return [
            {
                icon: ChatBubbleOvalLeftEllipsisIcon_1.default,
                text: t('chat.chat'),
                href: `/explore`,
                mobileHref: `/m/chat`,
                key: 'chat'
            },
            {
                icon: WrenchScrewdriverIcon_1.default,
                text: t('workshop.tab_title'),
                href: `/robot-workshop`,
                mobileHref: `/m/robot-workshop`,
                key: 'workshop'
            },
            {
                icon: ChatBubbleLeftRightIcon_1.default,
                text: t('forum.title'),
                href: '/forum',
                mobileHref: '/m/forum',
                key: 'forum'
            },
            {
                icon: RocketLaunchIcon_1.default,
                text: t('reward'),
                href: `/rewards-center`,
                mobileHref: `/m/rewards-center`,
                key: 'rewards'
            },
            {
                icon: UserIcon_1.default,
                text: t('profile.title'),
                href: `/profile`,
                mobileHref: `/m/profile`,
                key: 'profile'
            }
        ];
    }, [t]);
    const getTabKeyByPathname = (tabs, pathname) => {
        const key = tabs.find((tab) => {
            const href = isMobile ? tab.mobileHref : tab.href;
            let path = pathname.startsWith('/chat') || pathname.startsWith('/gallery') ? '/explore' : pathname;
            return isMobile ? `${path}` === href : path.startsWith(href);
        })?.key;
        return key || '';
    };
    const memoScrollPosition = (0, useRestoreScrollPosition_1.useMemoScrollPosition)();
    const setShowPost = (0, store_1.useForumStore)(state => state.setShowPost);
    const handleTabClick = (e, tab) => {
        const isReward = tab.key === 'rewards';
        const isLogin = isVisitor === user_1.VisitorEnum.NO;
        if (isReward) {
            if (isLogin) {
                handleUpdateRewardsCenterVisited(seasonName || undefined);
            }
        }
        if (tab.key === 'forum') {
            sensors?.track('ForumClick');
            setShowPost(false);
            if (isLogin) {
                handleUpdateForumCenterVisited(seasonName || undefined);
            }
        }
        if (isMobile) {
            tab.key === 'chat' && memoScrollPosition('chat_list');
            tab.key === 'workshop' && memoScrollPosition('workshop_list');
        }
        else if (pathname.startsWith('/explore') || pathname.startsWith('/robot-workshop')) {
            sessionStorage.setItem(`scrollPos:${pathname}`, '0');
            identityService_1.identityService.setPageSearch('explore-page', null);
            identityService_1.identityService.setPageSearch('widgets-page', null);
        }
        setSelectedTab(tab.key);
    };
    (0, react_1.useEffect)(() => {
        setSelectedTab(getTabKeyByPathname(tabs, pathname));
    }, [pathname]);
    (0, react_1.useEffect)(() => {
        if (pathname === '/rewards-center') {
            isVisitor === 2 && handleUpdateRewardsCenterVisited(seasonName || undefined);
        }
    }, [pathname, isVisitor]);
    return { tabs, getTabKeyByPathname, handleTabClick };
}
