import { FC } from 'react';
export interface TelegramUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
}
declare global {
    interface Window {
        TelegramLoginWidgetCb: any;
    }
}
export interface TelegramButtonPropArg {
    botName: string;
    widgetVersion?: string;
    userPic?: boolean;
    className?: string;
    cornerRadius?: number;
    requestAccess?: boolean;
    lang?: string;
    dataOnAuth: (user: TelegramUser) => void;
    dataAuthUrl?: string;
    buttonSize?: 'large' | 'medium' | 'small';
    children?: React.ReactNode;
}
export declare const TelegramButton: FC<TelegramButtonPropArg>;
