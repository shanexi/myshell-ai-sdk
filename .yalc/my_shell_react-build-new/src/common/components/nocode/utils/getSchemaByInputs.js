"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaByInputs = void 0;
const common_1 = require("../../../../apis/common.js");
const getAcceptTypes_1 = require("./getAcceptTypes.js");
const getSchemaByInputs = (inputs, parent) => {
    const properties = {};
    Object.keys(inputs || {}).reduce((prev, key) => {
        const { description, name, type } = inputs[key];
        switch (type) {
            case 'text':
                prev[key] = {
                    type: 'string',
                    title: name,
                    description,
                    'x-type': 'Block',
                    'x-component': 'ExpInput',
                    'x-title-size': 'h5',
                    'x-class': 'mt-0'
                };
                break;
            case 'audio':
                prev[key] = {
                    type: 'string',
                    title: name,
                    description,
                    'x-type': 'Block',
                    'x-component': 'FileUpload',
                    'x-title-size': 'h4',
                    'x-raw': true,
                    'x-component-props': {
                        scenario: common_1.Scenario.SCENARIO_IM_CHAT,
                        supportedFileTypes: getAcceptTypes_1.SERVER_FILE_TYPE.audio,
                        fileUpload: 'uploadFileToS3WithProgress'
                    }
                };
                break;
            case 'image':
                prev[key] = {
                    type: 'string',
                    title: name,
                    description,
                    'x-type': 'Block',
                    'x-component': 'FileUpload',
                    'x-title-size': 'h4',
                    'x-raw': true,
                    'x-component-props': {
                        scenario: common_1.Scenario.SCENARIO_IM_CHAT,
                        supportedFileTypes: getAcceptTypes_1.SERVER_FILE_TYPE.image,
                        fileUpload: 'uploadFileToS3WithProgress'
                    }
                };
                break;
        }
        return prev;
    }, properties);
    return {
        type: 'object',
        properties: {
            [parent]: {
                type: 'object',
                'x-type': 'Section',
                'x-class': 'space-y-5 mt-0',
                properties: {
                    ...properties
                }
            }
        },
        'x-type': 'Section'
    };
};
exports.getSchemaByInputs = getSchemaByInputs;
