import { Observable } from 'rxjs';
export declare const LangMap: {
    [key: string]: string;
};
export interface RequestConfig {
    timeout?: number;
    allowAnonymous?: boolean;
    skipHandlingResponse?: boolean;
    noPopupError?: boolean;
    noRedirectToLogin?: boolean;
    isGoLang?: boolean;
    withMyShellSecurityToken?: boolean;
    production?: boolean;
}
export declare const baseURL: string;
export declare const wsBaseURL: string;
export declare const axiosClient: import("axios").AxiosInstance;
export declare function rxGet<T>(url: string, params?: any, config?: RequestConfig): Observable<T>;
export declare const rxPost: <T>(url: string, data?: any, config?: RequestConfig) => Observable<T>;
export declare const rxDelete: <T>(url: string, data?: any, config?: RequestConfig) => Observable<T>;
export declare const rxUpload: <T>(url: string, form: FormData, config?: RequestConfig) => Observable<T>;
