import { Observable } from 'rxjs';
import { ExchangePoint, HoldBadge, Order, Point, PropInfo, RewardInfo, SeasonInfo, Task, MediaShareRecord } from '../../../src/common/constants/interfaces/task';
import { ResponseType } from '../../../src/core/request/APIFetch';
export declare function getTaskList(): Promise<ResponseType<Task[]>>;
export declare function taskGemClaim(taskId: string): Promise<ResponseType<unknown>>;
export declare function taskGemBatchClaim(): Promise<ResponseType<unknown>>;
export declare function verifyTwitterStatus(userTaskUid: string): Observable<boolean>;
export declare function verifyTweet(tweetUrl: string): Promise<ResponseType<{}>>;
export declare function verifyPLTweet(tweetUrl: string): Promise<ResponseType<{}>>;
export declare function getNextTwitterCheckRefreshTime(userTaskUid: string): Observable<number>;
export declare function getRanking(): Observable<number>;
export declare function getRewards(seasonId?: string): Promise<ResponseType<RewardInfo[]>>;
export declare function rewardRedeem(rewardId: string, count: number): Promise<ResponseType<{}>>;
export declare function getProps(): Promise<ResponseType<PropInfo[]>>;
export declare function onUseProp(propId: string, count: number): Promise<ResponseType<unknown>>;
export declare function getNewlyMyPropsCount(): Promise<ResponseType<{
    count: number;
}>>;
export declare function clearNewlyMyPropsCount(): Promise<ResponseType<unknown>>;
export declare function getBlockChainInteractionState(txHash: `0x${string}`): Promise<ResponseType<{
    hasConfirmed: boolean;
}>>;
export declare function getDeductionInfo(): Promise<ResponseType<Point[]>>;
export declare function getShellCoinExchange(): Promise<ResponseType<ExchangePoint[]>>;
export declare function exchangeShellCoin(): Promise<ResponseType<Order>>;
export declare function getOrders(pageToken: string, pageSize: number): Promise<ResponseType<{
    listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    };
    accountOrders: Array<{
        id: string;
        userId: string;
        accountId: string;
        sourceId: string;
        sourceType: "ORDER_SOURCE_TYPE_UNSPECIFIED";
        status: "ORDER_STATUS_UNSPECIFIED";
        amount: string;
        createdAt: number;
        updatedAt: number;
    }>;
}>>;
export declare function getUserHoldBadge(): Promise<ResponseType<HoldBadge[]>>;
export declare function badgeToShellCoin(exchangeBadges: Array<{
    badgeType: string;
    badgeCount: number;
}>): Promise<ResponseType<Order[]>>;
export declare function getRedeemableSeasonList(): Promise<ResponseType<SeasonInfo[]>>;
export declare function getLastSeasonInfo(): Promise<ResponseType<Point[]>>;
export declare function claimAllLastSeasonPoints(): Promise<ResponseType<any>>;
export declare function createMediaShareRecord(postLink: string, shareLink: string): Promise<ResponseType<unknown>>;
export declare function getMediaShareReocrd(): Promise<ResponseType<MediaShareRecord[]>>;
export declare function cancelVerifyMediaShareRecord(recordId: string): Promise<ResponseType<unknown>>;
export declare function claimTaskByRecordId(taskRecordId: string): Promise<ResponseType<unknown>>;
