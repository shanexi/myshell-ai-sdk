import { StrictMessage } from '@myshell-run/common-def';

export interface AgentMessage extends StrictMessage {
  key: string;
  text: string;
  type: string;
  user: 'me' | 'other';
}
