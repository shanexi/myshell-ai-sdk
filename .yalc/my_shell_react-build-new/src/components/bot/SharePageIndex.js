"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SharePageIndex;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = require("../../chat/model/api.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const generateQRCode_1 = require("../../common/utils/generateQRCode.js");
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const ChatBody_1 = __importDefault(require("../../components/share/ChatBody.js"));
const formatMsg = (data) => {
    return (data?.messages || [])
        .map(e => {
        const botLogoUrl = data?.botSummary?.logoUrl;
        const avatarLogoUrl = data?.botSummary?.author?.avatar || data?.sharerUserSummary?.avatar;
        return {
            ...e,
            id: (0, common_helper_1.generateUUID)(),
            logo: e.type === 'REPLY' || e.type === 'GREETING'
                ? `${botLogoUrl?.includes('bot-logo') ? (0, common_helper_1.getAssetsUrl)(botLogoUrl) : (0, common_helper_1.getAssetsUrlV2)(botLogoUrl)}`
                : (0, common_helper_1.getAssetsUrl)(avatarLogoUrl)
        };
    })
        .sort((a, b) => {
        const date1 = new Date(a.createdDate);
        const date2 = new Date(b.createdDate);
        return date1.getTime() - date2.getTime();
    });
};
const getTitle = (data) => {
    const name = data?.sharerUserSummary?.name;
    const botName = data?.botSummary?.name ?? '';
    const text = `${name} and `;
    return `${name ? text : ''} ${botName}'s chat log`;
};
function SharePageIndex({ isFromDownload, code }) {
    const [uiData, setUIData] = (0, react_1.useState)({ qrcode: '', data: {} });
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            const resData = await (0, api_1.getSharedMessages)(code);
            let qrcode = '';
            if (resData.success) {
                const botId = resData.data?.botSummary?.id;
                qrcode = await (0, generateQRCode_1.generateQRCode)(`${runtime_config_1.APP_URL}/${`/invite/${resData?.data?.invitationCode}?botId=${botId}`}`);
            }
            setUIData({
                qrcode,
                data: resData
            });
        };
        fetchData();
    }, [code]);
    const { data, qrcode } = uiData;
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: data.success ? ((0, jsx_runtime_1.jsx)(ChatBody_1.default, { data: formatMsg(data.data), title: getTitle(data.data), code: data.data?.invitationCode, botId: data.data?.botSummary.id, chatSetting: data.data?.chatSetting, botAvatar: data.data?.botSummary.logoUrl, userAvatar: data.data?.sharerUserSummary.avatar, qrcode: qrcode, originData: data.data, isFromDownload: isFromDownload })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-xl", children: data.message })) }));
}
