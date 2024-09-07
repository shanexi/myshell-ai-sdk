"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BindTweetModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const runtime_config_1 = require("../../../../../common/utils/runtime-config.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const openTweetAuth = () => {
    window.open(`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${runtime_config_1.TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(runtime_config_1.TWITTER_REDIRECT_URL)}&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=${runtime_config_1.TWITTER_CODE_CHALLENGE}&code_challenge_method=plain`);
};
function BindTweetModal({ isOpen, onClose, }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.earn_content.bind_twitter');
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: onClose, hideClose: true, size: "sm", modalOnly: true, children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col justify-center space-y-5 p-5", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", className: "text-center", children: t('connect_your_twitter') }), (0, jsx_runtime_1.jsxs)(button_1.Button, { isBlock: true, color: "brand", onClick: () => {
                        openTweetAuth();
                    }, children: [t('login_with'), (0, jsx_runtime_1.jsx)("i", { className: `bg-[url('/icons/social-media/twitter.svg')] bg-no-repeat bg-center bg-cover flex justify-center items-center w-5 h-5 rounded-sm ml-1.5` })] })] }) }));
}
