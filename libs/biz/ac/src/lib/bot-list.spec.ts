import { botList } from './bot-list';

describe('botList', () => {
  it('should work', () => {
    expect(botList()).toMatchInlineSnapshot(`"botList"`);
  });

  it('map legacy bot list', () => {
    const bot = {
      bot: {
        botId: '1727435579',
        name: 'ThumbMaker',
        logoUrl:
          'https://www.myshellstatic.com/cdn-cgi/image/quality=40,format=webp/image/bot/logo/20079665/202409271036/5-cropped-image.png',
        isOfficial: false,
        visitorCanChat: true,
        pinned: true,
        unreadMessageCount: 0,
        lastMessage: {
          createdDateUnix: '1738919625000',
          text: "Welcome to ThumbMaker! — Great thumbnails, lots of thumbs up\n---\n\n<blockquote> \n<b>Default ratio size is Classic.</b>\n\n- Classic(16:9): the classic YouTube thumbnail ratio<br>\n- Shorts(9:16): the short video thumbnail ratio<br>\n- Banner(5:2): the homepage banner ratio\n</blockquote> \n\nThumbMaker offers three ways to create your creative thumbnails:\n\n- **[🔥Template mode]:** Select a preset template, fill in key details, and quickly generate a professional thumbnail.\n- **[🌟Freestyle mode]:** Describe your ideas freestyle, and ThumbMaker will create a unique thumbnail image for you.\n\nChoose the mode that suits you best and start crafting your perfect thumbnail!\n\nOr\n\n**Not sure what to put on your thumbnail?**\nNo worries!  \n**[💬Chat in the input box]**  below the buttons:\nJust chat with ThumbMaker about your video content or give a quick summary. the agent help you brainstorm some eye-catching ideas for your cover. Let's get creative together!\n\nIf you have a thumbnail that you appreciate, you can also **[🎨upload it as a reference]**.",
          isLlmBot: false,
        },
        isChannelEntry: false,
      },
    };
  });
});
