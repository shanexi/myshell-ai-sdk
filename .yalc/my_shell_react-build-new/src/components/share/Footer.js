"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const runtime_config_1 = require("../../common/utils/runtime-config.js");
function Footer({ inviteCode, botId, qrcode, isFromDownload }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (inviteCode && botId) {
            router.prefetch(`/invite/${inviteCode}?botId=${botId}`);
        }
    }, [inviteCode, botId]);
    if (isFromDownload) {
        return ((0, jsx_runtime_1.jsxs)("footer", { className: "flex items-center px-16 justify-between bg-[#F6F6F6] dark:bg-surface-container text-on-surface w-full h-[74px] overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-8 items-center", children: [(0, jsx_runtime_1.jsx)("img", { src: `${runtime_config_1.CDN_URL}shared-conversation/shell-logo-v2.png`, width: "40", height: "40", alt: "Shell Logo" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold", children: "MyShell" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs", children: `${runtime_config_1.APP_URL}` })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mr-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm mr-10", children: "Scan to try it yourself" }) }), qrcode && (0, jsx_runtime_1.jsx)("img", { src: qrcode, width: "60", height: "60", alt: "Shell Logo" })] })] }));
    }
    return ((0, jsx_runtime_1.jsx)("footer", { className: "bg-surface-container flex items-center px-[23.5px] md:px-4 justify-center shadow w-screen py-4 md:py-5", children: (0, jsx_runtime_1.jsx)("a", { href: inviteCode ? `/invite/${inviteCode}?botId=${botId}` : '/', className: "w-full md:w-[159px] px-[24px] py-[12px] bg-primary rounded-[100px] text-center text-white font-bold shadow-button-primary", children: t('try_it_yourself') }) }));
}
