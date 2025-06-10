import {
  demo_default_message_1,
  demo_default_message_2,
  demo_default_message_3,
  demo_default_message_4,
  demo_default_message_5,
} from '../__storybook_data__/demo_default_message';
import { contentBlocksToMDC } from './content-blocks-to-mdc';

describe('content block to mdc', () => {
  it('case 1', () => {
    const a = demo_default_message_1;
    const e =
      '✅ 我已完成在线学习平台的全面需求分析，并更新了所有相关文档：\\n\\n📋 **';
    expect(contentBlocksToMDC(a)).toEqual(e);
  });

  it('case 2', () => {
    const a = demo_default_message_2;
    const e = `:x-button{#abc display_text='Confirm'}`;
    expect(contentBlocksToMDC(a)).toEqual(e);
  });

  it('case 3', () => {
    const a = demo_default_message_3;
    const e = `:x-button{#abc display_text='✅ Confirm'}`;
    expect(contentBlocksToMDC(a)).toEqual(e);
  });

  it('case 4', () => {
    const a = demo_default_message_4;
    const e = `:x-button{#bcd display_text='Reject'}`;
    expect(contentBlocksToMDC(a)).toEqual(e);
  });

  it('case 5', () => {
    const a = demo_default_message_5;
    expect(contentBlocksToMDC(a)).toMatchInlineSnapshot(
      `"✅ 我已完成在线学习平台的全面需求分析，并更新了所有相关文档：\\n\\n📋 ** :x-button{#abc display_text='Confirm'} :x-button{#bcd display_text='Reject'}"`,
    );
  });
});
