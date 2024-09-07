"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YIDUN_LANG_MAP = void 0;
exports.default = CaptchaModalV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const user_1 = require("../../apis/user.js");
const spinner_1 = __importDefault(require("../../common/components/ui/spinner.js"));
const useNotification_1 = require("../../common/hooks/useNotification.js");
const useUserSettings_1 = __importDefault(require("../../common/hooks/useUserSettings.js"));
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const sensors_1 = require("../../lib/sensors/index.js");
const store_1 = require("../../services/store/index.js");
const modal_1 = require("../../services/store/modal.js");
const modal_2 = require("./ui/modal.js");
const captchaId = `${runtime_config_1.CAPTCHA_ID}`;
exports.YIDUN_LANG_MAP = {
    zh: 'zh-CN',
    'zh-tw': 'zh-TW',
    en: 'en-US',
    jp: 'ja',
    es: 'es',
    ru: 'ru',
    ko: 'ko'
};
function CaptchaModalV2({ open, onlySign }) {
    const captchaIns = (0, react_2.useRef)(null);
    const [captchaLoaded, setCaptchaLoaded] = (0, react_2.useState)(false);
    const [errorMsg, setErrorMsg] = (0, react_2.useState)();
    const { currentLanguage } = (0, useUserSettings_1.default)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const { error } = (0, useNotification_1.useNotification)();
    const { onOk, triggerScene } = (0, modal_1.useModalProps)();
    const sensors = (0, sensors_1.useSensors)();
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const cantCloseLogin = (0, store_1.useGlobalStore)(state => state.cantCloseLogin);
    const yidunLang = (0, react_2.useMemo)(() => {
        return currentLanguage && exports.YIDUN_LANG_MAP[currentLanguage] ? exports.YIDUN_LANG_MAP[currentLanguage] : 'en-US';
    }, [currentLanguage]);
    const initNECaptcha = (0, react_2.useCallback)(() => {
        try {
            window.initNECaptchaWithFallback({
                captchaId,
                element: '#captcha',
                width: '300px',
                mode: 'embed',
                apiVersion: 2,
                lang: yidunLang,
                async onVerify(err, data) {
                    if (err) {
                        sensors?.track('TryVerifyCaptcha', {
                            result: false,
                            trigger_scene: triggerScene
                        });
                        return;
                    }
                    if (data.isFallback) {
                        sensors?.track('TryVerifyCaptcha', {
                            result: 'Fallback',
                            trigger_scene: triggerScene
                        });
                        setCaptchaLoaded(true);
                        return;
                    }
                    if (data.validate && !data.isFallback) {
                        sensors?.track('TryVerifyCaptcha', {
                            result: true,
                            trigger_scene: triggerScene
                        });
                        if (!onlySign) {
                            try {
                                const res = await (0, user_1.tryVerifyYidunCaptcha)(data.validate);
                                if (res) {
                                    typeof onOk === 'function' && onOk(data.validate);
                                }
                                else {
                                    captchaIns.current && captchaIns.current.refresh();
                                }
                            }
                            catch (e) {
                                console.error(e);
                                error({
                                    content: 'verify failed'
                                });
                            }
                        }
                        else {
                            typeof onOk === 'function' && onOk(data.validate);
                        }
                    }
                }
            }, function onload(instance) {
                sensors?.track('LoadCaptcha', {
                    result: true
                });
                captchaIns.current = instance;
                setCaptchaLoaded(true);
            }, function onerror(err) {
                console.error(err);
                error({
                    content: errorT('captcha_load_error')
                });
                sensors?.track('LoadCaptcha', {
                    result: false
                });
                setErrorMsg(err.message);
            });
        }
        catch (e) {
            console.error(e);
            error({
                content: errorT('captcha_load_error')
            });
            sensors?.track('LoadCaptcha', {
                result: false
            });
        }
    }, [onOk, yidunLang]);
    (0, react_2.useEffect)(() => {
        initNECaptcha();
    }, [initNECaptcha]);
    return ((0, jsx_runtime_1.jsx)(modal_2.Modal, { open: open, hideClose: true, size: "md", title: t('captcha_title'), overlayClose: false, overlayClassName: "z-[9999]", contentClassName: "max-w-[512px] z-[9999]", children: (0, jsx_runtime_1.jsx)("div", { className: "relative p-6", children: (0, jsx_runtime_1.jsxs)(react_1.Center, { w: "full", h: "240px", children: [!captchaLoaded && ((0, jsx_runtime_1.jsx)(react_1.Center, { w: "full", h: "full", position: "absolute", top: 0, left: 0, children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand" }) })), (0, jsx_runtime_1.jsx)(react_1.Box, { children: (0, jsx_runtime_1.jsx)("div", { id: "captcha", className: "w-full flex justify-center items-end" }) })] }) }) }));
}
