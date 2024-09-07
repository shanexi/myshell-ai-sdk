"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useFcmToken;
const messaging_1 = require("firebase/messaging");
const react_1 = require("react");
const user_1 = require("../../apis/user.js");
const user_2 = require("../../common/constants/enums/user.js");
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const store_1 = require("../../services/store/index.js");
const config_1 = __importDefault(require("../../../firebase/config.js"));
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;
function useFcmToken() {
    const [token, setToken] = (0, react_1.useState)('');
    const [notificationPermissionStatus, setNotificationPermissionStatus] = (0, react_1.useState)('');
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const bindFCMToken = async (val) => {
        try {
            await (0, user_1.registerFCMUserDevice)(val);
        }
        catch (e) {
            console.error(e);
        }
    };
    const retrieveToken = (0, react_1.useCallback)(async (retryCount = 0) => {
        try {
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                const messaging = (0, messaging_1.getMessaging)(config_1.default);
                const permission = await Notification.requestPermission();
                setNotificationPermissionStatus(permission);
                if (permission === 'granted') {
                    const currentToken = await (0, messaging_1.getToken)(messaging, {
                        vapidKey: runtime_config_1.FIREBASE_MESSAGING_VAPID_KEY
                    });
                    if (currentToken) {
                        setToken(currentToken);
                        await bindFCMToken(currentToken);
                    }
                    else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                }
            }
        }
        catch (error) {
            console.log('Error retrieving token:', error);
            if (retryCount < MAX_RETRIES) {
                console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
                setTimeout(() => retrieveToken(retryCount + 1), RETRY_DELAY);
            }
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (isVisitor === user_2.VisitorEnum.NO) {
            retrieveToken();
        }
    }, [isVisitor, retrieveToken]);
    return { fcmToken: token, notificationPermissionStatus };
}
