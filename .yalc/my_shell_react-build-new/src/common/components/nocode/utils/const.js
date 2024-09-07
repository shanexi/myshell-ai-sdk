"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_WIDGET_DATA = exports.DEFAULT_PROCONFIG_DATA = exports.DEFAULT_DATA = void 0;
const uuid_1 = require("./uuid.js");
const DEFAULT_STATE = (0, uuid_1.uuid)();
exports.DEFAULT_DATA = {
    id: 'App',
    type: 'automata',
    initial: DEFAULT_STATE,
    states: {
        [DEFAULT_STATE]: {
            type: 'state',
            name: 'Intro'
        }
    },
    transitions: {}
};
exports.DEFAULT_PROCONFIG_DATA = {
    id: 'App',
    initial: DEFAULT_STATE,
    context: {},
    states: {
        [DEFAULT_STATE]: {
            name: 'Intro'
        }
    },
    transitions: {}
};
exports.DEFAULT_WIDGET_DATA = {
    module_type: '',
    module_config: {
        widget_id: '',
        output_name: ''
    }
};
