"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const outline_1 = require("@heroicons/react/24/outline");
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDownIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const react_2 = require("react");
const react_select_1 = __importStar(require("react-select"));
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const useHandleAnyFormValueChange_1 = require("../../../../components/workshop/create/hooks/useHandleAnyFormValueChange.js");
const sensors_1 = require("../../../../lib/sensors/index.js");
const workshop_1 = require("../../../../services/store/workshop.js");
const AvatarUpload_1 = __importDefault(require("../AvatarUpload.js"));
function ProfileForm({ form, disable, showLearnMore, isGuide, tagOptions, loading }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const handleAnyFormValueChange = (0, useHandleAnyFormValueChange_1.useHandleAnyFormValueChange)();
    const sensors = (0, sensors_1.useSensors)();
    const setEditNotSave = (0, workshop_1.useWorkshopStore)(state => state.setEditNotSave);
    const botId = form.getFieldValue('botId');
    const trackClick = (area) => {
        sensors?.track('BotCreationProfileClick', {
            click_area: area,
            bot_id: botId,
            bot_name: form.getFieldValue('name')
        });
    };
    const oriForm = (0, workshop_1.useWorkshopStore)(state => state.oriForm);
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, workshop_1.useWorkshopStore)(state => state.setCurrentForm);
    const setOriForm = (0, workshop_1.useWorkshopStore)(state => state.setOriForm);
    const nsfwTagId = '1800000000000000019';
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    const isNsfw = form.getFieldValue('tagIds')?.includes(nsfwTagId) ? '1' : '0';
    const isOriNsfw = oriForm?.tagIds?.includes(nsfwTagId);
    const [nsfwValue, setNsfwValue] = (0, react_2.useState)('');
    const [curTags, setCurTags] = (0, react_2.useState)('');
    const [errTip, setErrTip] = (0, react_2.useState)('');
    console.log('curTags', curTags);
    function validateField(value, errTip) {
        setErrTip('');
        return !value && errTip;
    }
    const description = () => {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-3", children: (0, jsx_runtime_1.jsx)(form.Field, { name: "description", validate: value => !value && 'description is required', validateAsyncOn: "change", validateAsyncDebounceMs: 500, children: field => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: field.name, className: "text-sm md:text-base focus:ring-2", children: t('description') }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("textarea", { name: field.name, className: "w-full rounded-xl border border-default flex py-[8px] px-[12px] relative shadow hover:border-hoverd bg-transparent flex-1 disabled:cursor-not-allowed h-[148px] resize-none pb-5", placeholder: loading ? undefined : t('description_placeholder'), ...field.getInputProps(), maxLength: 500, onChange: e => {
                                        field.setValue(e.target.value);
                                        setCurrentForm({ ...currentForm, description: e.target.value });
                                    }, disabled: loading }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 bottom-2 px-2 rounded-[20px]", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#B9B9B9] text-sm bg-surface-default px-2 py-1 rounded-[12px]", children: `${field.getValue().length}/500` }) }), loading ? ((0, jsx_runtime_1.jsxs)("div", { className: "grid absolute left-3 top-2 gap-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-[560px] h-[24px] rounded-md" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-[496px] h-[24px] rounded-md" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-[364px] h-[24px] rounded-md" })] })) : null] })] })) }) }));
    };
    const curOptions = tagOptions?.filter(item => item.id !== nsfwTagId);
    const tags = () => {
        return ((0, jsx_runtime_1.jsx)("div", { id: "profileTag", className: "flex flex-col space-y-[10px]", children: (0, jsx_runtime_1.jsx)(form.Field, { name: "tagIds", validate: value => !value && 'name is required', validateAsyncOn: "change", validateAsyncDebounceMs: 500, children: field => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: field.name, className: "text-sm md:text-base flex items-center", children: [t('tag'), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", title: t('create_bot_profile_tag_tips_title'), description: t('create_bot_profile_tag_tips'), children: (0, jsx_runtime_1.jsx)("span", { className: "text-icon-subtlest", children: (0, jsx_runtime_1.jsx)(outline_1.QuestionMarkCircleIcon, { className: "ml-1 w-4 h-4" }) }) })] }), (0, jsx_runtime_1.jsx)(react_select_1.default, { id: "tagsSelect", instanceId: "tagsSelect", value: curOptions.filter(e => field.getValue()?.includes(e.id)), options: curOptions, placeholder: loading ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "left-3 w-[98px] h-[24px] rounded-md" }) : t('tag'), isDisabled: isGuide || loading, unstyled: true, isMulti: true, closeMenuOnScroll: true, components: {
                                ClearIndicator: () => null,
                                DropdownIndicator: () => (0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, { className: "w-4 h-4" }),
                                MultiValueLabel: ({ data }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex px-2 h-[22px] items-center rounded-[6px] mr-1'), style: {
                                        backgroundColor: isDark ? `${data?.backgroundColors?.dark}` : `${data?.backgroundColors?.light}`
                                    }, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex items-center py-[2px] text-xs font-bold line-clamp-1 text-ellipsis'), style: {
                                            color: isDark ? `${data?.labelColors?.dark}` : `${data?.labelColors?.light}`
                                        }, children: [data.iconUrl ? ((0, jsx_runtime_1.jsx)("img", { src: `${data.iconUrl}`, alt: "emoji img", className: "mr-1 w-[14px] h-[14px]" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold line-clamp-1 text-ellipsis", children: data.label })] }) }, `tag${data.id}`)),
                                Option: ({ children, ...props }) => {
                                    const { data } = props;
                                    return ((0, jsx_runtime_1.jsx)(react_select_1.components.Option, { ...props, children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex px-2 items-center rounded-[6px] mr-1'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex items-center py-[2px] text-xs font-bold line-clamp-1 text-ellipsis'), style: {
                                                    color: isDark ? `${data.labelColors.dark}` : `${data.labelColors.light}`
                                                }, children: [data.iconUrl ? ((0, jsx_runtime_1.jsx)("img", { src: `${data.iconUrl}`, alt: "emoji img", className: "mr-1 w-[14px] h-[14px]" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold line-clamp-1 text-ellipsis", children: data.label })] }) }, `tag${data.id}`) }));
                                }
                            }, onChange: options => {
                                if (!isGuide) {
                                    const tagStr = options.map(e => e.id);
                                    const tagIdsStr = nsfwValue === '1'
                                        ? tagStr.length > 0
                                            ? `${tagStr?.join(',')},${nsfwTagId}`
                                            : `${nsfwTagId}`
                                        : tagStr.join(',');
                                    field.setValue(tagIdsStr);
                                    handleAnyFormValueChange();
                                    setCurrentForm({ ...currentForm, tagIds: tagIdsStr });
                                    setCurTags(tagIdsStr);
                                    setEditNotSave();
                                    setCreateDraftHandle({ tagIds: tagIdsStr });
                                }
                            }, noOptionsMessage: () => t('no_options'), className: "rounded-[12px] border border-default flex justify-between items-center relative shadow text-sm hover:border-hovered", styles: {
                                multiValue: (baseStyles, { data }) => ({
                                    ...baseStyles,
                                    backgroundColor: isDark ? `${data?.backgroundColors?.dark}` : `${data?.backgroundColors?.light}`,
                                    color: isDark ? `${data?.labelColors?.dark}` : `${data?.labelColors?.light}`
                                })
                            }, classNames: {
                                control: () => 'w-full px-4 py-2',
                                menu: () => 'w-full bg-surface dark:bg-surface-pressed my-[6px] border border-default rounded-[6px]',
                                option: () => 'bg-surface dark:bg-surface-pressed rounded-[6px] p-2 hover:bg-on-primary dark:hover:bg-on-primary cursor-pointer',
                                multiValue: ({ data }) => (0, clsx_1.default)('text-xs px-1 rounded-[6px] mr-2 mb-1'),
                                multiValueLabel: () => 'mr-2'
                            } })] })) }) }));
    };
    const setCurrentFormHandle = (data) => {
        setCurrentForm({ ...currentForm, ...data });
    };
    const setCreateDraftHandle = (data) => {
        if (!botId) {
            const createDraft = identityService_1.identityService.getCreateDraft();
            identityService_1.identityService.setCreateDraft({
                ...(createDraft || currentForm),
                ...data
            });
        }
    };
    (0, react_2.useEffect)(() => {
        setCurrentForm(null);
        setOriForm(null);
    }, []);
    (0, react_2.useEffect)(() => {
        setCurTags(currentForm?.tagIds);
    }, [currentForm?.tagIds]);
    (0, react_2.useEffect)(() => {
        if (oriForm && currentForm) {
            const tagIds = curTags?.split(',').filter(v => v && v !== nsfwTagId);
            if (nsfwValue === '1') {
                const tagIdsStr = tagIds?.length > 0 ? `${tagIds?.join(',')},${nsfwTagId}` : nsfwTagId;
                form.setFieldValue('tagIds', tagIdsStr);
                setCurrentForm({ ...currentForm, tagIds: tagIdsStr });
                setEditNotSave();
                setCreateDraftHandle({ tagIds: tagIdsStr });
            }
            else {
                const tagIdsStr = tagIds?.join(',') || '';
                form.setFieldValue('tagIds', tagIdsStr);
                if (tagIds) {
                    setCurrentForm({ ...currentForm, tagIds: tagIdsStr });
                    setEditNotSave();
                    setCreateDraftHandle({ tagIds: tagIdsStr });
                }
            }
        }
    }, [nsfwValue]);
    (0, react_2.useEffect)(() => {
        setNsfwValue(isNsfw);
    }, [isNsfw]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-4 pb-[20px]", children: [(0, jsx_runtime_1.jsxs)("div", { id: "profile", children: [(0, jsx_runtime_1.jsx)("p", { className: "flex items-center text-[18px] md:text-[20px] leading-[1.3] font-medium", children: t('create_bot_profile_title') }), (0, jsx_runtime_1.jsxs)("p", { className: "text-secondary text-sm mt-1.5", children: [t('create_bot_profile_intro'), (0, jsx_runtime_1.jsx)("span", { className: "text-primary cursor-pointer px-1", onClick: () => {
                                    if (!isGuide) {
                                        showLearnMore('profile_learn_more');
                                        trackClick(1);
                                    }
                                }, children: t('learn_more') })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm md:text-base", children: t('avatar') }), (0, jsx_runtime_1.jsx)(form.Field, { name: "logoUrl", children: field => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !loading ? ((0, jsx_runtime_1.jsx)(AvatarUpload_1.default, { imgUrl: (0, common_helper_1.getAssetsUrlV2)(currentForm?.logoUrl) ||
                                            'https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/bot/logo/default.png', trackClick: trackClick, uploadFile: (logoUrl, logo) => {
                                            field.setValue(logoUrl);
                                            form.setFieldValue('logo', logo);
                                            setCurrentForm({ ...currentForm, logoUrl: logo, logo });
                                            setCreateDraftHandle({ logo, logoUrl: logo });
                                        } })) : ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "rounded-full flex-shrink-0 h-[120px] w-[120px]" })) })) }), (0, jsx_runtime_1.jsx)("div", { className: "text-[12px] md:text-sm text-secondary", children: t('upload_assets_tip') })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-[4px]", children: (0, jsx_runtime_1.jsx)(form.Field, { name: "name", validate: value => {
                                return validateField(value, t('create_bot_profile_name'));
                            }, validateAsyncOn: "change", validateAsyncDebounceMs: 500, children: field => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: field.name, className: "text-sm md:text-base", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[#EC2F0D] mr-1", children: "*" }), t('create_bot_profile_name')] }), (0, jsx_runtime_1.jsxs)("div", { className: `rounded-[12px] border border-default shadow flex justify-between items-center relative mb-2 ${field.state.meta.touchedError || errTip === 'name'
                                            ? 'border border-red-500'
                                            : 'hover:border-hovered'} ${disable ? 'cursor-not-allowed' : ''}`, children: [(0, jsx_runtime_1.jsx)("input", { disabled: disable || loading, name: field.name, ...field.getInputProps(), placeholder: loading ? undefined : t('create_bot_profile_name_placeholder'), maxLength: 20, className: "bg-transparent px-[12px] py-[8px] pr-[44px] rounded-[12px] flex-1 disabled:cursor-not-allowed", onChange: e => {
                                                    field.setValue(e.target.value);
                                                    setCurrentFormHandle({ name: e.target.value });
                                                } }), (0, jsx_runtime_1.jsx)("span", { className: "absolute text-[#B9B9B9] text-sm right-2", children: `${field.getValue().length}/20` }), loading ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "absolute left-3 w-[87px] h-[24px] rounded-md" }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-red-500 text-sm", children: (field.state.meta.touchedError || errTip === 'name') && t('create_bot_profile_name_err') })] })) }) }), (0, jsx_runtime_1.jsx)("div", { className: "nsfw", children: (0, jsx_runtime_1.jsxs)(react_1.RadioGroup, { onChange: setNsfwValue, value: nsfwValue, isDisabled: loading, className: "flex items-center text-[14px] text-on-surface", children: [(0, jsx_runtime_1.jsx)("div", { className: "mr-6 h-6 flex justify-center items-center text-sm md:text-base", children: "NSFW" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-6", children: [(0, jsx_runtime_1.jsx)(react_1.Radio, { value: "1", colorScheme: "brand", isDisabled: isOriNsfw, children: commonT('yes') }), (0, jsx_runtime_1.jsx)(react_1.Radio, { value: "0", colorScheme: "brand", isDisabled: isOriNsfw, children: commonT('no') })] })] }) }), tags(), description()] })] }));
}
exports.default = ProfileForm;
