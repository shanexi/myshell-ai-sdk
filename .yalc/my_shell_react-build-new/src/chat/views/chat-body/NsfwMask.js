"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NsfwMask;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const EyeSlashIcon_1 = __importDefault(require("@heroicons/react/24/outline/EyeSlashIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../common/components/ui/button.js");
const link_1 = require("../../../common/components/ui/link.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const store_1 = require("../../../services/store/index.js");
function NsfwMask() {
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const t = (0, next_intl_1.useTranslations)();
    const token = (0, store_1.useUserStore)(state => state.token);
    const router = (0, navigation_1.useRouter)();
    const { locale, isMobile } = (0, usePathLocale_1.usePathLocale)();
    const handleClick = () => {
        toggleLoginModal(true);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-0 left-0 overflow-hidden md:rounded-3xl bg-[#f6f8fc] dark:bg-[#1c1e26] bg-opacity-80 w-full h-full z-[101] flex flex-col justify-center items-center px-[60px]", style: {
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)'
        }, children: [isMobile && ((0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "absolute left-[22px] top-4 size-6 text-brand cursor-pointer", onClick: () => {
                    router.push(`/chat`);
                } })), (0, jsx_runtime_1.jsx)(EyeSlashIcon_1.default, { className: "size-8 text-default" }), (0, jsx_runtime_1.jsxs)("section", { className: "flex flex-col items-center gap-1 mt-2", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h3", children: t('workshop.nsfw_bot_text') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "subtle", size: "sm", className: "text-center", children: !token ? t('workshop.nsfw_bot_visitor_content') : t('workshop.nsfw_bot_user_content') })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: !token ? ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleClick, children: t('workshop.nsfw_bot_visitor_button') })) : ((0, jsx_runtime_1.jsx)(link_1.Link, { href: "/profile/settings", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "text-sm", children: [t('workshop.nsfw_bot_user_button'), (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "size-4 text-white stroke-[2px]" })] }) })) })] }));
}
