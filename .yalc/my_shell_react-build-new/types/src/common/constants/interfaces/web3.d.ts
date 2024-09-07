import { FaucetCurrency, FaucetTaskStatus, FaucetTaskStepStatus, FaucetTaskStepType, FaucetTaskType } from '../enums/web3';
export interface AccountInfo {
    currency: {
        name: string;
        icon: string;
        type: FaucetCurrency;
        exchangeRatio: string;
    };
    balance: string;
    exchangeLimit: string;
}
export interface ConvertibleCurrency {
    name: string;
    icon: string;
    type: FaucetCurrency;
    exchangeRatio: string;
    currentlyMaxExchangeable: string;
}
export interface FanucetTaskStep {
    type: FaucetTaskStepType;
    status: FaucetTaskStepStatus;
    errorMessage: string;
    tweetUrl: string;
    lastCurrencyPaid: string;
    lastAmountPaid: string;
    lastCurrencyEarned: string;
    lastAmountEarned: string;
    lastOrderTxnHash: string;
    accounts: AccountInfo[];
    convertibleCurrencyList: ConvertibleCurrency[];
}
export interface FanucetTask {
    type: FaucetTaskType;
    taskName: string;
    relatedCoinName: string;
    status: FaucetTaskStatus;
    steps: FanucetTaskStep[];
}
export declare enum ChainInteractionError {
    UserRejected = 4001
}
