"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShareKeyStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const immer_1 = require("zustand/middleware/immer");
const DEFAULT_STATE = {
    currentViewTable: null,
    stakeDetailTableActed: false,
    topEarnTableActed: false,
    soarBotTableActed: false,
    hotBotTableActed: false,
    potentialTableActed: false,
    turnoverBotTableActed: false
};
const createShareKeySlice = set => {
    return {
        ...DEFAULT_STATE,
        setCurrentViewTable(table) {
            set({ currentViewTable: table }, false, 'setCurrentViewTable');
        },
        setTableActed(acted) {
            set(state => {
                switch (state.currentViewTable) {
                    case 'stakeDetail':
                        state.stakeDetailTableActed = acted;
                        break;
                    case 'topEarn':
                        state.topEarnTableActed = acted;
                        break;
                    case 'soarBot':
                        state.soarBotTableActed = acted;
                        break;
                    case 'hotBot':
                        state.hotBotTableActed = acted;
                        break;
                    case 'potential':
                        state.potentialTableActed = acted;
                    case 'turnoverBot':
                        state.turnoverBotTableActed = acted;
                        break;
                    default:
                        break;
                }
            }, false, 'setTableActed');
        }
    };
};
exports.useShareKeyStore = (0, zustand_1.create)()((0, immer_1.immer)((0, middleware_1.devtools)(createShareKeySlice, { store: 'shareKey' })));
