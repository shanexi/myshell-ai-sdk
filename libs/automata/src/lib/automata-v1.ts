export function automata(): string {
  return 'automata';
}

export class Context {
  constructor(private value: string) {}

  toJSON() {
    return this.value;
  }
}

export class Button {
  state?: State;
  next: State[] = [];
  constructor(public name: string) {}
  // next is mutable during runtime
  link_next(state: State) {
    const ni = this.next.findIndex((n) => n === state);
    if (ni === -1) {
      this.next.push(state);
    } else {
      // noop
    }
    if (!this.state) throw new Error();
    state.link_prev(this);
  }
}

export class State {
  inputs: Array<Input> = [];
  outputs: Array<Output> = [];
  buttons: Array<Button> = [];

  prev: Button[] = [];

  push_button(button: Button) {
    button.state = this;
    this.buttons.push(button);
  }

  push_input(input: Input) {
    input.state = this;
    this.inputs.push(input);
  }

  push_output(output: Output) {
    output.state = this;
    this.outputs.push(output);
  }

  link_prev(prev: Button) {
    const ni = this.prev.findIndex((p) => p === prev);
    if (ni === -1) {
      this.prev.push(prev);
    } else {
      // noop
    }
  }

  get_options() {}
}

export class Input {
  state?: State;

  constructor(public name: string) {}

  toJSON() {
    return this.name;
  }

  get_options() {
    return this.state?.prev?.[0]?.state?.outputs.map((o) => o.toJSON());
  }
}

export class Task {
  _state?: State;
}

export class Output {
  state?: State;

  constructor(
    private name: string | Context,
    private value: string | Input | Context
  ) {}

  get_options() {
    return this.state?.inputs.map((i) => i.toJSON());
  }

  toJSON() {
    if (typeof this.value === 'string') {
      return `${this.name}:${this.value}`;
    } else if (typeof this.name === 'string') {
      return `<s>${this.name}:<r>${this.value.toJSON()}`;
    } else {
      return `<r>${this.name.toJSON()}:<r>${this.value.toJSON()}`;
    }
  }
}
