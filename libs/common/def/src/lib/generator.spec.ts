// https://www.youtube.com/watch?v=gu3FfmgkwUc
// Anjana Vakil

// what is generator
// https://youtu.be/gu3FfmgkwUc?si=0kG0fOoQvKi2ynbM&t=347
it('generator function return [generator objects] which is a iterator', () => {
  function* genFunc() {
    yield 'hello world!';
  }
  const genObj = genFunc();
  console.log(genObj.next());
  console.log(genObj.next());
});

// https://youtu.be/gu3FfmgkwUc?si=ggoD519j-0CqITBI&t=392
it('next advnaces, yield pauses, return stops', () => {
  function* loggerator() {
    console.log('running');
    yield 'paused';
    console.log('running again');
    yield 'stopped';
  }
  const logger = loggerator();
  console.log(logger.next());
  console.log(logger.next());
  console.log(logger.next());
});

// https://youtu.be/gu3FfmgkwUc?si=UwXgx2XIyU8tVphs&t=481
it('generators are iterable', () => {
  function* abcs() {
    yield 'a';
    yield 'b';
    yield 'c';
  }

  // in for loop
  for (const letter of abcs()) {
    console.log(letter.toUpperCase());
  }
  // in spread
  console.log([...abcs()]);
});

// what can do?

// custom iterators with @@iterator
// todo 不常用
// 我期望 generator 作为
// 1. rxjs 的概念 但是标准语言特性实现
// 2. pub sub

// https://youtu.be/gu3FfmgkwUc?si=N1x0UBkHuT3k4hq0&t=799
it('lazy evaluation & infinite sequences', () => {
  function* inifiteSequence() {
    let i = 0;
    // lazy 意味着不用担心 while true
    while (true) {
      yield i++;
    }
  }

  function* take(n: number, iterable: Iterable<number>) {
    for (const item of iterable) {
      if (n <= 0) return;
      n--;
      yield item;
    }
  }

  function* map(iterable: Iterable<number>, mapFn: (x: number) => number) {
    for (const item of iterable) {
      yield mapFn(item);
    }
  }

  // 之前就发觉过， iterator 明显可以代替 rxjs
  // rxjs 核心就是 generator 能做的，他的复杂概念一般都用不到
  // 有很多 rxjs tutorial 主题是 ten rxjs operators
  const squares = [
    ...take(
      4,
      map(inifiteSequence(), (x) => x * x),
    ),
  ];
  console.log(squares);
});

// https://youtu.be/gu3FfmgkwUc?si=V4H_PaN3YKIS2Rzq&t=914
// power animation
// todo 指的是 sequence，之前做过 rxjs 驱动的动画，这里概念类似

// https://youtu.be/gu3FfmgkwUc?si=2Vznag3je-GJ7gS8&t=1025
it('recursive iteration with yield*', () => {
  // yield* [一个 iterable] 也就是 for loop 语法糖？
  // 而 yield 是普通类型
  // todo
});

it('async iteration', () => {
  //todo
});

// https://youtu.be/gu3FfmgkwUc?si=FCqGbcBtRqTJ2vMC&t=1507
it('yield is a two-way street', () => {
  function* listener(): Generator<unknown, void, unknown> {
    console.log('listening ...');
    while (true) {
      const msg = yield;
      console.log('heard:', msg);
    }
  }

  const l = listener();
  l.next('are you there?'); // to function beginning
  l.next('how about now?'); // next advance to next yield
  l.next('blah blah blah');
});

// https://youtu.be/gu3FfmgkwUc?si=IV_FuvL2nT5Qmpg5&t=1648
it('generators remember state, state machines', () => {
  //
});

// https://youtu.be/gu3FfmgkwUc?si=kbDY0m8akUevY2gt&t=1752
describe('generator can yield control, and get it back', () => {
  it('coroutines, fn can pass controls back and forth, actor-like', () => {
    //
  });
});
