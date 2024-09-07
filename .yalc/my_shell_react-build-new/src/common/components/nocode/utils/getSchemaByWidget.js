"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaByWidget = getSchemaByWidget;
const lodash_es_1 = require("lodash-es");
const common_1 = require("../../../../apis/common.js");
function getSchemaByWidget(settings) {
    const properties = {};
    settings.reduce((prev, setting) => {
        const { type, fieldName: key, name: title, description, stringDefault, numberDefault, integerDefault, fileDefaultParam, textSelectorDefault, numberSelectorDefault, booleanDefault, textSelectorAllOf, hasNumberLimitation, hasIntegerLimitation, integerMax, integerMin, numberMax, numberMin, fileUploadSizeMaximum, stringCharLengthLimitation, isRequired, supportedFileTypes } = setting;
        switch (type) {
            case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT':
                prev[key] = {
                    type: 'string',
                    default: stringDefault,
                    title,
                    description,
                    'x-type': 'Block',
                    'x-component': 'ExpInput',
                    'x-title-size': 'h4',
                    'x-collapsible': true,
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ],
                    'x-component-props': {}
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR':
                prev[key] = {
                    type: 'string',
                    default: textSelectorDefault || numberSelectorDefault,
                    title,
                    description,
                    'x-type': 'Block',
                    'x-component': 'Select',
                    'x-title-size': 'h4',
                    'x-collapsible': true,
                    'x-raw': true,
                    'x-onchange-prop-name': 'onValueChange',
                    'x-component-props': {
                        options: textSelectorAllOf?.map(item => ({
                            label: item.label || item.value,
                            value: item.value,
                            icon: item.iconUrl
                        }))
                    },
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT':
                prev[key] = {
                    type: 'number',
                    default: numberDefault,
                    title,
                    description,
                    'x-type': 'Block',
                    'x-component': hasNumberLimitation ? 'SliderSingle' : 'NumberInput',
                    'x-onchange-prop-name': hasNumberLimitation ? 'onValueChange' : 'onChange',
                    'x-title-size': 'h4',
                    'x-collapsible': true,
                    'x-raw': true,
                    'x-validator': [
                        {
                            exclusiveMinimum: numberMin
                        },
                        {
                            exclusiveMaximum: numberMax
                        },
                        {
                            required: isRequired
                        }
                    ],
                    'x-component-props': {
                        min: numberMin,
                        max: numberMax,
                        step: hasNumberLimitation ? 0.01 : 1
                    }
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT':
                prev[key] = {
                    type: 'number',
                    default: integerDefault,
                    title,
                    description,
                    'x-type': 'Block',
                    'x-component': hasIntegerLimitation ? 'SliderSingle' : 'NumberInput',
                    'x-title-size': 'h4',
                    'x-collapsible': true,
                    'x-raw': true,
                    'x-onchange-prop-name': hasIntegerLimitation ? 'onValueChange' : 'onChange',
                    'x-validator': [
                        {
                            exclusiveMinimum: integerMin
                        },
                        {
                            exclusiveMaximum: integerMax
                        },
                        {
                            required: isRequired
                        }
                    ],
                    'x-component-props': {
                        min: integerMin,
                        max: integerMax,
                        step: 1,
                        precision: hasIntegerLimitation ? null : 2
                    }
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD':
                prev[key] = {
                    type: 'string',
                    default: fileDefaultParam,
                    title,
                    description,
                    'x-type': 'Block',
                    'x-component': 'FileUpload',
                    'x-title-size': 'h4',
                    'x-collapsible': true,
                    'x-raw': true,
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ],
                    'x-component-props': {
                        scenario: common_1.Scenario.SCENARIO_IM_CHAT,
                        supportedFileTypes: supportedFileTypes,
                        fileUpload: 'uploadFileToS3WithProgress'
                    }
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX':
                prev[key] = {
                    type: 'boolean',
                    default: booleanDefault,
                    title,
                    description,
                    'x-type': 'Block',
                    'x-component': 'Checkbox',
                    'x-title-size': 'h4',
                    'x-collapsible': true,
                    'x-raw': true,
                    'x-onchange-prop-name': 'onCheckedChange',
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR':
                prev[key] = {
                    type: 'string',
                    default: stringDefault,
                    title,
                    description,
                    'x-type': 'Block',
                    'x-component': 'CodeEditor',
                    'x-title-size': 'h4',
                    'x-collapsible': true,
                    'x-onchange-prop-name': 'onValueChange',
                    'x-component-props': {
                        language: 'javascript',
                        className: 'w-full h-[200px]'
                    },
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            default:
                prev[key] = {
                    type: 'string',
                    default: stringDefault ||
                        numberDefault ||
                        integerDefault ||
                        textSelectorDefault ||
                        numberSelectorDefault ||
                        booleanDefault,
                    title,
                    description,
                    'x-type': 'Block',
                    'x-component': 'ExpInput',
                    'x-title-size': 'h4',
                    'x-collapsible': true,
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
        }
        return prev;
    }, properties);
    if ((0, lodash_es_1.isEmpty)(properties)) {
        properties.empty_void = {
            type: 'void',
            'x-type': 'Block',
            'x-empty': {
                text: 'The widget requires no input.'
            }
        };
    }
    return {
        type: 'object',
        properties: {
            module_config: {
                properties: {
                    ...properties,
                    output_name_block_void: {
                        type: 'void',
                        title: 'Output',
                        'x-type': 'Block',
                        'x-title-size': 'h2',
                        properties: {
                            output_name: {
                                type: 'object',
                                properties: {
                                    label: {
                                        type: 'string',
                                        default: 'Untitled',
                                        'x-type': 'Control',
                                        'x-component': 'Input',
                                        'x-component-props': {
                                            placeholder: '{{I18n(widget.name_placeholder)}}'
                                        },
                                        'x-validator': [{ required: true, message: '{{I18n(widget.name_placeholder)}}' }]
                                    },
                                    name: {
                                        type: 'string',
                                        default: '{{uuid}}',
                                        'x-type': 'Control',
                                        'x-component': 'Input',
                                        'x-hidden': true
                                    }
                                }
                            },
                            widget_id: {
                                type: 'string',
                                'x-type': 'Control',
                                'x-component': 'Input',
                                'x-hidden': true
                            }
                        }
                    }
                }
            }
        }
    };
}
