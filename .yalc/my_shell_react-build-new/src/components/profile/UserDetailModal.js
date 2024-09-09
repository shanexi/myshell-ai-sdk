"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserDetailModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/InformationCircleIcon"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const user_1 = require("../../apis/user");
const modal_1 = require("../../common/components/ui/modal");
const usePathLocale_1 = require("../../common/hooks/usePathLocale");
const utils_1 = require("../../lib/utils");
const store_1 = require("../../services/store");
const UserDetail_1 = __importDefault(require("./UserDetail"));
function UserDetailModal({ isOpen, onClose, detailData, userName, nameTag, defaultTab }) {
    const [detail, setDetail] = (0, react_2.useState)(detailData);
    const [isNotFound, setIsNotFound] = (0, react_2.useState)(false);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('profile');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const isOpenLoginModal = (0, store_1.useGlobalStore)(state => state.isOpenLoginModal);
    const emailConnectLoading = (0, store_1.useGlobalStore)(state => state.emailConnectLoading);
    const getUserHandle = async () => {
        const res = await (0, user_1.getUserProfile)({ name: userName, nameTag });
        if (res.success) {
            setDetail(res.data);
            setIsNotFound(false);
        }
        else {
            setIsNotFound(true);
        }
    };
    (0, react_2.useEffect)(() => {
        if (!detailData?.id && !!userName && !!nameTag) {
            getUserHandle();
        }
    }, [userName, nameTag]);
    const followCallback = () => {
        getUserHandle();
    };
    if (isNotFound) {
        return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: onClose, contentClassName: "w-[90%] md:w-[380px] p-4 z-[120]", overlayClassName: "z-[120]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#CCD4FF] dark:bg-[#2C334F] border-[6px] border-[#F2F4FE] dark:border-[#292C38] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "w-6 h-6 stroke-primary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 text-on-surface", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-on-surface", children: t('user_not_found_title') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", children: t('user_not_found_content') })] }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", color: "white", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", className: "mt-4 w-full bg-primary h-[44px] outline-none px-6 py-2.5 font-bold", _loading: {
                            _hover: {
                                bgColor: '#3E5CFA'
                            }
                        }, onClick: onClose, children: commonT('confirm') })] }) }));
    }
    if (detail) {
        return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpenLoginModal || emailConnectLoading ? false : isOpen, onClose: onClose, contentClassName: (0, utils_1.cn)('overflow-hidden shadow bg-transparent', isMobile ? 'w-full h-full' : 'w-[80vw] max-w-[880px] min-h-[418px] h-[90vh] max-h-[800px] rounded-4xl'), children: (0, jsx_runtime_1.jsx)(UserDetail_1.default, { detailData: detail, showInsideScroller: true, showTopActions: true, onClose: onClose, followCallback: followCallback, defaultTab: defaultTab }) }));
    }
    return null;
}
