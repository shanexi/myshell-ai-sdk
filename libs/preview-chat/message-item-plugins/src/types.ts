import { StrictMessage } from '@myshell-run/common-def';

export interface AgentMessage extends StrictMessage {
  key: string;
  text: string;
  type: string;
  user: 'me' | 'other';
  avatar?: string;
}

export interface Agent2Message {
  key: string;
  text: string;
}
