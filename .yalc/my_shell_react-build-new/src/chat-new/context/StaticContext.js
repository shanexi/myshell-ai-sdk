import { createContext } from 'react';
const defaultFn = () => { };
export const StaticContext = createContext({
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
    setEnergyInfo: defaultFn,
    showPin: true,
    fileUploadDisabled: false
});
