"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const Widget = {
    type: 'widget',
    schema: {
        type: 'object',
        title: '{{I18n(widget.title)}}',
        'x-suffix': 'JsonEditor',
        properties: {
            name: {
                type: 'string',
                'x-type': 'Control',
                'x-component': 'Input',
                'x-read-only': true
            },
            module_type: {
                type: 'string',
                default: 'AnyWidgetModule',
                'x-type': 'Control',
                'x-component': 'Input',
                'x-hidden': true
            },
            module_config: {
                type: 'object',
                title: 'Input',
                'x-type': 'Block',
                'x-title-size': 'h2'
            }
        },
        'x-type': 'Section',
        'x-title-size': 'h1'
    }
};
exports.Widget = Widget;
