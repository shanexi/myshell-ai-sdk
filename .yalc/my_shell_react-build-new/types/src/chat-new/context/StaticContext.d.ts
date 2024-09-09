import { ReactElement } from 'react';
import { ChatModuleType } from '../../../../src/chat/ChatStaticContext';
import { EnergyInfo } from '../../../../src/common/constants/interfaces/user';
import { ListActionMode } from '../../../../src/services/store/entity';
import { ChatSetting, MenuFunctionEnum } from '../model/definitions';
export type GetListFn<T> = (type?: ListActionMode) => Promise<T[]>;
export type PartialDetail = {
    pinned?: boolean;
};
export type EntityInfo = {
    id: string;
    name?: string;
    logoUrl?: string;
    energyPerChat?: number;
    pinned?: boolean;
};
export type EntitySetting = {
    outputVoice?: boolean;
};
export type EntityActions = {
    getList: GetListFn<unknown>;
    updateChatSetting?: (setting: ChatSetting) => void;
    partialUpdateDetail?: (partialDetail: PartialDetail) => void;
};
export type StaticContextProps = {
    type: ChatModuleType;
    entityInfo: EntityInfo;
    entitySetting?: EntitySetting;
    readonly?: boolean;
    interactionDisabled?: boolean;
    disabledReason?: string;
    visitorInteroperable?: boolean;
    showInteractionCostEnergy?: boolean;
    chatSettingDisabled: boolean;
    chatSettingLoading?: boolean;
    chatSetting?: ChatSetting;
    menuDisabled?: boolean;
    menuFunctions: Array<{
        menuFunction: MenuFunctionEnum;
        disabled?: boolean;
    }>;
    customMenuFunction?: ReactElement[];
    setEnergyInfo?: (energyInfo: EnergyInfo) => void;
} & EntityActions;
export declare const StaticContext: import("react").Context<StaticContextProps>;
