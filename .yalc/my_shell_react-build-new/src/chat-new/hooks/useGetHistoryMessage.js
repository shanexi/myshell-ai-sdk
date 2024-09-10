import { useRef } from 'react';
import { useToggle } from 'react-use';
import { getBotMessage, getRoomMessage, getWidgetMessage } from '../../apis/new-chat.js';
import { serverMessageParser } from '../util.js';
export default function useGetHistoryMessage(type, id, addMessage) {
    const nextPageToken = useRef();
    const pageSize = 33;
    const hasMore = useRef(true);
    const [getting, setGetting] = useToggle(false);
    const getApiFn = () => {
        let apiFn;
        switch (type) {
            case 'room':
                apiFn = getRoomMessage;
                break;
            case 'bot':
            case 'toolbox':
            case 'ugc':
                apiFn = getBotMessage;
                break;
            case 'widget':
                apiFn = getWidgetMessage;
                break;
            default:
                apiFn = getBotMessage;
        }
        return apiFn;
    };
    const getHistoryMessage = async () => {
        try {
            setGetting(true);
            const { success, data } = await getApiFn()(id, pageSize, nextPageToken.current);
            if (success) {
                hasMore.current = data.listResponse.hasMore;
                nextPageToken.current = data.listResponse.nextPageToken;
                const { messageList } = data;
                addMessage(messageList.map(message => serverMessageParser(message, type)));
                return messageList;
            }
            throw new Error();
        }
        catch (e) {
            console.error(e);
            return [];
        }
        finally {
            setGetting(false);
        }
    };
    return {
        gettingHistory: getting,
        hasMore: hasMore.current,
        getHistoryMessage
    };
}
