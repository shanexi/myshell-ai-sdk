"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const next_intl_1 = require("next-intl");
const store_1 = require("../../../services/store/index.js");
function LoginTip() {
    const token = (0, store_1.useUserStore)(state => state.token);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const t = (0, next_intl_1.useTranslations)('profile');
    const handleClick = () => {
        if (!token) {
            toggleLoginModal(true);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.Box, { className: "flex flex-col space-y-5 items-center justify-between p-[20px] bg-[#FFFBEF] rounded-xl text-[#1F1F1F] text-sm", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { className: "text-center", children: t('no_login_energy_tip') }), (0, jsx_runtime_1.jsx)(react_1.Button, { className: "py-2 px-4 bg-[#DD641F]", fontWeight: "400", bg: "#DD641F", _hover: { bg: '#DD641F' }, borderRadius: "99px", color: "#fff", onClick: handleClick, rightIcon: (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "ml-[-8px] w-[24px] h-[24px]" }), children: t('login_sign_up') })] }));
}
exports.default = LoginTip;
