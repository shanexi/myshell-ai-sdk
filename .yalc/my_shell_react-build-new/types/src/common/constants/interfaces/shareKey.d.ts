import { BotInfo } from './bot';
import { DataChangeStatus, ShareKeyStatus } from '../enums/shareKey';
export interface ShareKey {
    id: string;
    botId: string;
    holderId: string;
    status: ShareKeyStatus;
    soldPrice: string;
    soldAtIndex: number;
    boughtPrice: string;
    boughtAtIndex: number;
    sellAtIndex: number;
    sellPrice: string;
    stat: {
        totalEarned: number;
    };
    boughtAt: number;
    soldAt: number;
}
export interface PriceStat {
    nextShareKeyBuyPrice: string;
    nextShareKeyBuyIndex: number;
    nextNextShareKeyBuyPrice: string;
    nextNextShareKeyBuyIndex: number;
    buyPriceChangeRateVsYesterday: string;
    buyPriceChangeStatusVsYesterday: DataChangeStatus;
    rushInfo: {
        saveShellCoin: string;
        rushIndex: number;
    };
    buyPriceDateChanges: Array<{
        date: string;
        value: string;
    }>;
    sellPriceDateChanges: Array<{
        date: string;
        value: string;
    }>;
}
export interface PointEarnedStat {
    totalPointEarned: number;
    avgPointEarnedInLast7Days: number;
    pointEarnedChangeRateVsLastWeek: string;
    pointEarnedChangeStatusVsLastWeek: DataChangeStatus;
    pointChanges: Array<{
        date: string;
        value: string;
    }>;
}
export interface SubscriberStat {
    totalSubscriber: number;
    subscriberChanges: Array<{
        date: string;
        value: string;
    }>;
}
export interface SubscriptionStat {
    totalSubscription: number;
    subscriptionChanges: Array<{
        date: string;
        value: string;
    }>;
}
export interface LoginUserSubscribeInfo {
    holdShareKeys: ShareKey[];
    remainBuyCount: number;
    totalShellCoinEarned: number;
    shellCoinEarnChange: {
        date: string;
        value: string;
    };
    shareKeyCountChange: {
        date: string;
        value: string;
    };
}
export interface BotShareKeyStatsInfo {
    priceStat: PriceStat;
    feeRate: number;
    pointEarnedStat: PointEarnedStat;
    subscriberStat: SubscriberStat;
    subscriptionStat: SubscriptionStat;
    rankStat: {
        currentRank: number;
        earnedPoints7dRank: string;
    };
    loginUserSubscribeInfo: LoginUserSubscribeInfo;
}
export interface ShareKeyUserEarnInfo {
    totalEarningData: {
        totalEarningPoints: number;
        validCollectPoints: number;
    };
    yesterdayEarningData: {
        yesterdayDateUnix: string;
        yesterdayEarningPoints: number;
        beforeYesterdayDateUnix: string;
        percentageChange: string;
        percentageChangeStatus: DataChangeStatus;
        chartDataList: Array<{
            date: string;
            value: number;
        }>;
    };
    stakeNumData: {
        currentStakeNum: number;
        vsYesterdayStakeNum: number;
    };
}
export interface StakeBaseStatInfo {
    botInfo: BotInfoMini;
    stakePrice: number;
    stakePriceChangeStatus: DataChangeStatus;
    stakeAmount: number;
    stakeAmountChangeStatus: DataChangeStatus;
    perStakeEarnPointLast7Days: number;
    perStakeEarnPointLast7DaysChangeStatus: DataChangeStatus;
    perStakeEarnPointYesterday: number;
    perStakeEarnPointYesterdayChangeStatus: DataChangeStatus;
    stakedShellCoinVsYesterdayPercentage: string;
    stakedShellCoinVsYesterdayPercentageChangeStatus: DataChangeStatus;
    stakedShellCoin: string;
    totalEarnPoint: number;
    totalEarnPointLast7Days: number;
    hasReachStakeLimit: boolean;
    roi7Days: string;
}
export interface UserStakeInfo {
    baseStatInfo: StakeBaseStatInfo;
    userTotalEarnedPoints: number;
    userTotalEarnedPointsChangeStatus: DataChangeStatus;
    userStakedShellCoin: string;
    userStakedShellCoinChangeStatus: DataChangeStatus;
    userRoi: string;
}
export interface MyStakeData {
    listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    };
    botList: UserStakeInfo[];
}
export interface StakeRankingListData {
    rank?: number;
    baseStatInfo: StakeBaseStatInfo;
}
export interface StakeDetail {
    baseStatInfo: StakeBaseStatInfo;
    rank: number;
    rankChangeStatus: DataChangeStatus;
    stakedPrices: number[];
}
export interface StakeDetailData {
    listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    };
    total: number;
    stakeDetailList: StakeDetail[];
}
export type BotInfoMini = Pick<BotInfo, 'id' | 'name' | 'logoUrl' | 'tagList' | 'author'>;
export interface EarnPointInfo {
    yesterdayDateUnix: string;
    yesterdayEarningPoints: number;
    beforeYesterdayDateUnix: string;
    beforeYesterdayEarningPoints: number;
    percentageChange: string;
    percentageChangeStatus: DataChangeStatus;
    chartDataList: Array<{
        dateUnix: string;
        value: number;
    }>;
}
export interface TopBot {
    botInfo: BotInfoMini;
    totalEarnPoint: number;
}
export interface EarningDetail {
    earnPointInfo: EarnPointInfo;
    topBots: TopBot[];
}
export interface EarningDetailChartData {
    dateUnix: string;
    value: string;
}
