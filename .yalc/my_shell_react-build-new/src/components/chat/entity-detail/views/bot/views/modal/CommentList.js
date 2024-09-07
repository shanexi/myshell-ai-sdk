"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentList;
const jsx_runtime_1 = require("react/jsx-runtime");
const BoltIcon_1 = __importDefault(require("@heroicons/react/24/outline/BoltIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_infinite_scroll_component_1 = __importDefault(require("react-infinite-scroll-component"));
const agentPump_1 = require("../../../../../../../apis/agentPump.js");
const icon_1 = require("../../../../../../../common/components/ui/icon.js");
const spinner_1 = __importDefault(require("../../../../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../../../../common/components/ui/typography.js");
const CommentDetail_1 = __importDefault(require("../../../../../../../components/chat/entity-detail/views/bot/views/modal/comments/CommentDetail.js"));
const CommentInput_1 = __importDefault(require("../../../../../../../components/chat/entity-detail/views/bot/views/modal/comments/CommentInput.js"));
const utils_1 = require("../../../../../../../lib/utils.js");
const store_1 = require("../../../../../../../services/store/index.js");
function CommentList(props) {
    const { curve } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const [comments, setComments] = (0, react_1.useState)([]);
    const commentListRef = (0, react_1.useRef)(null);
    const [replyTo, setReplyTo] = (0, react_1.useState)(null);
    const [nextPageToken, setNextPageToken] = (0, react_1.useState)('0');
    const pageSize = 10;
    const [hasMore, setHasMore] = (0, react_1.useState)(true);
    const [showInput, setShowInput] = (0, react_1.useState)(false);
    const [commentsLoading, setCommentsLoading] = (0, react_1.useState)(false);
    const loggedIn = (0, store_1.useUserStore)(state => state.token);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const loadCurveComments = (0, react_1.useCallback)(async () => {
        try {
            setCommentsLoading(true);
            const res = await (0, agentPump_1.listCurveComments)({
                curveId: curve.id,
                listRequest: {
                    pageToken: nextPageToken,
                    pageSize
                }
            });
            if (res.success) {
                setComments(prev => {
                    const newDataMap = new Map();
                    res.data.comments.forEach(comment => {
                        newDataMap.set(comment.id, comment);
                    });
                    const newList = [];
                    prev.forEach(comment => {
                        newList.push(newDataMap.get(comment.id) || comment);
                        newDataMap.delete(comment.id);
                    });
                    res.data.comments.forEach(comment => {
                        if (!newDataMap.has(comment.id)) {
                            return;
                        }
                        newList.push(comment);
                    });
                    return newList;
                });
                setNextPageToken(res.data.listResponse.nextPageToken);
                setHasMore(res.data.listResponse.hasMore);
            }
        }
        catch (error) {
        }
        finally {
            setCommentsLoading(false);
        }
    }, [curve, nextPageToken]);
    const onCommentCreated = (comment) => {
        setComments(prev => [comment, ...prev]);
    };
    const onUpdateComment = (itemNew) => {
        setComments(prev => {
            const index = prev.findIndex(item => item.id === itemNew.id);
            if (index === -1) {
                return prev;
            }
            const newComments = [...prev];
            newComments[index] = { ...newComments[index], ...itemNew };
            return newComments;
        });
    };
    const onReplyCreated = (reply) => {
        const comment = comments.find(c => c.id === reply.commentId);
        if (comment) {
            onUpdateComment({
                ...comment,
                repliesCount: (comment.repliesCount || 0) + 1,
                replies: [reply, ...(comment.replies || [])],
                showReply: true,
                noMoreReplies: comment.showReply ? comment.noMoreReplies : comment.repliesCount <= 0
            });
        }
    };
    const onRemoveComment = (comment) => {
        setComments(prev => prev.filter(item => item.id !== comment.id));
    };
    const handleScroll = (0, react_1.useCallback)(() => {
        if (!commentListRef?.current) {
            return;
        }
        const rect = commentListRef.current.getBoundingClientRect();
        setShowInput(window.innerHeight - rect.top > Math.min(280, window.innerHeight - 108));
    }, [commentListRef]);
    (0, react_1.useEffect)(() => {
        document.body.addEventListener('scroll', handleScroll, true);
        return () => {
            document.body.removeEventListener('scroll', handleScroll, true);
        };
    }, [handleScroll]);
    (0, react_1.useEffect)(() => {
        loadCurveComments().then(() => {
            handleScroll();
        });
    }, [handleScroll, loadCurveComments]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: commentListRef, id: "commentListContent", className: "w-full flex flex-col h-1 min-h-[calc(100vh-108px)]", children: [!hasMore && comments.length === 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col items-center gap-3 pt-10", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: BoltIcon_1.default, color: "subtle", size: "4xl" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "subtlest", children: t('curve_comments.empty') })] })), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex-1 py-2", children: (0, jsx_runtime_1.jsx)(react_infinite_scroll_component_1.default, { className: "w-full overflow-y-auto space-y-3 no-scrollbar", dataLength: comments.length, next: loadCurveComments, hasMore: hasMore || false, loader: hasMore ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-center items-center py-10", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { color: "brand", speed: "fast" }) })) : null, children: comments.map(comment => ((0, jsx_runtime_1.jsx)("div", { className: "w-full py-2 mb-2", children: (0, jsx_runtime_1.jsx)(CommentDetail_1.default, { comment: comment, onReplyTo: (target) => {
                                setReplyTo(target);
                            }, onUpdateComment: onUpdateComment, onRemoveComment: onRemoveComment, enableInput: (!!loggedIn && (curve.holdInfo?.holdCount || 0) > 0) || (!!userId && curve.creator.id === userId) }, comment.id) }, comment.id))) }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('sticky bottom-0 -mb-20 w-[calc(100%+48px)] pb-3 -ml-6 px-6 pt-3 border-t border-default', showInput ? '' : 'hidden', 'bg-surface-default'), children: (0, jsx_runtime_1.jsx)(CommentInput_1.default, { curveId: curve?.id, enable: (!!loggedIn && (curve.holdInfo?.holdCount || 0) > 0) || (!!userId && curve.creator?.id === userId), onCommentCreated: onCommentCreated, replyTo: replyTo, onClearReplyTo: () => {
                        setReplyTo(null);
                    }, onReplyCreated: onReplyCreated }) })] }));
}
