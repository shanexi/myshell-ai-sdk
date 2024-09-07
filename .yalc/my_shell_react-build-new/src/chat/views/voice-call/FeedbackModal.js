"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = Rating;
exports.default = FeedbackModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const common_1 = require("../../../apis/common.js");
const modal_1 = require("../../../common/components/ui/modal.js");
const common_2 = require("../../../common/constants/interfaces/common.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
function Rating(props) {
    const clickRef = (0, react_1.useRef)(null);
    let propsRate = props.rate;
    if (propsRate < 0) {
        propsRate = 0;
    }
    if (propsRate > 5) {
        propsRate = 5;
    }
    const [rate, setRate] = (0, react_1.useState)(propsRate);
    const yellowStar = (index) => ((0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 text-yellow-300", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 22 20", children: (0, jsx_runtime_1.jsx)("path", { d: "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" }) }, index));
    const emptyStar = (index) => ((0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 text-gray-300 dark:text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 22 20", children: (0, jsx_runtime_1.jsx)("path", { d: "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" }) }, index));
    const starList = [];
    for (let i = 0; i < rate; i++) {
        starList.push(yellowStar(i));
    }
    for (let i = rate; i < 5; i++) {
        starList.push(emptyStar(i));
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { ref: clickRef, onClick: event => {
                const rect = clickRef.current?.getBoundingClientRect();
                if (!rect) {
                    return;
                }
                const precentage = ((event.clientX - rect?.left) * 5) / (rect?.right - rect?.left);
                const clickRate = precentage < 0.3 ? 0 : Math.ceil(precentage);
                setRate(clickRate);
                props.onRateChange(clickRate);
            }, className: "flex items-center space-x-1", children: starList }) }));
}
function FeedbackModal(props) {
    const { success } = (0, useNotification_1.useNotification)();
    const { botInfo, isOpen, onClose } = props;
    const t = (0, next_intl_1.useTranslations)('chat');
    const [overallRate, setOverallRate] = (0, react_1.useState)(0);
    const [qualityRate, setQualityRate] = (0, react_1.useState)(0);
    const [latencyRate, setLatencyRate] = (0, react_1.useState)(0);
    const [asrRate, setAsrRate] = (0, react_1.useState)(0);
    const [anyFeedback, setAnyFeedback] = (0, react_1.useState)('');
    const onSubmit = async () => {
        const params = {
            issueType: common_2.ReportIssueType.VOICE_CALL_FEEDBACK,
            entityId: botInfo?.id || '0',
            content: JSON.stringify({
                overallRate,
                qualityRate,
                latencyRate,
                asrRate,
                anyFeedback
            })
        };
        const res = await (0, common_1.reportIssueV1)(params);
        if (res.success) {
            success({
                content: t('voice_call_feedback_success')
            });
        }
        onClose();
    };
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, { open: isOpen, onClose: onClose, contentClassName: "z-[149] w-[320px] md:w-[380px]", overlayClassName: "z-[149]", children: [(0, jsx_runtime_1.jsx)("div", { className: "py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "px-5 flex flex-col gap-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-lg text-on-surface", children: t('voice_call_feedback_ask_title') }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary", children: t('voice_call_feedback_ask_subtitle') })] }) }), (0, jsx_runtime_1.jsx)("hr", { className: "border-default" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center py-4 text-on-surface", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between px-4 py-1 w-full", children: [(0, jsx_runtime_1.jsx)("div", { children: t('voice_call_feedback_overall_exp') }), (0, jsx_runtime_1.jsx)(Rating, { rate: 0, onRateChange: setOverallRate })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between px-4 py-1 w-full", children: [(0, jsx_runtime_1.jsx)("div", { children: t('voice_call_feedback_voice_quality') }), (0, jsx_runtime_1.jsx)(Rating, { rate: 0, onRateChange: setQualityRate })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between px-4 py-1 w-full", children: [(0, jsx_runtime_1.jsx)("div", { children: t('voice_call_feedback_latency') }), (0, jsx_runtime_1.jsx)(Rating, { rate: 0, onRateChange: setLatencyRate })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between px-4 py-1 w-full", children: [(0, jsx_runtime_1.jsx)("div", { children: t('voice_call_feedback_asr') }), (0, jsx_runtime_1.jsx)(Rating, { rate: 0, onRateChange: setAsrRate })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-between px-4 py-2 w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "rounded-[12px] border border-default flex h-[120px] py-[8px] px-[12px] relative shadow hover:border-hovered w-full", children: [(0, jsx_runtime_1.jsx)("textarea", { className: "bg-transparent focus:border-none focus:outline-none flex-1 disabled:cursor-not-allowed resize-none", placeholder: t('voice_call_feedback_any_feedback'), value: anyFeedback, onChange: e => {
                                        setAnyFeedback(e.target.value);
                                    }, maxLength: 300 }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-[16px] bottom-1", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#B9B9B9] text-sm", children: `${anyFeedback.length}/300` }) })] }) })] }), (0, jsx_runtime_1.jsx)("hr", { className: "py-2 border-default" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-x-4 flex-row justify-around w-full px-4 py-2 pb-4", children: [(0, jsx_runtime_1.jsx)("button", { className: "flex py-2 flex-grow justify-center items-center rounded-4xl border border-default text-on-surface space-x-1.5", onClick: onClose, children: t('voice_call_feedback_skip') }), (0, jsx_runtime_1.jsx)("button", { className: "flex py-2 flex-grow justify-center items-center rounded-4xl border border-default bg-primary text-white space-x-1.5", onClick: onSubmit, children: t('voice_call_feedback_submit') })] })] }));
}
