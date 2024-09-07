"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocialMedia;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const QuestionMarkCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/QuestionMarkCircleIcon"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const rxjs_1 = require("rxjs");
const bot_1 = require("../../../apis/bot.js");
const discord_svg_1 = __importDefault(require("@/common/assets/icons/social-media/discord.svg"));
const telegram_svg_1 = __importDefault(require("@/common/assets/icons/social-media/telegram.svg"));
const whatsApp_svg_1 = __importDefault(require("@/common/assets/icons/social-media/whatsApp.svg"));
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const tooltip_1 = require("../../../common/components/ui/tooltip.js");
function SocialMedia({ form, showLearnMore, isGuide }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const botId = form.getFieldValue('botId');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { id: "socialMedia", children: [(0, jsx_runtime_1.jsx)("p", { className: "flex items-center text-xl", children: t('deploy_to_im') }), (0, jsx_runtime_1.jsxs)("p", { className: "text-secondary text-sm mt-1.5", children: [t('app_integration_tips'), (0, jsx_runtime_1.jsx)("span", { className: "text-primary cursor-pointer px-1", onClick: () => {
                                    if (!isGuide) {
                                        showLearnMore('app_leanr_more');
                                    }
                                }, children: t('learn_more') })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "md:p-5 bg-surface space-y-4 md:space-y-6 rounded-[20px] md:border-default md:border-[1px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", id: "socialTg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm leading-[20px] inline-flex items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: telegram_svg_1.default, className: "w-5 h-5 rounded", alt: "Telegram logo" }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", children: "Telegram" })] }), !isGuide ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: (0, jsx_runtime_1.jsxs)("div", { className: "text-[#797979] text-sm font-normal z-50", children: [t('bind_telegram_tip'), ' ', (0, jsx_runtime_1.jsxs)("a", { className: "text-primary cursor-pointer", href: t('gitbook_telegram_url'), target: "_blank", rel: "noopener noreferrer", children: [t('user_manual'), " >>>"] })] }), side: "top", children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "ml-[4px] w-[18px] h-[18px]" }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-secondary", children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "ml-[4px] w-[18px] h-[18px]" }) }))] }), (0, jsx_runtime_1.jsx)(BindTgToken, { botId: `${botId}`, tgToken: form.getFieldValue('telegramToken'), isGuide: isGuide }), (0, jsx_runtime_1.jsxs)("p", { className: "text-warning text-sm", children: ["*", t('telegram_bind_tip')] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", gap: "8px", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: discord_svg_1.default, className: "w-5 h-5 rounded", alt: "Telegram logo" }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", children: "Discord" })] }), (0, jsx_runtime_1.jsx)("div", { className: "rounded-[12px] border border-default flex justify-center items-center h-[40px] shadow text-on-secondary-container text-sm bg-[--surface-create-bg]", children: t('coming_soon') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", gap: "8px", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: whatsApp_svg_1.default, className: "w-5 h-5 rounded", alt: "Telegram logo" }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", children: "WhatsAPP" })] }), (0, jsx_runtime_1.jsx)("div", { className: "rounded-[12px] border border-default flex justify-center items-center h-[40px] shadow text-on-secondary-container text-sm bg-[--surface-create-bg]", children: t('coming_soon') })] })] })] }));
}
function BindTgToken({ botId, tgToken, isGuide }) {
    const [token, setToken] = (0, react_2.useState)('');
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [msg, setMsg] = (0, react_2.useState)({
        success: '',
        error: ''
    });
    const t = (0, next_intl_1.useTranslations)('workshop');
    const onBindTokenClicked = () => {
        if (!botId || isGuide || !token) {
            return;
        }
        setLoading(true);
        setMsg({
            success: '',
            error: ''
        });
        (0, bot_1.bindTgToken)(token, botId)
            .pipe((0, rxjs_1.finalize)(() => {
            setLoading(false);
        }))
            .subscribe({
            error: (e) => {
                const code = e?.response?.data?.code;
                if (code == 400) {
                    setMsg({
                        success: '',
                        error: t('setup_tg_token_token')
                    });
                }
                else if (code == 207) {
                    setMsg({
                        success: t('partial_successful'),
                        error: ''
                    });
                }
                else {
                    setMsg({
                        success: '',
                        error: t('setup_tg_error')
                    });
                }
            },
            next: () => {
                setMsg({
                    success: t('successful'),
                    error: ''
                });
            },
            complete: () => {
                setLoading(false);
            }
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "group flex-1 rounded-[12px] border border-default flex justify-between items-center relative hover:border-surface-container-selected-hovered", children: (0, jsx_runtime_1.jsx)("input", { value: token, disabled: true, className: "bg-transparent placeholder:text-secondary px-[12px] py-[8px] shadow flex-1 rounded-[12px] disabled:cursor-not-allowed focus:placeholder:text-white", onChange: e => setToken(e.target.value), placeholder: tgToken }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", align: "start", description: t('tg_bind_save'), disabled: !!botId, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: true, className: "bg-primary rounded-full px-5 py-2.5 text-white font-bold text-sm h-[36px] flex items-center space-x-2 disabled:opacity-30 disabled:cursor-not-allowed", onClick: () => onBindTokenClicked(), children: [t('bind'), loading && (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "sm" })] }) })] }), (msg.success || msg.error) && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [msg.success && (0, jsx_runtime_1.jsx)("span", { className: "text-[#60D66A]", children: msg.success }), msg.error && (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: msg.error })] }))] }));
}
