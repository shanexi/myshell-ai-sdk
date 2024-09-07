type useChatHistory = [list: chatMsg[], append: (item: chatMsg) => void, clear: () => void];
export type chatMsg = {
    role: 'human' | 'bot';
    content: string;
};
export declare function useChatHistory(initialArray?: chatMsg[]): useChatHistory;
export {};
