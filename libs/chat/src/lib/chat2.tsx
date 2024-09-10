import styles from './chat.module.css';
import { defaultChatSetting } from 'my_shell_react-build-new';

/* eslint-disable-next-line */
export interface Chat2Props {}

export function Chat2(props: Chat2Props) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Chat!</h1>
      <p>{JSON.stringify(defaultChatSetting)}</p>
    </div>
  );
}

export default Chat2;
