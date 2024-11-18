import { createMachine } from 'xstate';

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmALuqrAMQbkVkBuqAa0poMOAiW406DZq1gI+qfLibFUpANoAGALradiUAAc2xVesMgAHogBMAZgDsFAKyOAHAEZbnrZ-f2ACwAbLa2ADQgAJ6I7rauWolagS4BnoF+9gC+WZEiWHhEZJRS9KSMLBgcYABONag1FEYANioAZg3YFPliRZK0ZRVyCqT8yuaauvqWJrBmaqSWNggOzm5ePn4BIWGRMQie9gCcCUmeLrYeLk7ZOZGk6HCWPYUSYDOmE0uIALTBe78XBQjiCQYFPL4UvZgo47iAXuJitQBjJKmwPnMvkhrIhAhFoohfPFbIEQQF3ClHIEgsE4Qi+sI5JhmgNIBj5hZsctAoFnO4XOdQlpLmEHACEF5TolPI5-I57Fs6axem9kdJyrIqphavUamzsbMOYsubjeRR+YLbMLHKL7OL0loKElpRcrk4cjkgA */
    id: 'Todo machine',
    initial: 'Loading todos',
    schema: {
      // events: {} as
      //     | { type: 'Todos loaded'; todos: string[] }
      //     | { type: 'Loading todos failed'; errorMessage: string }
      services: {} as {
        loadTodos: {
          // The data that gets returned from the service
          data: string[];
        };
      },
    },
    tsTypes: {} as import('./todoAppMachine.typegen').Typegen0,
    states: {
      'Loading todos': {
        invoke: {
          src: 'loadTodos',

          onDone: {
            target: 'Todos loaded',
          },

          onError: {
            target: 'Loading todos errored',
          },
        },
      },

      'Todos loaded': {},
      'Loading todos errored': {},
    },
  },
  {
    // actions: {
    //     consoleLogTodos: (ctx, evt) => {
    //         alert(JSON.stringify(evt.todos))
    //     }
    // }
  }
);
