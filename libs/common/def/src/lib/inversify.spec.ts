import { Container, inject, injectable } from 'inversify';

class A {
  hi = 'hi';
}
class B {
  constructor(@inject(A) public a: A) {
    //
  }
}

class C {
  constructor(@inject(A) public a: A) {
    //
  }
}

class BB extends B {
  constructor(@inject(A) a: A) {
    super(a);
  }
}

it('test', () => {
  const container = new Container();
  container.bind(A).toSelf().inTransientScope();
  container.bind(B).toSelf().inSingletonScope();
  container.bind(C).toSelf().inSingletonScope();
  container.bind(BB).toSelf().inSingletonScope();
  container.rebind(B).to(BB).inSingletonScope();

  const b = container.get(B);
  console.log(b.a);
  b.a.hi = 'hello';
  console.log(b.a);

  const b2 = container.get(B);
  console.log(b2.a);

  // 看 extends 会实例化两次
  const bb = container.get(BB);
  console.log(bb.a);
});

it('test 2', () => {
  const container = new Container();
  container.bind(B).toSelf().inSingletonScope();

  container.bind('ChatFactory').toFactory<B, []>((ctx) => () => {
    const child = ctx.container.createChild();
    child.bind(A).toSelf().inSingletonScope();
    return child.get(B);
  });

  const bFactory = container.get<() => B>('ChatFactory');
  const b = bFactory();
  console.log(b.a.hi);
  b.a.hi = 'hello';
  console.log(b.a.hi);

  container.rebind(B).to(BB).inSingletonScope();
  const bFactory2 = container.get<() => B>('ChatFactory');

  const b2 = bFactory2();
  console.log(b2.a.hi);
});

it('test 3', () => {
  const container = new Container();
  container.bind(A).toSelf().inTransientScope();
  container.bind(B).toSelf().inSingletonScope();
  container.bind('ChatFactory').toFactory((ctx) => () => ctx.container.get(B));
  const bFactory = container.get<() => B>('ChatFactory');
  const b = bFactory();
  console.log(b.a.hi);
  b.a.hi = 'hello';
  console.log(b.a.hi);

  container.rebind(B).to(BB).inSingletonScope();
  const bFactory2 = container.get<() => B>('ChatFactory');
  const b2 = bFactory2();
  console.log(b2.a.hi);
});
