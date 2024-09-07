import { TagInfo } from '../../../src/common/constants/interfaces/bot.js';
import { BondingCurveStatus, CancelInteractCommentRequest, CheckRuggedResponse, CreateCommentRequest, CreateCommentResponse, CreateReplyRequest, CreateReplyResponse, DeleteCommentRequest, GetCurvePriceHistoryRequestParams, GetCurvePriceHistoryResponse, GetHoldersRequestParam, GetHoldersResponse, GetLaunchInfoResponse, GetMyCollectionsResponse, GetRankingReponse, GetRankingRequestParams, GetTradeOrdersResponse, InteractCommentRequest, LaunchPadActivityDetail, ListCommentsRequest, ListCommentsResponse, ListRepliesRequest, ListRepliesResponse, SearchCurveWithBotNameParams, SearchCurveWithBotNameResponse } from './apiTypes';
export declare function get_my_collection(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<GetMyCollectionsResponse>>;
export declare function get_holders(data: GetHoldersRequestParam): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<GetHoldersResponse>>;
export declare function get_trade_orders(data: GetHoldersRequestParam): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<GetTradeOrdersResponse>>;
export declare function get_ranking(data: GetRankingRequestParams): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<GetRankingReponse>>;
export declare function searchCurveByBotName(data: SearchCurveWithBotNameParams): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<SearchCurveWithBotNameResponse>>;
export declare function getRecommended(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<unknown>>;
export declare function get_buy_signature({ curveId, amount }: {
    curveId: string;
    amount: number;
}): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<{
    signature: string;
    chainId: number;
    amount: number;
    buyer: `0x${string}`;
    validTill: number;
}>>;
export declare function get_create_curve_signature({ name, symbol }: {
    name: string;
    symbol: string;
}): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<{
    signature: string;
    chainId: number;
    name: string;
    symbol: string;
    creator: `0x${string}`;
    validTill: number;
}>>;
export declare function get_curve({ botId }: {
    botId: string;
}): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<import("./apiTypes").ICurve>>;
export declare function get_created_curve_status(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<{
    stats: Array<{
        status: BondingCurveStatus;
        count: number;
    }>;
}>>;
export declare function get_bnb_price(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<{
    price: string;
}>>;
export declare function get_curve_price_history(data: GetCurvePriceHistoryRequestParams): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<GetCurvePriceHistoryResponse>>;
export declare function check_if_hold_rugged_pump(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<CheckRuggedResponse>>;
export declare function get_nft_info(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<{
    creatorPassCount: number;
    mySoulCount: number;
}>>;
export declare function set_end_creator_priority(curveId: string): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<unknown>>;
export declare function getLaunchInfo(includePrivateBots?: boolean): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<GetLaunchInfoResponse>>;
export declare function getCurveBySymbol(symbol: string): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<import("./apiTypes").ICurve>>;
export declare function listLaunchPadActivities(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<{
    activities: LaunchPadActivityDetail[];
}>>;
export declare function createLaunchPadSubmission(activityId: string, botId: string): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<unknown>>;
export declare function listCurveComments(data: ListCommentsRequest): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<ListCommentsResponse>>;
export declare function createCurveComment(data: CreateCommentRequest): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<CreateCommentResponse>>;
export declare function replyToCurveComment(data: CreateReplyRequest): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<CreateReplyResponse>>;
export declare function createCommentInteraction(data: InteractCommentRequest): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<unknown>>;
export declare function cancelCommentInteraction(data: CancelInteractCommentRequest): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<unknown>>;
export declare function listReplies(data: ListRepliesRequest): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<ListRepliesResponse>>;
export declare function deleteComment(data: DeleteCommentRequest): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<unknown>>;
export declare function listCurveTags(tagType: 'BOT_TAG_TYPE_SEARCH' | 'BOT_TAG_TYPE_EDIT', showNsfw?: boolean): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<TagInfo[]>>;
