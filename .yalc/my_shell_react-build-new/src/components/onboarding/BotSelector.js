"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Onboarding = Onboarding;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const framer_motion_1 = require("framer-motion");
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const navigation_1 = require("next/navigation");
const react_2 = require("react");
const bot_1 = require("../../apis/bot.js");
const avatar_1 = require("../../common/components/ui/avatar.js");
const button_1 = require("../../common/components/ui/button.js");
const spinner_1 = __importDefault(require("../../common/components/ui/spinner.js"));
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useCalcGetChatListFn_1 = __importDefault(require("../../entity/hooks/useCalcGetChatListFn.js"));
const sensors_1 = require("../../lib/sensors/index.js");
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const unselected_bot_id = new Set();
function Onboarding() {
    const router = (0, navigation_1.useRouter)();
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const sensors = (0, sensors_1.useSensors)();
    const t = (0, next_intl_1.useTranslations)();
    const showOnboarding = (0, store_1.useGlobalStore)(state => state.showOnboarding);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const [data, setData] = (0, react_2.useState)({});
    const checkedMap = (0, react_2.useRef)();
    const [addLoading, setAddLoading] = (0, react_2.useState)(false);
    (0, react_2.useEffect)(() => {
        (0, bot_1.getRecommendBots)().then(res => {
            if (!res.success)
                return;
            const data = (0, lodash_es_1.groupBy)(res.data.bots, 'category');
            setData(data);
            checkedMap.current = new Set();
            res.data.bots.map((e) => {
                checkedMap.current.add(e.id);
            });
        });
    }, []);
    const handleStart = async () => {
        if (addLoading)
            return false;
        setAddLoading(true);
        const addBotList = [...(checkedMap.current ?? [])];
        if (addBotList.length > 0) {
            await (0, bot_1.addBotToChatListV2)(addBotList);
            router.refresh();
            const res = await getChatList();
            addBotList?.map(botId => {
                sensors.track('AddBotToChatList', {
                    bot_id: botId,
                    bot_name: res?.find(item => item.id === botId)?.name || '',
                    recommendation_spot: 'Post-Registration'
                });
            });
            setAddLoading(false);
            showOnboarding(false);
        }
        else {
            router.refresh();
            showOnboarding(false);
        }
    };
    const hasBots = Object.keys(data).length > 0;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-screen h-screen fixed top-0 left-0 z-[999] bg-surface-container-default flex flex-col items-center', hasBots ? 'justify-start md:justify-center' : 'justify-center'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.img, { initial: { scale: 1 }, animate: { scale: 0.6 }, transition: { duration: 1, ease: 'easeIn' }, src: "/images/circle.webp", width: "153", height: "153", className: "w-[156px] h-[156px] sm:w-[260px] sm:h-[260px] object-fit-cover", alt: "circle logo " }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.p, { initial: { y: 0 }, animate: { y: -40 }, className: "text-2xl md:text-5xl text-brand pt-3 font-semibold", children: hasBots ? (t('onboarding_bots')) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col justify-center items-center md:flex-row space-y-3 md:space-y-0", children: (0, jsx_runtime_1.jsxs)("span", { className: "text-3xl md:text-5xl text-brand font-semibold", children: [t('greeting_hello'), ",", t('greeting')] }) })) })] }), hasBots && (0, jsx_runtime_1.jsx)(BotList, { data: data, checkedMap: checkedMap.current }), (0, jsx_runtime_1.jsx)("div", { className: "h-12" })] }), hasBots && ((0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-4 md:bottom-10 left-0 w-full z-[1000] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: (0, utils_1.cn)('min-w-[236px] md:min-w-[146px] bg-surface-primary-default rounded-full px-6 py-4 text-white text-base font-medium', addLoading && '!opacity-30 select-none cursor-not-allowed'), onClick: () => handleStart(), children: addLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "lg", className: "text-white" }) }), (0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center justify-center opacity-0", children: pathname?.includes('chat') ? t('continue_chat') : t('start_chat') })] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: pathname?.includes('chat') ? t('continue_chat') : t('start_chat') })) }) }))] }));
}
function BotList({ data, checkedMap }) {
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { layout: true, initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, ease: 'easeIn' }, className: "py-1 sm:py-4 mb-10 px-4 snap-mandatory snap-x max-w-full overflow-scroll flex flex-row no-scrollbar items-center md:space-x-10", children: Object.keys(data).map((key, index) => ((0, jsx_runtime_1.jsx)(BotCategory, { bots: data[key], index: index, category: key, checkedMap: checkedMap }, key))) }));
}
function BotCategory({ category, bots, checkedMap, index }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-[calc(100vw-48px)] sm:max-w-[352px] flex flex-col p-5 mr-4 rounded-3xl space-y-8 bg-surface-default shadow sm:shadow-md", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-subtler text-base text-center font-medium", children: category }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between space-x-6", children: bots.map((bot, botIndex) => ((0, jsx_runtime_1.jsx)(BotItem, { index: index * 2 + botIndex + 1, bot: bot, checkedMap: checkedMap }, bot.id))) })] }));
}
function BotItem({ bot, checkedMap, index }) {
    const [checked, setChecked] = (0, react_2.useState)(checkedMap?.has(bot.id));
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const handelToggle = () => {
        setChecked(!checked);
        if (checkedMap?.has(bot.id)) {
            checkedMap.delete(bot.id);
            unselected_bot_id.add(bot.id);
        }
        else {
            checkedMap.add(bot.id);
            unselected_bot_id.delete(bot.id);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-7 items-center w-[37.33vw]", "data-sensors-exposure-event-name": "RecommendItemExposure", "data-sensors-exposure-property-recommendation_spot": "Post-Registration", "data-sensors-exposure-property-rank": index, "data-sensors-exposure-property-bot_id": bot?.id, "data-sensors-exposure-property-bot_name": bot.bot.name, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center max-w-[37.33vw]", children: [(0, jsx_runtime_1.jsxs)(react_1.Popover, { placement: "top", trigger: isMobile ? 'click' : 'hover', children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: bot.bot.logoUrl, alt: "bot image", size: "6xl" }) }), (0, jsx_runtime_1.jsxs)(react_1.PopoverContent, { padding: "6px", className: "w-[250px] !outline-offset-0 bg-surface-default border-opaque shadow-modal-bolder", children: [(0, jsx_runtime_1.jsx)(react_1.PopoverArrow, { className: "!outline-offset-0 !bg-surface-default" }), (0, jsx_runtime_1.jsx)("div", { className: "dark:text-secondary text-sm font-normal z-50 max-h-[176px] overflow-y-auto", children: bot.bot.description })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 w-full text-center text-lg text-default font-semibold text-ellipsis line-clamp-1", children: bot.bot.name }), (0, jsx_runtime_1.jsx)("span", { className: "w-full text-center text-subtler text-sm text-ellipsis line-clamp-1", children: bot.shortDescription })] }), (0, jsx_runtime_1.jsx)("button", { className: (0, utils_1.cn)('flex items-center justify-center rounded-full w-[24px] h-[24px] outline-gray-700 border-[1.5px]', checked && 'bg-primary'), onClick: () => handelToggle(), children: (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-4 h-4 text-white" }) })] }));
}
