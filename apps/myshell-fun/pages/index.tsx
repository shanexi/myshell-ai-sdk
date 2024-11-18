import { todosMachine } from '../machines/todoAppMachine';
import styles from './index.module.css';
import { useMachine } from '@xstate/react'
export function Index() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return ["Take bins out"]
      }
    }
  });
  return (
    <div className={styles.page}>
      {
        JSON.stringify(state.value)
      }
      <button onClick={() => {
        send({
          type: 'Todos loaded',
          todos: ['hi', 'tom', 'cat']
        })
      }}>Todos loaded</button>

      <button onClick={() => {
        send({
          type: 'Loading todos failed',
          errorMessage: 'Oh no!'
        })
      }}>Loading todos errored</button>
    </div>
  );
}

export default Index;
