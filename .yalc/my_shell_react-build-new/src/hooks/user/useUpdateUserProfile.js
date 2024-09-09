"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useUpdateUserProfile;
const user_1 = require("../../apis/user.js");
const store_1 = require("../../services/store/index.js");
function useUpdateUserProfile() {
    const setUser = (0, store_1.useUserStore)(state => state.setUser);
    const queryUserProfile = async () => {
        try {
            const { data } = await (0, user_1.getUserProfile)();
            setUser(data);
            return data;
        }
        catch (e) {
            throw new Error(e.response.data.message);
        }
    };
    return {
        queryUserProfile
    };
}
