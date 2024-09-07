type PromiseFunction = (...args: any[]) => Promise<any>;
interface Limit {
    (fn: PromiseFunction, ...args: any[]): Promise<any>;
    activeCount: number;
    pendingCount: number;
    clearQueue: () => void;
}
export declare const limitQueue: (concurrency: number) => Limit;
export {};
