import { Observable } from 'rxjs';
import { BotRankingData, PopularityRankData } from '../../../src/common/constants/interfaces/statistics.js';
import { ResponseType } from '../../../src/core/request/APIFetch.js';
export declare function getBotsCurrentRanking(): Observable<BotRankingData[]>;
export declare function getBotsRankingHistory(): Observable<PopularityRankData[]>;
export declare function getInvitationStatistics(): Promise<ResponseType<any>>;
