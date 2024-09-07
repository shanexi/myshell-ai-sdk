"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CheckTweetModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const task_1 = require("../../../../../apis/task.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const input_1 = require("../../../../../common/components/ui/input.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const useNotification_1 = require("../../../../../common/hooks/useNotification.js");
function CheckTweetModal({ isOpen, text, onClose }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.earn_content.check_twitter');
    const [twUrl, setTwUrl] = (0, react_1.useState)('');
    const [checking, setChecking] = (0, react_1.useState)(false);
    const [showError, setShowError] = (0, react_1.useState)({});
    const { error } = (0, useNotification_1.useNotification)();
    const share = async () => {
        window.open(`https://x.com/intent/post?text=${text}`);
    };
    const checkTaskTweetHandle = async () => {
        setChecking(true);
        try {
            const { success, reason, msg } = await (0, task_1.verifyTweet)(twUrl);
            if (success) {
                onClose(success);
                setShowError({});
            }
            else if (reason === 'ERROR_REASON_INVALID_TWEET_AUTHOR' || reason === 'ERROR_REASON_INVALID_TWEET') {
                setShowError({ isInValidTweet: true, msg });
            }
            else if (reason === 'ERROR_REASON_TWITTER_AUTHOR_NOT_VERIFIED') {
                setShowError({ isAuthorNotVerified: true, msg });
            }
            else if (reason === 'ERROR_REASON_TWITTER_API_BUSY') {
                setShowError({ isTweetBusy: true, msg });
            }
            else if (reason === 'ERROR_REASON_USER_NOT_QUALIFIED') {
                onClose(success, true);
            }
            else {
                error({ content: msg || reason || '' });
            }
        }
        catch (e) {
        }
        finally {
            setChecking(false);
        }
    };
    (0, react_1.useEffect)(() => {
        if (twUrl.length > 0 && !/^https?:\/\/((twitter)|x)\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/.test(twUrl)) {
            setShowError({ isInVaildPostLink: true });
        }
        else {
            setShowError({});
        }
    }, [twUrl]);
    const hasError = !(0, lodash_es_1.isEmpty)(showError);
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: () => onClose(false), size: "sm", modalOnly: false, children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col justify-center space-y-4 py-5 px-4", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: t('submit_link') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-5 h-5 rounded-full border-2 border-brand" }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-full border border-default" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1.5 pb-6 flex-1", children: [(0, jsx_runtime_1.jsx)(typography_1.SubHeading, { size: "lg", color: "brand", children: t('setp_1') }), (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h5", children: t('share_a_tweet') }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", color: "default", onClick: () => share(), children: [(0, jsx_runtime_1.jsx)("i", { className: `bg-[url('/icons/social-media/twitter.svg')] bg-no-repeat bg-center bg-cover flex justify-center items-center w-5 h-5 rounded-sm mr-1.5` }), t('share_a_tweet_on_x')] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-5 h-5 rounded-full border-2 border-brand" }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-full border border-default" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1.5 pb-3 flex-1", children: [(0, jsx_runtime_1.jsx)(typography_1.SubHeading, { size: "lg", color: "brand", children: t('setp_2') }), (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h5", children: t('input_your_shared_twitter_link_here') }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "https://x.com/xx/xx/xx", value: twUrl, onChange: e => {
                                                    setTwUrl(e.target.value);
                                                } }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full line-clamp-1 break-all", children: [showError?.isInVaildPostLink && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: t('link_to_tweet_link_invalid') })), showError?.isAuthorNotVerified && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: showError.msg || t('link_to_tweet_author_not_verified') })), showError?.isInValidTweet && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: showError.msg || t('link_to_tweet_tweet_invalid') })), showError?.isTweetBusy && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: showError.msg || t('link_to_tweet_tweet_busy') }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-5" }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-full border border-default" })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-1.5 flex-1", children: (0, jsx_runtime_1.jsx)(button_1.Button, { disabled: !(!!twUrl && !hasError), loading: checking, onClick: async () => checkTaskTweetHandle(), className: "mt-3 w-full", children: t('check') }) })] })] })] }) }) }));
}
