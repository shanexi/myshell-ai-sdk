import { z } from 'zod';
import { loading_message_schema } from '../../types';
import { ReplyWrapper } from '../reply/reply-msg';

export const Loading: React.FC<z.infer<typeof loading_message_schema>> = (
  props,
) => {
  console.log('loading', props);
  return (
    <ReplyWrapper>
      <div className="flex items-center gap-spacing-md-v2">
        <div className="loader"></div>
        {props.args.text}
      </div>
    </ReplyWrapper>
  );
};
