import { WidgetInfo } from '../../../../src/common/constants/interfaces/workshop.js';
export default function useGetListWidgets(): {
    getListWidgets: (callback?: (res: WidgetInfo[]) => void) => Promise<void>;
    addWidgetToChat: (widgetId: string, isPinned?: boolean) => Promise<import("../../core/request/APIFetch").ResponseType<import("../../../../src/common/constants/interfaces/workshop.js").WidgetMessageDetail> | {
        success: boolean;
    }>;
    refreshListWidgets: (callback?: () => void, widgetId?: string) => Promise<void>;
};
