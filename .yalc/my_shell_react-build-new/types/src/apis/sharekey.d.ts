import { EarningDetailChartTimeEnum, MyStakeDataOrderByEnum, StakeDetailOrderByEnum, StakeEarnDataTabEnum } from '../../../src/common/constants/enums/shareKey.js';
import { ShareKey, BotShareKeyStatsInfo, MyStakeData, StakeRankingListData, StakeDetailData, EarningDetail, EarningDetailChartData, BotInfoMini } from '../../../src/common/constants/interfaces/shareKey.js';
import { Order } from '../../../src/common/constants/interfaces/task.js';
import { ResponseType } from '../../../src/core/request/APIFetch.js';
export declare function getShareKeyInfo(botId: string): Promise<ResponseType<BotShareKeyStatsInfo>>;
export declare function buyShareKey(wantIndex: number, wantPrice: string, botId: string): Promise<ResponseType<{
    shareKey: ShareKey;
    buyOrder: Order;
}>>;
export declare function sellShareKey(keyId: string): Promise<ResponseType<{
    shareKey: ShareKey;
    sellOrder: Order;
}>>;
export declare function getUserStakeBotList(pageToken: string, pageSize: number, orderBy?: MyStakeDataOrderByEnum, orderDesc?: boolean): Promise<ResponseType<MyStakeData>>;
export declare function getDataByTab(tab: StakeEarnDataTabEnum): Promise<ResponseType<StakeRankingListData[]>>;
export declare function getStakeDetailData(pageToken: string, pageSize: number, orderBy?: StakeDetailOrderByEnum, orderDesc?: boolean): Promise<ResponseType<StakeDetailData>>;
export declare function getEarningDetailData(): Promise<ResponseType<EarningDetail>>;
export declare function getEarningDetailChart(searchTime: EarningDetailChartTimeEnum, botId?: string): Promise<ResponseType<EarningDetailChartData[]>>;
export declare function getShareKeyInfoWithBotId(botId: string): Promise<ResponseType<number>>;
export declare function getBotStakeFailureData(): Promise<ResponseType<Array<{
    botMini: BotInfoMini;
    amount: string;
}>>>;
