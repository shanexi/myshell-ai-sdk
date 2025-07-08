import { z } from 'zod';
import { ReplyWrapper } from '../reply/reply-msg';

export const LOADING_MESSAGE_TYPE = 'chat_status_message';
export const loading_message_schema = z.object({
  type: z.literal(LOADING_MESSAGE_TYPE),
  message_id: z.number(),
  args: z.object({
    text: z.string(),
  }),
});
export const Loading: React.FC<z.infer<typeof loading_message_schema>> = (
  props,
) => {
  return (
    <ReplyWrapper>
      <div className="flex items-center gap-spacing-md-v2">
        <div className="loader"></div>
        {props.args.text}
      </div>
    </ReplyWrapper>
  );
};
