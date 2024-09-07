import type { Config } from '@wagmi/core';
import { Address, encodeFunctionData } from 'viem';
interface LaunchBondingParams {
    name: string;
    symbol: string;
    sig: string;
    validTill: bigint;
}
interface BuyBondingParams {
    bid: bigint;
    amount: bigint;
    sig: string;
    validTill: bigint;
    value: bigint;
}
interface SellBondingParams {
    bid: bigint;
    amount: bigint;
    minOut: bigint;
}
export interface Price {
    value: bigint;
    formatted: string;
}
export declare function useBaseInfo(): {
    isWeb3: boolean | null;
    chainId: 56 | 97;
    address: `0x${string}` | undefined;
    config: Config;
    requestWithPrivy: (to: Address, parameters: Parameters<typeof encodeFunctionData>[0]) => Promise<unknown>;
};
export declare function useBondingContract(): {
    isWeb3: boolean | undefined;
    launchBonding: (params: LaunchBondingParams) => Promise<string | undefined>;
    buyBonding: (params: BuyBondingParams) => Promise<string | undefined>;
    sellBonding: (params: SellBondingParams) => Promise<string | undefined>;
    getBadgePrice: (params: {
        bid: bigint;
        amount: bigint | number;
        slippage?: number;
        isBuy: boolean;
        isWeb3?: boolean;
    }) => Promise<Price>;
    getBadgeAmount: (params: {
        bid: bigint;
        address?: Address;
        isWeb3?: boolean;
    }) => Promise<number>;
};
interface OriginTradeInfo {
    buy: {
        singlePrice: bigint;
        price: bigint;
        priceAfterFee: bigint;
    };
    sell: {
        singlePrice: bigint;
        price: bigint;
        priceAfterFee: bigint;
    };
    bidBalance: bigint;
    bnbBalance: bigint;
}
interface TradeInfo {
    buySinglePrice: Price;
    buyPrice: Price;
    buyFee: Price;
    buyTotal: Price;
    sellSinglePrice: Price;
    sellPrice: Price;
    sellFee: Price;
    sellTotal: Price;
    userBalance: Price;
    userBidAmount: number;
}
export declare function useTradeInfo(params: {
    bid: bigint;
    amount: number;
    slippage?: number;
}): {
    data: TradeInfo | null;
    error: Error;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: true;
    isSuccess: false;
    status: "error";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<OriginTradeInfo, Error>>;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
} | {
    data: TradeInfo | null;
    error: null;
    isError: false;
    isPending: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    status: "success";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<OriginTradeInfo, Error>>;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
} | {
    data: TradeInfo | null;
    error: Error;
    isError: true;
    isPending: false;
    isLoading: false;
    isLoadingError: true;
    isRefetchError: false;
    isSuccess: false;
    status: "error";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<OriginTradeInfo, Error>>;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
} | {
    data: TradeInfo | null;
    error: null;
    isError: false;
    isPending: true;
    isLoading: true;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: false;
    status: "pending";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<OriginTradeInfo, Error>>;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
} | {
    data: TradeInfo | null;
    error: null;
    isError: false;
    isPending: true;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: false;
    status: "pending";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<OriginTradeInfo, Error>>;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
};
export {};
