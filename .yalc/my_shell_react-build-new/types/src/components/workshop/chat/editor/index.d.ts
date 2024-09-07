import { WidgetInfo } from '../../../../../../src/common/constants/interfaces/workshop.js';
type WidgetEditorInputProps = {
    widgetInfo?: WidgetInfo | null;
    onSend: (flag?: boolean) => void;
    isMobile: boolean;
    toggleImagePanelOpen: (value: any) => void;
    showInput: boolean;
    setShowInput: (value: boolean) => void;
    allowTextInput?: boolean;
    allowAudioInput?: boolean;
    textInputRef: React.RefObject<HTMLTextAreaElement>;
    isFullScreen: boolean;
    setFullScreen: (val: boolean) => void;
};
declare function WidgetEditorInput({ widgetInfo, onSend, isMobile, toggleImagePanelOpen, showInput, setShowInput, allowTextInput, allowAudioInput, textInputRef, isFullScreen, setFullScreen }: WidgetEditorInputProps): import("react/jsx-runtime").JSX.Element;
export default WidgetEditorInput;
