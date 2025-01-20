import { Context, Input, Output, State, Button } from './automata-v1';
describe('automata', () => {
  it('plain', () => {
    const state1 = new State();
    const state2 = new State();
    const input2 = new Input('input_2');
    state2.push_input(input2);

    const ctx1 = new Context('ctx1');
    const input1 = new Input('input_1');
    state1.push_input(input1);

    const output1 = new Output(ctx1, input1);
    state1.push_output(output1);

    const output2 = new Output('output2', input1);
    state1.push_output(output2);

    const btn1 = new Button('btn1');
    state1.push_button(btn1);
    btn1.link_next(state2);

    // console.log(JSON.stringify(state1._inputs))
    // console.log(JSON.stringify(state1.outputs))
    // console.log(output1.get_options())

    console.log(input2.get_options());
  });
});
