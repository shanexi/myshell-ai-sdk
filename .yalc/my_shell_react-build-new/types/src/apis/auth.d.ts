import type { Observable } from 'rxjs';
import { VoiceChatAzureToken } from '../../../src/chat/model/interfaces.js';
import { ParticleLoginRequestParam, PrivyLoginRequestParam, PrivyLoginResponse, VerifySignatureRequestParam } from './apiTypes';
export declare function generateNonce(address: string): Observable<{
    nonce: string;
}>;
export declare function verifySignature(publicAddress: string, signature: string, visitorId: string, invitationCode?: string, botSharingCode?: string, inviteLink?: string, tgGuid?: string, sharingWidgetCode?: string, sharingArticleCode?: string, sharingForumCode?: string, sharingRoomCode?: string, sharingBabelBotCode?: string): Observable<{
    expiration: number;
    token: string;
    userId: number;
    userUid: string;
    isNewUser: boolean;
    hasReceivedReward: boolean;
    sharingWidgetCode: string;
    sharingArticleCode: string;
    sharingForumCode: string;
    sharingRoomCode: string;
    sharingBabelBotCode: string;
}>;
export declare function particleLogin(uuid: string, token: string, visitorId: string, invitationCode?: string, botSharingCode?: string, inviteLink?: string, tgGuid?: string, sharingWidgetCode?: string, sharingArticleCode?: string, sharingForumCode?: string, sharingRoomCode?: string, sharingBabelBotCode?: string): Observable<{
    expiration: number;
    token: string;
    userId: number;
    userUid: string;
    isNewUser: boolean;
    hasReceivedReward: boolean;
    sharingWidgetCode: string;
    sharingArticleCode: string;
    sharingForumCode: string;
    sharingRoomCode: string;
    sharingBabelBotCode: string;
}>;
export declare function getAzureToken(): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<VoiceChatAzureToken>>;
export declare function authLogin(data: {
    bind_target_code: string;
    verify_code: string;
    bind_type: string;
}): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<VoiceChatAzureToken>>;
export declare function generate_nonce(address: string): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<{
    nonce: string;
}>>;
export declare function verify_signature({ publicAddress, signature, visitorId, invitationCode, botSharingCode, inviteLink, tgGuid, sharingWidgetCode, sharingArticleCode, sharingForumCode, sharingRoomCode, sharingBabelBotCode }: VerifySignatureRequestParam): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<{
    expiration: number;
    token: string;
    userId: number;
    userUid: string;
    isNewUser: boolean;
    hasReceivedReward: boolean;
    sharingWidgetCode: string;
    sharingArticleCode: string;
    sharingForumCode: string;
}>>;
export declare function privy_login({ token, visitorId, invitationCode, botSharingCode, inviteLink, tgGuid, sharingWidgetCode, sharingArticleCode, sharingForumCode, sharingRoomCode, sharingBabelBotCode }: PrivyLoginRequestParam): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<PrivyLoginResponse>>;
export declare function particle_login({ uuid, token, visitorId, invitationCode, botSharingCode, inviteLink, tgGuid, sharingWidgetCode, sharingArticleCode, sharingForumCode, sharingRoomCode, sharingBabelBotCode }: ParticleLoginRequestParam): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<PrivyLoginResponse>>;
export declare function bind_privy_email({ token }: {
    token: string;
}): Promise<import("../../../src/core/request/APIFetch.js").ResponseType<unknown>>;
