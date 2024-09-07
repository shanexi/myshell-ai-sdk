"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const checkbox_1 = require("../../../../../common/components/ui/checkbox.js");
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../../common/components/ui/typography.js");
const store_1 = require("../../../../../services/store/index.js");
function ImageOverview({ url, imageModel, onViewImage, customClass, isImageGenerator, messageId, index }) {
    const imageRef = (0, react_1.useRef)(null);
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const targetBox = (0, react_1.useRef)(null);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const multiPublishMap = (0, store_1.useChatStore)(state => state.multiPublishMap);
    const flagUserFirstPublishGallery = (0, store_1.useUserStore)(state => state.flagUserFirstPublishGallery);
    const params = (0, navigation_1.useParams)();
    const { botId } = params;
    const t = (0, next_intl_1.useTranslations)();
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    const handleLoaded = () => {
        setLoaded(true);
    };
    (0, react_use_1.useEffectOnce)(() => {
        const image = imageRef.current;
        if (image) {
            image.addEventListener('load', handleLoaded, {
                once: true
            });
        }
    });
    const setMultiPublishMap = (0, store_1.useChatStore)(state => state.setMultiPublishMap);
    const handleImagePublishChecked = (0, react_1.useCallback)(() => {
        if (messageId && botId) {
            if (Object.keys(multiPublishMap).length >= 4 && !multiPublishMap[url])
                return;
            setMultiPublishMap(url, {
                messageId,
                imageLink: url,
                botId: `${botId}`,
                naturalHeight: imageRef.current?.naturalHeight || 0,
                naturalWidth: imageRef.current?.naturalWidth || 0
            });
        }
    }, [url, messageId, botId, multiPublishMap]);
    const isPublishChecked = !!multiPublishMap[url];
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative w-full h-full', customClass), ref: targetBox, children: [!loaded && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-[1] bg-[#00000033] backdrop-blur-2xl", children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md", className: "text-white" }) }) })), (0, jsx_runtime_1.jsx)("img", { ref: imageRef, alt: "image", src: url, width: 240, height: 240, className: (0, clsx_1.default)('w-full rounded-md cursor-pointer object-cover relative', customClass), onClick: e => {
                    if (inputType === 'publish') {
                        handleImagePublishChecked();
                    }
                    else {
                        onViewImage();
                    }
                }, "x-image-data": JSON.stringify({
                    url,
                    imageModel
                }) }), inputType === 'publish' && ((0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 ml-0 flex justify-center items-center absolute right-3 top-3 z-[1]", children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { variant: "circle-static", checked: isPublishChecked, disabled: Object.keys(multiPublishMap).length >= 4 && !isPublishChecked, onCheckedChange: e => handleImagePublishChecked() }) })), !flagUserFirstPublishGallery && index === 0 && isImageGenerator && inputType !== 'publish' && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute right-1 bottom-1 z-10 w-[150px] md:w-[220px] flex border-opaque rounded-lg bg-utility-sky-blue-500 py-2 pl-3 pr-5 text-wrap text-left", children: [(0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "static", children: isMobile ? t('chat.mob_publish_to_gallery') : t('chat.right_publish_to_gallery') }), (0, jsx_runtime_1.jsx)("span", { className: "absolute left-0 top-3 origin-center", style: {
                            transformOrigin: '0px 0px',
                            transform: 'translateY(50%) rotate(90deg) translateX(-50%)'
                        }, children: (0, jsx_runtime_1.jsx)("svg", { className: "fill-utility-sky-blue-500 block", width: "10", height: "5", viewBox: "0 0 30 10", preserveAspectRatio: "none", children: (0, jsx_runtime_1.jsx)("polygon", { points: "0,0 30,0 15,10" }) }) })] }))] }));
}
const MemorizedImageOverview = (0, react_1.memo)(ImageOverview);
exports.default = MemorizedImageOverview;
