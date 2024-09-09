export function serverListItemParser(item) {
    if (item.room) {
        return {
            type: 'room',
            id: item.room.roomId,
            name: item.room.name,
            unreadMessageCount: item.room.unreadMessageCount,
            lastMessage: item.room.lastMessage,
            logoUrls: item.room.logoUrls
        };
    }
    return {
        type: 'bot',
        id: item.bot.botId,
        name: item.bot.name,
        unreadMessageCount: item.bot.unreadMessageCount,
        lastMessage: item.bot.lastMessage,
        logoUrl: item.bot.logoUrl,
        isOfficial: item.bot.isOfficial,
        visitorCanChat: item.bot.visitorCanChat,
        pinned: item.bot.pinned
    };
}
export function widgetListParser(widget) {
    return {
        type: 'widget',
        id: widget.id,
        name: widget.name,
        visitorCanChat: widget.visitorCanChat,
        pinned: widget.pinned
    };
}
