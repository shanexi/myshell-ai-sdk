"use strict";
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
exports.default = EmailBindingModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_auth_1 = require("@privy-io/react-auth");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const auth_1 = require("../../../../apis/auth.js");
const dialog_1 = require("../../../../common/components/ui/dialog.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const usePrivyLogin_1 = __importStar(require("../../../../hooks/user/usePrivyLogin.js"));
const utils_1 = require("../../../../lib/utils.js");
const store_1 = require("../../../../services/store/index.js");
const EmailConnectV2_1 = __importDefault(require("../email-connect/EmailConnectV2.js"));
function EmailBindingModal(props) {
    const { open, onRecoverySuccess } = props;
    const t = (0, next_intl_1.useTranslations)();
    const { ready, authenticated, createWallet, user } = (0, react_auth_1.usePrivy)();
    const { getPrivyToken, logout } = (0, usePrivyLogin_1.default)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const toggleEmailBindingModal = (0, store_1.useGlobalStore)(state => state.toggleEmailBindingModal);
    const whenAuthenticated = (0, react_1.useCallback)(async () => {
        try {
            setLoading(true);
            const hasEmbedWallet = user?.wallet?.connectorType === 'embedded';
            if (!hasEmbedWallet) {
                await (0, common_helper_1.sleep)(1000);
                await createWallet();
            }
            await (0, common_helper_1.sleep)(1000);
            const token = await getPrivyToken();
            const response = await (0, auth_1.bind_privy_email)({
                token
            });
            if (response.success) {
                toggleEmailBindingModal(false);
                onRecoverySuccess?.();
            }
            else {
                await logout({ method: usePrivyLogin_1.LoginMethod.Email, source: 'EmailBinding:bind_privy_email_reponse_false' });
            }
        }
        catch (error) {
            console.log('error:', error);
            logout({ method: usePrivyLogin_1.LoginMethod.Email, source: 'EmailBinding:cathed_error' });
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }, [getPrivyToken, logout]);
    (0, react_1.useEffect)(() => {
        if (ready && authenticated && !loading) {
            whenAuthenticated();
        }
    }, [ready, authenticated, whenAuthenticated, loading]);
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: open, children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { hideClose: true, className: (0, utils_1.cn)('p-[32px] pb-0 text-on-surface z-[2000] bg-surface-container-default'), children: (0, jsx_runtime_1.jsx)(EmailConnectV2_1.default, { setErrorMessage: setErrorMessage, errorMessage: errorMessage, loadingAfterVerify: loading, setLoadingAfterVerify: setLoading, title: t('login.bind_email'), description: t.rich('profile.login_bind_email_tip', {
                    important: (chunk) => (0, jsx_runtime_1.jsx)("strong", { children: chunk })
                }) }) }) }));
}
