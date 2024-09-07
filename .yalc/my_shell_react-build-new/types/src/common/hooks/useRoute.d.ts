export declare const useRoute: () => {
    openUrl: (url: string) => void;
    back(): void;
    forward(): void;
    refresh(): void;
    push(href: string, options?: import("next/dist/shared/lib/app-router-context.shared-runtime").NavigateOptions): void;
    replace(href: string, options?: import("next/dist/shared/lib/app-router-context.shared-runtime").NavigateOptions): void;
    prefetch(href: string, options?: import("next/dist/shared/lib/app-router-context.shared-runtime").PrefetchOptions): void;
};
