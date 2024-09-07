"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetSharePage;
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const workshop_1 = require("../../apis/workshop.js");
const LogoLoading_1 = require("../../common/components/LogoLoading.js");
const identityService_1 = require("../../common/services/identityService.js");
function WidgetSharePage() {
    const param = (0, navigation_1.useParams)();
    const router = (0, navigation_1.useRouter)();
    const getDetail = async (code) => {
        const res = await (0, workshop_1.getWidgetSharedDetail)(code);
        const widgetId = res.data?.id;
        router.replace(`${window.location.origin}/robot-workshop${widgetId ? `/widget/${widgetId}` : ''}`);
    };
    (0, react_1.useEffect)(() => {
        const shareCode = `${param?.code}`;
        if (shareCode) {
            identityService_1.identityService.setSharingWidgetCode(shareCode);
            identityService_1.identityService.setShareWidgetLink(`${window.location.origin}/widgetShare/${shareCode}`);
        }
        getDetail(shareCode);
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center w-full h-[100vh]", children: (0, jsx_runtime_1.jsx)(LogoLoading_1.LogoLoading, {}) }));
}
