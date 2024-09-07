"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Author;
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const react_use_1 = require("react-use");
const usePathLocale_1 = require("../../../../../../common/hooks/usePathLocale.js");
const UserDetailModal_1 = __importDefault(require("../../../../../../components/profile/UserDetailModal.js"));
function Author({ name, nameTag }) {
    const [showUserDetail, setShowUserDetail] = (0, react_use_1.useToggle)(false);
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    const router = (0, navigation_1.useRouter)();
    const clickHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isMobile) {
            const userUrl = `${window.location.origin}/explore/profile/${encodeURIComponent(`${name}`)}/${encodeURIComponent(`${nameTag}`)}${window.location.href.includes('from=share') ? '?from=share' : ''}`;
            if (window.location.pathname.includes('m/chat/') ||
                window.location.pathname.includes('m/robot-workshop/bot/') ||
                (window.location.pathname.includes('m/robot-workshop/widget/') &&
                    window.location.pathname.indexOf('/detail') === -1)) {
                router.push(userUrl);
            }
            else {
                router.replace(userUrl);
            }
        }
        else {
            setShowUserDetail({
                name: encodeURIComponent(name),
                nameTag: encodeURIComponent(nameTag)
            });
        }
    };
    return name && nameTag ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "max-w-[220px] truncate text-brand cursor-pointer hover:underline text-sm font-medium", onClick: clickHandler, children: ["@", name] }), showUserDetail && ((0, jsx_runtime_1.jsx)(UserDetailModal_1.default, { isOpen: showUserDetail, onClose: () => setShowUserDetail(null), userName: name, nameTag: nameTag }))] })) : null;
}
