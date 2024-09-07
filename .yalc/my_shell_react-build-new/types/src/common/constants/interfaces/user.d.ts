import { PointTypeEnum } from '../enums/task';
import { FollowStatus, LoginType, UserMembershipTypeEnum, UserSourceEnum } from '../enums/user';
export interface EnergyInfo {
    energy: number;
    dailyEnergy?: number;
    userId?: string;
}
export interface UserConnectedAccounts {
    telegram?: UserTelegramDto;
    discord?: UserDiscordDto;
    twitter?: UserTwitterDto;
}
export interface UserTelegramDto {
    id: number;
    userId: number;
    tgId: number;
    firstName: string;
    lastName: string;
    username: string;
    photoUrl: string;
    connectedUserId: number;
    currentBotId: number;
    createdDate: string;
}
export interface UserDiscordDto {
    id: number;
    username: string;
}
export interface UserTwitterDto {
    id: number;
    username: string;
}
export interface User {
    avatar?: string;
    email?: string;
    id: string;
    isGenesisPasscard: boolean;
    isNftAvatar: boolean;
    isPasscard: boolean;
    level: number;
    name: string;
    nameTag: string;
    publicAddress: string;
    source?: UserSourceEnum;
    hasParticleAccount?: boolean;
    createdDate?: string;
    createdTime?: string;
    premiumInfo: PremiumInfo;
    privateBotLimit: number;
    publicBotLimit: number;
    canPublishNewBot?: boolean;
    hasFollowed: boolean;
    followedCount: string;
    fansCount: string;
    followStatus: FollowStatus;
    description: string;
    backgroundUrl: string;
    loginCredential: string;
    loginType: LoginType;
    connectInfo: {
        discord: {
            id: string;
            userId: string;
            connectUserId: string;
            userName: string;
            createdDateUnix: number;
        };
        twitter: {
            id: string;
            userId: string;
            connectUserId: string;
            userName: string;
            createdDateUnix: number;
        };
        telegram: {
            id: string;
            userId: string;
            tgId: string;
            firstName: string;
            lastName: string;
            username: string;
            photoUrl: string;
            connectUserId: string;
            currentBotId: string;
            createdDateUnix: number;
        };
    };
    publicKey: string;
    isKol: boolean;
    rugged?: boolean;
}
export interface PremiumInfo {
    level: number;
    totalExp: number;
    nextLevelNeedExp: number;
    currentLevelExp: number;
}
export declare enum BondingCurveCreatorStatus {
    UNSPECIFIED = "BONDING_CURVE_CREATOR_STATUS_UNSPECIFIED",
    RUGGED = "BONDING_CURVE_CREATOR_STATUS_RUGGED",
    NORMAL = "BONDING_CURVE_CREATOR_STATUS_NORMAL"
}
export interface GolangUser {
    userDetail: {
        loginCredential: string;
        loginType: LoginType;
        summary: {
            id: string;
            name: string;
            email: string;
            nameTag: string;
            avatar?: string;
            publicAddress: string;
            userCreatedAt?: number;
            isNftAvatar: boolean;
            hasFollowed: boolean;
            followedCount: string;
            fansCount: string;
            followStatus: FollowStatus;
            description: string;
            backgroundUrl: string;
            userSource?: UserSourceEnum;
            membershipInfo: {
                type: UserMembershipTypeEnum;
                premiumInfo: PremiumInfo;
                privateBotLimit: number;
                publicBotLimit: number;
            };
            currentSeasonInfo: {
                seasonId: string;
                point: number;
            };
            lastSeasonInfo: {
                seasonId: string;
                point: number;
            };
        };
        invitationInfo: {
            id: string;
            userId: string;
            code: string;
            hasInvitedUserCount: number;
            hasInvitedValidUserCount: number;
            hasInvitedTgUserCount: number;
            hasInvitedValidTgUserCount: number;
            inviteLink: string;
            level: number;
        };
        connectInfo: {
            discord: {
                id: string;
                userId: string;
                connectUserId: string;
                userName: string;
                createdDateUnix: number;
            };
            twitter: {
                id: string;
                userId: string;
                connectUserId: string;
                userName: string;
                createdDateUnix: number;
            };
            telegram: {
                id: string;
                userId: string;
                tgId: string;
                firstName: string;
                lastName: string;
                username: string;
                photoUrl: string;
                connectUserId: string;
                currentBotId: string;
                createdDateUnix: number;
            };
        };
        canPublishNewBot: boolean;
        hasParticleAccount?: boolean;
        publicKey: string;
        isKol: boolean;
        bondingCurveCreatorStatus: BondingCurveCreatorStatus;
    };
}
export interface UserSettings {
    name: string;
    value: string;
}
export interface ShellPointRecord {
    id: string;
    userId: string;
    seasonId: string;
    point: number;
    balanceAfter: number;
    sourceType: string;
    sourceDesc: string;
    createdDateUnix: number;
    balanceAfterText: string;
    pointText: string;
    pointType: PointTypeEnum;
}
export interface NFT {
    name: string;
    image: string;
    tokenId: string;
    link: string;
    video: string;
    contractAddress: string;
}
export interface Wallet {
    name: string;
    image: string;
    publicAddress: string;
    nftItems: NFT[];
}
export interface WalletAsset {
    label: string;
    key: string;
    chain: string;
    balance: bigint | undefined;
    formatBalance: string;
    logo: JSX.Element;
    largeLogo?: JSX.Element;
    tokenId?: bigint;
    contractAddress?: string;
}
