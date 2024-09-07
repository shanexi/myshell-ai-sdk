"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticContext = void 0;
const react_1 = require("react");
const defaultFn = () => { };
exports.StaticContext = (0, react_1.createContext)({
    type: 'bot',
    entityInfo: {
        id: '',
        name: '',
        energyPerChat: 0,
        pinned: false
    },
    readonly: false,
    interactionDisabled: false,
    visitorInteroperable: true,
    showInteractionCostEnergy: true,
    chatSettingDisabled: true,
    menuDisabled: false,
    menuFunctions: [],
    getList: async () => {
        return [];
    },
    updateChatSetting: defaultFn,
    partialUpdateDetail: defaultFn,
    setEnergyInfo: defaultFn
});
