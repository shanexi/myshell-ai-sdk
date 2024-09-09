import type { Observable } from 'rxjs';
import { TelegramUser } from '../../../src/common/components/auth/third-party/telegram/Telegram';
import { PointTypeEnum } from '../../../src/common/constants/enums/task';
import { BindType } from '../../../src/common/constants/enums/user';
import { BotInfo } from '../../../src/common/constants/interfaces/bot';
import { ListResponse } from '../../../src/common/constants/interfaces/common';
import { GolangPropItemInfo, Order, Point } from '../../../src/common/constants/interfaces/task';
import { EnergyInfo, ShellPointRecord, User, UserConnectedAccounts, UserSettings, Wallet } from '../../../src/common/constants/interfaces/user';
import { WidgetInfo } from '../../../src/common/constants/interfaces/workshop';
import { ResponseType } from '../../../src/core/request/APIFetch';
export declare function getUserProfile(props?: {
    userId?: string;
    name?: string;
    nameTag?: string;
}): Promise<ResponseType<User>>;
export declare function updateUserProfile(props?: {
    name?: string;
    avatar?: string;
    background?: string;
    description?: string;
}): Promise<ResponseType<unknown>>;
export declare function checkInvitationCode(code: string): Observable<unknown>;
export declare function getUserEnergyInfo(userId?: string): Promise<ResponseType<EnergyInfo>>;
export declare function updateUserName(name: string | undefined): Observable<void>;
export declare function isUserNameAvailable(name: string): Observable<boolean>;
export declare function uploadAvatar(file: File): Observable<unknown>;
export declare function connectToTelegram(tgData: TelegramUser): Observable<null>;
export declare function bindTelegram(tgGuid: string): Observable<boolean>;
export declare function connectToDiscord(code: string, state: string, source?: string): Observable<null>;
export declare function connectToTwitter(code: string, state: string, source?: string): Observable<null>;
export declare function getUserConnectedAccounts(): Observable<UserConnectedAccounts>;
export declare function updateLanguage(language: string): Observable<boolean>;
export declare function updateUserSetting(data: UserSettings): Observable<unknown>;
export declare function kolUseInviteCode(code: string): Observable<unknown>;
export declare function getShellCoins(): Promise<ResponseType<{
    id: string;
    userId: string;
    balance: string;
    frozenBalance: string;
}>>;
export declare function claimAndUseSeasonPass(): Promise<ResponseType<GolangPropItemInfo>>;
export declare function getPointRecords(pageToken: string, pageSize: number, seasonId: string, pointType: PointTypeEnum): Promise<ResponseType<{
    listResponse: ListResponse;
    records: ShellPointRecord[];
}>>;
export declare function getCoinRecords(pageToken: string, pageSize: number): Promise<ResponseType<{
    listResponse: ListResponse;
    accountOrders: Order[];
}>>;
export declare function tryVerifyYidunCaptcha(sign: string): Promise<ResponseType<boolean>>;
export declare function setUserFollow(targetUserId: string, followed: boolean): Promise<ResponseType<any>>;
export declare function checkUserNameAvailable(name: string): Promise<ResponseType<any>>;
export declare function getWidgetsByUser(userId: string): Promise<ResponseType<{
    widgets: WidgetInfo[];
}>>;
export declare function getBotsByUser(userId: string): Promise<ResponseType<BotInfo[]>>;
export declare function getUserBotUsageInfo(): Promise<ResponseType<any>>;
export declare function getInvitation(): Promise<ResponseType<any>>;
export declare function getWalletList(): Promise<ResponseType<Wallet[]>>;
export declare function checkBindPrivyEmail(): Promise<ResponseType<{
    Need: boolean;
}>>;
export declare function bindRemove(bindType: BindType): Promise<ResponseType<unknown>>;
export declare function updateUserSettings(data: UserSettings | UserSettings[]): Promise<ResponseType<unknown>>;
export declare function getUserSettings(): Promise<ResponseType<UserSettings[]>>;
export declare function registerFCMUserDevice(token: string): Promise<ResponseType<unknown>>;
export declare function fetchUserPoints(): Promise<ResponseType<Point[][]>>;
export declare function getExperimentInfo(): Promise<ResponseType<any>>;
export declare function userLogout(): Promise<ResponseType<void>>;
