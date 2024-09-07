"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const agentPump_1 = require("../../../../apis/agentPump.js");
const LoginBtn_1 = __importDefault(require("../../../../common/components/auth/login-modal/LoginBtn.js"));
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const user_1 = require("../../../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const utils_1 = require("../../../../lib/utils.js");
const store_1 = require("../../../../services/store/index.js");
const Skeleton_1 = require("./Skeleton.js");
const EditProfile_1 = require("../../edit-profile/EditProfile.js");
const user_level_1 = __importDefault(require("../user-level/index.js"));
function InfoBox({ active }) {
    const t = (0, next_intl_1.useTranslations)('profile');
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const user = (0, store_1.useUserStore)(state => state.user);
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const [hasMySoul, setHasMySoul] = (0, react_1.useState)(false);
    const getNFTInfo = async () => {
        const response = await (0, agentPump_1.get_nft_info)();
        if (response.success) {
            const nftInfo = response.data;
            if (nftInfo) {
                setHasMySoul(nftInfo.mySoulCount > 0);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (visitor === user_1.VisitorEnum.NO) {
            getNFTInfo();
        }
    }, [visitor]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "relative cursor-pointer", children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col p-3 rounded-xl', active
                ? 'bg-surface-accent-blue-subtler'
                : 'bg-surface-default md:bg-transparent hover:bg-surface-container-hovered'), children: visitor === user_1.VisitorEnum.YES ? ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between relative mr-3 flex-shrink-0", children: (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: isMobile ? '5xl' : '4xl', src: EditProfile_1.VISITOR_AVATAR, alt: "avatar" }) }), (0, jsx_runtime_1.jsx)("div", { className: "max-w-44 md:max-w-36 flex items-center justify-between", children: (0, jsx_runtime_1.jsx)(LoginBtn_1.default, { noStyle: true }) })] }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ChevronRightIcon_1.default, size: "sm", color: "subtle", className: "text-subtler" })] })) : user ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between relative mr-3 flex-shrink-0", children: (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: isMobile ? '5xl' : '4xl', src: (0, common_helper_1.getAssetsUrl)(user.avatar), alt: "avatar" }) }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col space-y-2 justify-center'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex text-xl text-default font-medium space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "max-w-44 md:max-w-20 lg:max-w-28 large:max-w-36 truncate font-pp-telegraf", children: (0, utils_1.limitStringLength)(user.name, 10) }), (0, jsx_runtime_1.jsx)("span", { className: "text-brand", children: user.nameTag })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [user.isGenesisPasscard || user.isPasscard ? ((0, jsx_runtime_1.jsx)("span", { className: "flex-shrink-0 text-xs font-medium rounded-lg px-2.5 py-1 bg-surface-warning-subtle-hovered text-warning", children: t('genesis') })) : user.level === 2 ? ((0, jsx_runtime_1.jsx)("span", { className: "flex-shrink-0 text-xs font-medium rounded-lg px-2.5 py-1 bg-surface-accent-blue-subtle text-brand", children: t('standard') })) : user ? ((0, jsx_runtime_1.jsx)("span", { className: "flex-shrink-0 text-xs font-bold rounded-lg px-2.5 py-1 bg-surface-accent-gray-subtler text-subtle", children: t('basic') })) : null, hasMySoul ? ((0, jsx_runtime_1.jsx)("span", { className: "flex-shrink-0 text-xs font-bold rounded-lg px-2.5 py-1 bg-[var(--status-03-30)] text-[var(--status-03-70)]", children: "MySoul" })) : null] })] })] }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ChevronRightIcon_1.default, size: "sm", color: "subtle", className: "text-subtler" })] }), (0, jsx_runtime_1.jsx)(user_level_1.default, {})] })) : ((0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, {})) }) }));
}
exports.default = InfoBox;
