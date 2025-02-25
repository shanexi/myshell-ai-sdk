import { automata } from './automata-v1';
// import { type } from 'arktype'
import { z } from 'zod';

// https://www.totaltypescript.com/concepts/the-prettify-helper
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

describe('automata', () => {
  it('should work', () => {
    expect(automata()).toEqual('automata');
  });

  it('Prettify', () => {
    type Intersected = {
      a: string;
    } & {
      b: number;
    } & {
      c: boolean;
    };

    type Intersected2 = Prettify<
      {
        a: string;
      } & {
        b: number;
      } & {
        c: boolean;
      }
    >;
  });

  // https://www.youtube.com/watch?v=jEeQC6I8nlY
  it('type-safe merge', () => {
    // step 1: build a Merge type helper
    type Merge<T1, T2> = Prettify<Omit<T1, keyof T2> & T2>;

    type Example = Merge<{ foo: string; bar: string }, { foo: number }>;

    // step 2: build a merge array of object type helper
    type MergeArrayOfObject<
      TArr extends readonly object[],
      T1 = {} // 累加器
    > = TArr extends [
      infer T2 extends object, // infer 推断（取）这个语法类似 rest，T2 就是第一个
      ...infer TRest extends object[]
    ]
      ? MergeArrayOfObject<TRest, Merge<T1, T2>> // （尾）递归
      : T1; // 数组空就返回最终结果（累加器）

    type Example2 = MergeArrayOfObject<
      [
        { foo: string; bar: string },
        { foo: number },
        { foo: boolean; baz: string }
      ]
    >;

    const merge = <TArr extends readonly object[]>(
      ...objects: TArr
    ): MergeArrayOfObject<TArr> => {
      return Object.assign({}, ...objects);
    };

    const example3 = merge(
      { foo: 123 },
      { foo: true, baz: 'abc' },
      { foo: 'abc', bar: 123 }
    );
  });

  // https://www.youtube.com/watch?v=sciBO_IaxTw&t=439s
  // selected vscode workspace ts version
  it.skip('ts 5.5', () => {
    // type predicate
    // the secret of zod
    function isString(a: unknown): a is string {
      return typeof a === 'number';
    }
    const a = isString(1);
  });

  // https://www.youtube.com/watch?v=QSIXYMIJkQg&t=270s
  describe('8 Tips', () => {
    it.skip('using', () => {
      // const mockSth = () => {
      //   const myMock = "sth"
      //   return {
      //     // @ts-expect-error not supported
      //     [Symbol.dispose]: () => {
      //     },
      //     value: myMock
      //   }
      // }
      // // wallaby not supported
      // using mock = mockSth()
      // console.log(mock.value)
    });

    it('retry', async () => {
      async function retry<T>(
        fn: () => Promise<T>,
        retries: number = 5
      ): Promise<T> {
        try {
          return await fn();
        } catch (e) {
          if (retries > 0) {
            console.log('Retrying...');
            return await retry(fn, retries - 1);
          }
          throw e;
        }
      }

      const str = await retry(() => Promise.resolve('Hello'));
    });

    it.skip('const type parameters', () => {
      // refer to .d.ts
    });

    it.skip('no infer', () => {
      // refer to .d.ts
    });

    it('(typeof array)[number]', () => {
      const roles = ['user', 'admin', 'superadmin'] as const;
      type RoleAttempt1 = typeof roles;
      type RoleAttempt2 = (typeof roles)[0 | 1 | 2];
      type RoleAttempt3 = (typeof roles)[number];
    });
  });

  // https://www.youtube.com/watch?v=0zp9bkEfaOc
  it.skip('declare global', () => {
    // refer to .d.ts
  });

  // https://www.youtube.com/watch?v=r1L35zxZQPE
  describe('satisfies', () => {
    it('1', () => {
      const scores: Record<string, number> = {};
      scores['english'] = 100;
      scores['math'] = 100;
    });
    it('2', () => {
      const scores = {
        // @ts-expect-error
        english: true,
      } satisfies Record<string, number>;

      // @ts-expect-error satisfies 只会作用于值，不会修改 scores 的类型
      scores['english'] = 100;
      // 所以 satisfies 不会 wide type

      // 也就是 statisfies 适合 narrow，而 narrow 一般就是针对 union 进行 narrow
    });
  });

  // https://www.youtube.com/watch?v=h5ymIiux6NU
  describe('5.3', () => {
    it('narrowing in generic function', () => {
      interface Example {
        foo: string;
        bar: number;
      }

      function exampleFunc<T extends keyof Example>(
        key: T
        // 出现 never 是因为当 key 不存在，则推导为 never
      ): Example[T] {
        if (key === 'foo') {
          // @ts-expect-error Type 'string' is not assignable to type 'Example[T]'. Type 'string' is not assignable to type 'never'.
          return 'abc';
        } else {
          // @ts-expect-error
          return 123;
        }
      }
    });

    it('loose autocomplete', () => {
      type IconSize = 'small' | 'medium' | 'large' | (string & {});

      const icons: IconSize[] = ['small', 'large', 'medium', 'whatever'];
    });
  });

  it('dynamic objects', () => {
    const myObj = {
      a: 1,
      b: 2,
    };
    const access = (str: string) => {
      // @ts-expect-error No index signature with a parameter of type 'string' was found on type '{ a: number; b: number; }'.
      return myObj[str];
    };
    // solution 1: tighten the index signature
    const access2 = (str: keyof typeof myObj) => {
      return myObj[str];
    };
    // solution 2: loosen the object
    const myObj2: Record<string, number> = {
      a: 1,
      b: 2,
    };
    const access3 = (str: string) => {
      return myObj2[str];
    };
    // solution 3: cast the index
    // ..
  });

  // https://www.youtube.com/watch?v=6M9aZzm-kEc
  describe('as const', () => {
    const routes = {
      home: '/',
      admin: '/admin',
    } as const;

    type TypeOfRoutes = typeof routes;
    // @ts-expect-error
    routes.home = 'hi';
    const goToRoute = (routes: keyof TypeOfRoutes) => {};
    goToRoute('admin');

    type Route = (typeof routes)[keyof typeof routes];
    const goToRoute2 = (routes: Route) => {};
    goToRoute2(routes.admin);
  });

  // https://www.youtube.com/watch?v=-_0wMxtRVqA
  it.skip('arktype', () => {
    // const user = type({
    //   age: '1<number<=10',
    //   "email?": "string"
    // })
    // const r = user({})
    // if(r instanceof type.errors) {
    //   console.log(r.summary)
    // } else {
    //   console.log(r)
    // }
  });

  // https://www.youtube.com/watch?v=QDANnOSMCOw
  it('HOTScript', () => {
    // can not find reality usage
  });

  // https://www.youtube.com/watch?v=S6rcrkbsDI0
  it('trpc', () => {});

  // https://www.youtube.com/watch?v=9N50YV5NHaE
  it('zod generics', () => {
    const UserSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    });
    const maybeUser = {
      id: '123',
      name: 'Matt',
      email: 'hi@',
    };

    const user = UserSchema.parse(maybeUser);
    type User = z.infer<typeof UserSchema>;

    const userForm = <TValues>(
      schema: z.Schema<TValues>,
      onSubmit: (values: TValues) => void
    ) => {
      return {
        onSubmit: (values: unknown) => {
          const newValues = schema.parse(values);
          onSubmit(newValues);
        },
      };
    };
    const form = userForm(UserSchema, (values) => {
      console.log(values);
    });
    form.onSubmit(maybeUser);

    const form2 = userForm(
      z.object({
        passwd: z.string(),
      }),
      (values) => {
        console.log(values);
      }
    );
  });

  // https://www.youtube.com/watch?v=EU0TB_8KHpY
  it('TypeScript utility types', () => {
    type User = {
      id: string;
      name: string;
      email: string;
    };

    type PartialUser = Partial<User>;
    type RequiredUser = Required<PartialUser>;
    type OmitUser = Omit<User, 'id'>;
    type PickUser = Pick<User, 'id' | 'name'>;
    type ReadonlyUser = Readonly<User>;

    type Mutable<T> = {
      -readonly [K in keyof T]: T[K];
    };
    type MutableUser = Mutable<ReadonlyUser>;

    type Role = 'admin' | 'user' | 'anonymous';
    type NonAdminRole = Exclude<Role, 'admin'>;
    type RoleAttributes =
      | { role: 'admin'; orgId: string }
      | { role: 'user' }
      | { role: 'anonymous' };

    type AdminRole = Extract<RoleAttributes, { role: 'admin' }>;

    type Func = (a: number, b: string) => number;
    type ReturnValue = ReturnType<Func>;
    type Params = Parameters<Func>;

    type MabeString = string | null | undefined;
    type DefinitelyString = NonNullable<MabeString>;

    type PromiseString = Promise<string>;
    type Result = Awaited<PromiseString>;

    const func = async () => {
      return {
        id: 123,
      };
    };
    type Result2 = Awaited<ReturnType<typeof func>>;
  });

  // https://www.youtube.com/watch?v=dLPgQRbVquo
  it('generics', () => {
    // type MyGenericType<TData> = {
    //   data: TData
    // }
    // type Example1 = MyGenericType<{
    //   firstName: string
    // }>
    // const makeFetch = <TData>(url: string): Promise<TData> => {
    //   return fetch(url).then(res => res.json())
    // }
    // makeFetch<{
    //   id: string
    // }>('/api/endpoint').then(res => {
    //   console.log(res)
    // })
    // const makeFetch2 = <TData>(
    //   schema: z.Schema<TData>,
    //   url: string
    // ): Promise<TData> => {
    //   return fetch(url).then(res => res.json())
    // }
    // makeFetch2(
    //   z.object({
    //     id: z.string()
    //   }),
    //   '/api/endpoint').then(res => {
    //   console.log(res)
    // })
  });

  it('satisfies', () => {
    type Color =
      | string
      | {
          r: number;
          g: number;
          b: number;
        };

    const a = 'green' as Color;
    //    ^?

    const b = 'green' satisfies Color;
    //    ^?

    const c = {
      //^?
      r: 0,
      g: 255,
      b: 0,
    } as const satisfies Color;
  });
});
