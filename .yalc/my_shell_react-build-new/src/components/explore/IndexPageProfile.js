"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const useHandleInviteLink_1 = require("../../common/hooks/useHandleInviteLink.js");
const useRestoreScrollPosition_1 = require("../../common/hooks/useRestoreScrollPosition.js");
const identityService_1 = require("../../common/services/identityService.js");
const UserDetailModal_1 = __importDefault(require("../profile/UserDetailModal.js"));
const sectionSkeleton = [
    {
        commonTagBotsInfo: { bots: Array(12).fill(1) }
    },
    { featureTagBotsInfo: { bots: Array(6).fill(1) } }
];
function IndexPageProfile(props) {
    const isMobile = !!props.isMobile;
    const { userName, nameTag } = props;
    const { invite } = props;
    const [showUserModal, setShowUserModal] = (0, react_1.useState)(true);
    (0, useHandleInviteLink_1.useHandleInviteLink)();
    const scrollRef = (0, react_1.useRef)(null);
    (0, useRestoreScrollPosition_1.useRestoreScrollPosition)(scrollRef, true);
    (0, react_1.useEffect)(() => {
        identityService_1.identityService.setInviteCode(`${invite}`);
    }, []);
    const router = (0, navigation_1.useRouter)();
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !isMobile && showUserModal && ((0, jsx_runtime_1.jsx)(UserDetailModal_1.default, { userName: userName, nameTag: nameTag, isOpen: showUserModal, onClose: () => {
                setShowUserModal(false);
                router.replace('/explore');
            } })) }));
}
exports.default = IndexPageProfile;
