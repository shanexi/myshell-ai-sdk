import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import HandThumbDownIcon from '@heroicons/react/24/outline/HandThumbDownIcon';
import HandThumbUpIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import HandThumbDownSolidIcon from '@heroicons/react/24/solid/HandThumbDownIcon';
import HandThumbUpSolidIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import { useTranslations } from 'next-intl';
import { useContext, useMemo } from 'react';
import { useToggle } from 'react-use';
import { MessageContext } from '../../../../../../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../../../../../../chat-new/context/StaticContext.js';
import { FeedbackState } from '../../../../../../../chat-new/model/definitions.js';
import { useDisplayContext } from '../../../../../../../chat-new/views/message-list/components/display-provider/index.js';
import { Button } from '../../../../../../../common/components/ui/button.js';
import { ContextMenuItem } from '../../../../../../../common/components/ui/context-menu.js';
import { IconButton } from '../../../../../../../common/components/ui/icon-button.js';
import { Text } from '../../../../../../../common/components/ui/typography.js';
import useFeedback from '../hooks/useFeedback.js';
import FeedbackModal from './FeedbackModal.js';
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
    const reportLocale = useTranslations('report');
    return source === 'menubar' ? (_jsxs(_Fragment, { children: [_jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: () => onReport(FeedbackState.LIKED), children: _jsx(HandThumbUpIcon, { className: "size-[18px]" }) }), _jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: () => onReport(FeedbackState.DISLIKE), children: _jsx(HandThumbDownIcon, { className: "size-[18px]" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs(ContextMenuItem, { onClick: () => onReport(FeedbackState.LIKED), children: [_jsx(HandThumbUpIcon, { className: "size-5" }), _jsx(Text, { className: "ml-2", children: reportLocale('like') })] }), _jsxs(ContextMenuItem, { onClick: () => onReport(FeedbackState.DISLIKE), children: [_jsx(HandThumbDownIcon, { className: "size-5" }), _jsx(Text, { className: "ml-2", children: reportLocale('dislike') })] })] }));
}
function LikedRender({ source, onReport }) {
    const reportLocale = useTranslations('report');
    return source === 'menubar' ? (_jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: () => onReport(FeedbackState.NORMAL), children: _jsx(HandThumbUpSolidIcon, { className: "size-[18px] text-brand" }) })) : (_jsxs(ContextMenuItem, { onClick: () => onReport(FeedbackState.NORMAL), children: [_jsx(HandThumbUpSolidIcon, { className: "size-5 text-brand" }), _jsx(Text, { className: "ml-2", children: reportLocale('like') })] }));
}
function DislikeRender({ source, onReport, feedbackIssues, sendFeedback }) {
    const chatLocale = useTranslations('chat');
    const reportLocale = useTranslations('report');
    const [modalOpen, setModalOpen] = useToggle(false);
    const feedbackTxt = useMemo(() => {
        return ((feedbackIssues ?? [])
            .map(e => (displayTxtMap[e] ? reportLocale(displayTxtMap[e]) : e))
            ?.join(', ') ?? '');
    }, [feedbackIssues, reportLocale]);
    const handleClick = () => {
        if (feedbackIssues?.length) {
            onReport(FeedbackState.NORMAL);
        }
        else {
            setModalOpen(true);
        }
    };
    const onRemoveDislike = () => {
        onReport(FeedbackState.NORMAL);
    };
    return (_jsxs(_Fragment, { children: [source === 'menubar' ? (_jsx(Button, { variant: "outline", size: "sm", color: "default", className: "rounded-lg text-critical", onClick: handleClick, icon: HandThumbDownSolidIcon, iconClassName: "size-[18px] !text-icon-critical", children: feedbackTxt ? feedbackTxt.slice(0, 8) : chatLocale('feedback') })) : (_jsxs(ContextMenuItem, { onClick: handleClick, children: [_jsx(HandThumbDownSolidIcon, { className: "size-5 text-critical" }), _jsx(Text, { color: "critical", className: "ml-2", children: feedbackTxt ? feedbackTxt.slice(0, 8) : chatLocale('feedback') })] })), _jsx(FeedbackModal, { open: modalOpen, onClose: () => setModalOpen(false), onRemoveDislike: onRemoveDislike, onSendFeedback: sendFeedback })] }));
}
export default function MessageFeedback(props) {
    const { source } = props;
    const { type } = useContext(StaticContext);
    const { partialUpdateMessage } = useContext(MessageContext);
    const { message } = useDisplayContext();
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
    const { reportMessage, sendMessageFeedback } = useFeedback(type, message.id, updateFeedbackState, updateFeedbackIssues);
    const handleReport = (state) => {
        reportMessage(feedbackState ?? FeedbackState.NORMAL, state);
    };
    const Comp = message?.feedbackState === FeedbackState.LIKED
        ? LikedRender
        : message?.feedbackState === FeedbackState.DISLIKE
            ? DislikeRender
            : NormalRender;
    return (_jsx(Comp, { source: source, onReport: handleReport, feedbackIssues: feedbackIssues, sendFeedback: sendMessageFeedback }));
}
