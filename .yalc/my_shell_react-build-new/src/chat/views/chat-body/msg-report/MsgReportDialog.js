"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgReportDialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const modal_1 = require("../../../../common/components/ui/modal.js");
const items = [
    {
        label: 'boring',
        text: 'Boring',
        checked: false
    },
    {
        label: 'out_of_character',
        text: 'Out of Character',
        checked: false
    },
    {
        label: 'inaccurate',
        text: 'Inaccurate',
        checked: false
    },
    {
        label: 'incorrect_voice_generation',
        text: 'Incorrect Voice Generation',
        checked: false
    },
    {
        label: 'long_waiting_time',
        text: 'Long Waiting Time',
        checked: false
    },
    {
        label: 'offensive',
        text: 'Offensive',
        checked: false
    },
    {
        label: 'repetitive',
        text: 'Repetitive',
        checked: false
    },
    {
        label: 'incorrect_translation',
        text: 'Incorrect Translation',
        checked: false
    }
];
const imageItems = [
    {
        label: 'poor_image_quality',
        text: 'Poor Image Quality',
        checked: false
    },
    {
        label: 'slow_generation',
        text: 'Slow Generation',
        checked: false
    },
    {
        label: 'not_meet_requirements',
        text: 'Does Not Meet Requirements',
        checked: false
    },
    {
        label: 'inappropriate_content',
        text: 'Inappropriate Content',
        checked: false
    }
];
exports.MsgReportDialog = (0, react_2.forwardRef)(({ children, onConfirm, type, handleClose, removeDislike }, ref) => {
    const { isOpen, onOpen, onClose } = (0, react_1.useDisclosure)();
    const cancelRef = (0, react_2.useRef)(null);
    const [othersDetail, setOthersDetail] = (0, react_2.useState)('');
    const initialItems = type === 'image' ? imageItems : items;
    const [values, setValues] = (0, react_2.useState)(initialItems);
    const t = (0, next_intl_1.useTranslations)('report');
    (0, react_2.useImperativeHandle)(ref, () => ({
        show() {
            onOpen();
        }
    }));
    const handleToggleBtn = (item) => {
        setValues((prev) => {
            const newPayload = [...prev];
            return newPayload.map(v => {
                if (v.label === item.label) {
                    return {
                        ...v,
                        checked: !v.checked
                    };
                }
                return v;
            });
        });
    };
    const closeCallback = () => {
        onClose();
        setOthersDetail('');
        setValues(initialItems);
        if (handleClose) {
            handleClose();
        }
    };
    const handleConfirm = () => {
        closeCallback();
        const issues = {};
        for (const v of values) {
            issues[v.text] = v.checked;
        }
        onConfirm({
            issues,
            othersDetail
        });
    };
    const handleRemoveDislike = () => {
        removeDislike && removeDislike();
        closeCallback();
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [children, (0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: closeCallback, hideClose: true, size: "md", contentClassName: "z-[210]", overlayClassName: "z-[210]", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-default p-3", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "20px", lineHeight: "28px", fontWeight: "400", children: t('tell_us_more') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", fontWeight: "400", className: "text-secondary", children: t('report_msg_tips') })] }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsxs)(react_1.Box, { padding: "12px", className: "space-y-[12px]", children: [(0, jsx_runtime_1.jsx)(react_1.Flex, { alignItems: "center", gap: "12px", flexWrap: "wrap", children: values.map((item, index) => {
                                        return ((0, jsx_runtime_1.jsx)(CustomCheckBoxButton, { label: t(item.label), isDisabled: false, isChecked: item.checked, onChange: () => handleToggleBtn(item) }, index));
                                    }) }), (0, jsx_runtime_1.jsx)(react_1.Text, { children: t('others_that_apply') }), (0, jsx_runtime_1.jsxs)(react_1.Box, { border: "1px solid var(--border)", p: "8px 12px", rounded: "12px", boxShadow: "0px 1px 2px 0px #0000001A", position: "relative", children: [(0, jsx_runtime_1.jsx)(react_1.Textarea, { value: othersDetail, onChange: e => setOthersDetail(e.target.value), autoFocus: false, variant: "unstyled", p: 0, h: "120px", fontSize: "14px", lineHeight: "20px", resize: "none", placeholder: t('placeholder_tips'), color: "#6D7175", maxLength: 200 }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-[16px] bottom-1", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#B9B9B9] text-sm", children: `${othersDetail.length ?? 0}/200` }) })] })] }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsxs)(modal_1.ModalFooter, { className: "flex p-4 flex-col gap-2", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { colorScheme: "red", onClick: handleConfirm, width: "100%", h: "36px", px: "12px", py: "8px", borderRadius: "full", backgroundColor: "var(--primary)", className: "bg-primary text-on-suraface", isDisabled: !othersDetail && values.filter((e) => e.checked).length === 0, _hover: {
                                        backgroundColor: 'var(--primary)'
                                    }, _disabled: {
                                        opacity: 0.3,
                                        cursor: 'not-allowed'
                                    }, children: t('send_feedback') }), !!removeDislike && ((0, jsx_runtime_1.jsx)("div", { className: "text-primary text-center cursor-pointer", onClick: handleRemoveDislike, children: t('remove_dislike') }))] })] }) })] }));
});
function CustomCheckBoxButton(props) {
    const { label } = props;
    const { state, getInputProps, getCheckboxProps } = (0, react_1.useCheckbox)(props);
    return ((0, jsx_runtime_1.jsxs)(react_1.FormLabel, { children: [(0, jsx_runtime_1.jsx)("input", { ...getInputProps(), hidden: true }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", borderRadius: "16px", padding: "6px 14px", gap: "8px", cursor: "pointer", borderColor: state.isChecked ? 'var(--primary)' : 'var(--border)', _checked: {
                    borderColor: 'var(--primary)'
                }, ...getCheckboxProps(), children: [label && (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", children: label }), state.isChecked && (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-4 h-4 text-primary" })] })] }));
}
