// Parse HAR data to extract WebSocket messages
export function extractChatMessagesFromHAR(): any[] {
  try {
    // const harPath = path.join(__dirname, 'HAR.json');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const harContent = require('./HAR.json');

    const chatMessages: any[] = [];

    // Process all entries
    harContent.log.entries.forEach((entry: any) => {
      if (entry._webSocketMessages) {
        entry._webSocketMessages.forEach((wsMessage: any) => {
          // Only process 'receive' messages
          // if (wsMessage.type === 'receive') {
          // Parse Socket.IO message format: "42[\"event\", {...}]"
          const match = wsMessage.data.match(/^\d+\["event",(.+)\]$/);
          if (match) {
            try {
              const parsedMessage = JSON.parse(match[1]);
              if (
                parsedMessage &&
                parsedMessage.type &&
                parsedMessage.type.startsWith('chat_')
              ) {
                // if (
                //   wsMessage.time >= 1751347667.2225049 &&
                //   // wsMessage.time >= 1751358424.5088673 &&
                //   wsMessage.time <= 1751358426.1575692
                // ) {
                chatMessages.push({
                  ...parsedMessage,
                  time: wsMessage.time,
                });
                // }
                // }
                // if (
                //   parsedMessage.headers.trace_context['x-b3-spanid'] ===
                //   'f128752fff6cec1f'
                // ) {
                // console.log(parsedMessage);
                // chatMessages.push(parsedMessage);
                // }
                // console.log(parsedMessage)
                // if (parsedMessage.id > 42 && parsedMessage.id < 50) {
                // chatMessages.push(parsedMessage);
                // }
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
          // }
        });
      }
    });

    // // Sort messages by timestamp or message_id
    // chatMessages.sort((a, b) => {
    //   if (a.timestamp && b.timestamp) {
    //     return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    //   }
    //   return (a.message_id || 0) - (b.message_id || 0);
    // });

    return chatMessages;
  } catch (error) {
    console.warn('Failed to extract HAR messages:', error);
    return [];
  }
}
