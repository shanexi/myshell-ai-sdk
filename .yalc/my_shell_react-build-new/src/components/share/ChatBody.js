"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatBody;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const lodash_es_1 = require("lodash-es");
const react_1 = require("react");
const ua_parser_js_1 = __importDefault(require("ua-parser-js"));
const common_helper_1 = require("../../common/utils/common-helper.js");
const ChatMessage_1 = __importDefault(require("./ChatMessage.js"));
const Footer_1 = __importDefault(require("./Footer.js"));
const Header_1 = __importDefault(require("./Header.js"));
function ChatBody({ data, title, code, botId, botAvatar, userAvatar, chatSetting, qrcode, isFromDownload, originData }) {
    const mainRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const parser = new ua_parser_js_1.default();
        const { userAgent } = window.navigator;
        const result = parser.setUA(userAgent).getResult();
        const browserName = result.browser.name;
        const browserVersion = result.browser.version;
        const isUnsupportedBrowser = (browserName === 'Chrome' && parseFloat(browserVersion) <= 107) ||
            (browserName === 'Firefox' && parseFloat(browserVersion) <= 100) ||
            (browserName === 'Edge' && parseFloat(browserVersion) <= 107) ||
            (browserName === 'Safari' && parseFloat(browserVersion) <= 15.3) ||
            (browserName === 'Opera' && parseFloat(browserVersion) <= 92);
        if (isUnsupportedBrowser || (0, common_helper_1.isWeixin)()) {
            const handleResize = () => {
                if (mainRef.current) {
                    const height = window.innerHeight;
                    mainRef.current.style.height = `${height}px`;
                }
            };
            window.addEventListener('resize', (0, lodash_es_1.throttle)(handleResize, 500));
            handleResize();
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", { ref: mainRef, className: (0, clsx_1.default)('flex flex-col items-center pb-30 h-dvh sm:h-screen'), children: [(0, jsx_runtime_1.jsx)(Header_1.default, { title: title, isFromDownload: isFromDownload }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex flex-1 justify-center px-2 text-xs md:text-base overflow-y-auto bg-surface', isFromDownload ? 'w-full max-w-[720px] m-auto py-8 no-scrollbar' : 'w-full bg-surface py-12'), children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full md:w-3/4 lg:w-4/5 mx-auto py-3 px-2 text-xs md:text-base overflow-x-hidden md:overflow-x-visible", children: (0, jsx_runtime_1.jsx)("ul", { className: "pb-4", children: data.map(item => ((0, jsx_runtime_1.jsx)(ChatMessage_1.default, { chat: item, chatSetting: chatSetting, originData: originData, isFromDownload: isFromDownload, botAvatar: botAvatar, userAvatar: userAvatar }, item.id))) }) }) }), (0, jsx_runtime_1.jsx)(Footer_1.default, { inviteCode: code, botId: botId, qrcode: qrcode, isFromDownload: isFromDownload })] }));
}
