import { createContext } from 'react';
const ChatStaticContext = createContext({
    entityType: 'bot',
    id: ''
});
export default ChatStaticContext;
