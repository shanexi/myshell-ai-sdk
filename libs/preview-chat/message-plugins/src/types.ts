import { StrictMessage } from '@myshell-run/common-def';

export interface PreviewMessage extends StrictMessage {
  key: string;
  text: string;
  type: string;
  user: 'me' | 'other';
  avatar?: string;
}
