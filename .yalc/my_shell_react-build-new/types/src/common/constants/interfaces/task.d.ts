import type { Dayjs } from 'dayjs';
import { CurveSummary } from '../../../../../src/apis/apiTypes.js';
import { ReturnedBotInfo } from './bot';
import { GolangRewardStatusEnum, GolangUserTaskStatusEnum, TaskTypeEnum, PropStatusEnum, PropTypeEnum, OrderType, OrderStatus, SeasonStatus, PointTypeEnum } from '../enums/task';
export interface Task {
    id: string;
    seasonId: string;
    taskName: string;
    taskDescription: string;
    taskType: TaskTypeEnum;
    pointType: PointTypeEnum;
    taskIconDark: string;
    taskIconLight: string;
    gemCount: number;
    order: number;
    requiredCount: number;
    status: GolangUserTaskStatusEnum;
    claimableCount?: number;
    claimableGemCount?: number;
    currentTaskProgress?: number;
    claimedCount?: number;
    claimedGemCount?: number;
    nextSeasonClaimableCount: number;
    nextSeasonClaimableGemCount: number;
    nextSeasonProgress: number;
    nextSeasonRequiredCount: number;
    requiredUserLevel: number;
    userLevelValid: boolean;
    taskInfo?: {
        dailyTaskCompletedCount?: number;
        dailyTaskPoints?: number[];
        botList?: ReturnedBotInfo[];
        preConditionFulfilled: boolean;
        date?: Dayjs;
        twitterUser?: string;
        tweetId?: string;
        followed?: boolean;
        liked?: boolean;
        retweeted?: boolean;
        contractAddress?: `0x${string}`;
        blockchainType?: string;
        tweetRichTextContent?: string;
        claimableMediaShareRecords?: MediaShareRecord[];
        notClaimableMediaShareRecordsCount?: number;
        verifyingMediaShareRecordsCount?: number;
        luckyCurve?: CurveSummary;
        jackPotTaskEndDateUnix?: number;
        jackPotClaimableEndDateUnix?: number;
    };
}
export interface GolangTask {
    id: string;
    seasonId: string;
    taskName: string;
    taskDescription: string;
    taskType: TaskTypeEnum;
    pointType: PointTypeEnum;
    taskIconLight: string;
    taskIconDark: string;
    displayOrder: number;
    status: GolangUserTaskStatusEnum;
    points: number;
    requiredCount: number;
    progressCount: number;
    claimableCount: number;
    claimablePoints: number;
    nextSeasonRequiredCount: number;
    nextSeasonProgressCount: number;
    nextSeasonClaimableCount: number;
    nextSeasonClaimablePoints: number;
    claimedCount: number;
    claimedPoints: number;
    disabled: boolean;
    requiredUserLevel: number;
    userLevelValid: boolean;
    preconditionFulfilled: boolean;
    additionalInfo: {
        dailyTaskCompletedCount?: number;
        dailyTaskPoints?: number[];
        botList?: any[];
        dailyTaskStartDateUnix?: number;
        twitterUserId?: string;
        tweetId?: string;
        followed?: boolean;
        liked?: boolean;
        retweeted?: boolean;
        contractAddress?: `0x${string}`;
        blockchainType?: string;
        tweetRichTextContent?: string;
        claimableMediaShareRecords?: MediaShareRecord[];
        notClaimableMediaShareRecordsCount: number;
        verifyingMediaShareRecordsCount: number;
        luckyCurve?: CurveSummary;
        jackPotTaskEndDateUnix?: number;
        jackPotClaimableEndDateUnix?: number;
    } | null;
}
export interface SeasonInfo {
    id: string;
    name: string;
    banner: string;
    bannerMobileDark: string;
    bannerMobileLight: string;
    bannerPcDark: string;
    bannerPcLight: string;
    isBate: boolean;
    startDate?: Dayjs;
    endDate?: Dayjs;
    claimableStart?: Dayjs;
    claimableEnd?: Dayjs;
    silentPeriodEnd?: Dayjs;
    status: SeasonStatus;
    text: string;
}
export interface GolangSeasonInfo {
    id: string;
    name: string;
    banner: string;
    bannerMobileDark: string;
    bannerMobileLight: string;
    bannerPcDark: string;
    bannerPcLight: string;
    isBeta: boolean;
    startDateUnix: string;
    endDateUnix: string;
    silentPeriodEndUnix: string;
    redeemableStartDateUnix: string;
    redeemableEndDateUnix: string;
    status: SeasonStatus;
    statusText: string;
}
export interface RewardInfo {
    subType: string;
    seasonId: string | number;
    propId: string;
    id: string;
    name: string;
    description: string;
    media: string;
    propType: PropTypeEnum;
    gemCount: number;
    maxRedeemablePerUser?: number;
    redeemableCount?: number;
    endDate?: Dayjs;
    startDate?: Dayjs;
}
export interface BackpackItem {
    id: string;
    itemType: 'standardBattlePass' | 'genesisPass' | 'seasonBadge' | 'energyPack' | 'shellCoin';
    subType: string;
    mediaUrl: string;
    name: string;
    description: string;
    count: number;
    usableStartDateUnix: number;
    usableEndDateUnix: number;
    status: GolangRewardStatusEnum;
}
export interface GolangRewardInfo {
    id: string;
    seasonId: string;
    point: number;
    redeemableStartDateUnix: number;
    redeemableEndDateUnix: number;
    maxRedeemablePerUser: number;
    maxRedeemableCurrent: number;
    totalCount: number;
    remainCount: number;
    eligible: boolean;
    backpackItem: BackpackItem;
}
export interface GolangPropItemInfo {
    id: string;
    name: string;
    description: string;
    itemType: PropTypeEnum;
    subType: string;
    mediaUrl: string;
    usableStartDateUnix: number;
    usableEndDateUnix: number;
}
export interface GolangPropInfo {
    item: GolangPropItemInfo;
    count: number;
    status: PropStatusEnum;
}
export interface PropInfo {
    id: string;
    name: string;
    description: string;
    media: string;
    count: number;
    propType: PropTypeEnum;
    subType: string;
    startDate?: Dayjs;
    endDate?: Dayjs;
    status: PropStatusEnum;
}
export interface Order {
    id: string;
    userId: string;
    accountId: string;
    sourceId: string;
    sourceType: OrderType;
    sourceDesc: string;
    status: OrderStatus;
    amount: string;
    balanceAfter: string;
    createdAt: number;
    updatedAt: number;
    isIncome: boolean;
}
export interface HoldBadge {
    shellCoinPrice: number;
    shellCoinAmount: number;
    userBackpackItem: {
        item: GolangPropItemInfo;
        count: number;
        status: PropStatusEnum;
    };
}
export interface GolangPoint {
    pointType: PointTypeEnum;
    point: number;
    pointText: string;
    seasonId: string;
}
export interface GolangExchangePoint extends GolangPoint {
    ratio: number;
    targetAmount: number;
    targetAmountText: string;
}
export interface Point {
    type: PointTypeEnum;
    point: number;
    text: string;
}
export interface ExchangePoint extends Point {
    ratio: number;
    targetAmount: number;
    targetAmountText: string;
}
export interface MediaShareRecord {
    id: string;
    recordId: string;
    postLink: string;
    postContent: string;
    shareContent: string;
    shareLink: string;
    status: string;
    createdAtUnix: number;
    points: number;
    pointsText: string;
}
