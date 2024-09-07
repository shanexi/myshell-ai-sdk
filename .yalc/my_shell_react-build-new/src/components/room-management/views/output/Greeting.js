"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Greeting;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const ChatStaticContext_1 = __importDefault(require("../../../../chat/ChatStaticContext.js"));
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const button_1 = require("../../../../common/components/ui/button.js");
const user_1 = require("../../../../common/constants/enums/user.js");
const store_1 = require("../../../../services/store/index.js");
function Greeting({ disabled, onCreate }) {
    const t = (0, next_intl_1.useTranslations)('chat.room');
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor) === user_1.VisitorEnum.YES;
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const { logoUrl } = (0, react_1.useContext)(ChatStaticContext_1.default);
    const onClick = (0, react_1.useCallback)(() => {
        if (isVisitor) {
            toggleLoginModal(true);
        }
        else {
            onCreate();
        }
    }, [isVisitor, onCreate, toggleLoginModal]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex gap-[6px] items-start", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: logoUrl, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3", children: [(0, jsx_runtime_1.jsx)("p", { className: "min-h-11 p-3 bg-surface-special rounded-2xl rounded-tl-sm w-fit max-w-full min-[492px]:max-w-[460px] md:max-w-[261px] lg:max-w-[476px] large:max-w-[560px]", children: t('greeting') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "chat", size: "md", className: "w-fit", disabled: disabled, onClick: onClick, children: t(isVisitor ? 'login_to_create' : 'create') })] })] }));
}
