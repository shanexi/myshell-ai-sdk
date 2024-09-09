"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeedbackModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const zod_1 = require("@hookform/resolvers/zod");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const button_1 = require("../../../../../../../common/components/ui/button.js");
const form_1 = require("../../../../../../../common/components/ui/form.js");
const modal_1 = require("../../../../../../../common/components/ui/modal.js");
const separator_1 = require("../../../../../../../common/components/ui/separator.js");
const textarea_1 = require("../../../../../../../common/components/ui/textarea.js");
const typography_1 = require("../../../../../../../common/components/ui/typography.js");
const issueItems = [
    {
        label: 'boring',
        value: 'Boring'
    },
    {
        label: 'out_of_character',
        value: 'Out of Character'
    },
    {
        label: 'inaccurate',
        value: 'Inaccurate'
    },
    {
        label: 'incorrect_voice_generation',
        value: 'Incorrect Voice Generation'
    },
    {
        label: 'long_waiting_time',
        value: 'Long Waiting Time'
    },
    {
        label: 'offensive',
        value: 'Offensive'
    },
    {
        label: 'repetitive',
        value: 'Repetitive'
    },
    {
        label: 'incorrect_translation',
        value: 'Incorrect Translation'
    }
];
function FeedbackModal({ open, onClose, onRemoveDislike, onSendFeedback }) {
    const reportLocale = (0, next_intl_1.useTranslations)('report');
    const formSchema = zod_2.z.object({
        issues: zod_2.z.array(zod_2.z.string()),
        other: zod_2.z.string()
    });
    const form = (0, react_hook_form_1.useForm)({
        defaultValues: {
            issues: [],
            other: ''
        },
        resolver: (0, zod_1.zodResolver)(formSchema)
    });
    const { watch } = form;
    const issues = watch('issues');
    const other = watch('other');
    const submitDisabled = (0, react_1.useMemo)(() => {
        return !(issues.length || other.length);
    }, [issues.length, other.length]);
    const onSubmit = async () => {
        onSendFeedback(issues, other);
        onClose();
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { contentClassName: "w-[620px]", open: open, onClose: onClose, hideClose: true, children: (0, jsx_runtime_1.jsx)(modal_1.ModalBody, { className: "py-3", children: (0, jsx_runtime_1.jsx)(form_1.Form, { ...form, children: (0, jsx_runtime_1.jsxs)("form", { className: "flex flex-col gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col px-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: reportLocale('tell_us_more') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "subtler", size: "sm", children: reportLocale('report_msg_tips') })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("section", { className: "flex flex-col gap-3 px-3", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "issues", render: ({ field }) => ((0, jsx_runtime_1.jsx)(form_1.FormItem, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-3", children: issueItems.map(issue => {
                                                const checked = field.value.includes(issue.value);
                                                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "checkbox", "aria-checked": checked, className: (0, clsx_1.default)('flex items-center justify-center gap-2 border rounded-2xl py-[6px] px-[14px] cursor-pointer', checked ? 'border-brand' : 'border-outline'), onClick: () => {
                                                        if (!checked) {
                                                            field.onChange([...field.value, issue.value]);
                                                        }
                                                        else {
                                                            field.onChange(field.value.filter(v => v !== issue.value));
                                                        }
                                                    }, children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-sm", children: reportLocale(issue.label) }), checked && (0, jsx_runtime_1.jsx)(outline_1.CheckIcon, { className: "size-4 text-brand" })] }, issue.value));
                                            }) }) })) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { children: reportLocale('others_that_apply') }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "other", render: ({ field }) => ((0, jsx_runtime_1.jsx)(form_1.FormItem, { children: (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { placeholder: reportLocale('placeholder_tips'), autoFocus: false, className: "h-[138px] px-3 py-2 text-sm resize-none", ...field }) }) })) })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("section", { className: "flex flex-col items-center gap-2 py-1 px-3", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "h-9 w-full font-semibold", disabled: submitDisabled, onClick: onSubmit, children: reportLocale('send_feedback') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "link", className: "no-underline hover:no-underline active:no-underline", onClick: onRemoveDislike, children: reportLocale('remove_dislike') })] })] }) }) }) }));
}
