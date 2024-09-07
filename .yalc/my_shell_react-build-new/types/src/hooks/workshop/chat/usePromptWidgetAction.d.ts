import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
export default function usePromptWidgetAction(widgetInfo?: WidgetInfo | null): {
    inputLock: boolean;
    acting: boolean;
    promptAction: ({ type, callback }: {
        type: "unlock" | "view";
        callback?: () => void;
    }) => Promise<unknown>;
};
