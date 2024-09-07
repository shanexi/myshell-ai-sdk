import { MessageDetail, IRunningWidgetInfo, MessageRunningErrorType } from '../../../../../../src/chat/model/interfaces.js';
interface IRunningWidgetInfoProps {
    list: IRunningWidgetInfo[];
}
interface IRunningErrorProps {
    chat: MessageDetail;
}
export declare const getErrorMsgByType: (requestErrorTranslations: any, type?: MessageRunningErrorType) => any;
export declare const RunningError: ({ chat }: IRunningErrorProps) => import("react/jsx-runtime").JSX.Element | null;
export declare const NetworkError: () => import("react/jsx-runtime").JSX.Element | null;
export default function RunningWidgetInfo({ list }: IRunningWidgetInfoProps): import("react/jsx-runtime").JSX.Element;
export {};
