import dayjs from 'dayjs';
import { getAssetsUrl } from '../common/utils/common-helper.js';
import { rxGet, rxPost } from '../common/utils/rx-http.js';
import { APIFetch } from '../core/request/APIFetch.js';
export function getTaskList() {
    return APIFetch.post('/v3/season/task/list', {
        body: {
            taskTypes: [
                'SEASON_TASK_TYPE_BOT_MASTER',
                'SEASON_TASK_TYPE_INVITEE_MESSAGE_LV1',
                'SEASON_TASK_TYPE_INVITEE_MESSAGE_LV2',
                'SEASON_TASK_TYPE_COMPENSATE',
                'SEASON_TASK_TYPE_FANS_KEY',
                'SEASON_TASK_TYPE_DAILY_MESSAGE',
                'SEASON_TASK_TYPE_DC_INTERACTION',
                'SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION',
                'SEASON_TASK_TYPE_USE_VOICE_CALL',
                'SEASON_TASK_TYPE_USE_VIDEO_CALL',
                'SEASON_TASK_TYPE_CREATE_BOT',
                'SEASON_TASK_TYPE_USE_VOICE_CLONE',
                'SEASON_TASK_TYPE_EXPERIENCE_IMAGE_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_FAMOUS_ROLES',
                'SEASON_TASK_TYPE_TALK_TO_LANGUAGE_LEARNING_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_TRANSLATION_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_SHELL_LLM_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_RPG_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_JOB_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_LEARNING_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_DEV_BOTS',
                'SEASON_TASK_TYPE_PUBLIC_VOICE_INCOME',
                'SEASON_TASK_TYPE_BIND_DC_ACCOUNT',
                'SEASON_TASK_TYPE_TALK_TO_MASTER_IMAGE_REVIEW',
                'SEASON_TASK_TYPE_TALK_TO_GAME_CONNOISSEUR',
                'SEASON_TASK_TYPE_TALK_TO_UNIVERSAL_ADORATION',
                'SEASON_TASK_TYPE_TALK_TO_COMPANIONSHIP',
                'SEASON_TASK_TYPE_TALK_TO_STOCK_SITUATION',
                'SEASON_TASK_TYPE_TALK_TO_REFORM_AND_INNOVATION',
                'SEASON_TASK_TYPE_TALK_TO_MULTI_TALENTED',
                'SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE',
                'SEASON_TASK_TYPE_TWEET_SHARE',
                'SEASON_TASK_TYPE_PATRON_BADGE',
                'SEASON_TASK_TOP_CURVE_HOLDERS_DAILY_INCOME',
                'SEASON_TASK_TYPE_LUCKY_STAR',
                'SEASON_TASK_TYPE_CURVE_PROFIT_SHARE',
                'SEASON_TASK_TYPE_JACKPOT'
            ]
        },
        isGoLang: true,
        adapter: (res) => {
            return res.list.map(item => ({
                id: item.id,
                seasonId: item.seasonId,
                taskName: item.taskName,
                taskDescription: item.taskDescription,
                taskType: item.taskType,
                pointType: item.pointType,
                taskIconDark: item.taskIconDark,
                taskIconLight: item.taskIconLight,
                gemCount: item.points,
                order: item.displayOrder,
                requiredCount: item.requiredCount,
                status: item.status,
                claimableCount: item.claimableCount,
                claimableGemCount: item.claimablePoints,
                currentTaskProgress: item.progressCount,
                claimedCount: item.claimedCount,
                claimedGemCount: item.claimedPoints,
                nextSeasonClaimableCount: item.nextSeasonClaimableCount,
                nextSeasonClaimableGemCount: item.nextSeasonClaimablePoints,
                nextSeasonProgress: item.nextSeasonProgressCount,
                nextSeasonRequiredCount: item.nextSeasonRequiredCount,
                requiredUserLevel: item.requiredUserLevel,
                userLevelValid: item.userLevelValid,
                taskInfo: {
                    dailyTaskPoints: item.additionalInfo?.dailyTaskPoints,
                    dailyTaskCompletedCount: item.additionalInfo?.dailyTaskCompletedCount,
                    botList: item.additionalInfo?.botList,
                    preConditionFulfilled: item.preconditionFulfilled,
                    date: item.additionalInfo &&
                        item.additionalInfo.dailyTaskStartDateUnix &&
                        !!Number(item.additionalInfo.dailyTaskStartDateUnix)
                        ? dayjs(Number(item.additionalInfo.dailyTaskStartDateUnix))
                        : undefined,
                    twitterUser: item.additionalInfo?.twitterUserId,
                    tweetId: item.additionalInfo?.tweetId,
                    followed: item.additionalInfo?.followed,
                    liked: item.additionalInfo?.liked,
                    retweeted: item.additionalInfo?.retweeted,
                    contractAddress: item.additionalInfo?.contractAddress,
                    blockchainType: item.additionalInfo?.blockchainType,
                    tweetRichTextContent: item.additionalInfo?.tweetRichTextContent,
                    claimableMediaShareRecords: item.additionalInfo?.claimableMediaShareRecords,
                    notClaimableMediaShareRecordsCount: item.additionalInfo?.notClaimableMediaShareRecordsCount,
                    verifyingMediaShareRecordsCount: item.additionalInfo?.verifyingMediaShareRecordsCount,
                    luckyCurve: item.additionalInfo?.luckyCurve,
                    jackPotTaskEndDateUnix: item.additionalInfo?.jackPotTaskEndDateUnix,
                    jackPotClaimableEndDateUnix: item.additionalInfo?.jackPotClaimableEndDateUnix
                }
            }));
        }
    });
}
export function taskGemClaim(taskId) {
    return APIFetch.post('/v1/season/task/claim', {
        body: {
            taskId
        },
        isGoLang: true,
        withMyShellSecurityToken: true
    });
}
export function taskGemBatchClaim() {
    return APIFetch.post('/v2/season/task/claim_all', {
        body: {
            taskTypes: [
                'SEASON_TASK_TYPE_BOT_MASTER',
                'SEASON_TASK_TYPE_INVITEE_MESSAGE_LV1',
                'SEASON_TASK_TYPE_INVITEE_MESSAGE_LV2',
                'SEASON_TASK_TYPE_COMPENSATE',
                'SEASON_TASK_TYPE_FANS_KEY',
                'SEASON_TASK_TYPE_DAILY_MESSAGE',
                'SEASON_TASK_TYPE_DC_INTERACTION',
                'SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION',
                'SEASON_TASK_TYPE_USE_VOICE_CALL',
                'SEASON_TASK_TYPE_USE_VIDEO_CALL',
                'SEASON_TASK_TYPE_CREATE_BOT',
                'SEASON_TASK_TYPE_USE_VOICE_CLONE',
                'SEASON_TASK_TYPE_EXPERIENCE_IMAGE_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_FAMOUS_ROLES',
                'SEASON_TASK_TYPE_TALK_TO_LANGUAGE_LEARNING_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_TRANSLATION_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_SHELL_LLM_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_RPG_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_JOB_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_LEARNING_BOTS',
                'SEASON_TASK_TYPE_TALK_TO_DEV_BOTS',
                'SEASON_TASK_TYPE_PUBLIC_VOICE_INCOME',
                'SEASON_TASK_TYPE_BIND_DC_ACCOUNT',
                'SEASON_TASK_TYPE_TALK_TO_MASTER_IMAGE_REVIEW',
                'SEASON_TASK_TYPE_TALK_TO_GAME_CONNOISSEUR',
                'SEASON_TASK_TYPE_TALK_TO_UNIVERSAL_ADORATION',
                'SEASON_TASK_TYPE_TALK_TO_COMPANIONSHIP',
                'SEASON_TASK_TYPE_TALK_TO_STOCK_SITUATION',
                'SEASON_TASK_TYPE_TALK_TO_REFORM_AND_INNOVATION',
                'SEASON_TASK_TYPE_TALK_TO_MULTI_TALENTED',
                'SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE',
                'SEASON_TASK_TYPE_TWEET_SHARE',
                'SEASON_TASK_TYPE_PATRON_BADGE',
                'SEASON_TASK_TOP_CURVE_HOLDERS_DAILY_INCOME',
                'SEASON_TASK_TYPE_LUCKY_STAR',
                'SEASON_TASK_TYPE_CURVE_PROFIT_SHARE',
                'SEASON_TASK_TYPE_JACKPOT'
            ]
        },
        isGoLang: true,
        withMyShellSecurityToken: true
    });
}
export function verifyTwitterStatus(userTaskUid) {
    return rxPost('/userTask/verifyTwitterInteractionStatus', { userTaskUid });
}
export function verifyTweet(tweetUrl) {
    return APIFetch.post('/v1/season/task/verify_tweet', {
        isGoLang: true,
        hideErrorToast: true,
        body: {
            tweetUrl
        }
    });
}
export function verifyPLTweet(tweetUrl) {
    return APIFetch.post('/v1/season/task/verify_tweet_for_profit_share_task', {
        isGoLang: true,
        hideErrorToast: true,
        body: {
            tweetUrl
        }
    });
}
export function getNextTwitterCheckRefreshTime(userTaskUid) {
    return rxGet('/userTask/getNextTwitterCheckRefreshTime', { userTaskUid });
}
export function getRanking() {
    return rxGet('/userTask/getRanking');
}
export function getRewards(seasonId) {
    return APIFetch.post('/v1/season/reward/list', {
        isGoLang: true,
        body: {
            seasonId
        },
        adapter: (res) => {
            return res.rewards.map(item => ({
                id: item.id,
                name: item.backpackItem.name,
                description: item.backpackItem.description,
                media: getAssetsUrl(item.backpackItem.mediaUrl, 'https://cdn.myshell.ai/'),
                propType: item.backpackItem.itemType,
                subType: item.backpackItem.subType,
                seasonId: item.seasonId,
                propId: item.backpackItem.id,
                gemCount: item.point,
                maxRedeemablePerUser: item.maxRedeemablePerUser,
                redeemableCount: item.maxRedeemableCurrent,
                endDate: Number(item.redeemableEndDateUnix) ? dayjs(Number(item.redeemableEndDateUnix)) : undefined,
                startDate: Number(item.redeemableStartDateUnix) ? dayjs(Number(item.redeemableStartDateUnix)) : undefined
            }));
        }
    });
}
export function rewardRedeem(rewardId, count) {
    return APIFetch.post('/v2/season/reward/redeem', {
        body: {
            rewardId,
            count
        },
        isGoLang: true,
        withMyShellSecurityToken: true
    });
}
export function getProps() {
    return APIFetch.post('/v1/backpack/list', {
        isGoLang: true,
        adapter: (res) => {
            return res.items.map(item => ({
                id: item.item.id,
                name: item.item.name,
                description: item.item.description,
                media: getAssetsUrl(item.item.mediaUrl, 'https://cdn.myshell.ai/'),
                count: item.count,
                propType: item.item.itemType,
                subType: item.item.subType,
                startDate: Number(item.item.usableStartDateUnix) ? dayjs(Number(item.item.usableStartDateUnix)) : undefined,
                endDate: Number(item.item.usableEndDateUnix) ? dayjs(Number(item.item.usableEndDateUnix)) : undefined,
                status: item.status
            }));
        }
    });
}
export function onUseProp(propId, count) {
    return APIFetch.post('/v1/backpack/use_backpack_item', {
        body: {
            backpackItemId: propId,
            count
        },
        isGoLang: true
    });
}
export function getNewlyMyPropsCount() {
    return APIFetch.post('/v1/user/get_newly_owned_prop_count', {
        isGoLang: true
    });
}
export function clearNewlyMyPropsCount() {
    return APIFetch.post('/v1/user/reset_newly_owned_prop_count', { isGoLang: true });
}
export function getBlockChainInteractionState(txHash) {
    return APIFetch.post('/v1/season/task/get_blockchain_tx_status', {
        body: {
            txHash
        },
        isGoLang: true
    });
}
export function getDeductionInfo() {
    return APIFetch.post('/v2/season/info/get_deduction_info', {
        isGoLang: true,
        adapter: (res) => {
            return res.infos.map(({ point, pointText, pointType }) => ({
                point,
                text: pointText,
                type: pointType
            }));
        }
    });
}
export function getShellCoinExchange() {
    return APIFetch.post('/v1/season/reward/get_season_point_to_shell_coin_exchange_info', {
        isGoLang: true,
        adapter: (res) => {
            return res.exchangeRatios.map(({ point, pointText, pointType, ratio, targetAmount, targetAmountText }) => ({
                point,
                text: pointText,
                type: pointType,
                ratio,
                targetAmount,
                targetAmountText
            }));
        }
    });
}
export function exchangeShellCoin() {
    return APIFetch.post('/v1/season/reward/exchange_shell_coin_with_season_points', {
        isGoLang: true,
        withMyShellSecurityToken: true,
        adapter: (res) => {
            return res.order;
        }
    });
}
export function getOrders(pageToken, pageSize) {
    return APIFetch.post('/v1/shell_coins/list_account_orders', {
        body: {
            listRequest: {
                pageToken,
                pageSize
            }
        },
        isGoLang: true
    });
}
export function getUserHoldBadge() {
    return APIFetch.post('/v1/shell_coins/get_badge_exchange_shell_coin_info', {
        isGoLang: true,
        adapter: (res) => {
            return res.badgeShellCoinExchangeInfo;
        }
    });
}
export function badgeToShellCoin(exchangeBadges) {
    return APIFetch.post('/v1/shell_coins/exchange_shell_coin_with_badges', {
        body: {
            wantExchangeBadgeInfos: exchangeBadges
        },
        isGoLang: true,
        withMyShellSecurityToken: true,
        adapter: (res) => {
            return res.orders;
        }
    });
}
export function getRedeemableSeasonList() {
    return APIFetch.post('/v1/season/get_redeemable_season_list', {
        isGoLang: true,
        adapter: (res) => {
            return res.seasons.map(info => {
                return {
                    id: info.id,
                    isBate: info.isBeta,
                    name: info.isBeta ? `S${info.name}` : info.name,
                    banner: info.banner,
                    bannerMobileDark: info.bannerMobileDark,
                    bannerMobileLight: info.bannerMobileLight,
                    bannerPcDark: info.bannerPcDark,
                    bannerPcLight: info.bannerPcLight,
                    startDate: Number(info.startDateUnix) ? dayjs(Number(info.startDateUnix)) : undefined,
                    endDate: Number(info.endDateUnix) ? dayjs(Number(info.endDateUnix)) : undefined,
                    claimableStart: Number(info.redeemableStartDateUnix)
                        ? dayjs(Number(info.redeemableStartDateUnix))
                        : undefined,
                    claimableEnd: Number(info.redeemableEndDateUnix) ? dayjs(Number(info.redeemableEndDateUnix)) : undefined,
                    silentPeriodEnd: Number(info.silentPeriodEndUnix) ? dayjs(Number(info.silentPeriodEndUnix)) : undefined,
                    status: info.status,
                    text: info.statusText
                };
            });
        }
    });
}
export function getLastSeasonInfo() {
    return APIFetch.post('/v2/season/task/get_last_season_task_info', {
        isGoLang: true,
        adapter: (res) => {
            return (res.unclaimedPoints || []).map(({ point, pointText, pointType }) => ({
                point,
                text: pointText,
                type: pointType
            }));
        }
    });
}
export function claimAllLastSeasonPoints() {
    return APIFetch.post('/v1/season/task/claim_all_last_season_points', {
        isGoLang: true,
        withMyShellSecurityToken: true
    });
}
export function createMediaShareRecord(postLink, shareLink) {
    return APIFetch.post('/v1/season/task/create_media_share_record', {
        isGoLang: true,
        hideErrorToast: true,
        body: { postLink, shareLink }
    });
}
export function getMediaShareReocrd() {
    return APIFetch.post('/v1/season/task/list_media_share_record', {
        isGoLang: true,
        adapter: resp => resp.records
    });
}
export function cancelVerifyMediaShareRecord(recordId) {
    return APIFetch.post('/v1/season/task/cancel_verify_media_share_record', {
        isGoLang: true,
        body: {
            recordId
        }
    });
}
export function claimTaskByRecordId(taskRecordId) {
    return APIFetch.post('/v1/season/task/claim_task_by_record_id', {
        isGoLang: true,
        body: {
            taskRecordId
        }
    });
}
