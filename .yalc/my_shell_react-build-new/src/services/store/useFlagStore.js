"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFlagStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const immer_1 = require("zustand/middleware/immer");
const DEFAULT_STATE = {
    luiButtonGuideClicked: false
};
const createFlagSlice = (set, get) => {
    return {
        ...DEFAULT_STATE,
        setLuiButtonGuideClicked(value) {
            set(state => {
                state.luiButtonGuideClicked = value;
            });
        }
    };
};
const persistConfig = {
    name: 'flag-storage',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
    partialize: state => ({
        luiButtonGuideClicked: state.luiButtonGuideClicked
    }),
    merge: (persistedState, currentState) => ({
        ...currentState,
        luiButtonGuideClicked: persistedState.luiButtonGuideClicked
    })
};
exports.useFlagStore = (0, zustand_1.create)()((0, immer_1.immer)((0, middleware_1.devtools)((0, middleware_1.persist)(createFlagSlice, persistConfig), { store: 'flag' })));
