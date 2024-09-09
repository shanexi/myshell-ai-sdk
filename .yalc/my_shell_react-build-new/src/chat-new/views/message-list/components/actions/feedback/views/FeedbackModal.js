import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../../../../common/components/ui/button.js';
import { Form, FormControl, FormField, FormItem } from '../../../../../../../common/components/ui/form.js';
import { Modal, ModalBody } from '../../../../../../../common/components/ui/modal.js';
import { Separator } from '../../../../../../../common/components/ui/separator.js';
import { Textarea } from '../../../../../../../common/components/ui/textarea.js';
import { Heading, Text } from '../../../../../../../common/components/ui/typography.js';
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
export default function FeedbackModal({ open, onClose, onRemoveDislike, onSendFeedback }) {
    const reportLocale = useTranslations('report');
    const formSchema = z.object({
        issues: z.array(z.string()),
        other: z.string()
    });
    const form = useForm({
        defaultValues: {
            issues: [],
            other: ''
        },
        resolver: zodResolver(formSchema)
    });
    const { watch } = form;
    const issues = watch('issues');
    const other = watch('other');
    const submitDisabled = useMemo(() => {
        return !(issues.length || other.length);
    }, [issues.length, other.length]);
    const onSubmit = async () => {
        onSendFeedback(issues, other);
        onClose();
    };
    return (_jsx(Modal, { contentClassName: "w-[620px]", open: open, onClose: onClose, hideClose: true, children: _jsx(ModalBody, { className: "py-3", children: _jsx(Form, { ...form, children: _jsxs("form", { className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex flex-col px-3", children: [_jsx(Heading, { size: "h2", children: reportLocale('tell_us_more') }), _jsx(Text, { color: "subtler", size: "sm", children: reportLocale('report_msg_tips') })] }), _jsx(Separator, {}), _jsxs("section", { className: "flex flex-col gap-3 px-3", children: [_jsx(FormField, { control: form.control, name: "issues", render: ({ field }) => (_jsx(FormItem, { children: _jsx("div", { className: "flex flex-wrap gap-3", children: issueItems.map(issue => {
                                                const checked = field.value.includes(issue.value);
                                                return (_jsxs("button", { type: "button", role: "checkbox", "aria-checked": checked, className: clsx('flex items-center justify-center gap-2 border rounded-2xl py-[6px] px-[14px] cursor-pointer', checked ? 'border-brand' : 'border-outline'), onClick: () => {
                                                        if (!checked) {
                                                            field.onChange([...field.value, issue.value]);
                                                        }
                                                        else {
                                                            field.onChange(field.value.filter(v => v !== issue.value));
                                                        }
                                                    }, children: [_jsx(Text, { className: "text-sm", children: reportLocale(issue.label) }), checked && _jsx(CheckIcon, { className: "size-4 text-brand" })] }, issue.value));
                                            }) }) })) }), _jsx(Text, { children: reportLocale('others_that_apply') }), _jsx(FormField, { control: form.control, name: "other", render: ({ field }) => (_jsx(FormItem, { children: _jsx(FormControl, { children: _jsx(Textarea, { placeholder: reportLocale('placeholder_tips'), autoFocus: false, className: "h-[138px] px-3 py-2 text-sm resize-none", ...field }) }) })) })] }), _jsx(Separator, {}), _jsxs("section", { className: "flex flex-col items-center gap-2 py-1 px-3", children: [_jsx(Button, { className: "h-9 w-full font-semibold", disabled: submitDisabled, onClick: onSubmit, children: reportLocale('send_feedback') }), _jsx(Button, { variant: "link", className: "no-underline hover:no-underline active:no-underline", onClick: onRemoveDislike, children: reportLocale('remove_dislike') })] })] }) }) }) }));
}
