"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FCMForeground;
const messaging_1 = require("firebase/messaging");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_use_1 = require("react-use");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useFCMToken_1 = __importDefault(require("../../../hooks/common/useFCMToken.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const config_1 = __importDefault(require("../../../../firebase/config.js"));
function FCMForeground() {
    const { notificationPermissionStatus } = (0, useFCMToken_1.default)();
    const params = (0, navigation_1.useParams)();
    const { botId } = params;
    const sensors = (0, sensors_1.useSensors)();
    const { locale } = (0, usePathLocale_1.usePathLocale)();
    const router = (0, navigation_1.useRouter)();
    const createForegroundNotification = (0, react_1.useCallback)((data) => {
        const notification = new Notification(data.title, {
            ...data
        });
        notification.onclick = event => {
            event.preventDefault();
            sensors.track('PushClick', {
                scene: 'image_generated',
                bot_id: data.bot_id,
                bot_name: data.bot_name
            });
            const targetUrl = `/${locale}/chat/${data.bot_id}`;
            router.push(targetUrl);
        };
        return notification;
    }, [locale, router, sensors]);
    (0, react_1.useEffect)(() => {
        let unsubscribe;
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            if (notificationPermissionStatus === 'granted') {
                const messaging = (0, messaging_1.getMessaging)(config_1.default);
                unsubscribe = (0, messaging_1.onMessage)(messaging, payload => {
                    console.log(payload);
                    const data = payload?.data;
                    if (data?.scene === 'image_generated' && data?.bot_id !== botId) {
                        createForegroundNotification(data);
                    }
                });
            }
        }
        return () => {
            unsubscribe?.();
        };
    }, [botId, createForegroundNotification, notificationPermissionStatus]);
    (0, react_use_1.useEffectOnce)(() => {
        const onFCMRedirect = (event) => {
            if (!event.data.action)
                return;
            if (event.data.action === 'redirect-from-notificationclick') {
                window.location.href = event.data.url;
            }
        };
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', onFCMRedirect);
        }
        return () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.removeEventListener('message', onFCMRedirect);
            }
        };
    });
    return null;
}
