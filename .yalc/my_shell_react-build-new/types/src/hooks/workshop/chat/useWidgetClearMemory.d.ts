import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
export default function useWidgetClearMemory(widgetInfo?: WidgetInfo | null, callback?: (isSuc: boolean) => void): () => void;
