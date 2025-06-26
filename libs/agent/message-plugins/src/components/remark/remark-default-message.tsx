import { OWN_MESSAGE_TYPE } from '../../agent-message-plugins.module';
import { ReplyMsg } from '../reply/reply-msg';
import { msg6, msg7 } from '../__storybook_data__/backend_mock_message';
import { useEffect, useState } from 'react';
import {
  content_blocks_schema,
  content_blocks_to_mdc,
} from './content-blocks-to-mdc';

export const RemarkDefaultMessage = () => {
  const lines = [
    content_blocks_to_mdc(content_blocks_schema.parse(msg6)),
    content_blocks_to_mdc(content_blocks_schema.parse(msg7)),
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
