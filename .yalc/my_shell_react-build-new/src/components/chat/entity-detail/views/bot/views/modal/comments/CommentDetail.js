"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDownIcon"));
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronUpIcon"));
const EllipsisHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/EllipsisHorizontalIcon"));
const clsx_1 = __importDefault(require("clsx"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const agentPump_1 = require("../../../../../../../../apis/agentPump.js");
const apiTypes_1 = require("../../../../../../../../apis/apiTypes.js");
const common_1 = require("../../../../../../../../apis/common.js");
const ImgVideoPreview_1 = __importDefault(require("../../../../../../../../chat/views/chat-body/file-display/img-video/preview/ImgVideoPreview.js"));
const FromNowTime_1 = __importDefault(require("../../../../../../../../common/components/FromNowTime.js"));
const ArrowTurnDownRight_1 = __importDefault(require("../../../../../../../../common/components/icons/rewards-center/ArrowTurnDownRight.js"));
const Interaction_1 = __importDefault(require("../../../../../../../../common/components/icons/rewards-center/Interaction.js"));
const DeleteIcon_1 = __importDefault(require("../../../../../../../../common/components/icons/workshop/DeleteIcon.js"));
const avatar_1 = require("../../../../../../../../common/components/ui/avatar.js");
const button_1 = require("../../../../../../../../common/components/ui/button.js");
const dropdown_menu_1 = require("../../../../../../../../common/components/ui/dropdown-menu.js");
const icon_1 = require("../../../../../../../../common/components/ui/icon.js");
const icon_button_1 = require("../../../../../../../../common/components/ui/icon-button.js");
const modal_1 = require("../../../../../../../../common/components/ui/modal.js");
const spinner_1 = __importDefault(require("../../../../../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../../../../../common/components/ui/typography.js");
const useNotification_1 = require("../../../../../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../../../../../common/utils/common-helper.js");
const utils_1 = require("../../../../../../../../lib/utils.js");
function CommentDetail(props) {
    const { comment, onReplyTo, isReply, onUpdateComment, onRemoveComment, enableInput } = props;
    const [nextPageToken, setNextPageToken] = (0, react_1.useState)('0');
    const pageSize = 5;
    const [loadingReplies, setLoadingReplies] = (0, react_1.useState)(false);
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const tCommon = (0, next_intl_1.useTranslations)('common');
    const { warning } = (0, useNotification_1.useNotification)();
    const [toDeleteItem, setToDeleteItem] = (0, react_1.useState)(null);
    const [openDeleteDialog, setOpenDeleteDialog] = (0, react_1.useState)(false);
    const [deleteContentLoading, setDeleteContentLoading] = (0, react_1.useState)(false);
    const [viewModalVisible, setViewModalVisible] = (0, react_1.useState)(false);
    const interactionMap = new Map([
        [apiTypes_1.InteractionType.INTERACTION_TYPE_LIKE, '👍'],
        [apiTypes_1.InteractionType.INTERACTION_TYPE_SAD, '😢'],
        [apiTypes_1.InteractionType.INTERACTION_TYPE_HAPPY, '😂'],
        [apiTypes_1.InteractionType.INTERACTION_TYPE_SURPRISED, '😮'],
        [apiTypes_1.InteractionType.INTERACTION_TYPE_ANGRY, '😠'],
        [apiTypes_1.InteractionType.INTERACTION_TYPE_FIRE, '🔥'],
        [apiTypes_1.InteractionType.INTERACTION_TYPE_HEART, '❤️'],
        [apiTypes_1.InteractionType.INTERACTION_TYPE_ROCKET, '🚀']
    ]);
    const previewUrl = (0, react_1.useMemo)(() => {
        if (comment.medias && Array.isArray(comment.medias) && comment.medias[0]) {
            return comment.medias[0]?.url;
        }
        return '';
    }, []);
    const createInteraction = async (interactionType) => {
        const interaction = comment.interactionStats.find(item => {
            return item.interactionType === interactionType;
        });
        let revert = () => { };
        if (interaction) {
            if (!interaction.currentUserInteracted) {
                interaction.count += 1;
                interaction.currentUserInteracted = true;
                revert = () => {
                    interaction.count -= 1;
                    interaction.currentUserInteracted = false;
                    onUpdateComment({ id: comment.id, interactionStats: [...comment.interactionStats] });
                };
            }
        }
        else {
            comment.interactionStats = [
                ...comment.interactionStats,
                {
                    count: 1,
                    interactionType,
                    currentUserInteracted: true
                }
            ];
            revert = () => {
                comment.interactionStats = comment.interactionStats.filter(item => {
                    return item.interactionType !== interactionType;
                });
                onUpdateComment({ id: comment.id, interactionStats: [...comment.interactionStats] });
            };
        }
        onUpdateComment({ id: comment.id, interactionStats: [...comment.interactionStats] });
        try {
            const res = await (0, agentPump_1.createCommentInteraction)({
                targetId: comment.id,
                targetType: isReply ? apiTypes_1.TargetType.TARGET_TYPE_REPLY : apiTypes_1.TargetType.TARGET_TYPE_COMMENT,
                interactType: interactionType
            });
            if (!res.success) {
                revert();
            }
        }
        catch (error) {
            revert();
        }
        finally {
        }
    };
    const onClickReply = (0, react_1.useCallback)((commentParam) => {
        if (!enableInput) {
            warning({ content: t('curve_comments.only_holders_can_reply') });
        }
        onReplyTo?.(commentParam);
    }, [enableInput, onReplyTo, t, warning]);
    const cancelInteraction = async (interactionType) => {
        const interaction = comment.interactionStats.find(item => {
            return item.interactionType === interactionType && item.currentUserInteracted;
        });
        if (!interaction) {
            return;
        }
        interaction.count -= 1;
        interaction.currentUserInteracted = false;
        onUpdateComment({ id: comment.id, interactionStats: [...comment.interactionStats] });
        const revert = () => {
            interaction.count += 1;
            interaction.currentUserInteracted = true;
            onUpdateComment({ id: comment.id, interactionStats: [...comment.interactionStats] });
        };
        try {
            const res = await (0, agentPump_1.cancelCommentInteraction)({
                targetId: comment.id,
                targetType: isReply ? apiTypes_1.TargetType.TARGET_TYPE_REPLY : apiTypes_1.TargetType.TARGET_TYPE_COMMENT,
                interactType: interactionType
            });
            if (!res.success) {
                revert();
            }
        }
        catch (error) {
            revert();
        }
        finally {
        }
    };
    const loadReplies = (0, react_1.useCallback)(async () => {
        try {
            setLoadingReplies(true);
            const res = await (0, agentPump_1.listReplies)({
                commentId: comment.id,
                listRequest: {
                    pageToken: nextPageToken,
                    pageSize
                }
            });
            if (res.success) {
                const newDataMap = new Map();
                res.data.replies.forEach(reply => {
                    newDataMap.set(reply.id, reply);
                });
                const newList = [];
                (comment.replies || []).forEach(reply => {
                    newList.push(newDataMap.get(reply.id) || reply);
                    newDataMap.delete(reply.id);
                });
                res.data.replies.forEach(reply => {
                    if (!newDataMap.has(reply.id)) {
                        return;
                    }
                    newList.push(reply);
                });
                onUpdateComment({ id: comment.id, replies: newList, noMoreReplies: !res.data.listResponse.hasMore });
                setNextPageToken(res.data.listResponse.nextPageToken);
            }
        }
        catch (error) {
        }
        finally {
            setLoadingReplies(false);
        }
    }, [comment, nextPageToken, onUpdateComment]);
    const toggleShowReply = (0, react_1.useCallback)(() => {
        const typedComment = comment;
        let commentNew = {};
        if (typedComment.showReply) {
            commentNew = { replies: [], noMoreReplies: false };
            setNextPageToken('0');
        }
        else {
            loadReplies().then();
        }
        onUpdateComment({ id: comment.id, ...commentNew, showReply: !typedComment.showReply });
    }, [comment, loadReplies, onUpdateComment]);
    const onOpenDeleteDialog = (item) => {
        setToDeleteItem(item);
        setOpenDeleteDialog(true);
    };
    const onDeleteContent = (0, react_1.useCallback)(async () => {
        if (!toDeleteItem) {
            return;
        }
        setDeleteContentLoading(true);
        try {
            const res = await (0, agentPump_1.deleteComment)({
                targetId: toDeleteItem.id,
                targetType: isReply ? apiTypes_1.TargetType.TARGET_TYPE_REPLY : apiTypes_1.TargetType.TARGET_TYPE_COMMENT
            });
            if (res.success) {
                onRemoveComment(toDeleteItem);
                setOpenDeleteDialog(false);
            }
        }
        catch (error) {
        }
        finally {
            setDeleteContentLoading(false);
        }
    }, [isReply, onRemoveComment, toDeleteItem]);
    const onRemoveReply = (replyItem) => {
        const typedComment = comment;
        const replies = typedComment.replies || [];
        onUpdateComment({
            id: comment.id,
            repliesCount: typedComment.repliesCount - 1,
            replies: replies.filter(reply => reply.id !== replyItem.id)
        });
    };
    const onUpdateReply = (reply) => {
        const typedComment = comment;
        const replies = typedComment.replies || [];
        const index = replies.findIndex(item => item.id === reply.id);
        if (index === -1) {
            return;
        }
        const newReplies = [...replies];
        newReplies[index] = { ...newReplies[index], ...reply };
        onUpdateComment({ id: comment.id, replies: newReplies });
    };
    const escapeHTML = (input) => {
        return input.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, function (tag) {
            return tag.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        });
    };
    const typedComment = comment;
    let showUserName = comment.userMini?.name || '';
    if (showUserName.length > 15) {
        showUserName = `${showUserName.slice(0, 15)}...`;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-row gap-3", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "lg", variant: "user", src: (0, common_helper_1.getAssetsUrl)(comment.userMini?.avatarUrl), className: "grow-0 shrink-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex-1 flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-fit flex flex-row gap-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "brand", children: showUserName }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "subtlest", children: (0, jsx_runtime_1.jsx)(FromNowTime_1.default, { time: `${comment.createdAt}` }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "regular", color: "default", dangerous: true, className: (0, utils_1.cn)('text-wrap', Math.max(...(comment.content || '').split(' ').map(x => x.length)) > 20 ? 'break-all' : 'break-words'), children: escapeHTML(comment.content).replaceAll('\n', '<br />') }), previewUrl && comment.medias[0]?.type === 'MEDIA_TYPE_IMAGE' ? ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('max-h-[300px] max-w-[200px] min-h-[96px] min-w-[96px] overflow-hidden my-2'), onClick: () => {
                                    setViewModalVisible(true);
                                }, children: (0, jsx_runtime_1.jsx)(image_1.default, { src: previewUrl, alt: "comment_img", layout: "responsive", width: 200, height: 300, objectFit: "contain" }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-fit flex flex-row flex-wrap gap-2 mt-2", children: [comment.interactionStats &&
                                comment.interactionStats
                                    .filter(item => {
                                    return !!item.count;
                                })
                                    .map(interaction => ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('px-2 rounded-lg flex flex-row justify-center items-center gap-1 border cursor-pointer', interaction.currentUserInteracted
                                        ? 'border-brand bg-surface-accent-blue-subtler'
                                        : 'border-default hover:bg-surface-hovered'), onClick: () => {
                                        if (interaction.currentUserInteracted) {
                                            cancelInteraction(interaction.interactionType).then();
                                        }
                                        else {
                                            createInteraction(interaction.interactionType).then();
                                        }
                                    }, children: [(0, jsx_runtime_1.jsx)("span", { children: interactionMap.get(interaction.interactionType) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: interaction.currentUserInteracted ? 'brand' : 'default', children: interaction.count })] }, interaction.interactionType))), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, className: "data-[state=open]:bg-surface-hovered border border-default rounded-lg", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: Interaction_1.default, size: "sm", variant: "ghost", color: "default" }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { side: "bottom", align: "start", className: "p-0 border border-default shadow-background-default min-w-0", children: (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { className: "p-1 rounded-2 focus:bg-transparent", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-start items-center gap-1", children: [...interactionMap.keys()].map(item => ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "plain", size: "sm", color: "default", className: "h-7 w-7 p-1 text-base", onClick: () => {
                                                        createInteraction(item).then();
                                                    }, children: interactionMap.get(item) }, item))) }) }) })] }), !isReply && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: outline_1.ChatBubbleOvalLeftIcon, size: "sm", variant: "ghost", color: "default", className: "border border-default rounded-lg", onClick: () => {
                                    onClickReply(typedComment);
                                } })), comment.currentLoginUserCanDelete && ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, className: "data-[state=open]:bg-surface-hovered border border-default rounded-lg", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: EllipsisHorizontalIcon_1.default, size: "sm", variant: "ghost", color: "default" }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { side: "bottom", align: "start", className: "min-w-0", children: (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { className: "p-1 rounded-2", onClick: () => {
                                                onOpenDeleteDialog(typedComment);
                                            }, children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full px-2 py-1 flex justify-start items-center gap-2", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: DeleteIcon_1.default, size: "lg", color: "critical" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "critical", className: "text-base", children: tCommon('delete') })] }) }) })] }))] }), !isReply && typedComment.repliesCount > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "w-fit flex flex-row items-center gap-1 p-0.5 cursor-pointer", onClick: toggleShowReply, children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: typedComment.showReply ? ChevronUpIcon_1.default : ChevronDownIcon_1.default, size: "sm", color: "brand" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "brand", children: typedComment.repliesCount > 1
                                    ? t('curve_comments.reply', { count: typedComment.repliesCount })
                                    : t('curve_comments.replies', { count: typedComment.repliesCount }) })] })), !isReply &&
                        typedComment.showReply &&
                        typedComment.repliesCount > 0 &&
                        (typedComment.replies || []).map(reply => ((0, jsx_runtime_1.jsx)(CommentDetail, { comment: reply, isReply: true, onUpdateComment: onUpdateReply, onRemoveComment: onRemoveReply }, reply.id))), !isReply && typedComment.showReply && loadingReplies && ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex flex-row justify-center items-center py-4", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { color: "brand", speed: "fast" }) })), !isReply && typedComment.showReply && !loadingReplies && !typedComment.noMoreReplies && ((0, jsx_runtime_1.jsxs)("div", { className: "w-fit flex flex-row items-center gap-1 p-0.5 cursor-pointer", onClick: loadReplies, children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ArrowTurnDownRight_1.default, size: "sm", color: "brand" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "brand", children: t('curve_comments.show_more_items') })] }))] }), viewModalVisible && ((0, jsx_runtime_1.jsx)(ImgVideoPreview_1.default, { open: viewModalVisible, onClose: () => {
                    setViewModalVisible(false);
                }, imgVideoList: [
                    {
                        type: common_1.EmbedObjType.IMAGE,
                        status: common_1.EmbedObjStatus.DONE,
                        iconUrl: '',
                        url: previewUrl,
                        title: '',
                        extensionName: ''
                    }
                ], activeIndex: 0 })), (0, jsx_runtime_1.jsx)(modal_1.Modal, { open: openDeleteDialog, confirmLoading: deleteContentLoading, isNotification: true, title: t('curve_comments.delete_dialog_title'), state: "warning", description: t('curve_comments.delete_dialog_desc'), onClose: () => {
                    setOpenDeleteDialog(false);
                }, onConfirm: onDeleteContent, overlayClose: false, cancelText: tCommon('cancel'), confirmText: tCommon('confirm') })] }));
}
