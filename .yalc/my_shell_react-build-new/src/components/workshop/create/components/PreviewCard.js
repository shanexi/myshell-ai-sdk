"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const isomorphic_dompurify_1 = require("isomorphic-dompurify");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const workshop_1 = require("../../../../services/store/workshop.js");
const BotCardTags_1 = require("./BotCardTags.js");
function PreviewCard({ form, bot, tagOptions, languageName, modelOptions, loading }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const languageList = (0, workshop_1.useWorkshopStore)(state => state.languageList);
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const selectedLangDisplayName = languageList.find(lang => `${lang.name}` === languageName)?.displayName || '';
    const logoUrl = currentForm?.logo
        ? currentForm?.logo.includes('bot-logo')
            ? (0, common_helper_1.getAssetsUrl)(currentForm?.logo)
            : (0, common_helper_1.getAssetsUrlV2)(currentForm?.logo)
        : 'https://image.myshell.ai/image/bot/logo/20240106/default.png';
    const selectedLlmModel = (0, react_1.useMemo)(() => {
        return modelOptions.find(o => o.id === currentForm?.model);
    }, [currentForm?.model, modelOptions]);
    let energyPerChat = selectedLlmModel?.energyPerChatBase ?? 1;
    currentForm?.outputVoice && energyPerChat++;
    currentForm?.knowledgeBase && energyPerChat++;
    let description = currentForm?.description?.replaceAll('\n', '</br>');
    description = (0, isomorphic_dompurify_1.sanitize)(description, {
        ADD_ATTR: ['target'],
        FORBID_TAGS: ['style', 'form', 'input', 'checkbox', 'svg', 'a'],
        FORBID_ATTR: ['action']
    });
    const timerRef = (0, react_1.useRef)(null);
    const [name, setName] = (0, react_1.useState)(currentForm?.name);
    (0, react_1.useEffect)(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setName(currentForm?.name);
        }, 2000);
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [currentForm?.name]);
    return ((0, jsx_runtime_1.jsxs)("div", { id: "previewCard", className: " hidden xl:flex flex-col pb-[20px] w-[216px] absolute top-[30px] md:right-0 xl:right-[2.6vw] rounded-[24px]", children: [(0, jsx_runtime_1.jsx)("p", { className: "flex items-center text-[12px] font-medium leading-6 mb-[12px]", children: t('create_bot.preview.title') }), (0, jsx_runtime_1.jsxs)("div", { className: "p-[16px]  rounded-2xl  bg-[var(--surface-create-bg)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col items-center justify-center w-[184px] h-[184px] bg-surface-container-default rounded-3xl mb-[12px] aspect-square overflow-hidden relative isolate", children: !loading ? ((0, jsx_runtime_1.jsx)("img", { src: logoUrl, alt: "bot avatar", sizes: "(max-width: 768px) 100vw,100vw", className: "object-cover ease-in-out duration-300 w-full h-full rounded-[24px]" })) : ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-full h-full rounded-[24px]" })) }), (0, jsx_runtime_1.jsx)("div", { className: "text-[20px] leading-7 font-normal mb-[8px] line-clamp-2", children: !loading ? name : (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-[184px] h-[28px] rounded-md" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex my-2", children: !loading ? ((0, jsx_runtime_1.jsx)(BotCardTags_1.BotCardTags, { bot: bot, tags: currentForm?.tagIds, langDisplayName: selectedLangDisplayName || '', tagOptions: tagOptions, energyPerChat: energyPerChat, outputVoice: form.getFieldValue('outputVoice') })) : ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-[126px] h-[16px] rounded-md" })) }), !loading ? ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-[14px] text-subtler font-normal leading-5 line-clamp-3 ", lineClamp: 3, dangerous: true, children: description })) : ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-[54px] h-[10px] rounded" }))] })] }));
}
exports.default = PreviewCard;
