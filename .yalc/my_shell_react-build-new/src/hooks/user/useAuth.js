"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAuth;
const navigation_1 = require("next/navigation");
const identityService_1 = require("../../common/services/identityService.js");
const store_1 = require("../../services/store/index.js");
function useAuth() {
    const clearUser = (0, store_1.useUserStore)(state => state.clearUser);
    const clearChatRecord = (0, store_1.useChatStore)(state => state.clearChatRecord);
    const reset = (0, store_1.useBotStore)(state => state.reset);
    const clearTextInput = (0, store_1.useChatStore)(state => state.clearTextInput);
    const resetTtsContent = (0, store_1.useWorkshopStore)(state => state.resetTtsContent);
    const router = (0, navigation_1.useRouter)();
    async function logout(clearAll = true) {
        try {
            identityService_1.identityService.clearAll(clearAll);
            clearChatRecord();
            clearUser();
            reset();
            clearTextInput();
            resetTtsContent();
            window.location.href = '/';
        }
        catch (e) {
            console.error('登出失败');
        }
    }
    return {
        logout
    };
}
