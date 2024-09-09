/**
 * @jest-environment node
 */

// TextEncoder is not defined https://stackoverflow.com/a/72369912
import { defaultChatSetting } from 'my_shell_react-build-new';

describe('chat model', () => {
  it('hi', () => {
    console.log(defaultChatSetting);
  });
});
