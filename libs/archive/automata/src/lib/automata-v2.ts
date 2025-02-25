export function automata(): string {
  return 'automata';
}

export class ContextValue {
  value?: string;
}

export class JSONer {
  toJSON() {
    return this.constructor.name;
  }
}

export class Button extends JSONer {
  constructor(public state: State) {
    super();
  }
}

export class State extends JSONer {}

export class Input extends JSONer {
  constructor(public state: State) {
    super();
  }
}

export class Output extends JSONer {
  public value?: string | Input | ContextValue;
  constructor(public state: State) {
    super();
  }
}
