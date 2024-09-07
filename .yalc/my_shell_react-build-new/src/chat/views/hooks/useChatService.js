"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useChatService;
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const chatService_1 = require("../../../chat/model/chatService.js");
const enums_1 = require("../../../chat/model/enums.js");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const store_1 = require("../../../services/store/index.js");
function useChatService() {
    const pushChatRecord = (0, store_1.useChatStore)(state => state.pushChatRecord);
    const pushAudioIdToQueue = (0, store_1.useChatStore)(state => state.pushAudioIdToQueue);
    const replaceStreamWithNormalMessage = (0, store_1.useChatStore)(state => state.replaceStreamWithNormalMessage);
    const sentMsgIdList = (0, store_1.useChatStore)(state => state.sentMsgIdList);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const setBotLastMessage = (0, store_1.useBotStore)(state => state.setBotLastMessage);
    const selectedBotId = (0, navigation_1.useParams)()?.botId;
    const botChatSettingMap = (0, store_1.useBotStore)(state => state.botChatSettingMap);
    const botChatSetting = (0, react_1.useMemo)(() => {
        return botChatSettingMap.get(selectedBotId) ?? store_1.defaultChatSetting;
    }, [botChatSettingMap, selectedBotId]);
    (0, react_1.useEffect)(() => {
        const timer = setInterval(() => {
            replaceStreamWithNormalMessage(selectedBotId);
        }, 3000);
        return () => {
            clearInterval(timer);
        };
    }, [replaceStreamWithNormalMessage, selectedBotId]);
    (0, react_1.useEffect)(() => {
        replaceStreamWithNormalMessage(selectedBotId);
        return () => {
            replaceStreamWithNormalMessage(selectedBotId, true);
        };
    }, [replaceStreamWithNormalMessage, selectedBotId]);
    (0, react_1.useEffect)(() => {
        const destroy$ = new rxjs_1.Subject();
        chatService_1.chatService.connect();
        chatService_1.chatService.messageResponse$.pipe((0, rxjs_1.takeUntil)(destroy$)).subscribe(msg => {
            if (msg.eventName === interfaces_1.MsgEvents.MSG_REPLIED) {
                const m = msg.data;
                pushChatRecord(m);
                setBotLastMessage(String(m.botId), m);
                if (botChatSetting?.isAudioPlayOn) {
                    if (m.voiceUrl) {
                        if ((0, common_helper_1.isIos)()) {
                            pushAudioIdToQueue(m.id);
                        }
                        else if (sentMsgIdList.includes(m.replyUid)) {
                            pushAudioIdToQueue(m.id);
                        }
                    }
                }
            }
            else if (msg.eventName === interfaces_1.MsgEvents.MSG_SENT) {
                const m = { ...msg.data, status: enums_1.MessageStatusEnum.DONE };
                pushChatRecord(m);
                setBotLastMessage(String(m.botId), m);
            }
            else if (msg.eventName === interfaces_1.MsgEvents.VOICE_CALL_END) {
                const m = msg.data;
                pushChatRecord(m);
            }
            else if (msg.eventName === interfaces_1.MsgEvents.CHAT_LOGIN_POPUP) {
                setLoginPopVisible(true);
                identityService_1.identityService.setLoginPopup('1');
            }
        });
        return () => {
            destroy$.next();
            destroy$.complete();
        };
    }, []);
}
