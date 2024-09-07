"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const next_intl_1 = require("next-intl");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const user_1 = require("../../../../apis/user.js");
const button_1 = require("../../../../common/components/ui/button.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const user_2 = require("../../../../common/constants/enums/user.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const runtime_config_1 = require("../../../../common/utils/runtime-config.js");
const useLoadConnectedAccounts_1 = __importDefault(require("../../../../hooks/user/useLoadConnectedAccounts.js"));
const store_1 = require("../../../../services/store/index.js");
const CantBindTipModal_1 = __importDefault(require("./CantBindTipModal.js"));
const DisconnectTipModal_1 = __importDefault(require("./DisconnectTipModal.js"));
function Connections() {
    const connectedAccounts = (0, store_1.useUserStore)(state => state.connectedAccounts);
    const { success } = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('profile');
    const [telegramModalVisible, setTelegramModalVisible] = (0, react_1.useState)(false);
    const [telegramUserName, setTelegramUserName] = (0, react_1.useState)('');
    const [showDisconnected, setShowDisconnected] = (0, react_1.useState)();
    const pathname = (0, navigation_1.usePathname)();
    const web3 = pathname.includes('/web3') ? '/web3' : '';
    const openDcOauthLink = () => {
        if (connectedAccounts?.discord?.id) {
            setShowDisconnected(user_2.BindType.BIND_TYPE_DISCORD);
        }
        else {
            const redirect_url = `${(0, common_helper_1.isClient)() ? window.location.origin : ''}${web3}/profile?type=dc`;
            window.open(`https://discord.com/oauth2/authorize?response_type=code&client_id=${runtime_config_1.DISCORD_CLIENT_ID}&scope=identify&state=15773059ghq9183habn&redirect_uri=${encodeURIComponent(redirect_url)}&prompt=none`);
        }
    };
    const openTwitterOauthLink = () => {
        if (connectedAccounts?.twitter?.id) {
            setShowDisconnected(user_2.BindType.BIND_TYPE_TWITTER);
        }
        else {
            const redirect_url = `${(0, common_helper_1.isClient)() ? window.location.origin : ''}${web3}/profile?type=tw`;
            window.open(`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${runtime_config_1.TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirect_url)}&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=${runtime_config_1.TWITTER_CODE_CHALLENGE}&code_challenge_method=plain`);
        }
    };
    const { loadConnectedAccounts } = (0, useLoadConnectedAccounts_1.default)();
    const onClickTgBtn = (0, react_1.useCallback)(() => {
        if (!connectedAccounts || !connectedAccounts.telegram) {
            setTelegramModalVisible(true);
        }
        else {
            setShowDisconnected(user_2.BindType.BIND_TYPE_TG);
        }
    }, [connectedAccounts]);
    const disconnectConfirmed = async (callback) => {
        const res = await (0, user_1.bindRemove)(showDisconnected);
        if (res.success) {
            setShowDisconnected(undefined);
            loadConnectedAccounts();
            success({
                content: t('successful')
            });
            callback();
        }
        else {
            console.error(res);
        }
    };
    (0, react_1.useEffect)(() => {
        if (connectedAccounts && connectedAccounts.telegram) {
            const tgInfo = connectedAccounts.telegram;
            let userName = '';
            if (tgInfo.username) {
                userName = tgInfo.username;
            }
            if (!userName) {
                if (tgInfo.firstName)
                    userName += `${tgInfo.firstName} `;
                if (tgInfo.lastName)
                    userName += tgInfo.lastName;
            }
            if (!userName) {
                userName = 'Unnamed';
            }
            setTelegramUserName(userName);
        }
    }, [connectedAccounts]);
    const onClose = (0, react_1.useCallback)(() => {
        setTelegramModalVisible(false);
        loadConnectedAccounts();
    }, [loadConnectedAccounts]);
    const errorReasonRef = (0, react_1.useRef)('');
    const bindTypeRef = (0, react_1.useRef)('');
    const nextTimeCanBindRef = (0, react_1.useRef)('');
    const [cantBindTipModalVisible, setCantBindTipModalVisible] = (0, react_1.useState)(false);
    const errCallbackHandle = (type, errorReason, nextTimeCanBind) => {
        bindTypeRef.current = type;
        errorReasonRef.current = errorReason;
        nextTimeCanBindRef.current = nextTimeCanBind;
        setTelegramModalVisible(false);
        setCantBindTipModalVisible(true);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-4 md:px-10 mt-3 md:mt-5", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-on-surface font-medium", children: t('connections') }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-secondary", children: t('connections_tip') }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 space-y-4 flex-col", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", color: "default", className: "w-full flex flex-start py-2 px-3 rounded-xl h-auto", onClick: onClickTgBtn, disabled: true, children: [connectedAccounts?.telegram ? (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-6 stroke-primary mr-2" }) : null, (!connectedAccounts || !connectedAccounts.telegram) && ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "flex-grow text-left text-on-surface font-medium text-sm", children: t('connect_with_telegram') })), connectedAccounts?.telegram && telegramUserName && ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "flex-grow text-left text-on-surface font-medium text-sm", children: telegramUserName })), (0, jsx_runtime_1.jsx)("i", { className: `bg-[url('/icons/social-media/telegram.svg')] bg-no-repeat bg-center bg-[length:100%] flex justify-center items-center w-8 h-8 rounded-lg` })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", color: "default", className: "w-full flex flex-start justify-between py-2 px-3 rounded-xl h-auto", onClick: openTwitterOauthLink, children: [connectedAccounts?.twitter ? (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-6 stroke-primary" }) : undefined, (!connectedAccounts || !connectedAccounts.twitter) && ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "flex-grow text-left text-on-surface font-medium text-sm", children: t('connect_with_twitter') })), connectedAccounts?.twitter?.username && ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "flex-grow text-left text-on-surface font-medium text-sm", children: connectedAccounts.twitter.username })), (0, jsx_runtime_1.jsx)("i", { className: `bg-[url('/icons/social-media/twitter.svg')] bg-no-repeat bg-center bg-[length:100%] flex justify-center items-center w-8 h-8 rounded-lg` })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", color: "default", className: "w-full flex flex-start justify-between py-2 px-3 rounded-xl h-auto", onClick: openDcOauthLink, children: [connectedAccounts?.discord ? (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-6 stroke-primary" }) : undefined, (!connectedAccounts || !connectedAccounts.discord) && ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "flex-grow text-left text-on-surface font-medium text-sm", children: t('connect_with_discord') })), connectedAccounts?.discord?.username && ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "flex-grow text-left text-on-surface font-medium text-sm", children: connectedAccounts.discord.username })), (0, jsx_runtime_1.jsx)("i", { className: `bg-[url('/icons/social-media/discord.svg')] bg-no-repeat bg-center bg-[length:100%] flex justify-center items-center w-8 h-8 rounded-lg` })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: true, variant: "outline", color: "default", className: "w-full flex flex-start justify-between py-2 px-3 rounded-xl h-auto", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { className: "flex-grow text-left text-on-surface font-medium text-sm", children: t('connect_with_messenger') }), (0, jsx_runtime_1.jsx)("i", { className: `bg-[url('/icons/social-media/messenger.svg')] bg-no-repeat bg-center bg-[length:100%] flex justify-center items-center w-8 h-8 rounded-lg` })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: true, variant: "outline", color: "default", className: "w-full flex flex-start justify-between py-2 px-3 rounded-xl h-auto", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { className: "flex-grow text-left text-on-surface font-medium text-sm", children: t('connect_with_whatsapp') }), (0, jsx_runtime_1.jsx)("i", { className: `bg-[url('/icons/social-media/whatsApp.svg')] bg-no-repeat bg-center bg-[length:100%] flex justify-center items-center w-8 h-8 rounded-lg` })] })] })] }), (0, jsx_runtime_1.jsx)(DisconnectTipModal_1.default, { onClose: () => {
                    setShowDisconnected(undefined);
                }, onConfirmed: (callback) => {
                    disconnectConfirmed(callback);
                }, bindType: showDisconnected, isOpen: !!showDisconnected }), (0, jsx_runtime_1.jsx)(CantBindTipModal_1.default, { isOpen: cantBindTipModalVisible, bindType: bindTypeRef.current, errorReason: errorReasonRef.current, nextTimeCanBind: nextTimeCanBindRef.current, onClose: () => {
                    setCantBindTipModalVisible(false);
                } })] }));
}
exports.default = Connections;
