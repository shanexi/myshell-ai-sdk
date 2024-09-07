"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PointsDeductionModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const modal_1 = require("../../../../common/components/ui/modal.js");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const common_1 = require("../../../../apis/common.js");
const common_2 = require("../../../../common/constants/interfaces/common.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const useUserSettings_1 = __importDefault(require("../../../../common/hooks/useUserSettings.js"));
const useSeason_1 = __importDefault(require("../../../../hooks/rewards-center/useSeason.js"));
const shell_point_1 = require("../shell-point/index.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const button_1 = require("../../../../common/components/ui/button.js");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const textarea_1 = require("../../../../common/components/ui/textarea.js");
function PointsDeductionModal({ isOpen, onClose, points }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('reward_center.points_deduction');
    const { success, error } = (0, useNotification_1.useNotification)();
    const { seasons } = (0, useSeason_1.default)();
    const { handleDeductionConfirmed } = (0, useUserSettings_1.default)();
    const [step, setStep] = (0, react_1.useState)('notification');
    const [value, setValue] = (0, react_1.useState)();
    const [submitting, setSubmitting] = (0, react_1.useState)(false);
    const prevSeasonName = (0, react_1.useMemo)(() => {
        return seasons ? seasons[0].name : '';
    }, [seasons]);
    const goTo = (step) => {
        setStep(step);
    };
    const handleClose = () => {
        onClose();
        handleDeductionConfirmed(prevSeasonName);
    };
    const handleSubmit = async () => {
        const params = {
            issueType: common_2.ReportIssueType.DEDUCTION_APPEAL,
            entityId: prevSeasonName,
            content: value
        };
        setSubmitting(true);
        const res = await (0, common_1.reportIssueV1)(params);
        if (res.success) {
            success({
                title: t('success_title'),
                content: t('success_desc'),
                isClosable: true
            });
            setSubmitting(false);
            handleClose();
        }
        else {
            error({
                content: res?.reason || ''
            });
            setSubmitting(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: onClose, size: "sm", hideClose: true, children: (0, jsx_runtime_1.jsxs)("div", { className: "p-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-betweenl", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-warning text-3xl grow", children: t('title') }), (0, jsx_runtime_1.jsx)("div", { className: "w-15 h-15 rounded-full flex items-center justify-center shrink-0 bg-[#FFEBD3] dark:bg-[#4F3E2C]", children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ExclamationTriangleIcon_1.default, color: "warning", size: "6xl" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col mt-4 space-y-4", children: [step === 'notification' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-3 text-default text-base", children: [(0, jsx_runtime_1.jsx)("p", { children: t('desc1') }), (0, jsx_runtime_1.jsxs)("p", { children: [t('desc2'), (0, jsx_runtime_1.jsx)("span", { className: "space-x-1.5", children: points.map(({ type, text }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "space-x-1 inline-flex items-center relative top-1", children: (0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { size: 18, type: type }) }), (0, jsx_runtime_1.jsx)("span", { className: "space-x-1 inline-flex items-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-brand font-regular", children: text }) })] }))) }), t('desc3')] }), (0, jsx_runtime_1.jsx)("p", { children: t('desc4') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { color: "warning", onClick: handleClose, isBlock: true, children: t('got_it') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "plain", color: "warning", onClick: () => goTo('appeal'), isBlock: true, children: t('appeal') })] })] })), step === 'appeal' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1.5 items-center", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: ArrowLeftIcon_1.default, onClick: () => goTo('notification'), size: "sm", variant: "ghost", color: "default" }), (0, jsx_runtime_1.jsx)("span", { className: "text-default text-base", children: t('appeal_title') })] }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { placeholder: t('appeal_title'), value: value, onChange: e => setValue(e.target.value) })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { color: "warning", onClick: handleSubmit, isBlock: true, disabled: !value, loading: submitting, children: commonT('submit') })] }))] })] }) }));
}
