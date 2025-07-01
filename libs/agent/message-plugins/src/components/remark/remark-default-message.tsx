/*
import { useInjection } from 'inversify-react';
import { useEffect, useState } from 'react';
import { REPLY_MESSAGE_TYPE } from '../../types';
import { msg6, msg7 } from '../__storybook_data__/backend_mock_message';
import { ReplyMsg } from '../reply/reply-msg';
import { ContentBlockableManager } from './content-block-to-mdc-transform-manager';
import { content_blocks_schema } from './content-blocks-to-mdc';

export const RemarkDefaultMessage = () => {
  const transformManager = useInjection(ContentBlockableManager);
  const lines = [
    transformManager.transform(content_blocks_schema.parse(msg6)),
    transformManager.transform(content_blocks_schema.parse(msg7)),
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
    <ReplyMsg key="abc" user="other" type={REPLY_MESSAGE_TYPE} text={text} />
  );
};
*/
