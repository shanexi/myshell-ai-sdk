export type ChatModuleType = 'bot' | 'room' | 'widget' | 'ugc' | 'toolbox' | 'curve' | 'gallery';
export type ChatStaticContextParams = {
    entityType: ChatModuleType;
    id: string;
    name?: string;
    logoUrl?: string;
};
declare const ChatStaticContext: import("react").Context<ChatStaticContextParams>;
export default ChatStaticContext;
