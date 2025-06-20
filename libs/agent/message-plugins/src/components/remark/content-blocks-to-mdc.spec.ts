import {
  msg2,
  msg4,
  msg6,
  msg10,
  msg11,
  msg13,
  msg12,
} from '../__storybook_data__/backend_mock_message';
import {
  content_blocks_schema,
  content_blocks_to_mdc,
} from './content-blocks-to-mdc';

describe('content block to mdc', () => {
  it('msg2', () => {
    const a = content_blocks_schema.parse(msg2);
    expect(content_blocks_to_mdc(a)).toMatchInlineSnapshot(
      `"你好，有什么可以帮你的吗？我可以帮你实现任意功能，请使用 *生成+功能名称* 命令来生成代码"`,
    );
  });
  it('msg4', () => {
    const a = content_blocks_schema.parse(msg4);
    expect(content_blocks_to_mdc(a)).toMatchInlineSnapshot(`
      "我已经分析了您的需求，需要实现以下功能：
       1. 用户登录页面
      2. 邮箱密码验证
      3. 记住登录状态
      4. 错误提示，请使用 *确认需求* 命令来确认需求 :x-button{display_text='确认需求'}"
    `);
  });

  it('msg6', () => {
    const a = content_blocks_schema.parse(msg6);
    expect(content_blocks_to_mdc(a)).toMatchInlineSnapshot(
      `"好的，我会开始生成代码。"`,
    );
  });

  it('msg10', () => {
    const a = content_blocks_schema.parse(msg10);
    expect(content_blocks_to_mdc(a)).toMatchInlineSnapshot(
      `"正在查看需求文档，请稍等..."`,
    );
  });

  it('msg11', () => {
    const a = content_blocks_schema.parse(msg11);
    expect(content_blocks_to_mdc(a)).toMatchInlineSnapshot(
      `"已经为您找到相关代码，接下来我会开始生成应用."`,
    );
  });

  it('msg12', () => {
    const a = content_blocks_schema.parse(msg11);
    expect(content_blocks_to_mdc(a)).toMatchInlineSnapshot(
      `"已经为您找到相关代码，接下来我会开始生成应用."`,
    );
  });
});
