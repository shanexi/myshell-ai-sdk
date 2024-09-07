import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
export default function useWidgetChangeList(widgetInfo?: WidgetInfo | null | undefined): {
    removeBot: (callback?: () => void) => Promise<void>;
};
