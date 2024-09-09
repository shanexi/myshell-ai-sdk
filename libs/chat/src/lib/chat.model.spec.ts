/**
 * @jest-environment node
 */

// TextEncoder is not defined https://stackoverflow.com/a/72369912
import {
  defaultChatSetting,
  msgDisplayTypeParser,
} from 'my_shell_react-build-new';

describe('chat model', () => {
  it('test', () => {
    console.log(defaultChatSetting);
    const ret = msgDisplayTypeParser('GREETING');
    console.log(ret);
  });
});
