"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = getSchema;
const lodash_es_1 = require("lodash-es");
function getSchema(material, { path, tree, nodes, attrs }) {
    const { type } = nodes[path];
    let schema;
    if (type === 'automata') {
        ({ schema } = material);
        const root = tree;
        const { children } = root;
        const options = children
            .map(({ path }) => {
            const { name, title } = nodes[path];
            return {
                value: name,
                label: title
            };
        })
            .filter(({ value, label }) => value && label);
        return options.length
            ? (0, lodash_es_1.merge)({}, schema, {
                properties: {
                    initial: {
                        'x-component': 'Select',
                        'x-component-props': {
                            options
                        },
                        'x-value-prop-name': 'defaultValue',
                        'x-onchange-prop-name': 'onValueChange',
                        'x-validator': [{ required: true }, { enum: options.map(({ value }) => value) }]
                    },
                    transitions: {
                        additionalProperties: {
                            additionalItems: {
                                properties: {
                                    void_core: {
                                        properties: {
                                            target: {
                                                'x-component-props': {
                                                    options
                                                },
                                                'x-validator': [{ required: true }, { enum: options.map(({ value }) => value) }]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            : schema;
    }
    else if (type === 'state') {
        ({ schema } = material);
        const root = tree;
        const { children } = root;
        const options = children
            .map(({ path }) => {
            const { name, title } = nodes[path];
            return {
                value: name,
                label: title
            };
        })
            .filter(({ value, label }) => value && label);
        const context = attrs?.App?.context;
        const contextList = Object.keys({ ...context })?.map(key => ({
            label: `context.${context?.[key]?.name}`,
            value: `__context__${key}__`
        }));
        return options.length
            ? (0, lodash_es_1.merge)({}, schema, {
                properties: {
                    outputs: {
                        additionalProperties: {
                            'x-title-component-props': {
                                options: contextList
                            }
                        }
                    },
                    transitions: {
                        additionalProperties: {
                            additionalItems: {
                                properties: {
                                    void_core: {
                                        properties: {
                                            target: {
                                                'x-component-props': {
                                                    options
                                                },
                                                'x-validator': [{ required: true }, { enum: options.map(({ value }) => value) }]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            : schema;
    }
    else if (type === 'widget') {
        ({ schema } = material);
    }
    return schema;
}
