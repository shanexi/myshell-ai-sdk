import { KolInfo } from '../../../src/common/constants/interfaces/bot.js';
export declare function getKolInfo(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<KolInfo>>;
export declare function addKolVote(championshipId: string, botId: string, point: number): Promise<any>;
export declare function getKolLatestVotingInfo(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<any>>;
export declare function recordUserFromPromotion(userId: string): Promise<any>;
