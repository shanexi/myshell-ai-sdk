"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageFeedback;
const jsx_runtime_1 = require("react/jsx-runtime");
const HandThumbDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/HandThumbDownIcon"));
const HandThumbUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/HandThumbUpIcon"));
const HandThumbDownIcon_2 = __importDefault(require("@heroicons/react/24/solid/esm/HandThumbDownIcon"));
const HandThumbUpIcon_2 = __importDefault(require("@heroicons/react/24/solid/esm/HandThumbUpIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const MessageContext_1 = require("../../../../../../../chat-new/context/MessageContext");
const StaticContext_1 = require("../../../../../../../chat-new/context/StaticContext");
const definitions_1 = require("../../../../../../../chat-new/model/definitions");
const display_provider_1 = require("../../../../../../../chat-new/views/message-list/components/display-provider");
const button_1 = require("../../../../../../../common/components/ui/button");
const context_menu_1 = require("../../../../../../../common/components/ui/context-menu");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button");
const typography_1 = require("../../../../../../../common/components/ui/typography");
const useFeedback_1 = __importDefault(require("../hooks/useFeedback"));
const FeedbackModal_1 = __importDefault(require("./FeedbackModal"));
const displayTxtMap = {
    Boring: 'boring',
    'Out of Character': 'out_of_character',
    Inaccurate: 'inaccurate',
    Offensive: 'offensive',
    Repetitive: 'repetitive',
    'Incorrect Voice Generation': 'incorrect_voice_generation',
    'Long Waiting Time': 'long_waiting_time',
    'Incorrect Translation': 'incorrect_translation',
    Others: 'others'
};
function NormalRender({ source, onReport }) {
    const reportLocale = (0, next_intl_1.useTranslations)('report');
    return source === 'menubar' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: () => onReport(definitions_1.FeedbackState.LIKED), children: (0, jsx_runtime_1.jsx)(HandThumbUpIcon_1.default, { className: "size-[18px]" }) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: () => onReport(definitions_1.FeedbackState.DISLIKE), children: (0, jsx_runtime_1.jsx)(HandThumbDownIcon_1.default, { className: "size-[18px]" }) })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: () => onReport(definitions_1.FeedbackState.LIKED), children: [(0, jsx_runtime_1.jsx)(HandThumbUpIcon_1.default, { className: "size-5" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2", children: reportLocale('like') })] }), (0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: () => onReport(definitions_1.FeedbackState.DISLIKE), children: [(0, jsx_runtime_1.jsx)(HandThumbDownIcon_1.default, { className: "size-5" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2", children: reportLocale('dislike') })] })] }));
}
function LikedRender({ source, onReport }) {
    const reportLocale = (0, next_intl_1.useTranslations)('report');
    return source === 'menubar' ? ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: () => onReport(definitions_1.FeedbackState.NORMAL), children: (0, jsx_runtime_1.jsx)(HandThumbUpIcon_2.default, { className: "size-[18px] text-brand" }) })) : ((0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: () => onReport(definitions_1.FeedbackState.NORMAL), children: [(0, jsx_runtime_1.jsx)(HandThumbUpIcon_2.default, { className: "size-5 text-brand" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2", children: reportLocale('like') })] }));
}
function DislikeRender({ source, onReport, feedbackIssues, sendFeedback }) {
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const reportLocale = (0, next_intl_1.useTranslations)('report');
    const [modalOpen, setModalOpen] = (0, react_use_1.useToggle)(false);
    const feedbackTxt = (0, react_1.useMemo)(() => {
        return ((feedbackIssues ?? [])
            .map(e => (displayTxtMap[e] ? reportLocale(displayTxtMap[e]) : e))
            ?.join(', ') ?? '');
    }, [feedbackIssues, reportLocale]);
    const handleClick = () => {
        if (feedbackIssues?.length) {
            onReport(definitions_1.FeedbackState.NORMAL);
        }
        else {
            setModalOpen(true);
        }
    };
    const onRemoveDislike = () => {
        onReport(definitions_1.FeedbackState.NORMAL);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [source === 'menubar' ? ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", color: "default", className: "rounded-lg text-critical", onClick: handleClick, icon: HandThumbDownIcon_2.default, iconClassName: "size-[18px] !text-icon-critical", children: feedbackTxt ? feedbackTxt.slice(0, 8) : chatLocale('feedback') })) : ((0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: handleClick, children: [(0, jsx_runtime_1.jsx)(HandThumbDownIcon_2.default, { className: "size-5 text-critical" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "critical", className: "ml-2", children: feedbackTxt ? feedbackTxt.slice(0, 8) : chatLocale('feedback') })] })), (0, jsx_runtime_1.jsx)(FeedbackModal_1.default, { open: modalOpen, onClose: () => setModalOpen(false), onRemoveDislike: onRemoveDislike, onSendFeedback: sendFeedback })] }));
}
function MessageFeedback(props) {
    const { source } = props;
    const { type } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { partialUpdateMessage } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { message } = (0, display_provider_1.useDisplayContext)();
    const feedbackState = message?.feedbackState;
    const feedbackIssues = message?.feedbackIssues;
    const updateFeedbackState = (state) => {
        partialUpdateMessage?.(message.id, {
            feedbackState: state
        });
    };
    const updateFeedbackIssues = (issues) => {
        partialUpdateMessage?.(message.id, {
            feedbackIssues: issues
        });
    };
    const { reportMessage, sendMessageFeedback } = (0, useFeedback_1.default)(type, message.id, updateFeedbackState, updateFeedbackIssues);
    const handleReport = (state) => {
        reportMessage(feedbackState ?? definitions_1.FeedbackState.NORMAL, state);
    };
    const Comp = message?.feedbackState === definitions_1.FeedbackState.LIKED
        ? LikedRender
        : message?.feedbackState === definitions_1.FeedbackState.DISLIKE
            ? DislikeRender
            : NormalRender;
    return ((0, jsx_runtime_1.jsx)(Comp, { source: source, onReport: handleReport, feedbackIssues: feedbackIssues, sendFeedback: sendMessageFeedback }));
}
