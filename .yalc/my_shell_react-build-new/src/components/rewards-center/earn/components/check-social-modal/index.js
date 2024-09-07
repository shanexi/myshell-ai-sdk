"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CheckSocialModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const QuestionMarkCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/QuestionMarkCircleIcon"));
const lodash_es_1 = require("lodash-es");
const react_1 = require("react");
const use_intl_1 = require("use-intl");
const task_1 = require("../../../../../apis/task.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const icon_1 = require("../../../../../common/components/ui/icon.js");
const input_1 = require("../../../../../common/components/ui/input.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const tooltip_1 = require("../../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const task_2 = require("../../../../../common/constants/enums/task.js");
const useNotification_1 = require("../../../../../common/hooks/useNotification.js");
const store_1 = require("../../../../../services/store/index.js");
function CheckSocialModal({ isOpen, onClose }) {
    const t = (0, use_intl_1.useTranslations)('reward_center.earn_content.check_social_media');
    const { error } = (0, useNotification_1.useNotification)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [postLink, setPostLink] = (0, react_1.useState)('');
    const [shareLink, setShareLink] = (0, react_1.useState)('');
    const [showError, setShowError] = (0, react_1.useState)({});
    const taskList = (0, store_1.useTaskStore)(state => state.taskList);
    const setTaskList = (0, store_1.useTaskStore)(state => state.setTaskList);
    const setCount = () => {
        setTaskList(taskList.map(task => {
            if (task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE && task.taskInfo) {
                const verifyingCount = task.taskInfo?.verifyingMediaShareRecordsCount || 0;
                const recordCount = task.taskInfo?.notClaimableMediaShareRecordsCount || 0;
                return {
                    ...task,
                    taskInfo: {
                        ...task.taskInfo,
                        verifyingMediaShareRecordsCount: verifyingCount + 1,
                        notClaimableMediaShareRecordsCount: recordCount + 1
                    }
                };
            }
            return task;
        }));
    };
    const onValidate = () => {
        const error = {};
        if (postLink.length > 0 && !/^https?:\/\/((twitter)|x)\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/.test(postLink)) {
            error.isInVaildPostLink = true;
        }
        if (shareLink.length > 0 && !/^https:\/\/app\.myshell\.ai\//.test(shareLink)) {
            error.isInVaildShareLink = true;
        }
        setShowError(error);
    };
    const onSubmit = async () => {
        if (postLink && shareLink) {
            try {
                setLoading(true);
                const { success, reason, msg } = await (0, task_1.createMediaShareRecord)(postLink, shareLink);
                if (success) {
                    onClose(success);
                    setShowError({});
                    setCount();
                    setPostLink('');
                    setShareLink('');
                }
                else if (reason === 'ERROR_REASON_INVALID_TWEET' || reason === 'ERROR_REASON_INVALID_TWEET_AUTHOR') {
                    setShowError({ isInValidTweet: true });
                }
                else if (reason === 'ERROR_REASON_TWITTER_AUTHOR_NOT_VERIFIED') {
                    setShowError({ isAuthorNotVerified: true });
                }
                else if (reason === 'ERROR_REASON_TWITTER_API_BUSY') {
                    setShowError({ isTweetBusy: true });
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
                setLoading(false);
            }
        }
    };
    const onCancel = () => {
        onClose(false);
    };
    (0, react_1.useEffect)(onValidate, [postLink, shareLink]);
    const hasError = !(0, lodash_es_1.isEmpty)(showError);
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, { open: isOpen, onClose: () => onClose(false), title: t('submit_links'), size: "sm", modalOnly: false, children: [(0, jsx_runtime_1.jsx)(modal_1.ModalBody, { className: "px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h5", children: t('link_to_tweet') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('link_to_tweet_tips'), contentClassName: "z-[1000]", children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: QuestionMarkCircleIcon_1.default, color: "subtlest", className: "ml-0.5" }) })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { "aria-invalid": showError?.isInVaildPostLink ||
                                        showError?.isInValidTweet ||
                                        showError?.isAuthorNotVerified ||
                                        showError.isInValidTweet, value: postLink, placeholder: t('link_to_tweet_placeholder'), onChange: e => setPostLink(e.target.value) }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full line-clamp-1 break-all", children: [showError?.isInVaildPostLink && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: t('link_to_tweet_link_invalid') })), showError?.isAuthorNotVerified && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: t('link_to_tweet_author_not_verified') })), showError?.isInValidTweet && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: t('link_to_tweet_tweet_invalid') })), showError?.isTweetBusy && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: t('link_to_tweet_tweet_busy') }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h5", children: t('myshell_sharing_link') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('myshell_sharing_link_tips'), contentClassName: "z-[1000]", children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: QuestionMarkCircleIcon_1.default, color: "subtlest", className: "ml-0.5" }) })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { "aria-invalid": showError?.isInVaildShareLink, value: shareLink, placeholder: t('myshell_sharing_link_invalid'), onChange: e => setShareLink(e.target.value) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full line-clamp-1 break-all", children: showError?.isInVaildShareLink && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "critical", children: t('myshell_sharing_link_invalid') })) })] })] }) }), (0, jsx_runtime_1.jsxs)(modal_1.ModalFooter, { className: "flex gap-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { size: "lg", className: "flex-1", color: "gray", onClick: onCancel, children: t('cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "lg", className: "flex-1", color: "brand", loading: loading, disabled: hasError || !postLink || !shareLink, onClick: () => onSubmit(), children: t('confirm') })] })] }));
}
