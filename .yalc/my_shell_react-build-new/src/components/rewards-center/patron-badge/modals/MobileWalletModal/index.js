"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MobileWalletModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const EOAWallet_1 = __importDefault(require("../../wallet/EOAWallet.js"));
const PrivyWallet_1 = __importDefault(require("../../wallet/PrivyWallet.js"));
function MobileWalletModal(props) {
    const { selectedChain, setSelectedChain, wallets, isWeb3, open, onClose } = props;
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, onClose: onClose, modalOnly: false, hideClose: true, children: (0, jsx_runtime_1.jsx)(modal_1.ModalBody, { className: "p-4 relative", children: isWeb3 ? ((0, jsx_runtime_1.jsx)(EOAWallet_1.default, { wallet: wallets?.find(wallet => wallet.name === 'Other'), selectedChain: selectedChain, setSelectedChain: setSelectedChain, onClose: onClose })) : ((0, jsx_runtime_1.jsx)(PrivyWallet_1.default, { wallet: wallets?.find(wallet => wallet.name === 'Privy'), onClose: onClose })) }) }));
}
