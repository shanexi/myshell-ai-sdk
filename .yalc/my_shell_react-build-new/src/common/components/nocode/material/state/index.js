"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const common_1 = require("../../../../../apis/common.js");
const getAcceptTypes_1 = require("../../utils/getAcceptTypes.js");
const State = {
    type: 'state',
    schema: {
        type: 'object',
        title: '{{I18n(state.title)}}',
        'x-suffix': 'JsonEditor',
        description: '{{I18n(state.description)}}',
        properties: {
            name: {
                type: 'string',
                'x-type': 'Control',
                'x-component': 'Input',
                'x-component-props': {
                    maxLength: 30,
                    placeholder: '{{I18n(state.name_placeholder)}}'
                },
                'x-validator': [
                    { required: true, message: '{{I18n(state.name_required)}}' },
                    { maxLength: 30, message: '{{I18n(state.name_max_length)}}' }
                ],
                'x-suffix': 'SuffixButtons'
            },
            inputs: {
                type: 'object',
                title: 'Inputs',
                additionalProperties: {
                    type: 'object',
                    properties: {
                        _key: {
                            type: 'string',
                            default: '{{uuid}}',
                            'x-type': 'Control',
                            'x-component': 'Input',
                            'x-hidden': true
                        },
                        name: {
                            type: 'string',
                            default: '{{I18n(state.inputs_name_default)}}',
                            'x-role': 'title',
                            'x-type': 'Control',
                            'x-component': 'EditTitle',
                            'x-component-props': {
                                maxLength: 30,
                                placeholder: '{{I18n(state.inputs_name_placeholder)}}'
                            },
                            'x-validator': [
                                { required: true, message: '{{I18n(state.inputs_name_required)}}' },
                                { maxLength: 30, message: '{{I18n(state.inputs_name_max_length)}}' }
                            ]
                        },
                        void_core: {
                            type: 'void',
                            'x-role': 'core',
                            'x-type': 'Grid',
                            properties: {
                                type: {
                                    type: 'string',
                                    default: 'text',
                                    enum: ['text', 'image', 'audio', 'IM'],
                                    'x-component': 'Select',
                                    'x-component-props': {
                                        options: [
                                            { label: '{{I18n(state.inputs_type_text)}}', value: 'text' },
                                            { label: '{{I18n(state.inputs_type_image)}}', value: 'image' },
                                            { label: '{{I18n(state.inputs_type_audio)}}', value: 'audio' },
                                            { label: '{{I18n(state.inputs_type_IM)}}', value: 'IM' }
                                        ]
                                    },
                                    'x-value-prop-name': 'defaultValue',
                                    'x-onchange-prop-name': 'onValueChange',
                                    'x-type': 'Control',
                                    'x-reactions': [
                                        {
                                            target: 'value',
                                            when: '$this.value === "IM"',
                                            fullfill: {
                                                schema: {
                                                    'x-hidden': true
                                                }
                                            }
                                        },
                                        {
                                            target: 'validations',
                                            when: '$this.value === "IM"',
                                            fullfill: {
                                                schema: {
                                                    'x-hidden': true
                                                },
                                                state: {
                                                    value: []
                                                }
                                            }
                                        },
                                        {
                                            target: 'default_value',
                                            when: '$this.value === "IM"',
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
                                            target: 'default_value',
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
                                            target: 'default_value',
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
                                        },
                                        {
                                            target: 'user_input',
                                            when: '$this.value === "IM"',
                                            fullfill: {
                                                state: {
                                                    value: true
                                                }
                                            }
                                        },
                                        {
                                            target: 'description',
                                            when: '$this.value === "IM"',
                                            fullfill: {
                                                schema: {
                                                    'x-hidden': true
                                                },
                                                state: {
                                                    value: ''
                                                }
                                            }
                                        }
                                    ]
                                },
                                void_user_input: {
                                    type: 'void',
                                    title: '{{I18n(state.inputs_void_user_input_title)}}',
                                    'x-type': 'Switch',
                                    properties: {
                                        user_input: {
                                            type: 'boolean',
                                            default: true,
                                            'x-component': 'Switch',
                                            'x-type': 'Control',
                                            'x-value-prop-name': 'checked',
                                            'x-onchange-prop-name': 'onCheckedChange',
                                            'x-reactions': [
                                                {
                                                    target: 'default_value',
                                                    when: '$this.value',
                                                    otherwise: {
                                                        schema: {
                                                            'x-hidden': true
                                                        }
                                                    }
                                                },
                                                {
                                                    target: 'value',
                                                    when: '$this.value',
                                                    fullfill: {
                                                        schema: {
                                                            'x-hidden': true
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        value: {
                            type: 'string',
                            title: '{{I18n(state.inputs_value_title)}}',
                            'x-component': 'Input',
                            'x-component-props': {},
                            'x-type': 'Control',
                            'x-raw': true
                        },
                        default_value: {
                            type: 'string',
                            title: '{{I18n(state.inputs_default_value_title)}}',
                            'x-component': 'Input',
                            'x-component-props': {
                                placeholder: '{{I18n(state.inputs_default_value_placeholder)}}'
                            },
                            'x-type': 'Control'
                        },
                        description: {
                            type: 'string',
                            title: '{{I18n(state.inputs_description_title)}}',
                            'x-component': 'Textarea',
                            'x-component-props': {
                                maxLength: 500,
                                placeholder: '{{I18n(state.inputs_description_placeholder)}}'
                            },
                            'x-validator': [{ exclusiveMaximum: 500, message: '{{I18n(state.inputs_description_max_length)}}' }],
                            'x-type': 'Control'
                        },
                        validations: {
                            type: 'array',
                            title: '{{I18n(state.inputs_validations_title)}}',
                            additionalItems: {
                                type: 'object',
                                title: '{{I18n(state.inputs_validation_title)}}',
                                properties: {
                                    void_core: {
                                        type: 'void',
                                        'x-role': 'core',
                                        'x-type': 'Grid',
                                        'x-class': 'grid-cols-3',
                                        properties: {
                                            rule_type: {
                                                type: 'string',
                                                enum: ['max_length', 'min_number', 'max_number', 'max_file_size'],
                                                'x-component': 'Select',
                                                'x-component-props': {
                                                    placeholder: '{{I18n(state.inputs_rule_type_placeholder)}}',
                                                    options: [
                                                        { label: '{{I18n(state.inputs_rule_type_max_length)}}', value: 'max_length' },
                                                        { label: '{{I18n(state.inputs_rule_type_min_number)}}', value: 'min_number' },
                                                        { label: '{{I18n(state.inputs_rule_type_max_number)}}', value: 'max_number' },
                                                        { label: '{{I18n(state.inputs_rule_type_max_file_size)}}', value: 'max_file_size' }
                                                    ]
                                                },
                                                'x-value-prop-name': 'defaultValue',
                                                'x-onchange-prop-name': 'onValueChange',
                                                'x-type': 'Control',
                                                'x-reactions': [
                                                    {
                                                        target: 'max_length',
                                                        when: '$this.value === "max_length"',
                                                        fullfill: {
                                                            schema: {
                                                                'x-hidden': false
                                                            }
                                                        }
                                                    },
                                                    {
                                                        target: 'min_number',
                                                        when: '$this.value === "min_number"',
                                                        fullfill: {
                                                            schema: {
                                                                'x-hidden': false
                                                            }
                                                        }
                                                    },
                                                    {
                                                        target: 'max_number',
                                                        when: '$this.value === "max_number"',
                                                        fullfill: {
                                                            schema: {
                                                                'x-hidden': false
                                                            }
                                                        }
                                                    },
                                                    {
                                                        target: 'max_file_size',
                                                        when: '$this.value === "max_file_size"',
                                                        fullfill: {
                                                            schema: {
                                                                'x-hidden': false
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            max_length: {
                                                type: 'number',
                                                default: 500,
                                                'x-component': 'NumberInput',
                                                'x-type': 'Control',
                                                'x-component-props': {
                                                    min: 0,
                                                    max: 15000,
                                                    placeholder: '{{I18n(state.inputs_max_length_placeholder)}}'
                                                },
                                                'x-validator': [{ required: true }, { exclusiveMinimum: 0 }, { exclusiveMaximum: 15000 }]
                                            },
                                            min_number: {
                                                type: 'number',
                                                'x-component': 'NumberInput',
                                                'x-type': 'Control',
                                                'x-hidden': true,
                                                'x-component-props': {
                                                    placeholder: '{{I18n(state.inputs_min_number_placeholder)}}'
                                                }
                                            },
                                            max_number: {
                                                type: 'number',
                                                'x-component': 'NumberInput',
                                                'x-type': 'Control',
                                                'x-hidden': true,
                                                'x-component-props': {
                                                    placeholder: '{{I18n(state.inputs_max_number_placeholder)}}'
                                                }
                                            },
                                            max_file_size: {
                                                type: 'number',
                                                default: 10 * 1024 * 1024,
                                                'x-component': 'NumberInput',
                                                'x-type': 'Control',
                                                'x-hidden': true,
                                                'x-component-props': {
                                                    min: 0,
                                                    max: 100 * 1024 * 1024,
                                                    placeholder: '{{I18n(state.inputs_max_file_size_placeholder)}}'
                                                },
                                                'x-validator': [
                                                    { required: true },
                                                    { exclusiveMinimum: 0 },
                                                    { exclusiveMaximum: 100 * 1024 * 1024 }
                                                ]
                                            },
                                            error_message: {
                                                type: 'string',
                                                'x-component': 'Input',
                                                'x-type': 'Control',
                                                'x-component-props': {
                                                    placeholder: '{{I18n(state.inputs_error_message_placeholder)}}'
                                                }
                                            }
                                        }
                                    }
                                },
                                'x-type': 'Card',
                                'x-draggable': true,
                                'x-role': 'core',
                                'x-deletable': true
                            },
                            'x-type': 'Card',
                            'x-addable': true,
                            'x-dropable': true,
                            'x-empty': {
                                text: '{{I18n(state.inputs_validations_empty_text)}}'
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
            outputs: {
                type: 'object',
                title: 'Outputs',
                additionalProperties: {
                    title: '{{key}}',
                    'x-key': '{{uuid}}',
                    'x-title-editable': true,
                    'x-title-component-props': {
                        showDialog: true,
                        options: [],
                        dialogConfig: {
                            title: '{{I18n(state.transitions_dialog_title)}}',
                            selectLabel: '{{I18n(state.transitions_dialog_select_label)}}',
                            inputLabel: '{{I18n(state.transitions_dialog_input_label)}}'
                        },
                        changeKeyAndName: true
                    },
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
                                placeholder: '{{I18n(state.outputs_name_placeholder)}}'
                            },
                            'x-validator': [
                                { required: true, message: '{{I18n(state.outputs_name_required)}}' },
                                { maxLength: 30, message: '{{I18n(state.outputs_name_max_length)}}' }
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
                                        schema: {
                                            'x-raw': true,
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
                                        schema: {
                                            'x-raw': true,
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
                            ],
                            'x-validator': [{ required: true, message: '{{I18n(state.outputs_type_required)}}' }]
                        },
                        value: {
                            type: 'string',
                            'x-component': 'ExpInput',
                            'x-type': 'Control',
                            'x-validator': [
                                { required: true, message: '{{I18n(state.outputs_value_required)}}' }
                            ]
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
            render: {
                type: 'object',
                title: '{{I18n(state.inputs_render_title)}}',
                properties: {
                    text: {
                        type: 'string',
                        title: '{{I18n(state.inputs_render_text_title)}}',
                        'x-component': 'ExpInput',
                        'x-component-props': {
                            placeholder: '{{I18n(state.inputs_render_text_placeholder)}}'
                        },
                        'x-type': 'Card',
                        'x-switchable': true,
                        'x-switchable-default': true
                    },
                    image: {
                        type: 'string',
                        title: '{{I18n(state.inputs_render_image_title)}}',
                        'x-type': 'Card',
                        'x-switchable': true,
                        'x-raw': true,
                        'x-component': 'FileUpload',
                        'x-component-props': {
                            key: 'image',
                            scenario: common_1.Scenario.SCENARIO_IM_CHAT,
                            supportedFileTypes: getAcceptTypes_1.SERVER_FILE_TYPE.image,
                            fileUpload: 'uploadFileToS3WithProgress'
                        }
                    },
                    audio: {
                        type: 'string',
                        title: '{{I18n(state.inputs_render_audio_title)}}',
                        'x-type': 'Card',
                        'x-switchable': true,
                        'x-raw': true,
                        'x-component': 'FileUpload',
                        'x-component-props': {
                            key: 'audio',
                            scenario: common_1.Scenario.SCENARIO_IM_CHAT,
                            supportedFileTypes: getAcceptTypes_1.SERVER_FILE_TYPE.audio,
                            fileUpload: 'uploadFileToS3WithProgress'
                        }
                    },
                    buttons: {
                        type: 'array',
                        title: '{{I18n(state.inputs_buttons_title)}}',
                        additionalItems: {
                            type: 'object',
                            title: 'Button',
                            properties: {
                                _key: {
                                    type: 'string',
                                    default: '{{uuid}}',
                                    'x-type': 'Control',
                                    'x-component': 'Input',
                                    'x-hidden': true
                                },
                                content: {
                                    type: 'string',
                                    title: '{{I18n(state.inputs_buttons_content_title)}}',
                                    'x-component': 'Input',
                                    'x-type': 'Control',
                                    'x-component-props': {
                                        placeholder: '{{I18n(state.inputs_buttons_content_placeholder)}}'
                                    }
                                },
                                on_click: {
                                    type: 'object',
                                    properties: {
                                        void_core: {
                                            type: 'void',
                                            'x-role': 'core',
                                            'x-type': 'Grid',
                                            'x-class': 'flex',
                                            properties: {
                                                event: {
                                                    title: '{{I18n(state.inputs_buttons_on_click_title)}}',
                                                    'x-component': 'ExpSelect',
                                                    'x-type': 'Control',
                                                    'x-class': 'flex-1',
                                                    'x-value-prop-name': 'defaultValue',
                                                    'x-onchange-prop-name': 'onValueChange'
                                                },
                                                payload: {
                                                    type: 'object',
                                                    default: {},
                                                    'x-component': 'PayloadConfig',
                                                    'x-type': 'Control'
                                                }
                                            }
                                        }
                                    }
                                },
                                description: {
                                    type: 'string',
                                    title: '{{I18n(state.inputs_buttons_description_title)}}',
                                    'x-component': 'Textarea',
                                    'x-component-props': {
                                        maxLength: 500,
                                        placeholder: '{{I18n(state.inputs_buttons_description_placeholder)}}'
                                    },
                                    'x-validator': [{ maxLength: 500 }],
                                    'x-type': 'Control'
                                }
                            },
                            'x-type': 'Card',
                            'x-draggable': true,
                            'x-role': 'core',
                            'x-deletable': true
                        },
                        'x-error-component': 'JsonError',
                        'x-type': 'Card',
                        'x-addable': true,
                        'x-switchable': true,
                        'x-empty': {
                            text: '{{I18n(state.inputs_buttons_empty_text)}}'
                        }
                    }
                },
                'x-type': 'Block',
                'x-title-size': 'h4',
                'x-collapsible': true
            },
            transitions: {
                type: 'object',
                title: 'Transitions',
                additionalProperties: {
                    type: 'array',
                    title: '{{key}}',
                    default: [{}],
                    'x-key': 'Event_{{counter}}',
                    'x-title-editable': true,
                    'x-title-component-props': {
                        options: [
                            {
                                label: 'CHAT',
                                value: 'CHAT'
                            },
                            {
                                label: 'ALWAYS',
                                value: 'ALWAYS'
                            }
                        ],
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
                        ],
                        showDialog: true,
                        dialogConfig: {
                            title: '{{I18n(automata.transitions_dialog_title)}}',
                            selectLabel: '{{I18n(automata.transitions_dialog_select_label)}}',
                            inputLabel: '{{I18n(automata.transitions_dialog_input_label)}}'
                        }
                    },
                    additionalItems: {
                        type: 'object',
                        title: '{{I18n(automata.transitions_item_title)}}',
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
                                        default: '',
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
        },
        'x-type': 'Section',
        'x-title-size': 'h1'
    }
};
exports.State = State;
