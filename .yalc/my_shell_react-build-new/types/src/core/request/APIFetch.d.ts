export declare const LangMap: {
    [key: string]: string;
};
export declare const baseURL: string;
export declare const wsBaseURL: string;
export interface ResponseType<T> {
    success: boolean;
    data: T;
    msg?: string;
    reason?: string;
    metadata?: Record<string, unknown>;
}
export interface RequestModel<TResponse, TResult> {
    params?: Record<string, any>;
    headers?: Record<string, any>;
    signal?: AbortSignal;
    timeout?: number;
    allowAnonymous?: boolean;
    adapter?: (resp: TResponse, context: {
        lang: string;
    }) => TResult;
    isGoLang?: boolean;
    hideErrorToast?: boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    withMyShellSecurityToken?: boolean;
    serverContext?: {
        headers: {
            get(name: string): string | null | undefined;
        };
        cookies: {
            get(name: string): {
                value: string | null | undefined;
            } | null | undefined;
        };
        locale?: string | null | undefined;
    };
    production?: boolean;
}
export interface RequestWithBodyModel<TResponse, TResult> extends RequestModel<TResponse, TResult> {
    body?: Record<string, any>;
}
export declare const APIFetch: {
    get: <TResult, TResponse = any>(url: string, request?: RequestModel<TResponse, TResult>) => Promise<ResponseType<TResult>>;
    post: <TResult, TResponse = any>(url: string, request?: RequestWithBodyModel<TResponse, TResult>) => Promise<ResponseType<TResult>>;
    put: <TResult, TResponse = any>(url: string, request?: RequestWithBodyModel<TResponse, TResult>) => Promise<ResponseType<TResult>>;
    patch: <TResult, TResponse = any>(url: string, request?: RequestWithBodyModel<TResponse, TResult>) => Promise<ResponseType<TResult>>;
    delete: <TResult, TResponse = any>(url: string, request?: RequestModel<TResponse, TResult>) => Promise<ResponseType<TResult>>;
};
