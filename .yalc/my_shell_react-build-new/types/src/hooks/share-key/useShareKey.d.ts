import { EarningDetailChartTimeEnum, MyStakeDataOrderByEnum, ShareKeyTradeError, StakeDetailOrderByEnum } from '../../../../src/common/constants/enums/shareKey.js';
import { BotShareKeyStatsInfo } from '../../../../src/common/constants/interfaces/shareKey.js';
export default function useShareKey(): {
    gettingInfo: boolean;
    getShareKeyInfoByBotId: (botId: string) => Promise<BotShareKeyStatsInfo | undefined>;
    oldStakePrice: string | undefined;
    subscribing: boolean;
    handleSubscribe: (wantIndex: number, wantPrice: string, botId: string, successCb?: () => void) => Promise<void>;
    subscribeError: ShareKeyTradeError | undefined;
    selling: boolean;
    handleSell: (keyId: string, botId: string, successCb?: (coins: string) => void) => Promise<void>;
    sellError: ShareKeyTradeError | undefined;
    gettingEarnInfo: boolean;
    gettingMyStakeData: boolean;
    myStakeGettingMore: boolean;
    getMyStakeData: (callback: (listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    }) => void, pageToken: string, pageSize: number, orderBy?: MyStakeDataOrderByEnum, orderDesc?: boolean) => Promise<void>;
    gettingTopEarnData: boolean;
    getTopEarnData: () => Promise<void>;
    gettingHotBotData: boolean;
    getHotBotData: () => Promise<void>;
    gettingPotentialData: boolean;
    getPotentialData: () => Promise<void>;
    gettingSoarBotData: boolean;
    getSoarBotData: () => Promise<void>;
    gettingTurnoverData: boolean;
    getTurnoverData: () => Promise<void>;
    gettingStakeDetail: boolean;
    stakeDetailGettingMore: boolean;
    getStakeDetail: (callback: (listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    }, total: number) => void, pageToken: string, pageSize: number, orderBy?: StakeDetailOrderByEnum, orderDesc?: boolean) => Promise<void>;
    gettingEarningDetail: boolean;
    getEarningDetail: () => Promise<void>;
    gettingEarningChartData: boolean;
    getEarningChart: (searchTime: EarningDetailChartTimeEnum, botId?: string) => Promise<void>;
    getMyStakeSelectOptions: (pageToken: string) => Promise<{
        options: {
            id: string;
            name: string;
            logoUrl: string | undefined;
        }[];
        listResponse: {
            hasMore: boolean;
            nextPageToken: string;
        };
    } | null | undefined>;
};
