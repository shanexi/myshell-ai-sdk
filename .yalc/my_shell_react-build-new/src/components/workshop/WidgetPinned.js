"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const StarIcon_1 = __importDefault(require("@heroicons/react/24/outline/StarIcon"));
const StarIcon_2 = __importDefault(require("@heroicons/react/24/solid/StarIcon"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const workshop_1 = require("../../apis/workshop.js");
const spinner_1 = __importDefault(require("../../common/components/ui/spinner.js"));
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useGetListWidgets_1 = __importDefault(require("../../hooks/workshop/useGetListWidgets.js"));
const sensors_1 = require("../../lib/sensors/index.js");
const store_1 = require("../../services/store/index.js");
function WidgetPinned({ widgetInfo, className, iconClassName, pinnedCallback }) {
    const sensors = (0, sensors_1.useSensors)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const widgetList = (0, store_1.useWorkshopStore)(state => state.widgetList);
    const setWidgetSearchList = (0, store_1.useWorkshopStore)(state => state.setWidgetSearchList);
    const cardWidgetList = (0, store_1.useWorkshopStore)(state => state.cardWidgetList);
    const setCardWidgetList = (0, store_1.useWorkshopStore)(state => state.setCardWidgetList);
    const myBotList = (0, store_1.useWorkshopStore)(state => state.sidebarMyBotList);
    const setSidebarMyBotList = (0, store_1.useWorkshopStore)(state => state.setSidebarMyBotList);
    const homeData = (0, store_1.useBotStore)(state => state.homeData);
    const setHomeData = (0, store_1.useBotStore)(state => state.setHomeData);
    const botList = (0, store_1.useBotStore)(state => state.botList);
    const setBotList = (0, store_1.useBotStore)(state => state.setBotList);
    const taskList = (0, store_1.useTaskStore)(state => state.taskList);
    const setTaskList = (0, store_1.useTaskStore)(state => state.setTaskList);
    const { addWidgetToChat, refreshListWidgets } = (0, useGetListWidgets_1.default)();
    const [pinned, setPinned] = (0, react_1.useState)(widgetInfo?.pinned ?? false);
    const [pinneding, setPinneding] = (0, react_1.useState)(false);
    const refreshWidget = (id, isPinned) => {
        pinnedCallback && pinnedCallback(id, isPinned);
        if (homeData && homeData?.recommendContainers?.length > 0) {
            const flagHomeData = JSON.parse(JSON.stringify(homeData));
            flagHomeData?.recommendContainers?.forEach((item) => {
                item.type === 'common' &&
                    item?.bots?.forEach((bot) => {
                        bot?.widgets?.forEach((widget) => {
                            if (widget?.id === id) {
                                widget.pinned = isPinned;
                            }
                        });
                    });
            });
            setHomeData(flagHomeData);
        }
        if (widgetList?.length > 0) {
            const flagWidgetList = JSON.parse(JSON.stringify(widgetList));
            const curWidgetList = flagWidgetList?.map((item) => {
                if (item.id == id) {
                    item.pinned = isPinned;
                }
                return item;
            });
            setWidgetSearchList(curWidgetList);
        }
        if (cardWidgetList?.length > 0) {
            const flagCardWidgetList = JSON.parse(JSON.stringify(cardWidgetList));
            const curCardWidgetList = flagCardWidgetList?.map((card) => {
                card.items?.map((item) => {
                    if (item?.detail?.id === id) {
                        item.detail.pinned = isPinned;
                    }
                    return item;
                });
                return card;
            });
            setCardWidgetList(curCardWidgetList);
        }
        if (myBotList && myBotList?.length > 0) {
            const flagMyBotList = JSON.parse(JSON.stringify(myBotList));
            const curMyBotList = flagMyBotList?.map((item) => {
                item?.widgets?.forEach((widget) => {
                    if (widget?.id === id) {
                        widget.pinned = isPinned;
                    }
                });
                return item;
            });
            setSidebarMyBotList(curMyBotList);
        }
        if (botList && botList?.length > 0) {
            const flagBotList = JSON.parse(JSON.stringify(botList));
            const curBotList = flagBotList?.map((item) => {
                item?.widgets?.forEach((widget) => {
                    if (widget?.id === id) {
                        widget.pinned = isPinned;
                    }
                });
                return item;
            });
            setBotList(curBotList);
        }
        if (taskList && taskList?.length > 0) {
            const flagTaskList = JSON.parse(JSON.stringify(taskList));
            flagTaskList?.forEach((task) => {
                task?.additionalInfo?.botList?.forEach((bot) => {
                    bot?.widgets?.forEach((widget) => {
                        if (widget?.id === id) {
                            widget.pinned = isPinned;
                        }
                    });
                });
            });
            setTaskList(flagTaskList);
        }
    };
    const onPinned = (0, react_1.useCallback)(async (id, isPinned, callabck) => {
        if (isPinned) {
            const res = await addWidgetToChat(id, isPinned);
            res?.success && refreshWidget(id, isPinned);
            callabck(res?.success);
            sensors?.track('Favorite', {
                widget_id: id,
                widget_name: widgetInfo?.name
            });
        }
        else {
            const res = await (0, workshop_1.pinnedWidgetInList)(id, isPinned);
            await refreshListWidgets();
            res?.success && refreshWidget(id, isPinned);
            callabck(res?.success);
        }
    }, [cardWidgetList, widgetList]);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)(className || 'rounded-lg p-1.5 cursor-pointer text-on-surface flex justify-start items-center', pinneding && 'opacity-30 cursor-not-allowed justify-center'), onClick: () => {
            setPinneding(true);
            const isPinned = !pinned;
            onPinned(widgetInfo?.id ?? '', isPinned, (success) => {
                if (success) {
                    setPinned(isPinned);
                }
                setPinneding(false);
            });
        }, children: pinneding ? ((0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: pinned ? ((0, jsx_runtime_1.jsx)(StarIcon_2.default, { className: (0, clsx_1.default)('!text-[#FAAC00]', iconClassName || 'w-6 h-6 text-primary') })) : ((0, jsx_runtime_1.jsx)(StarIcon_1.default, { className: (0, clsx_1.default)(iconClassName || 'w-6 h-6 text-primary') })) })) }));
}
exports.default = WidgetPinned;
