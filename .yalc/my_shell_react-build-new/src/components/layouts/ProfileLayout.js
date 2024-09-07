"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const user_1 = require("../../apis/user.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
const store_1 = require("../../services/store/index.js");
const CantBindTipModal_1 = __importDefault(require("../profile/edit-profile/component/CantBindTipModal.js"));
function ProfileLayout({ children }) {
    const t = (0, next_intl_1.useTranslations)();
    const globalLoading = (0, store_1.useGlobalStore)(state => state.globalLoading);
    const globalLoaded = (0, store_1.useGlobalStore)(state => state.globalLoaded);
    const setConnectedAccounts = (0, store_1.useUserStore)(state => state.setConnectedAccounts);
    const errorReasonRef = (0, react_1.useRef)('');
    const bindTypeRef = (0, react_1.useRef)('');
    const nextTimeCanBindRef = (0, react_1.useRef)('');
    const { success } = (0, useNotification_1.useNotification)();
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const [cantBindTipModalVisible, setCantBindTipModalVisible] = (0, react_1.useState)(false);
    const errCallback = (type, errorReason, nextTimeCanBind) => {
        bindTypeRef.current = type;
        errorReasonRef.current = errorReason;
        nextTimeCanBindRef.current = nextTimeCanBind;
        setCantBindTipModalVisible(true);
    };
    (0, react_1.useEffect)(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (!searchParams) {
            return;
        }
        const type = searchParams?.get('type');
        const code = searchParams?.get('code');
        const state = searchParams?.get('state');
        const web3 = pathname.includes('/web3') ? '/web3' : '';
        const source = web3 === '/web3' ? 'web3_profile' : '';
        if (type === 'dc' && code && state) {
            globalLoading();
            (0, user_1.connectToDiscord)(code, state, source)
                .pipe((0, rxjs_1.switchMap)(() => {
                return (0, user_1.getUserConnectedAccounts)();
            }), (0, rxjs_1.finalize)(() => {
                globalLoaded();
                router.replace(`${web3}/profile/edit`);
            }))
                .subscribe({
                next: res => {
                    setConnectedAccounts(res);
                },
                error: async (res) => {
                    const data = res?.response?.data;
                    errCallback('Discord', data?.errorReason || '', data?.nextTimeCanBind);
                }
            });
        }
        else if (type === 'tw' && code && state) {
            globalLoading();
            (0, user_1.connectToTwitter)(code, state, source)
                .pipe((0, rxjs_1.switchMap)(() => {
                return (0, user_1.getUserConnectedAccounts)();
            }), (0, rxjs_1.finalize)(() => {
                globalLoaded();
                router.replace(`${web3}/profile/edit`);
            }))
                .subscribe({
                next: res => {
                    setConnectedAccounts(res);
                    success({
                        content: t('profile.successful')
                    });
                },
                error: async (res) => {
                    const data = res?.response?.data;
                    errCallback('Twitter', data?.errorReason || '', data?.nextTimeCanBind);
                }
            });
        }
    }, [globalLoaded, globalLoading, setConnectedAccounts]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex", children: [children, (0, jsx_runtime_1.jsx)(CantBindTipModal_1.default, { isOpen: cantBindTipModalVisible, bindType: bindTypeRef.current, errorReason: errorReasonRef.current, nextTimeCanBind: nextTimeCanBindRef.current, onClose: () => {
                    setCantBindTipModalVisible(false);
                } })] }));
}
exports.default = ProfileLayout;
