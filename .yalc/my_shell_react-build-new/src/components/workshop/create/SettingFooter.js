"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingFooter;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const QuestionMarkCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/QuestionMarkCircleIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const tooltip_1 = require("../../../common/components/ui/tooltip.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const PromptUnpublishModal_1 = __importDefault(require("../../../components/workshop/create/components/PromptUnpublishModal.js"));
const store_1 = require("../../../services/store/index.js");
const workshop_1 = require("../../../services/store/workshop.js");
const PromptSaveTipModal_1 = __importDefault(require("./components/PromptSaveTipModal.js"));
function SettingFooter({ onDiscardDraft, onSave, form, botId, loading, disable, setDisable }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const user = (0, store_1.useUserStore)(state => state.user);
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const oriForm = (0, workshop_1.useWorkshopStore)(state => state.oriForm);
    const editNotSave = (0, workshop_1.useWorkshopStore)(state => state.editNotSave);
    const setCurrentForm = (0, workshop_1.useWorkshopStore)(state => state.setCurrentForm);
    const sidebarMyBotList = (0, workshop_1.useWorkshopStore)(state => state.sidebarMyBotList);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const [showPublishUpdataConfirm, setShowPublishUpdataConfirm] = (0, react_2.useState)(false);
    const [showUnpublishConfirm, setShowUnPublishConfirm] = (0, react_2.useState)(false);
    const publishBotsLen = sidebarMyBotList?.filter(item => item?.botSetting?.publishBot && !item?.isOfficalAssistantBot)?.length || 0;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('SettingFooter px-4 md:px-5 pb-3 pt-0 md:pb-4 md:py-4 flex flex-col md:flex-row items-center md:space-x-[8px] shrink-0 border-t border-default bg-surface-default', isMobile ? 'h-auto' : 'h-[146px] md:h-[76px]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-grow flex-col w-full md:flex-row justify-center md:justify-start", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center py-2 md:py-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[16px] font-medium", children: t('create_bot_publish_prompt') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: t('create_bot_publish_prompt_pop'), children: (0, jsx_runtime_1.jsx)("span", { className: "text-secondary cursor-pointer", children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "ml-[4px] w-[18px] h-[18px]" }) }) })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "publishPrompt", children: field => ((0, jsx_runtime_1.jsx)(react_1.Switch, { name: field.name, size: "md", colorScheme: "brand", className: "ml-6", isDisabled: currentForm?.prompt == '', isChecked: currentForm?.publishPrompt, ...field.getInputProps(), onChange: (e) => {
                                        field.setValue(e.target.checked);
                                        setCurrentForm({ ...currentForm, publishPrompt: e.target.checked });
                                    } })) })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full md:w-[1px] h-[1px] md:h-[34px] bg-outline dark:bg-[#42434A] md:m-6" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center py-2 md:py-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[16px] font-medium", children: t('create_bot_publish_bot') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", descriptionDangerous: true, description: t('create_bot_publish_bot_pop', {
                                            here: `<a
                        class="text-brand cursor-pointer"
                        href="https://discord.com/invite/myshell"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${t('create_bot_publish_bot_pop_clicktext')}
                      </a>`
                                        }), children: (0, jsx_runtime_1.jsx)("span", { className: "text-secondary cursor-pointer", children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "ml-[4px] w-[18px] h-[18px]" }) }) })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "publishBot", children: field => ((0, jsx_runtime_1.jsx)(react_1.Switch, { name: field.name, size: "md", colorScheme: "brand", className: "ml-6", isDisabled: !oriForm?.publishBot && (!user?.canPublishNewBot || publishBotsLen >= user?.publicBotLimit), isChecked: field.getValue(), ...field.getInputProps(), onChange: (e) => {
                                        field.setValue(e.target.checked);
                                        setCurrentForm({ ...currentForm, publishBot: e.target.checked });
                                    } })) })] })] }), !isMobile && !!onDiscardDraft && ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "flex w-full md:w-fit md:min-w-[140px] h-[44px] text-secondary rounded-full py-2 px-4 mr-0", boxShadow: "0px 0px 2px 0px #B8B5FE", onClick: onDiscardDraft, children: t('discard_raft') })), (0, jsx_runtime_1.jsx)(react_1.Button, { id: "voiceCreate", variant: "unstyled", className: "flex w-full md:w-fit md:min-w-[140px] h-[44px] bg-primary text-white rounded-full py-2 px-4 mr-0", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", isDisabled: (!editNotSave && !!botId && botId !== '0') || (!botId && disable), isLoading: loading, _disabled: {
                    opacity: 0.3,
                    cursor: 'not-allowed'
                }, _hover: { bg: 'var(--primary)' }, _active: { bg: 'var(--primary)' }, onClick: () => {
                    if (oriForm?.publishBot && !currentForm?.publishBot) {
                        setShowUnPublishConfirm(true);
                    }
                    else if (currentForm?.prompt !== oriForm?.prompt && oriForm?.publishBot && currentForm?.publishPrompt) {
                        setShowPublishUpdataConfirm(true);
                    }
                    else {
                        onSave();
                    }
                }, children: t('save') }), isMobile && !!onDiscardDraft && ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "flex w-full md:w-fit md:min-w-[140px] h-[44px] text-secondary rounded-full py-2 px-4 mr-0 mt-2", onClick: onDiscardDraft, children: t('discard_raft') })), showPublishUpdataConfirm && ((0, jsx_runtime_1.jsx)(PromptSaveTipModal_1.default, { isOpen: showPublishUpdataConfirm, onConfirmed: () => {
                    setShowPublishUpdataConfirm(false);
                    onSave();
                }, onClose: () => {
                    setShowPublishUpdataConfirm(false);
                } })), showUnpublishConfirm && ((0, jsx_runtime_1.jsx)(PromptUnpublishModal_1.default, { isOpen: showUnpublishConfirm, onConfirmed: () => {
                    setShowUnPublishConfirm(false);
                    onSave();
                }, onClose: () => {
                    setShowUnPublishConfirm(false);
                } }))] }));
}
