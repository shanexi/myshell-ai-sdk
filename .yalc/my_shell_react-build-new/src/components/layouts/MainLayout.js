"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLayout = MainLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const lodash_es_1 = require("lodash-es");
const dynamic_1 = __importDefault(require("next/dynamic"));
const script_1 = __importDefault(require("next/script"));
const react_1 = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const react_hot_toast_1 = require("react-hot-toast");
const react_use_1 = require("react-use");
const ua_parser_js_1 = __importDefault(require("ua-parser-js"));
const sc_exposure_es6_1 = __importDefault(require("../../assets/plugin/sc-exposure.es6.js"));
const useChatService_1 = __importDefault(require("../../chat/views/hooks/useChatService.js"));
const useEventService_1 = require("../../chat/views/hooks/useEventService.js");
const PageLoading_1 = __importDefault(require("../../common/components/PageLoading.js"));
const FCMForeground_1 = __importDefault(require("../../common/components/fcm/FCMForeground.js"));
const toaster_1 = require("../../common/components/ui/toast/toaster.js");
const useUserSettings_1 = __importDefault(require("../../common/hooks/useUserSettings.js"));
const identityService_1 = require("../../common/services/identityService.js");
const EventEmitter_1 = __importDefault(require("../../common/utils/EventEmitter.js"));
const common_helper_1 = require("../../common/utils/common-helper.js");
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const useSeason_1 = __importDefault(require("../../hooks/rewards-center/useSeason.js"));
const useAuth_1 = __importDefault(require("../../hooks/user/useAuth.js"));
const useGetEnergyInfoPolling_1 = __importDefault(require("../../hooks/user/useGetEnergyInfoPolling.js"));
const useGetUserProfile_1 = __importDefault(require("../../hooks/user/useGetUserProfile.js"));
const store_1 = require("../../services/store/index.js");
const modal_1 = require("../../services/store/modal.js");
const MainLayoutWrapper_1 = __importDefault(require("./MainLayoutWrapper.js"));
const BotSelector_1 = require("../onboarding/BotSelector.js");
const TagNotice_1 = __importDefault(require("../profile/TagNotice.js"));
const AutoUpdateTimezone_1 = __importDefault(require("../profile/settings/timezone/AutoUpdateTimezone.js"));
const LoginModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/components/auth/login-modal/PrivyLoginModal.js'))), {
    loading: () => null,
    ssr: false
});
const TokenInvalidModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/components/auth/login-modal/TokenInvalidModal.js'))), {
    loading: () => null,
    ssr: false
});
const CaptchaModalV2 = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/components/CaptchaModalV2.js'))), {
    loading: () => null,
    ssr: false
});
function ErrorFallback({ error, resetErrorBoundary }) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "Something went wrong:" }), (0, jsx_runtime_1.jsx)("pre", { children: error.message }), (0, jsx_runtime_1.jsx)("button", { onClick: resetErrorBoundary, children: "Try again" })] }));
}
function MainLayout({ className, children }) {
    const isOpenLoginModal = (0, store_1.useGlobalStore)(state => state.isOpenLoginModal);
    const isOpenInvalidModal = (0, store_1.useGlobalStore)(state => state.isOpenInvalidModal);
    const setToken = (0, store_1.useUserStore)(state => state.setToken);
    const mainRef = (0, react_1.useRef)(null);
    const isGlobalLoading = (0, store_1.useGlobalStore)(state => state.isGlobalLoading);
    const user = (0, store_1.useUserStore)(state => state.user);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const onboarding = (0, store_1.useGlobalStore)(state => state.onboarding);
    const { querySeasons } = (0, useSeason_1.default)();
    const userRef = (0, react_1.useRef)(null);
    const pureLoading = (0, react_1.useMemo)(() => (0, PageLoading_1.default)({ loading: isGlobalLoading }), [isGlobalLoading]);
    const { logout } = (0, useAuth_1.default)();
    (0, react_1.useEffect)(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const channel = searchParams.get('channel') || '';
        if (channel) {
            identityService_1.identityService.setChannel(channel);
        }
    }, []);
    (0, react_use_1.useEffectOnce)(() => {
        const cb = () => {
            logout(false);
        };
        EventEmitter_1.default.subscribe('Unauthorized', cb);
        return () => EventEmitter_1.default.unSubscribe('Unauthorized', cb);
    });
    (0, react_1.useEffect)(() => {
        userRef.current = user;
    }, [user]);
    (0, react_use_1.useEffectOnce)(() => {
        setToken(identityService_1.identityService.getToken());
    });
    (0, useGetUserProfile_1.default)();
    (0, useGetEnergyInfoPolling_1.default)();
    (0, useChatService_1.default)();
    (0, useEventService_1.useEventService)(isVisitor);
    const { handleGetUserSettings } = (0, useUserSettings_1.default)();
    const { open, onlySign = false } = (0, modal_1.useModalProps)();
    (0, react_1.useEffect)(() => {
        if (user) {
            handleGetUserSettings();
        }
    }, [user]);
    (0, react_1.useEffect)(() => {
        const parser = new ua_parser_js_1.default();
        const { userAgent } = window.navigator;
        const result = parser.setUA(userAgent).getResult();
        const browserName = result.browser.name;
        const browserVersion = result.browser.version;
        const isUnsupportedBrowser = (browserName === 'Chrome' && parseFloat(browserVersion) <= 107) ||
            (browserName === 'Firefox' && parseFloat(browserVersion) <= 100) ||
            (browserName === 'Edge' && parseFloat(browserVersion) <= 107) ||
            (browserName === 'Safari' && parseFloat(browserVersion) <= 15.3) ||
            (browserName === 'Opera' && parseFloat(browserVersion) <= 92);
        if (isUnsupportedBrowser || (0, common_helper_1.isWeixin)()) {
            const handleResize = () => {
                if (mainRef.current) {
                    const height = window.innerHeight;
                    mainRef.current.style.height = `${height}px`;
                }
            };
            window.addEventListener('resize', (0, lodash_es_1.throttle)(handleResize, 500));
            handleResize();
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    (0, react_1.useEffect)(() => {
        querySeasons();
    }, []);
    const trackRenderError = (0, react_1.useCallback)((error, info) => {
        console.error(error, info);
    }, []);
    return ((0, jsx_runtime_1.jsx)(MainLayoutWrapper_1.default, { children: (0, jsx_runtime_1.jsxs)(react_error_boundary_1.ErrorBoundary, { onError: trackRenderError, FallbackComponent: ErrorFallback, children: [(0, jsx_runtime_1.jsx)(react_hot_toast_1.Toaster, { position: "top-center", toastOptions: {
                        duration: 3000
                    } }), (0, jsx_runtime_1.jsx)(toaster_1.Toaster, {}), (0, jsx_runtime_1.jsx)(AutoUpdateTimezone_1.default, {}), (0, jsx_runtime_1.jsx)(FCMForeground_1.default, {}), (0, jsx_runtime_1.jsxs)("main", { id: "shell", ref: mainRef, className: (0, clsx_1.default)('flex flex-row w-full relative bg-surface-default md:bg-surface-container-default flex-nowrap overflow-x-hidden', className), children: [children, (0, jsx_runtime_1.jsxs)(react_1.Suspense, { fallback: null, children: [pureLoading, isOpenInvalidModal && (0, jsx_runtime_1.jsx)(TokenInvalidModal, {}), isOpenLoginModal && (0, jsx_runtime_1.jsx)(LoginModal, {}), open && (0, jsx_runtime_1.jsx)(CaptchaModalV2, { open: open, onlySign: onlySign }), (0, jsx_runtime_1.jsx)(TagNotice_1.default, {})] })] }), onboarding && (0, jsx_runtime_1.jsx)(BotSelector_1.Onboarding, {}), !runtime_config_1.DISABLE_SENSORS_TRACK && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(script_1.default, { id: "scdata", src: "https://cdn.myshell.ai/js/scdata.min.js", onLoad: () => {
                            if (typeof window !== 'undefined') {
                                window.sensors = window.sensorsDataAnalytic201505;
                                const searchParams = (0, common_helper_1.urlSearchParamsToObj)(new URLSearchParams(window.location.search));
                                const { channel = '', inviteCode, botId, my_from } = searchParams;
                                const isKol = !!((channel || my_from === '1') && inviteCode);
                                const projectName = process.env.NODE_ENV === 'development' ? '?project=default' : '?project=production';
                                window.sensors.use(sc_exposure_es6_1.default, {
                                    area_rate: 1,
                                    stay_duration: 3,
                                    repeated: false
                                });
                                window.sensors.use('PageLeave', {
                                    heartbeat_interval_time: 5,
                                    max_duration: 5 * 24 * 60 * 60,
                                    isCollectUrl(url) {
                                        return true;
                                    }
                                });
                                window.sensors.init({
                                    web_url: `https://myshell.sensorsdata.cn${projectName}`,
                                    server_url: runtime_config_1.SENSORS_URL,
                                    is_track_single_page: true,
                                    use_client_time: true,
                                    send_type: 'beacon',
                                    heatmap: {
                                        clickmap: 'default',
                                        scroll_notice_map: 'default'
                                    },
                                    platform: 'web',
                                    version: '1.0.0',
                                    device: 'pc',
                                    p_from_kol_link: isKol,
                                    p_kol_code: isKol ? inviteCode : '',
                                    p_kol_channel: isKol ? channel : '',
                                    p_kol_bot: isKol ? botId : ''
                                });
                                window.sensors.quick('autoTrack');
                                const props = window.sensors.getPresetProperties();
                                identityService_1.identityService.setSCDeviceId(props?.identities?.$identity_cookie_id);
                                const anonymousId = identityService_1.identityService.getAnonymousId();
                                anonymousId && window.sensors.bind('identity_device_id', anonymousId);
                            }
                        } }) }))] }) }));
}
