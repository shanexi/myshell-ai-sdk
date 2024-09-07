"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const Thunder_svg_1 = __importDefault(require("@/common/assets/icons/workshop/Thunder.svg"));
const clsx_1 = __importDefault(require("clsx"));
const store_1 = require("../../../services/store/index.js");
const dayjs_1 = __importDefault(require("dayjs"));
const link_1 = __importDefault(require("../../../common/components/ui/link.js"));
const useSeason_1 = __importDefault(require("../../../hooks/rewards-center/useSeason.js"));
function CardBox(props) {
    const { data } = props;
    const t = (0, next_intl_1.useTranslations)('profile.passcard_config');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const user = (0, store_1.useUserStore)(state => state.user);
    const headingColor = (0, react_2.useMemo)(() => {
        if (data.level === 1) {
            return 'var(--primary)';
        }
        if (data.level === 2) {
            return '#6325EE';
        }
        return '#FAAC00';
    }, [data.level]);
    const { seasonEndDate } = (0, useSeason_1.default)();
    const standardPassValidUntil = (0, react_2.useMemo)(() => {
        return (0, dayjs_1.default)(seasonEndDate).format('YYYY-MM-DD');
    }, [seasonEndDate]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: data && ((0, jsx_runtime_1.jsxs)(react_1.Card, { w: { base: '272px', md: '288px' }, bg: "var(--surface)", p: "16px", border: (user?.level || 1) === data.level ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: "12px", className: (0, clsx_1.default)('overflow-y-auto h-[calc(100vh-126px)] md:h-[calc(100vh-186px)]'), children: [(0, jsx_runtime_1.jsx)(react_1.CardHeader, { mb: "20px", children: (0, jsx_runtime_1.jsx)(react_1.Heading, { fontSize: "2xl", fontWeight: "400", color: headingColor, children: t(data.header) }) }), (0, jsx_runtime_1.jsx)(react_1.CardBody, { className: "flex-grow", children: (0, jsx_runtime_1.jsxs)(react_1.List, { spacing: 3, children: [(0, jsx_runtime_1.jsxs)(react_1.ListItem, { children: [(0, jsx_runtime_1.jsxs)(react_1.Tag, { size: "lg", borderRadius: "6px", variant: "solid", bg: "#FDF5CA", h: "22px", minH: "22px", px: "8px", mb: "20px", className: "shrink-0 mr-1 last:mr-0", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: Thunder_svg_1.default, alt: "thunder icon", className: "w-[16px] h-[16px] mr-[2px]" }), (0, jsx_runtime_1.jsx)(react_1.TagLabel, { color: "#5F5107", fontWeight: "700", fontSize: "12px", h: "22px", minH: "22px", lineHeight: "24px", children: data.energy })] }), (0, jsx_runtime_1.jsx)(react_1.Divider, { borderColor: "var(--outline-variant)" })] }), data.text.map((item, index) => ((0, jsx_runtime_1.jsxs)(react_1.ListItem, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-4 mt-2 mb-5", children: (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "sm", className: "text-on-surface", children: t(item) }) }), index !== data.text.length - 1 && (0, jsx_runtime_1.jsx)(react_1.Divider, { borderColor: "var(--outline-variant)" })] }, item)))] }) }), (0, jsx_runtime_1.jsxs)(react_1.CardFooter, { children: [data.level === 3 && ((0, jsx_runtime_1.jsx)(link_1.default, { href: "/rewards-center/earn", className: "w-full mr-2", children: (0, jsx_runtime_1.jsx)(react_1.Button, { w: "100%", boxShadow: "0px -1px 0px 0px #00000033 inset, 0px 1px 0px 0px #00000014", _hover: {
                                    background: 'var(--primary)'
                                }, color: "#fff", className: "bg-primary transition-all md:hover:-translate-y-1", h: "44px", fontWeight: "500", borderRadius: "full", cursor: "pointer", children: t('genesis_pass.buttonText1') }) })), data.level === 3 && ((0, jsx_runtime_1.jsx)(link_1.default, { href: "https://opensea.io/collection/myshell-creator-pass?tab=items", target: "_blank", className: "w-full", children: (0, jsx_runtime_1.jsx)(react_1.Button, { w: "100%", bg: "#fff", _hover: {
                                    background: 'var(--primary)',
                                    color: '#fff'
                                }, color: "var(--primary)", border: "1px solid var(--border)", className: "bg-surface transition-all md:hover:-translate-y-1", h: "44px", fontWeight: "500", borderRadius: "full", cursor: "pointer", children: t('genesis_pass.buttonText2') }) })), data.level === 2 && (user?.level || 1) < 3 && ((0, jsx_runtime_1.jsx)(link_1.default, { href: "/rewards-center/earn", className: "w-full", children: (0, jsx_runtime_1.jsx)(react_1.Button, { w: "100%", bg: "#fff", _hover: {
                                    background: 'var(--primary)',
                                    color: '#fff'
                                }, color: "var(--primary)", border: "1px solid var(--primary)", className: "bg-[#fff] transition-all md:hover:-translate-y-1", h: "44px", fontWeight: "500", borderRadius: "full", cursor: "pointer", children: user?.level === 2 ? `${commonT('valid_until')}${standardPassValidUntil}` : t('rewardsCenter') }) })), data.level === 1 && user?.level === 1 && ((0, jsx_runtime_1.jsx)(react_1.Button, { w: "100%", bg: "#fff", _hover: {
                                background: 'var(--primary)',
                                color: '#fff'
                            }, color: "var(--primary)", border: "1px solid var(--primary)", className: "bg-[#fff] transition-all md:hover:-translate-y-1", h: "44px", fontWeight: "500", borderRadius: "full", cursor: "pointer", children: t(data.buttonText) }))] })] })) }));
}
exports.default = CardBox;
