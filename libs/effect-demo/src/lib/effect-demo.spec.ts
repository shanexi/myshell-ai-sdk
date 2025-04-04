import * as NodeSdk from '@effect/opentelemetry/NodeSdk';

import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';

import { Effect } from 'effect';
import { pipe } from 'effect/Function';

describe('effectDemo', () => {
  it('should work', async () => {
    class HttpError {
      readonly _tag = 'HttpError';
    }
    const program = Effect.fail(new HttpError());

    const divide = (a: number, b: number): Effect.Effect<number, Error> => {
      if (b === 0) {
        return Effect.fail(new Error('Division by zero'));
      } else {
        return Effect.succeed(a / b);
      }
    };
    const result = await Effect.runPromise(divide(10, 2));
    expect(result).toEqual(5);
  });

  it('simulating a User Retrieval Operation', () => {
    interface User {
      readonly id: number;
      readonly name: string;
    }
    const getUser = (userId: number): Effect.Effect<User, Error> => {
      const userDatabase: Record<number, User> = {
        1: { id: 1, name: 'John Doe' },
        2: { id: 2, name: 'Jane Smith' },
      };
      const user = userDatabase[userId];
      if (user) {
        return Effect.succeed(user);
      } else {
        return Effect.fail(new Error('User not found'));
      }
    };
    const exampleUserEffect = getUser(1);
    const result = Effect.runSync(exampleUserEffect);
    expect(result).toEqual({ id: 1, name: 'John Doe' });
  });

  it('running effects', () => {
    const program = Effect.sync(() => {
      console.log('Hello world!');
      return 1;
    });
    const result = Effect.runSync(program);
    console.log(result);
  });

  it('otel', async () => {
    const NodeSdkLive = NodeSdk.layer(() => ({
      resource: {
        serviceName: 'example',
      },
      spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
    }));
    const program = pipe(Effect.log('Hello'), Effect.withSpan('a'));

    pipe(
      program,
      Effect.provide(NodeSdkLive),
      Effect.catchAllCause(Effect.logError),
      Effect.runFork,
    );
  });
});
