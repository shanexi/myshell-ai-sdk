import { Observable } from 'rxjs';
import { KnowledgeBaseInfo } from '../../../src/common/constants/interfaces/bot.js';
export declare function getKnowledgeBaseList(botId: string): Observable<KnowledgeBaseInfo[]>;
export declare function importKnowledgeBaseByUrl(botId: string, sourceUrl: string): Observable<KnowledgeBaseInfo>;
export declare function refreshKnowledgeBaseStatus(botId: string, sourceUid: string): Observable<string>;
export declare function deleteKnowledgeBaseSource(botId: string, sourceUid: string): Observable<string>;
