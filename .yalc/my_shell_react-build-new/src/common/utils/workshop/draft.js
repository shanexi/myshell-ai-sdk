"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBotSettingsDraft = exports.saveBotSettingsDraft = exports.loadBotSettingsDraft = exports.hasBotSettingsDraft = void 0;
const lodash_es_1 = require("lodash-es");
const tryDo_1 = require("../../../common/utils/tryDo.js");
const getStorageKey = (botId) => `$$bot_settings_draft$$_${botId}`;
const hasBotSettingsDraft = (botId) => {
    if (!botId || botId === '0') {
        return false;
    }
    const storageKey = getStorageKey(botId);
    const clear = () => {
        try {
            localStorage.removeItem(storageKey);
        }
        catch (e) {
        }
    };
    const strValue = (0, tryDo_1.tryDo)(() => localStorage.getItem(storageKey));
    if (!strValue) {
        clear();
        return false;
    }
    const data = (0, tryDo_1.tryDo)(() => JSON.parse(strValue));
    if (!data) {
        clear();
        return false;
    }
    return true;
};
exports.hasBotSettingsDraft = hasBotSettingsDraft;
const loadBotSettingsDraft = (botInfo) => {
    if (!botInfo) {
        return null;
    }
    const { botId } = botInfo;
    if (!botId || botId === '0') {
        return null;
    }
    const storageKey = getStorageKey(botId);
    const clear = () => {
        try {
            localStorage.removeItem(storageKey);
        }
        catch (e) {
        }
    };
    const strValue = (0, tryDo_1.tryDo)(() => localStorage.getItem(storageKey));
    if (!strValue) {
        clear();
        return null;
    }
    const data = (0, tryDo_1.tryDo)(() => JSON.parse(strValue));
    if (!data) {
        clear();
        return null;
    }
    const snapshot = data[0];
    const draft = data[1];
    if (!snapshot || !draft) {
        clear();
        return null;
    }
    if (!(0, lodash_es_1.isEqual)(snapshot, botInfo)) {
        clear();
        return null;
    }
    return draft;
};
exports.loadBotSettingsDraft = loadBotSettingsDraft;
const saveBotSettingsDraft = (botInfo, draft) => {
    if (!botInfo || !draft) {
        return false;
    }
    const { botId } = botInfo;
    if (!botId || botId === '0') {
        return false;
    }
    const storageKey = getStorageKey(botId);
    try {
        if ((0, lodash_es_1.isEqual)(botInfo, draft)) {
            localStorage.removeItem(storageKey);
            return false;
        }
        const value = [botInfo, draft];
        const strValue = JSON.stringify(value);
        localStorage.setItem(storageKey, strValue);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.saveBotSettingsDraft = saveBotSettingsDraft;
const removeBotSettingsDraft = (botId) => {
    const storageKey = getStorageKey(botId);
    try {
        localStorage.removeItem(storageKey);
    }
    catch (e) {
    }
};
exports.removeBotSettingsDraft = removeBotSettingsDraft;
