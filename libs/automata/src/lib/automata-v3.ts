import { Container, injectable, inject, optional } from 'inversify';

export function automata(): string {
  return 'automata';
}

@injectable()
export class JSONer {
  toJSON() {
    return this.constructor.name;
  }
}

@injectable()
export class Button extends JSONer {
  constructor() {
    super();
  }
}

@injectable()
export class State extends JSONer {}

@injectable()
export class Input extends JSONer {
  constructor() {
    super();
  }
}

@injectable()
export class Output extends JSONer {
  constructor() {
    super();
  }
}
