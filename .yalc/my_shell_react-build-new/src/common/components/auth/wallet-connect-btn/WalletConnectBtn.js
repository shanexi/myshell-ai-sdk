"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletLogin = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const rxjs_1 = require("rxjs");
const innerFrom_1 = require("rxjs/internal/observable/innerFrom");
const wagmi_1 = require("wagmi");
const auth_1 = require("../../../../apis/auth.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const identityService_1 = require("../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const usePrivyLogin_1 = __importDefault(require("../../../../hooks/user/usePrivyLogin.js"));
const sensors_1 = require("../../../../lib/sensors/index.js");
const usePostLogin_1 = require("../usePostLogin.js");
const useWalletLogin = ({ invitationCode, closeModal, loginMethod }) => {
    const sensors = (0, sensors_1.useSensors)();
    const visitorId = ((0, common_helper_1.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
    const { connectAsync, connectors } = (0, wagmi_1.useConnect)();
    const { disconnectAsync } = (0, wagmi_1.useDisconnect)();
    const [account, setAccount] = (0, react_2.useState)();
    const [nonce, setNonce] = (0, react_2.useState)();
    const [signMessageModalVisible, setSignMessageModalVisible] = (0, react_2.useState)(false);
    const { afterLoginRef, getDataFromStorage, loading, setLoading } = (0, usePostLogin_1.usePostLogin)();
    const { signMessageAsync } = (0, wagmi_1.useSignMessage)();
    const [signLoading, setSignLoading] = (0, react_2.useState)(false);
    async function connectWallet(id) {
        await disconnectAsync();
        sensors?.track('StartLogin', {
            login_method: loginMethod
        });
        const connector = connectors.find(c => c.name === id);
        if (!connector) {
            return;
        }
        (0, innerFrom_1.fromPromise)(connectAsync({
            connector
        }))
            .pipe((0, rxjs_1.catchError)(err => {
            if (err instanceof wagmi_1.ConnectorAlreadyConnectedError) {
                return (0, innerFrom_1.fromPromise)(disconnectAsync().then(() => {
                    return connectAsync({
                        connector
                    });
                }));
            }
            return (0, rxjs_1.throwError)(() => err);
        }), (0, rxjs_1.tap)(() => {
            setLoading(true);
        }), (0, rxjs_1.switchMap)((data) => {
            setAccount(data.account);
            return (0, auth_1.generateNonce)(data.account);
        }))
            .subscribe({
            next: res => {
                setNonce(res.nonce);
                setSignMessageModalVisible(true);
            },
            error: async () => {
                await disconnectAsync();
            }
        });
    }
    const verifySign = (signature) => {
        setSignMessageModalVisible(false);
        if (!signature) {
            setLoading(false);
            return;
        }
        const { sharingBotCode, sharingWidgetCode, sharingArticleCode, sharingForumCode, sharingRoomCode, sharingBabelBotCode, sharingBotId, tgGuid, inviteLink, shareWidgetLink } = getDataFromStorage();
        (0, auth_1.verifySignature)(account, signature, visitorId, invitationCode, sharingBotCode, inviteLink, tgGuid, sharingWidgetCode, sharingArticleCode, sharingForumCode, sharingRoomCode, sharingBabelBotCode).subscribe({
            next: res => {
                setNonce(nonce);
                setSignMessageModalVisible(true);
                afterLoginRef.current({
                    res,
                    account,
                    invitationCode,
                    sharingBotCode,
                    sharingWidgetCode,
                    sharingArticleCode,
                    sharingForumCode,
                    sharingRoomCode,
                    sharingBabelBotCode,
                    inviteLink,
                    sharingBotId,
                    closeModal,
                    from: 'wallet',
                    loginMethod,
                    shareWidgetLink
                });
            },
            error: async () => {
                await disconnectAsync();
            }
        });
    };
    const handleSign = () => {
        setSignLoading(true);
        (0, innerFrom_1.fromPromise)(signMessageAsync({ message: nonce }))
            .pipe((0, rxjs_1.finalize)(() => {
            setSignLoading(false);
        }))
            .subscribe({
            next: (signature) => {
                verifySign(signature);
            }
        });
    };
    return {
        loading,
        connectWallet,
        signMessageModalVisible,
        verifySign,
        signLoading,
        handleSign
    };
};
exports.useWalletLogin = useWalletLogin;
function WalletConnectBtn({ children, id, loginMethod, invitationCode, className, closeModal }) {
    const { signMessageAsync } = (0, wagmi_1.useSignMessage)();
    const { login, loading } = (0, usePrivyLogin_1.default)();
    const [openSignMessageModal, setOpenSignMessageModal] = (0, react_2.useState)(false);
    const [signLoading, setSignLoading] = (0, react_2.useState)(false);
    const [nonce, setNonce] = (0, react_2.useState)();
    const connect = async () => {
        const { address } = await login({ method: loginMethod });
        if (address) {
            const nonceResponse = await (0, auth_1.generate_nonce)(address);
            const nonce = nonceResponse?.data?.nonce;
            if (nonce) {
                setNonce(nonce);
                setOpenSignMessageModal(true);
            }
        }
    };
    const signAndVerifyNonce = async () => {
        if (!nonce) {
            return;
        }
        try {
            closeModal();
            setSignLoading(true);
            const signedNonce = await signMessageAsync({ message: nonce });
            const visitorId = ((0, common_helper_1.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
        }
        catch (error) {
            return;
        }
        finally {
            setSignLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "outline", isLoading: loading, spinner: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }), h: "32px", fontWeight: "bold", borderRadius: "100%", textColor: "#282828", w: "32px", minW: "32px", p: "0", fontSize: 20, borderWidth: 0, overflow: "hidden", className: className, onClick: connect, children: children }));
}
exports.default = WalletConnectBtn;
