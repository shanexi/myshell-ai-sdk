"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoMata = void 0;
const common_1 = require("../../../../../apis/common.js");
const getAcceptTypes_1 = require("../../utils/getAcceptTypes.js");
const AutoMata = {
    type: 'automata',
    schema: {
        title: '{{I18n(automata.title)}}',
        description: '{{I18n(automata.description)}}',
        type: 'object',
        'x-type': 'Section',
        'x-title-size': 'h1',
        'x-suffix': 'JsonEditor',
        properties: {
            id: {
                type: 'string',
                'x-type': 'Control',
                'x-component': 'Input',
                'x-component-props': {
                    maxLength: 30,
                    placeholder: '{{I18n(automata.id_placeholder)}}'
                },
                'x-validator': [
                    { required: true, message: '{{I18n(automata.id_required)}}' },
                    { maxLength: 30, message: '{{I18n(automata.id_max_length)}}' }
                ]
            },
            initial: {
                type: 'string',
                title: '{{I18n(automata.initial_title)}}',
                'x-type': 'Block',
                'x-title-size': 'h4',
                'x-component': 'Input',
                'x-collapsible': true
            },
            type: {
                type: 'string',
                'x-type': 'Control',
                'x-component': 'Input',
                'x-hidden': true
            },
            context: {
                type: 'object',
                title: '{{I18n(automata.context_title)}}',
                additionalProperties: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            default: 'Untitled',
                            'x-role': 'title',
                            'x-type': 'Control',
                            'x-component': 'EditTitle',
                            'x-component-props': {
                                maxLength: 30,
                                placeholder: '{{I18n(automata.context_title_placeholder)}}'
                            },
                            'x-validator': [
                                { required: true, message: '{{I18n(automata.context_name_required)}}' },
                                { maxLength: 30, message: '{{I18n(automata.context_name_max_length)}}' }
                            ]
                        },
                        type: {
                            type: 'string',
                            default: 'text',
                            enum: ['text', 'image', 'audio'],
                            'x-component': 'Select',
                            'x-component-props': {
                                options: [
                                    { label: '{{I18n(state.inputs_type_text)}}', value: 'text' },
                                    { label: '{{I18n(state.inputs_type_image)}}', value: 'image' },
                                    { label: '{{I18n(state.inputs_type_audio)}}', value: 'audio' }
                                ]
                            },
                            'x-value-prop-name': 'defaultValue',
                            'x-onchange-prop-name': 'onValueChange',
                            'x-type': 'Control',
                            'x-reactions': [
                                {
                                    target: 'value',
                                    when: '$this.value === "image"',
                                    fullfill: {
                                        state: {
                                            value: ''
                                        },
                                        schema: {
                                            'x-component': 'FileUpload',
                                            'x-component-props': {
                                                scenario: common_1.Scenario.SCENARIO_IM_CHAT,
                                                supportedFileTypes: getAcceptTypes_1.SERVER_FILE_TYPE.image,
                                                fileUpload: 'uploadFileToS3WithProgress'
                                            }
                                        }
                                    }
                                },
                                {
                                    target: 'value',
                                    when: '$this.value === "audio"',
                                    fullfill: {
                                        state: {
                                            value: ''
                                        },
                                        schema: {
                                            'x-component': 'FileUpload',
                                            'x-component-props': {
                                                key: 'audio',
                                                scenario: common_1.Scenario.SCENARIO_IM_CHAT,
                                                supportedFileTypes: getAcceptTypes_1.SERVER_FILE_TYPE.audio,
                                                fileUpload: 'uploadFileToS3WithProgress'
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        value: {
                            type: 'string',
                            'x-component': 'Textarea',
                            'x-type': 'Control',
                            'x-component-props': {
                                placeholder: '{{I18n(automata.context_value_placeholder)}}'
                            }
                        }
                    },
                    'x-type': 'Card',
                    'x-draggable': true,
                    'x-deletable': true
                },
                'x-type': 'Block',
                'x-title-size': 'h4',
                'x-collapsible': true,
                'x-addable': true,
                'x-dropable': true,
                'x-empty': {
                    text: '{{I18n(state.inputs_empty_text)}}'
                }
            },
            transitions: {
                type: 'object',
                title: 'Transitions',
                additionalProperties: {
                    type: 'array',
                    title: '{{key}}',
                    default: [{}],
                    'x-key': 'event{{counter}}',
                    'x-title-editable': true,
                    'x-title-component-props': {
                        validates: [
                            {
                                pattern: '[^a-zA-Z0-9_]',
                                message: 'Only digits、letters、and underscores (_) are supported.'
                            },
                            {
                                pattern: '^(CHAT|ALWAYS)$',
                                message: 'Disable CHAT or ALWAYS'
                            },
                            {
                                pattern: '^[A-Z]+$',
                                message: "It can't be all capital letters"
                            }
                        ]
                    },
                    additionalItems: {
                        type: 'object',
                        title: '{{I18n(automata.transitions_item_title)}}',
                        default: {},
                        properties: {
                            void_core: {
                                type: 'void',
                                'x-role': 'core',
                                'x-type': 'Grid',
                                'x-class': 'flex',
                                properties: {
                                    _key: {
                                        type: 'string',
                                        default: '{{uuid}}',
                                        'x-type': 'Control',
                                        'x-component': 'Input',
                                        'x-hidden': true
                                    },
                                    condition: {
                                        type: 'string',
                                        default: undefined,
                                        'x-component': 'ExpInput',
                                        'x-component-props': {
                                            singleLine: true,
                                            placeholder: '{{I18n(automata.transitions_condition_placeholder)}}'
                                        },
                                        'x-type': 'Control',
                                        'x-class': 'w-[254px]'
                                    },
                                    target: {
                                        type: 'string',
                                        'x-component': 'Select',
                                        'x-type': 'Control',
                                        'x-value-prop-name': 'defaultValue',
                                        'x-onchange-prop-name': 'onValueChange',
                                        'x-component-props': {
                                            placeholder: '{{I18n(automata.transitions_target_placeholder)}}'
                                        },
                                        'x-class': 'w-[254px]'
                                    },
                                    target_inputs: {
                                        type: 'object',
                                        'x-component': 'TargetInputs',
                                        'x-type': 'Control'
                                    }
                                },
                                'x-reactions': [
                                    {
                                        target: 'condition',
                                        when: 'totalLength === 1',
                                        fullfill: {
                                            state: {
                                                value: ''
                                            },
                                            schema: {
                                                'x-hidden': true
                                            }
                                        }
                                    },
                                    {
                                        target: 'target',
                                        when: 'totalLength === 1',
                                        fullfill: {
                                            schema: {
                                                'x-class': 'flex-1'
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        'x-type': 'Card',
                        'x-draggable': true,
                        'x-role': 'core',
                        'x-deletable': true
                    },
                    'x-type': 'Card',
                    'x-addable': true,
                    'x-draggable': true,
                    'x-deletable': true,
                    'x-empty': {
                        text: '{{I18n(state.inputs_validations_empty_text)}}'
                    }
                },
                'x-type': 'Block',
                'x-title-size': 'h4',
                'x-dropable': true,
                'x-collapsible': true,
                'x-addable': true,
                'x-empty': {
                    text: '{{I18n(state.inputs_empty_text)}}'
                }
            }
        }
    }
};
exports.AutoMata = AutoMata;
