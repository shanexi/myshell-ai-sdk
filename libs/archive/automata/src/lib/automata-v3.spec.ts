import { Input, Output, State, Button } from './automata-v3';
import { Container, injectable, inject, interfaces } from 'inversify';

describe('automata', () => {
  it('plain', () => {
    @injectable()
    class CtxVal1 {
      constructor(@inject('V<CtxVal1>') public value: string) {}
    }

    @injectable()
    class Button1 {
      constructor(@inject('F<State2>') public next1: () => State2) {}
    }

    @injectable()
    class Input1 {
      constructor(
        @inject(CtxVal1) public description: CtxVal1,
        @inject(CtxVal1) public defaultValue: CtxVal1,
      ) {}
      toJSON() {
        return this.constructor.name;
      }
    }

    @injectable()
    class Input2 {
      constructor(@inject('V<Input2>') public value: string) {}
      toJSON() {
        return this.constructor.name;
      }
    }

    @injectable()
    class Output1 {
      constructor(
        @inject(CtxVal1) public name: CtxVal1,
        @inject(Input2) public value: Input2,
      ) {}

      execute() {
        // 执行到之后进行 assign
        this.name.value = this.value.value;
      }
      toJSON() {
        return this.constructor.name;
      }
    }

    @injectable()
    class State1 {
      constructor(
        @inject(Input1) public input1: Input1,
        @inject(Input2) public input2: Input2,
        @inject(Output1) public output1: Output1,
        @inject(Button1) public button1: Button1,
      ) {}
      toJSON() {
        return this.constructor.name;
      }
    }

    @injectable()
    class State2 {
      constructor(@inject('F<State1>') public prev1: () => State1) {}
      toJSON() {
        return this.constructor.name;
      }
    }

    const container = new Container();
    container.bind(CtxVal1).toSelf().inSingletonScope();
    container.bind('V<CtxVal1>').toConstantValue('ctx1 value');

    container.bind(Input1).toSelf().inSingletonScope();
    container.bind(Input2).toSelf().inSingletonScope();
    container.bind('V<Input2>').toConstantValue('input2 value');
    container.bind(Output1).toSelf().inSingletonScope();
    container.bind(Button1).toSelf().inSingletonScope();
    container.bind(State1).toSelf().inSingletonScope();
    container
      .bind<interfaces.Factory<State1>>('F<State1>')
      .toAutoFactory(State1);
    container.bind(State2).toSelf().inSingletonScope();
    container
      .bind<interfaces.Factory<State2>>('F<State2>')
      .toAutoFactory(State2);

    const state1 = container.get(State1);
    const state2 = container.get(State2);
    const ctxVal1 = container.get(CtxVal1);

    console.log(state1.input1.toJSON());
    console.log(state1.input2.toJSON());
    console.log(state1.button1.next1().toJSON());
    console.log(state2.prev1().toJSON());
    console.log(ctxVal1.value);
    state1.output1.execute();
    console.log(ctxVal1.value);
  });
});
