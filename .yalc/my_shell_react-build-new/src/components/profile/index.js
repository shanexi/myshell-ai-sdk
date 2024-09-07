"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const DownloadApp_1 = __importDefault(require("../../common/components/DownloadApp.js"));
const icon_1 = require("../../common/components/ui/icon.js");
const link_1 = __importDefault(require("../../common/components/ui/link.js"));
const typography_1 = require("../../common/components/ui/typography.js");
const user_1 = require("../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const sensors_1 = require("../../lib/sensors/index.js");
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const AboutUsIcon_1 = __importDefault(require("./components/images/AboutUsIcon.js"));
const DashboardIcon_1 = __importDefault(require("./components/images/DashboardIcon.js"));
const HelpIcon_1 = __importDefault(require("./components/images/HelpIcon.js"));
const PasscardIcon_1 = __importDefault(require("./components/images/PasscardIcon.js"));
const PrivacyIcon_1 = __importDefault(require("./components/images/PrivacyIcon.js"));
const SettingsIcon_1 = __importDefault(require("./components/images/SettingsIcon.js"));
const TermsIcon_1 = __importDefault(require("./components/images/TermsIcon.js"));
const info_box_1 = __importDefault(require("./components/info-box/index.js"));
function ProfileIndex() {
    const t = (0, next_intl_1.useTranslations)('profile');
    const { isMobile, pathname } = (0, usePathLocale_1.usePathLocale)();
    const sensors = (0, sensors_1.useSensors)();
    const prefix = isMobile ? '/m' : '';
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const origin = (0, common_helper_1.isClient)() ? window.location.origin : 'https://app.myshell.ai';
    const ButtonGroup = (0, react_1.useMemo)(() => {
        return [
            [
                {
                    name: 'passcard',
                    url: `${prefix}/profile/passcard`,
                    icon: PasscardIcon_1.default
                },
                {
                    name: 'dashboard',
                    url: `${prefix}/profile/dashboard`,
                    icon: DashboardIcon_1.default
                }
            ],
            [
                {
                    name: 'about_us',
                    url: `https://myshell.ai/`,
                    icon: AboutUsIcon_1.default
                },
                {
                    name: 'help',
                    url: `https://docs.myshell.ai`,
                    icon: HelpIcon_1.default
                },
                {
                    name: 'terms',
                    url: 'https://app.myshell.ai/tos',
                    icon: TermsIcon_1.default
                },
                {
                    name: 'privacy_policy',
                    url: `${origin}/privacy-policy`,
                    icon: PrivacyIcon_1.default
                }
            ],
            [
                {
                    name: 'settings',
                    url: `${prefix}/profile/settings`,
                    icon: SettingsIcon_1.default
                }
            ]
        ];
    }, [prefix, origin]);
    const active = (0, react_1.useMemo)(() => {
        const getIndex = () => {
            if (pathname === '/profile' || pathname === '/profile/edit') {
                return isMobile ? '' : 'info';
            }
            const item = (0, lodash_es_1.flatMap)(ButtonGroup).find(b => b.url === pathname);
            if (item) {
                return item.name;
            }
        };
        return getIndex();
    }, [isMobile, pathname, ButtonGroup]);
    const onEdit = (e) => {
        if (visitor !== user_1.VisitorEnum.NO) {
            e.preventDefault();
            toggleLoginModal(true);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full bg-surface-container-default overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0 py-5 md:pt-6 md:pb-4 px-4 md:px-6", children: (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "md", children: t('title') }) }), (0, jsx_runtime_1.jsxs)("div", { className: "overflow-y-auto no-scrollbar px-4 md:px-3 pb-4 space-y-5", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: `${prefix}/profile/edit`, onClick: onEdit, children: (0, jsx_runtime_1.jsx)(info_box_1.default, { active: active === 'info' }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-5", children: [ButtonGroup.map((list, index) => ((0, jsx_runtime_1.jsx)("div", { className: "bg-surface-default rounded-xl md:bg-transparent", children: list.map((item, j) => {
                                    const openLogin = visitor !== user_1.VisitorEnum.NO && !(index === 1);
                                    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(link_1.default, { className: (0, utils_1.cn)('flex justify-between items-center w-full text-default rounded-xl px-3 py-3', active === item.name
                                                    ? 'bg-surface-accent-blue-subtler'
                                                    : 'bg-transparent hover:bg-surface-container-hovered'), href: openLogin ? 'javascript:;' : item.url, passHref: openLogin, target: index === 1 ? '_blank' : '_self', onClick: () => {
                                                    if (openLogin) {
                                                        toggleLoginModal(true);
                                                    }
                                                    else if (item.url === 'https://discord.gg/myshell') {
                                                        sensors?.track('EnterDC', {
                                                            click_area: 'Community'
                                                        });
                                                    }
                                                }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: item.icon, size: isMobile ? '3xl' : '2xl', className: "mr-2" }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between w-full", children: (0, jsx_runtime_1.jsx)("span", { className: "flex-grow text-left text-base md:text-sm", children: t(item.name) }) })] }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ChevronRightIcon_1.default, className: "text-subtler" })] }, item.name), j !== list.length - 1 ? ((0, jsx_runtime_1.jsx)("div", { className: "px-3 md:hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "ml-10 border-b border-default" }) })) : null] }));
                                }) }))), (0, jsx_runtime_1.jsx)(DownloadApp_1.default, { isMobile: isMobile })] })] })] }));
}
exports.default = ProfileIndex;
