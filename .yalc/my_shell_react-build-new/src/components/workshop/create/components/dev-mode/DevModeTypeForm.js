"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const bot_1 = require("../../../../../common/constants/interfaces/bot.js");
const tooltip_1 = require("../../../../../common/components/ui/tooltip.js");
function RadioCard(props) {
    const { getInputProps, getRadioProps } = (0, react_1.useRadio)(props);
    const input = getInputProps();
    const checkbox = getRadioProps();
    const devModeType = props.form.getFieldValue('devModeType');
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_1.Box, { className: "w-[110px]", as: "label", children: [(0, jsx_runtime_1.jsx)("input", { ...input, onClick: () => {
                        input.checked = true;
                        props.form?.setFieldValue('devModeType', input.value);
                    } }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: props.hoverTip, side: "top", children: (0, jsx_runtime_1.jsx)(react_1.Box, { style: {
                            boxShadow: input.value === devModeType ? '0px 0px 2px 0px #B8B5FE' : ''
                        }, className: (0, clsx_1.default)('flex h-[28px] rounded-full justify-center text-sm items-center font-medium text-center', input.value === devModeType && 'border-x text-primary bg-[#FFF] dark:bg-[#2B2E3B] border-default', input.disabled ? 'text-[#C9CCD0] dark:text-[#54565E] cursor-not-allowed' : 'cursor-pointer'), ...checkbox, children: props.children }) })] }) }));
}
function DevModeTypeForm({ form }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const options = [
        {
            label: 'Pro Config',
            value: bot_1.DevModeTypeEnum.PRO,
            isChecked: true
        },
        {
            label: 'API',
            value: bot_1.DevModeTypeEnum.API,
            isChecked: false,
            hoverTip: t('dev_mode_tips'),
            isDisabled: true
        }
    ];
    const { getRootProps, getRadioProps } = (0, react_1.useRadioGroup)({
        name: 'devModeType',
        defaultValue: bot_1.DevModeTypeEnum.PRO
    });
    const group = getRootProps();
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-end", children: (0, jsx_runtime_1.jsx)("div", { className: "w-fit flex rounded-full border border-default bg-[--surface-create-bg] dark:border-[#42434A]", ...group, children: options.map((option, index) => {
                const radio = getRadioProps({ ...option });
                let extClassName = '';
                if (index === 0) {
                    extClassName = 'border-l-[0px]';
                }
                else if (index === options.length - 1) {
                    extClassName = 'border-r-[0px]';
                }
                return ((0, jsx_runtime_1.jsx)(RadioCard, { ...radio, form: form, extClassName: extClassName, children: option.label }, option.value));
            }) }) }));
}
exports.default = DevModeTypeForm;
