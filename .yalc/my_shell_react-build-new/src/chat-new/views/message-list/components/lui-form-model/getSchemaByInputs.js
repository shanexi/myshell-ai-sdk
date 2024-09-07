"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaByInputs = getSchemaByInputs;
const lodash_es_1 = require("lodash-es");
const typeMap = {
    BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD: [],
    BOT_IM_COMPONENT_INPUT_TYPE_AUDIO_UPLOAD: ['MESSAGE_METADATA_TYPE_AUDIO_FILE'],
    BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD: ['MESSAGE_METADATA_TYPE_VIDEO_FILE'],
    BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD: ['MESSAGE_METADATA_TYPE_IMAGE_FILE'],
    BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD: ['MESSAGE_METADATA_TYPE_TEXT_FILE'],
};
const getFileTypeByInputType = (type, supportedFileTypes) => {
    if (type === 'BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD') {
        return supportedFileTypes;
    }
    return typeMap[type];
};
function getSchemaByInputs(inputs) {
    const properties = {};
    inputs.forEach((item) => {
        const { id, description, name, type, isRequired, supportedFileTypes, stringCharLengthLimitation, stringDefault, textSelectorDefault, textSelectorAllOf, hasNumberLimitation, numberDefault, numberMax, numberMin, hasIntegerLimitation, integerDefault, integerMax, integerMin, booleanDefault, numberSelectorDefault, numberSelectorAllOf, fileUploadSizeMaximum } = item;
        switch (type) {
            case 'BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD':
            case 'BOT_IM_COMPONENT_INPUT_TYPE_AUDIO_UPLOAD':
            case 'BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD':
            case 'BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD':
            case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD':
                properties[id] = {
                    type: 'string',
                    default: '',
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': 'FileUpload',
                    'x-title-size': 'h4',
                    'x-component-props': {
                        fileUploadSizeMaximum: fileUploadSizeMaximum || 5 * 1024 ** 2,
                        supportedFileTypes: getFileTypeByInputType(type, supportedFileTypes),
                    },
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT':
                properties[id] = {
                    type: 'string',
                    default: stringDefault,
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': 'CustomTextarea',
                    'x-title-size': 'h4',
                    'x-component-props': {
                        maxLength: stringCharLengthLimitation || 1500,
                    },
                    'x-validator': [
                        {
                            exclusiveMaximum: stringCharLengthLimitation || 1500,
                        },
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR':
                properties[id] = {
                    type: 'string',
                    default: textSelectorDefault,
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': 'CustomSelect',
                    'x-title-size': 'h4',
                    'x-component-props': {
                        options: textSelectorAllOf?.map((e) => {
                            return {
                                label: e.label || e.value,
                                value: e.value,
                                iconUrl: e.iconUrl
                            };
                        })
                    },
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR':
                properties[id] = {
                    type: 'string',
                    default: numberSelectorDefault,
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': 'CustomSelect',
                    'x-title-size': 'h4',
                    'x-component-props': {
                        options: numberSelectorAllOf?.map((e) => {
                            return {
                                label: e.label || e.value,
                                value: e.value,
                                iconUrl: e.iconUrl
                            };
                        })
                    },
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT':
                properties[id] = {
                    type: 'string',
                    default: numberDefault,
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': hasNumberLimitation ? 'NumberSlider' : 'CustomNumberInput',
                    'x-title-size': 'h4',
                    'x-component-props': {
                        max: numberMax,
                        min: numberMin
                    },
                    'x-validator': [
                        {
                            exclusiveMinimum: numberMin,
                        },
                        {
                            exclusiveMaximum: numberMax,
                        },
                        {
                            required: isRequired
                        }
                    ],
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT':
                properties[id] = {
                    type: 'string',
                    default: integerDefault,
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': hasIntegerLimitation ? 'NumberSlider' : 'CustomNumberInput',
                    'x-title-size': 'h4',
                    'x-validator': [
                        {
                            exclusiveMinimum: integerMin,
                        },
                        {
                            exclusiveMaximum: integerMax,
                        },
                        {
                            required: isRequired
                        }
                    ],
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX':
                properties[id] = {
                    type: 'string',
                    default: booleanDefault,
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': 'CustomCheckbox',
                    'x-title-size': 'h4',
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            case 'BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR':
                properties[id] = {
                    type: 'string',
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': 'CustomCodeEditor',
                    'x-title-size': 'h4',
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
                break;
            default:
                properties[id] = {
                    type: 'string',
                    default: '',
                    title: name,
                    description,
                    'x-layout': 'Vertical',
                    'x-type': 'Control',
                    'x-component': 'Textarea',
                    'x-title-size': 'h4',
                    'x-validator': [
                        {
                            required: isRequired
                        }
                    ]
                };
        }
    });
    if ((0, lodash_es_1.isEmpty)(properties)) {
        return {
            type: 'object',
            'x-type': 'Block',
            'x-title-size': 'h4',
            'x-empty': {
                text: 'No input is required.',
            },
        };
    }
    return {
        type: 'object',
        'x-title-size': 'h4',
        properties: {
            ...properties,
        },
        'x-type': 'Block',
    };
}
