"use strict";
'use client';
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
exports.VISITOR_AVATAR = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const EyeIcon_1 = __importDefault(require("@heroicons/react/24/outline/EyeIcon"));
const PencilSquareIcon_1 = __importDefault(require("@heroicons/react/24/outline/PencilSquareIcon"));
const CameraIcon_1 = __importDefault(require("@heroicons/react/24/solid/CameraIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const link_1 = __importDefault(require("../../../common/components/ui/link.js"));
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const user_1 = require("../../../common/constants/enums/user.js");
const useCopyClipboard_1 = __importDefault(require("../../../common/hooks/useCopyClipboard.js"));
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const useEdit_1 = __importDefault(require("../../../hooks/user/useEdit.js"));
const useSensors_1 = require("../../../lib/sensors/useSensors.js");
const utils_1 = require("../../../lib/utils.js");
const store_1 = require("../../../services/store/index.js");
const Connections_1 = __importDefault(require("./component/Connections.js"));
const UpdateAvatarModal_1 = __importDefault(require("./component/UpdateAvatarModal.js"));
const UserBg_1 = __importDefault(require("./component/UserBg.js"));
const UserLoginTypeIcon_1 = __importDefault(require("./component/UserLoginTypeIcon.js"));
const UserShareBtn_1 = require("./component/UserShareBtn.js");
const FollowInfo_1 = __importDefault(require("../FollowInfo.js"));
const UserDetailModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../UserDetailModal.js'))), {
    ssr: false
});
exports.VISITOR_AVATAR = 'https://image.myshell.ai/image/chat/embed_obj/10212895/202405290953/Image.png.png';
function EditProfile() {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('profile');
    const botT = (0, next_intl_1.useTranslations)('bot');
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const [avatarModalVisible, setAvatarModalVisible] = (0, react_1.useState)(false);
    const [userDetailModalVisible, setUserDetailModalVisible] = (0, react_1.useState)(false);
    const [showEditNameInput, setShowEditNameInput] = (0, react_1.useState)(false);
    const [editLoading, setEditLoading] = (0, react_1.useState)(false);
    const [canSave, setCanSave] = (0, react_1.useState)(false);
    const user = (0, store_1.useUserStore)(state => state.user);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const router = (0, navigation_1.useRouter)();
    const sensors = (0, useSensors_1.useSensors)();
    const { isNameAvailable, isNameError, editUser, setEditUser, handleChangInput, updateUser } = (0, useEdit_1.default)();
    const { onCopy } = (0, useCopyClipboard_1.default)(`${editUser?.loginCredential}`);
    const { warning, success } = (0, useNotification_1.useNotification)();
    const openUpdateAvatarModal = () => {
        setAvatarModalVisible(true);
    };
    const handleSave = () => {
        if (editLoading)
            return;
        setEditLoading(true);
        updateUser(editUser, (isSuc) => {
            isSuc && success({ content: commonT('update_suc') });
            setEditLoading(false);
            setShowEditNameInput(false);
            setCanSave(false);
            sensors.track('SaveMyProfile', {
                save_new_name: user?.name !== editUser?.name,
                save_new_desc: user?.description !== editUser?.description
            });
        });
    };
    (0, react_1.useEffect)(() => {
        setCanSave(!!editUser?.name && (user?.name !== editUser?.name || user?.description != editUser?.description));
    }, [user, editUser?.name, editUser?.description]);
    const userAccount = editUser?.loginType === user_1.LoginType.LOGIN_TYPE_EMAIL || editUser?.loginType === user_1.LoginType.LOGIN_TYPE_GOOGLE
        ? editUser?.loginCredential?.replace(/^(.{1}).*?([@].{1})/g, '$1***$2')
        : editUser?.loginCredential;
    (0, react_use_1.useEffectOnce)(() => {
        sensors.track('EnterCreatorProfile', {
            scence: 'profile',
            creator_id: user?.id,
            creator_name: user?.name
        });
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "profileDetail h-full overflow-hidden flex w-full flex-col flex-nowrap bg-surface-default text-on-surface relative md:rounded-4xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col flex-grow items-center relative overflow-hidden md:overflow-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full pb-[8px] overflow-auto md:h-full md:mb-0 md:pb-[12px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", children: [isMobile && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-[10px] md:top-5 flex z-10 space-x-3 left-4'), children: (0, jsx_runtime_1.jsx)("button", { className: "bg-white rounded-full border border-[#E4E9F0] w-9 h-9 cursor-pointer shadow-button-basic flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed", onClick: () => {
                                                    router.push('/m/profile');
                                                }, children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-[20px] h-[22px] text-[#202223]" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-[10px] md:top-5 flex z-10 space-x-3 right-5'), children: (0, jsx_runtime_1.jsx)(UserShareBtn_1.UserShareBtn, { userName: user?.name, nameTag: user?.nameTag, userId: user?.id }) })] })), !isMobile && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-[10px] md:top-5 flex z-10 space-x-3 right-5'), children: (0, jsx_runtime_1.jsx)(UserShareBtn_1.UserShareBtn, { userName: user?.name, nameTag: user?.nameTag, userId: user?.id }) })), (0, jsx_runtime_1.jsx)(UserBg_1.default, { showUpload: true, bgPhoto: (0, common_helper_1.getAssetsUrlV2)(user?.backgroundUrl), onActionSuccess: (background) => {
                                        updateUser({ ...editUser, background });
                                        sensors.track('UploadBanner');
                                    } }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 md:px-10 -mt-[42px] flex flex-col md:flex-row space-y-3 md:space-x-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-end", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative rounded-2xl w-24 h-24 md:w-[120px] md:h-[120px] overflow-hidden z-0 border-[2px] md:border-[6px] border-white dark:border-[#1C1E26] shrink-0 cup", onClick: openUpdateAvatarModal, children: [(0, jsx_runtime_1.jsx)("img", { src: (isVisitor === user_1.VisitorEnum.NO && (0, common_helper_1.getAssetsUrl)(user?.avatar)) || exports.VISITOR_AVATAR, alt: "avatar", className: "w-[92px] h-[92px] md:w-[108px] md:h-[108px] overflow-hidden object-cover" }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center absolute inset-0 bg-black/20 cursor-pointer", children: (0, jsx_runtime_1.jsx)("div", { className: "w-[44px] h-[44px] bg-[#ffffffbf] dark:bg-[#000000bf] rounded-[12px] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(CameraIcon_1.default, { className: "w-[20px] fill-primary" }) }) })] }), isMobile && ((0, jsx_runtime_1.jsx)(link_1.default, { href: `${(0, common_helper_1.isClient)() ? window.location.origin : ''}/explore/profile/${encodeURIComponent(`${user?.name}`)}/${encodeURIComponent(`${user?.nameTag}`)}`, children: (0, jsx_runtime_1.jsxs)("button", { className: "h-[36px] flex-shrink-0 flex justify-center items-center px-4 md:px-6 py-2.5 border border-default dark:border-[#42434A] dark:bg-[#22242E] text-[--on-surface-btn-text] rounded-full shadow-button-basic text-sm font-medium", children: [(0, jsx_runtime_1.jsx)(EyeIcon_1.default, { className: "w-5 h-5 mr-1.5" }), t('preview')] }) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grow flex items-end justify-between", children: [isVisitor === user_1.VisitorEnum.NO ? ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline text-[28px] font-semibold text-on-surface cursor-pointer", children: [showEditNameInput ? ((0, jsx_runtime_1.jsxs)("div", { className: "w-full relative md:mr-4 md:mb-1", children: [(0, jsx_runtime_1.jsx)("input", { maxLength: 20, value: editUser?.name, placeholder: "", className: (0, utils_1.cn)('w-full h-[40px] shadow-background-default border border-default dark:border-[#42434A] dark:bg-[#22242E] rounded-[10px] pl-2 pr-12', !isNameAvailable ? 'border-error shadow-rings-error' : ''), onChange: e => {
                                                                                const value = e.target.value.replaceAll('.', '');
                                                                                if (value.length > 20) {
                                                                                    return;
                                                                                }
                                                                                if (value.length === 0) {
                                                                                    warning({
                                                                                        content: t('name_required')
                                                                                    });
                                                                                }
                                                                                handleChangInput(value);
                                                                            }, onBlur: () => {
                                                                                if (editUser?.name && editUser?.name?.length) {
                                                                                    setShowEditNameInput(false);
                                                                                }
                                                                                else {
                                                                                    warning({
                                                                                        content: t('name_required')
                                                                                    });
                                                                                }
                                                                            }, autoFocus: true }), (0, jsx_runtime_1.jsxs)("span", { className: "absolute right-2 top-0 md:top-0.5 flex justify-center items-center text-sm h-[40px] text-[--on-secondary-container]", children: [editUser?.name?.length, "/20"] })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "line-clamp-1 xl:max-w-[200px] 2xl:max-w-[340px]", children: editUser?.name })), !showEditNameInput && ((0, jsx_runtime_1.jsx)(PencilSquareIcon_1.default, { className: "flex-shrink-0 w-5 h-5 ml-1.5 stroke-on-surface", onClick: () => {
                                                                        setShowEditNameInput(true);
                                                                    } }))] }), (0, jsx_runtime_1.jsx)(FollowInfo_1.default, { user: user })] })) : null, !isMobile && isVisitor === user_1.VisitorEnum.NO && ((0, jsx_runtime_1.jsxs)("button", { className: "h-[44px] flex-shrink-0 flex justify-center items-center px-4 md:px-6 py-2.5 border border-default dark:border-[#42434A] dark:bg-[#22242E] text-[--on-surface-btn-text] rounded-full shadow-button-basic", onClick: () => {
                                                        setUserDetailModalVisible(true);
                                                    }, children: [(0, jsx_runtime_1.jsx)(EyeIcon_1.default, { className: "w-5 h-5 mr-1.5" }), t('preview')] }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 md:px-10 mt-3 md:mt-5", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-[14px] leading-[20px] text-on-surface font-medium", children: t('login_account') }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative', editUser?.loginType === user_1.LoginType.LOGIN_TYPE_PUBLIC_ADDRESS ? 'cursor-pointer' : ''), onClick: () => {
                                        editUser?.loginType === user_1.LoginType.LOGIN_TYPE_PUBLIC_ADDRESS && onCopy(editUser?.loginCredential);
                                    }, children: [(0, jsx_runtime_1.jsx)("input", { className: "w-full py-2.5 pl-3 pr-9 mt-1.5 shadow-background-default rounded-[12px] border border-default dark:border-[#42434A] dark:bg-[#22242E] text-on-surface text-[16px] focus:outline-none", value: userAccount, readOnly: true }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-2 top-3", children: (0, jsx_runtime_1.jsx)(UserLoginTypeIcon_1.default, { loginType: editUser?.loginType }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3 md:mt-5 text-[14px] leading-[20px] text-on-surface font-medium", children: botT('description') }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full relative", children: [(0, jsx_runtime_1.jsx)("textarea", { className: "w-full min-h-[96px] md:min-h-[120px] pt-2.5 pb-5 px-3 mt-1.5 shadow-background-default rounded-[12px] border border-default dark:border-[#42434A] dark:bg-[#22242E] text-on-surface text-[16px]", value: editUser?.description, maxLength: 500, placeholder: t('desc_placeholder'), onChange: e => {
                                                editUser && setEditUser({ ...editUser, description: e.target.value });
                                            } }), (0, jsx_runtime_1.jsxs)("span", { className: "absolute right-2 bottom-4 md:top-0.5 flex justify-end items-end text-sm text-[--on-secondary-container]", children: [editUser?.description?.length, "/500"] })] })] }), (0, jsx_runtime_1.jsx)(Connections_1.default, {})] }) }), userDetailModalVisible && ((0, jsx_runtime_1.jsx)(UserDetailModal, { isOpen: userDetailModalVisible, onClose: () => {
                    setUserDetailModalVisible(false);
                }, detailData: user })), avatarModalVisible && ((0, jsx_runtime_1.jsx)(UpdateAvatarModal_1.default, { open: avatarModalVisible, onClose: (avatarUrl) => {
                    if (avatarUrl) {
                        editUser && updateUser({ ...editUser, avatar: avatarUrl });
                        sensors.track('UploadProfilePic');
                    }
                    setAvatarModalVisible(false);
                } })), (0, jsx_runtime_1.jsx)("div", { className: "saveFooter flex justify-end px-5 py-4 border-t border-default", children: (0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('w-full md:w-auto min-w-[166px] flex justify-center items-center bg-primary text-white h-[44px] rounded-full px-8 py-2.5', !canSave || editLoading || !isNameAvailable || isNameError ? 'opacity-30 select-none' : ''), onClick: () => {
                        canSave && !isNameError && handleSave();
                    }, children: !editLoading ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: t('save') }) : (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-brand" }) }) })] }));
}
exports.default = EditProfile;
