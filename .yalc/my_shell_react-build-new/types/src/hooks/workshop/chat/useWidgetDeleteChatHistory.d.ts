export default function useDeleteWidgetHistory(): {
    deleting: boolean;
    deleteAll: (widgetId: string, successCb?: () => void) => Promise<void>;
    deleteSelectedWidgetHistory: (successCb?: () => void) => Promise<void>;
};
