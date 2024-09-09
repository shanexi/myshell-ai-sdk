import { enableMapSet } from 'immer';
import { create } from 'zustand';
import computed from 'zustand-computed';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AudioSpeedValue2KeyMap, ChatSettingSpeakingLangEnum } from '../../chat/model/interfaces.js';
export const defaultChatSetting = {
    isAutopushOn: true,
    isAudioOn: false,
    isAudioPlayOn: false,
    isTranscriptionOn: true,
    isTranslationOn: true,
    speakingLanguage: ChatSettingSpeakingLangEnum.AUTO,
    audioSpeed: AudioSpeedValue2KeyMap[1]
};
enableMapSet();
const DEFAULT_STATE = {
    updatingBotList: false,
    botList: [],
    botLastMessageMap: new Map(),
    selectedBotList: [],
    tagList: [],
    ugcBotList: [],
    ownUgcBotList: [],
    selectedUgcBotId: '',
    activeType: 'all',
    name: '',
    pageToken: '0',
    dataPush: false,
    filters: null,
    checkedFiltersSet: new Set(),
    isFromLandingPage: false,
    kolInfo: null,
    recommend: { banners: [], list: [] },
    tagFilters: [],
    searchList: [],
    botChatSettingMap: new Map(),
    homeData: null,
    includeTagIds: []
};
const initIsFromLandingPage = () => {
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const apkpure_vid = searchParams.get('apkpure_vid');
        return !!apkpure_vid;
    }
    return false;
};
const createBotSlice = set => {
    return {
        ...DEFAULT_STATE,
        isFromLandingPage: initIsFromLandingPage(),
        setUpdatingBotList(val) {
            set({ updatingBotList: val }, false, 'setUpdatingBotList');
        },
        setBotList(bots) {
            set({ botList: bots }, false, 'setBotList');
        },
        setOwnUgcBotList(bots) {
            set({ ownUgcBotList: bots }, false, 'setOwnUgcBotList');
        },
        setSelectedUgcBotId(botId) {
            set({ selectedUgcBotId: botId }, false, 'setSelectedUgcBotId');
            if (botId) {
                localStorage.setItem('selected_ugc_bot_id', botId);
            }
            else {
                localStorage.removeItem('selected_ugc_bot_id');
            }
        },
        batchSetBotLastMessage(botList) {
            set(state => {
                for (const bot of botList) {
                    if (bot.lastMessage) {
                        const msg = { ...bot.lastMessage, createdDate: new Date(bot.lastMessage.createdDate).getTime() };
                        state.botLastMessageMap.set(String(bot.id), msg);
                    }
                }
            });
        },
        setBotLastMessage(botId, lastMessage) {
            set(state => {
                if (lastMessage) {
                    const msg = {
                        ...lastMessage,
                        createdDate: new Date(lastMessage.createdDate || Number(lastMessage.createdDateUnix)).getTime()
                    };
                    state.botLastMessageMap.set(botId, msg);
                    const bot = state.botList.find(bot => bot.id === botId);
                    if (bot) {
                        const filterBotList = state.botList.filter(bot => bot.id !== botId);
                        if (bot.pinned) {
                            state.botList = [bot, ...filterBotList];
                        }
                        else {
                            const pinnedBots = filterBotList.filter(bot => bot.pinned);
                            const unpinnedBots = filterBotList.filter(bot => !bot.pinned);
                            state.botList = [...pinnedBots, bot, ...unpinnedBots];
                        }
                    }
                }
                else {
                    state.botLastMessageMap.delete(botId);
                }
            }, false, 'setBotLastMessage');
        },
        reset() {
            set(DEFAULT_STATE, false, 'reset');
        },
        setKolInfo(info) {
            set({ kolInfo: info }, false, 'setKolInfo');
        },
        setRecommend(recommend) {
            set({ recommend }, false, 'setRecommend');
        },
        setTagFilters(tagFilters) {
            set({ tagFilters }, false, 'setTagFilters');
        },
        setSearchList(searchList) {
            set({ searchList }, false, 'setSearchList');
        },
        setHomeData(homeData) {
            set({ homeData }, false, 'setHomeData');
        },
        setPageToken(pageToken) {
            set({ pageToken }, false, 'setPageToken');
        },
        setDataPush(dataPush) {
            set({ dataPush }, false, 'setDataPush');
        },
        setActiveType(val) {
            set({ activeType: val }, false, 'setActiveType');
        },
        setBotChatSetting(botId, chatSetting) {
            set(state => {
                state.botChatSettingMap.set(botId, chatSetting);
            }, false, 'setBotChatSetting');
        },
        clearBotChatSetting() {
            set(state => {
                state.botChatSettingMap.clear();
            }, false, 'clearBotChatSetting');
        },
        updateBotEnergyPerChat(botId, energyPerChat, energyPerLevelByPass) {
            set(state => {
                const matchedBot = state.botList.find(bot => bot.id == botId);
                if (matchedBot?.energyPerChat) {
                    matchedBot.energyPerChat = energyPerChat;
                }
                if (matchedBot?.llmModel) {
                    matchedBot.llmModel.energyPerLevelByPass = energyPerLevelByPass;
                }
            }, false, 'updateBotEnergyPerChat');
        },
        setSSECtrl(sseCtrl) {
            set({ sseCtrl }, false, 'setSSECtrl');
        }
    };
};
const computeState = (state) => ({
    sumUnReadMessageCount: state.botList.reduce((accumulator, current) => {
        return accumulator + current.unreadMessageCount;
    }, 0)
});
export const useBotStore = create()(computed(immer(devtools(createBotSlice, { store: 'bot' })), computeState));
