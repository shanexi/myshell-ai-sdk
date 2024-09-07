"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const bot_1 = require("../../../../common/constants/interfaces/bot.js");
const workshop_1 = require("../../../../services/store/workshop.js");
function RadioCard(props) {
    const { getInputProps, getRadioProps } = (0, react_1.useRadio)(props);
    const input = getInputProps();
    const checkbox = getRadioProps();
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, workshop_1.useWorkshopStore)(state => state.setCurrentForm);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_1.Box, { className: "w-full", as: "label", children: [(0, jsx_runtime_1.jsx)("input", { ...input, onClick: () => {
                        input.checked = true;
                        props.form?.setFieldValue('modeType', input.value);
                        setCurrentForm({ ...currentForm, modeType: input.value });
                    } }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: props.hoverTip, side: "top", showArrow: false, children: (0, jsx_runtime_1.jsx)(react_1.Box, { style: {
                            boxShadow: input.value === currentForm?.modeType ? '0px 0px 2px 0px #B8B5FE' : ''
                        }, className: (0, clsx_1.default)('flex h-[36px] rounded-full justify-center text-[14px] leading-[1.1] items-center font-medium text-center', input.value === currentForm?.modeType &&
                            'border-x text-primary bg-[#FFF] dark:bg-[#2B2E3B] border-default', input.disabled ? 'text-[#C9CCD0] dark:text-[#54565E] cursor-not-allowed' : 'cursor-pointer'), ...checkbox, children: props.children }) })] }) }));
}
function ModeTypeForm({ form }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const options = [
        {
            label: t('classic_mode'),
            value: bot_1.ModeTypeEnum.CLASSIC,
            isDisabled: false,
            isChecked: currentForm?.modelType === bot_1.ModeTypeEnum.CLASSIC
        },
        {
            label: t('dev_mode'),
            value: bot_1.ModeTypeEnum.DEV,
            isChecked: currentForm?.modelType === bot_1.ModeTypeEnum.DEV,
            hoverTip: t('dev_mode_tips')
        },
        {
            label: t('shell_agent_mode'),
            value: bot_1.ModeTypeEnum.SHELL_AGENT,
            isChecked: currentForm?.modelType === bot_1.ModeTypeEnum.SHELL_AGENT,
            hoverTip: t('shell_agent_mode_tips')
        }
    ];
    const { getRootProps, getRadioProps } = (0, react_1.useRadioGroup)({
        name: 'modeType',
        defaultValue: bot_1.ModeTypeEnum.CLASSIC
    });
    const group = getRootProps();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-on-surface text-[20px] leading-7 font-semibold mb-5", children: t('model_select_title') }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-between rounded-full  border border-default bg-[--surface-create-bg] dark:border-[#42434A]", ...group, children: options.map((option, index) => {
                    const radio = getRadioProps({ ...option });
                    let extClassName = '';
                    if (index === 0) {
                        extClassName = 'border-l-[0px]';
                    }
                    else if (index === options.length - 1) {
                        extClassName = 'border-r-[0px]';
                    }
                    return ((0, jsx_runtime_1.jsx)(RadioCard, { ...radio, form: form, extClassName: extClassName, children: option.label }, option.value));
                }) })] }));
}
exports.default = ModeTypeForm;
