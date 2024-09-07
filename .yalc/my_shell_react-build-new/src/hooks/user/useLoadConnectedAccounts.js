"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const user_1 = require("../../apis/user.js");
const store_1 = require("../../services/store/index.js");
const useLoadConnectedAccounts = () => {
    const setConnectedAccounts = (0, store_1.useUserStore)(state => state.setConnectedAccounts);
    const connectedAccounts = (0, store_1.useUserStore)(state => state.connectedAccounts);
    const loadConnectedAccounts = (0, react_1.useCallback)(() => {
        return (0, user_1.getUserConnectedAccounts)().subscribe(res => {
            setConnectedAccounts(res);
        });
    }, [setConnectedAccounts]);
    (0, react_1.useEffect)(() => {
        const ob = loadConnectedAccounts();
        return () => {
            ob.unsubscribe();
        };
    }, [loadConnectedAccounts]);
    return {
        loadConnectedAccounts,
        connectedAccounts,
    };
};
exports.default = useLoadConnectedAccounts;
