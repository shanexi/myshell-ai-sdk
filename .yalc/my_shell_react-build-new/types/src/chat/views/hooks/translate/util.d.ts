export declare const LangMap: {
    [key: string]: string;
};
export declare const getHeaders: () => Promise<{
    Authorization: string;
    platform: string;
    version: string;
    'Accept-Language': string;
} | {
    'Visitor-Id': string;
    'sc-device-id'?: string;
    'sc-cookie-id'?: string;
    platform: string;
    version: string;
    'Accept-Language': string;
}>;
