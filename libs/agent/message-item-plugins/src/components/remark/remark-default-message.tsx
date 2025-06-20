import { OWN_MESSAGE_TYPE } from '../../agent-msg-item-plugins.module';
import { ReplyMsg } from '../reply-msg';
import {
  demo_default_message_1,
  demo_default_message_2,
  demo_default_message_3,
  demo_default_message_4,
  demo_default_message_5,
} from '../__storybook_data__/demo_default_message';
import { useEffect, useState } from 'react';
import { content_blocks_2_mdc } from './content-blocks-to-mdc';

export const RemarkDefaultMessage = () => {
  const lines = [
    content_blocks_2_mdc(demo_default_message_1),
    content_blocks_2_mdc(demo_default_message_2),
    content_blocks_2_mdc(demo_default_message_3),
    // contentBlocksToMDC(demo_default_message_4),
    // contentBlocksToMDC(demo_default_message_5),
  ];
  const [text, setText] = useState(lines[0]);
  useEffect(() => {
    let currentLine = 1;
    const timer = setInterval(() => {
      if (currentLine < lines.length) {
        setText((prev: string) => {
          const txt = prev + lines[currentLine];
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
    <ReplyMsg key="abc" user="other" type={OWN_MESSAGE_TYPE} text={text} />
  );
};
