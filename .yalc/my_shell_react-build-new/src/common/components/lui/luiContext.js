import { createContext } from 'react';
export const LUIButtonInteractionContext = createContext({
    clickFn: async () => { },
    msgId: ''
});
