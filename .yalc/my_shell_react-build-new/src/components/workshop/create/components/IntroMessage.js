"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const tokenizer_1 = require("../../../../common/utils/tokenizer.js");
const workshop_1 = require("../../../../services/store/workshop.js");
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
function IntroMessage({ form, isGuide, loading }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, workshop_1.useWorkshopStore)(state => state.setCurrentForm);
    const [sendIntroChecked, setSendIntroChecked] = (0, react_2.useState)(form.getFieldValue('sendIntroMessage'));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", id: "profileIntro", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { justifyContent: "space-between", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { lineHeight: "24px", className: "text-on-surface text-sm md:text-base", children: t('intro_message') }), (0, jsx_runtime_1.jsx)(form.Field, { name: "sendIntroMessage", children: field => ((0, jsx_runtime_1.jsx)(react_1.Switch, { name: field.name, size: "md", colorScheme: "brand", isChecked: field.getValue(), ...field.getInputProps(), isDisabled: isGuide, onChange: (e) => {
                                if (!isGuide) {
                                    if (!form.getFieldValue('introMessage') && e.target.checked) {
                                        form.setFieldMeta('sendIntroMessage', {
                                            isValidating: true,
                                            isTouched: true,
                                            touchedError: t('no_intro_message_tip')
                                        });
                                    }
                                    setSendIntroChecked(e.target.checked);
                                    field.setValue(e.target.checked);
                                    setCurrentForm({ ...currentForm, sendIntroMessage: e.target.checked });
                                }
                            } })) })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "introMessage", validate: value => {
                    if ((0, tokenizer_1.getTokenCount)(value) > 500) {
                        return t('maximum_support', { count: 500 });
                    }
                    if (form.getFieldValue('sendIntroMessage') && !value) {
                        return t('no_intro_message_tip');
                    }
                }, validateAsyncOn: "change", validateAsyncDebounceMs: 500, children: field => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("textarea", { className: `w-full rounded-[12px] border border-default flex py-[8px] px-[12px] relative shadow hover:border-hovered bg-transparent flex-1 disabled:cursor-not-allowed h-[148px] resize-none pb-5
                ${Number(field.getValue()) > 500 || (currentForm?.sendIntroMessage && !currentForm?.introMessage)
                                        ? 'border-[#EF4444]'
                                        : 'border-default hover:border-hovered'}`, disabled: isGuide || loading, placeholder: loading ? undefined : t('intro_message_placeholder'), ...field.getInputProps(), onChange: (e) => {
                                        field.setValue(e.target.value);
                                        setCurrentForm({ ...currentForm, introMessage: e.target.value });
                                    } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 bottom-2 px-2 rounded-[20px]", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#B9B9B9] text-sm bg-surface-default px-2 py-1 rounded-[12px]", children: `${(0, tokenizer_1.getTokenCount)(field.getValue() ?? '')}/500 ${t('tokens')}` }) }), loading ? ((0, jsx_runtime_1.jsxs)("div", { className: "grid absolute left-3 top-2 gap-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: 'w-[560px] h-[24px] rounded-md' }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: 'w-[496px] h-[24px] rounded-md' }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: 'w-[364px] h-[24px] rounded-md' })] })) : null] }), field.state.meta.touchedError && sendIntroChecked && ((0, jsx_runtime_1.jsx)("div", { className: "text-red-500 mt-2", children: field.state.meta.touchedError }))] })) })] }));
}
exports.default = IntroMessage;
