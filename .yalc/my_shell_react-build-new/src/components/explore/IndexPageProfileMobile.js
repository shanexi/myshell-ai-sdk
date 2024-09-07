"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const user_1 = require("../../apis/user.js");
const identityService_1 = require("../../common/services/identityService.js");
const UserDetail_1 = __importDefault(require("../profile/UserDetail.js"));
function IndexPageProfileMobile(props) {
    const router = (0, navigation_1.useRouter)();
    const { userName } = props;
    const { nameTag } = props;
    const { invite } = props;
    const [detail, setDetail] = (0, react_2.useState)();
    const [isNotFound, setIsNotFound] = (0, react_2.useState)(false);
    const t = (0, next_intl_1.useTranslations)('profile');
    const commonT = (0, next_intl_1.useTranslations)('common');
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
        identityService_1.identityService.setInviteCode(`${invite}`);
    }, []);
    (0, react_2.useEffect)(() => {
        if (!!userName && !!nameTag) {
            getUserHandle();
        }
    }, [userName, nameTag]);
    const followCallback = () => {
        getUserHandle();
    };
    const onClose = () => {
        router.push('/explore');
    };
    if (isNotFound) {
        return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: true, onClose: onClose, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-white-opacity-95 dark:bg-black-opacity-95" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.10)", className: "bg-surface w-[90%] md:w-[380px] rounded-[24px]", children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 4, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#CCD4FF] dark:bg-[#2C334F] border-[6px] border-[#F2F4FE] dark:border-[#292C38] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "w-6 h-6 stroke-primary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 text-on-surface", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-on-surface", children: t('user_not_found_title') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", children: t('user_not_found_content') })] }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", color: "white", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", className: "mt-4 w-full bg-primary h-[44px] outline-none px-6 py-2.5 font-bold", _loading: {
                                        _hover: {
                                            bgColor: '#3E5CFA'
                                        }
                                    }, onClick: onClose, children: commonT('confirm') })] }) }) })] }));
    }
    if (detail) {
        return ((0, jsx_runtime_1.jsx)(UserDetail_1.default, { detailData: detail, showInsideScroller: true, showTopActions: true, onClose: onClose, followCallback: followCallback }));
    }
    return null;
}
exports.default = IndexPageProfileMobile;
