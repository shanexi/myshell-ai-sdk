import styles from './chat.module.css';
import { useBoundStore } from './chat.store';

/* eslint-disable-next-line */
export interface ChatProps {}

function BearCounter() {
  const { bears, fishes } = useBoundStore((state) => ({
    bears: state.bears,
    fishes: state.fishes,
  }));
  return (
    <div>
      <div>{bears} bears around here...</div>
      <div>{fishes} fishes around here...</div>
    </div>
  );
}

function AddBear() {
  const addBear = useBoundStore((state) => state.addBear);
  return <button onClick={addBear}>add bear</button>;
}

function AddFish() {
  const addFish = useBoundStore((state) => state.addFish);
  return <button onClick={addFish}>add fish</button>;
}

function AddBoth() {
  const addBoth = useBoundStore((state) => state.addBoth);
  return <button onClick={addBoth}>add both</button>;
}

function EatFish() {
  const eatFish = useBoundStore((state) => state.eatFish);
  return <button onClick={eatFish}>eat fish</button>;
}

export function Chat(props: ChatProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Chat!</h1>
      <BearCounter />
      <AddBear />
      <EatFish />
      <AddFish />
      <AddBoth />
    </div>
  );
}

export default Chat;
