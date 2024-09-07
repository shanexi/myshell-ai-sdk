"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetListWidgets;
const workshop_1 = require("../../apis/workshop.js");
const sensors_1 = require("../../lib/sensors/index.js");
const workshop_2 = require("../../services/store/workshop.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
function useGetListWidgets() {
    const setGettingChatWidgetList = (0, workshop_2.useWorkshopStore)(state => state.setGettingChatWidgetList);
    const chatWidgetPageToken = (0, workshop_2.useWorkshopStore)(state => state.chatWidgetPageToken);
    const setChatWidgetHasMore = (0, workshop_2.useWorkshopStore)(state => state.setChatWidgetHasMore);
    const setChatWidgetPageToken = (0, workshop_2.useWorkshopStore)(state => state.setChatWidgetPageToken);
    const pageSize = 50;
    const { warning } = (0, useNotification_1.useNotification)();
    const sensors = (0, sensors_1.useSensors)();
    const setSidebarWidgetList = (0, workshop_2.useWorkshopStore)(state => state.setSidebarWidgetList);
    const setNewlyAdded = (0, workshop_2.useWorkshopStore)(state => state.setNewlyAdded);
    const getListWidgets = async (callback) => {
        try {
            if (chatWidgetPageToken === '0') {
                setGettingChatWidgetList(true);
            }
            const { data, success, msg } = await (0, workshop_1.getWidgetsInChatList)('0', pageSize);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setChatWidgetHasMore(data.listResponse.hasMore);
            setChatWidgetPageToken(data.listResponse.nextPageToken);
            setSidebarWidgetList(data.widgets);
            callback && callback(data.widgets);
        }
        catch (e) {
        }
        finally {
            setGettingChatWidgetList(false);
        }
    };
    const refreshListWidgets = async (callback, widgetId) => {
        try {
            setGettingChatWidgetList(true);
            const { data, success, msg } = await (0, workshop_1.getWidgetsInChatList)('0', pageSize);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setChatWidgetHasMore(data.listResponse.hasMore);
            setChatWidgetPageToken(data.listResponse.nextPageToken);
            setSidebarWidgetList(data.widgets);
            callback && callback();
            const searchParams = new URLSearchParams(window.location.search);
            const from = searchParams.get('from') || '';
            if (widgetId && from) {
                const widget = data.widgets?.find(item => item.id === widgetId);
                sensors.track('AddWidgetToList', {
                    widget_id: widget?.id,
                    widget_name: widget?.name,
                    widget_type: widget?.tags?.map(item => item.label),
                    recommendation_spot: from || ''
                });
            }
        }
        catch (e) {
        }
        finally {
            setGettingChatWidgetList(false);
        }
    };
    const addWidgetToChat = async (widgetId, isPinned) => {
        try {
            const res = await (0, workshop_1.addWidgetToChatList)(widgetId, isPinned);
            if (res.success) {
                refreshListWidgets(() => {
                    setNewlyAdded(true);
                }, widgetId);
            }
            return res;
        }
        catch (e) {
            return {
                success: false
            };
        }
    };
    return {
        getListWidgets,
        addWidgetToChat,
        refreshListWidgets
    };
}
