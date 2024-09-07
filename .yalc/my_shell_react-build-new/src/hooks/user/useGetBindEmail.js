"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const user_1 = require("../../apis/user.js");
const store_1 = require("../../services/store/index.js");
const useGetBindEmail = () => {
    const isOpenEmailBindingModal = (0, store_1.useGlobalStore)(state => state.isOpenEmailBindingModal);
    const toggleEmailBindingModal = (0, store_1.useGlobalStore)(state => state.toggleEmailBindingModal);
    const token = (0, store_1.useUserStore)(state => state.token);
    (0, react_1.useEffect)(() => {
        const intervalId = setInterval(() => {
            if (token) {
                !isOpenEmailBindingModal && checkBindPrivyEmailHandle();
            }
        }, 10 * 60 * 1000);
        const timer = setTimeout(() => {
            if (token) {
                checkBindPrivyEmailHandle();
            }
            timer && clearTimeout(timer);
        }, 8000);
        return () => {
            clearInterval(intervalId);
        };
    }, [token]);
    const checkBindPrivyEmailHandle = (0, react_1.useCallback)(async () => {
        try {
            const res = await (0, user_1.checkBindPrivyEmail)();
            if (res.success) {
                if (res.data && res.data.Need) {
                    toggleEmailBindingModal(true);
                }
            }
        }
        catch (e) {
        }
    }, [toggleEmailBindingModal]);
};
exports.default = useGetBindEmail;
