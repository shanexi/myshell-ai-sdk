import { DisplayMessage, RunningErrorEnum, RunningWidgetInfo as IRunningWidgetInfo } from '../../../../../../../../src/chat-new/model/definitions.js';
interface IRunningWidgetInfoProps {
    list: IRunningWidgetInfo[];
}
interface IRunningErrorProps {
    message: DisplayMessage;
}
export declare const getErrorMsgByType: (requestErrorTranslations: any, type?: RunningErrorEnum) => any;
export declare const RunningError: ({ message }: IRunningErrorProps) => import("react/jsx-runtime").JSX.Element | null;
export declare const NetworkError: () => import("react/jsx-runtime").JSX.Element | null;
export default function RunningWidgetInfo({ list }: IRunningWidgetInfoProps): import("react/jsx-runtime").JSX.Element;
export {};
