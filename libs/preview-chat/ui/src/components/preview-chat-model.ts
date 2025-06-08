import {
  ChatCommonModelFactory,
  json_schema,
  PREVIEW_CHAT,
} from '@myshell-run/common-def';
import { ChatCommonModel } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { ChatInputHandlers } from '@myshell-run/preview-chat-input-plugins';
import {
  OWN_MESSAGE_TYPE,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/preview-chat-message-item-plugins';
import { createId } from '@paralleldrive/cuid2';
import { z } from 'zod';

@injectable()
export class PreviewChatModel implements ChatInputHandlers {
  jsonschema = demo_jsonschema;
  uischema = demo_uischema;

  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  get chatCommon() {
    return this.factory(PREVIEW_CHAT);
  }

  async *clear() {
    yield;
  }

  async *sendText(text: string) {
    const msgId = createId();
    const replyId = createId();
    this.chatCommon.appendMsg({
      key: msgId,
      text: text,
      type: OWN_MESSAGE_TYPE,
    });
    this.chatCommon.appendMsg({
      key: replyId,
      text: text,
      type: REPLY_MESSAGE_TYPE,
    });
    yield;
  }

  *removeImagePreview(id: string) {
    yield;
  }
}

export const demo_uischema = {
  variants: {
    description: 'string_textarea',
    title: 'object_image_upload',
    style: 'object_image_choice',
  },
};
export const demo_jsonschema = {
  type: 'object',
  title: 'Image Configuration',
  properties: {
    // selfie: {
    //   variant: 'object_image_upload',
    //   type: 'object',
    //   title: 'Selfie',
    //   properties: {
    //     url: {
    //       type: 'string',
    //     },
    //     title: {
    //       type: 'string',
    //     },
    //   },
    //   examples: [
    //     {
    //       url: 'a',
    //       title: '单人正脸',
    //     },
    //   ],
    // },
    // team_member: {
    //   variant: 'string_selector',
    //   type: 'string',
    //   title: 'Team member',
    //   enum: ['MyShell'],
    // },
    description: {
      type: 'string',
      title: 'Description',
      // todo: placeholder 用 example？
    },
    title: {
      type: 'object',
      title: 'Title',
      description: 'This is a simple description.',
      properties: {
        title: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
      },
    },
    style: {
      type: 'object',
      title: 'Style',
      properties: {
        name: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
      },
      examples: [
        {
          name: 'a',
          title: 'A',
          url: 'http://a',
        },
      ],
    },
  },
} satisfies z.infer<typeof json_schema>;
