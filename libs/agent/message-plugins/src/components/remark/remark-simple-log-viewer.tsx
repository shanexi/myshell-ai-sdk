import { useEffect, useState } from 'react';
import { REPLY_MESSAGE_TYPE } from '../../types';
import { ReplyMsg } from '../reply/reply-msg';

import { msg1, msg3 } from '../__storybook_data__/backend_message';

export const RemarkSimpleLogViewer = () => {
  const lines = [
    `::x-agent_log{#abc text='${msg1.args.content_blocks[0].content.text}'}`,
    // `::x-agent_log{#abc text="${msg2.args.content_blocks[0].content.text}"}`,
    `::x-agent_log{#abc text='${[
      msg1.args.content_blocks[0].content.text,
      msg3.args.content_blocks[0].content.text,
    ].join('<br>')}'}`,
    // `::x-agent_log{#abc text="${msg4.args.content_blocks[0].content.text}"}`,
    // `::x-agent_log{#abc text="${msg5.args.content_blocks[0].content.text}"}`,
    // `::x-agent_log{#abc text="${msg6.args.content_blocks[0].content.text}"}`,
    // msg2.args.content_blocks[0].content.text,
    // msg3.args.content_blocks[0].content.text,
    // msg4.args.content_blocks[0].content.text,
    // msg5.args.content_blocks[0].content.text,
    // msg6.args.content_blocks[0].content.text,
  ];
  const [text, setText] = useState(lines[0]);
  useEffect(() => {
    let currentLine = 1;
    const timer = setInterval(() => {
      if (currentLine < lines.length) {
        setText((prev: string) => {
          const txt = prev + '\n' + lines[currentLine];
          currentLine++;
          return txt;
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  console.log(text);
  // TODO type 不需要了
  return (
    <ReplyMsg key="abc" user="other" type={REPLY_MESSAGE_TYPE} text={text} />
  );
};
