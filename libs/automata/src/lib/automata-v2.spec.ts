import { Input, Output, State, Button, ContextValue } from './automata-v2';
describe('automata', () => {
  it('plain', () => {
    class State1Button1 extends Button {
      next1?: State2;
    }

    class State1 extends State {
      input1: Input;
      input2: Input;
      output1: Output;
      button1: State1Button1;

      constructor() {
        super();
        this.input1 = new Input(this);
        this.input2 = new Input(this);
        this.output1 = new Output(this);
        this.button1 = new State1Button1(this);
      }
    }

    class State2 extends State {
      prev1?: State1Button1;
    }

    const state1 = new State1();
    state1.output1.value = state1.input1;

    const state2 = new State2();
    state1.button1.next1 = state2;
    state2.prev1 = state1.button1;

    console.log(JSON.stringify(state1));
    console.log(JSON.stringify(state2));
    console.log(JSON.stringify(state1.button1.state));
    console.log(JSON.stringify(state1.button1));
    console.log(JSON.stringify(state2.prev1));
  });
});
