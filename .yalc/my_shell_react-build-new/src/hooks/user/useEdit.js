"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEdit = useEdit;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const user_1 = require("../../apis/user.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
const store_1 = require("../../services/store/index.js");
const useDebounce_1 = __importDefault(require("../../common/hooks/useDebounce.js"));
function useEdit() {
    const globalLoading = (0, store_1.useGlobalStore)(state => state.globalLoading);
    const globalLoaded = (0, store_1.useGlobalStore)(state => state.globalLoaded);
    const user = (0, store_1.useUserStore)(state => state.user);
    const setUser = (0, store_1.useUserStore)(state => state.setUser);
    const { warning } = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('profile');
    const [editUser, setEditUser] = (0, react_1.useState)({
        name: user?.name,
        avatar: user?.avatar,
        background: user?.backgroundUrl,
        description: user?.description,
        loginCredential: user?.loginCredential,
        loginType: user?.loginType
    });
    const [isNameAvailable, setIsNameAvailable] = (0, react_1.useState)(true);
    const [isNameError, setIsNameError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setEditUser({
            name: user?.name,
            avatar: user?.avatar,
            background: user?.backgroundUrl,
            description: user?.description,
            loginCredential: user?.loginCredential,
            loginType: user?.loginType
        });
    }, [user]);
    async function updateUser(updateUser, callback) {
        try {
            globalLoading();
            const res = await (0, user_1.updateUserProfile)(updateUser);
            if (res.success) {
                const { data } = await (0, user_1.getUserProfile)();
                setUser(data);
                callback && callback(true);
            }
            else {
                callback && callback(false);
                setIsNameAvailable(false);
                warning({ content: t('edit_tip_error') });
            }
        }
        catch (e) {
            callback && callback(false);
        }
        finally {
            globalLoaded();
        }
    }
    const debouncedHandleChangeInput = (0, useDebounce_1.default)((0, react_1.useCallback)(async (value) => {
        setIsNameError(false);
        if (!value || !/^[A-Za-z0-9_\s]+$/.test(value)) {
            setIsNameError(true);
            return;
        }
        const res = await (0, user_1.checkUserNameAvailable)(value);
        if (res.success && res.data?.available) {
            setIsNameAvailable(true);
        }
        else {
            setIsNameAvailable(false);
            warning({ content: t('edit_tip_error') });
        }
    }, [setIsNameAvailable]), 300);
    const handleChangInput = async (value) => {
        editUser && setEditUser({ ...editUser, name: value });
        debouncedHandleChangeInput(value);
    };
    return {
        isNameAvailable,
        isNameError,
        editUser,
        handleChangInput,
        updateUser,
        setEditUser
    };
}
exports.default = useEdit;
