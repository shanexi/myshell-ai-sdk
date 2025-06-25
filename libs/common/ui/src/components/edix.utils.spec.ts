/*
打开：
需要覆盖的场景是
当输入的字符前面必须是空格
后面无所谓
关闭：
否则关闭

然后 search criteria 就是 @到最后一个空格

*/
it('test anchor', () => {
  const a = [
    {
      type: 'text',
      text: '123@ ',
    },
    {
      type: 'context',
      data: {
        content: 'Requirement ',
      },
    },
    {
      type: 'text',
      text: ' @',
    },
  ];
  const anchor = [0, 8];

  const b = a.map((i) => {
    if (i.type === 'text') {
      return i.text;
    } else {
      return '©'; // context 占位，在 anchor
    }
  });
  expect(b.join('')).toMatchInlineSnapshot(`"123@ © @"`);
  expect(b.join('')[anchor[1] - 1]).toMatchInlineSnapshot(`"@"`);
});

it('test anchor case2', () => {
  const a = [
    {
      type: 'text',
      text: '123 ',
    },
    {
      type: 'context',
      data: {
        content: 'Requirement ',
      },
    },
    {
      type: 'text',
      text: '  1@23',
    },
  ];
  const anchor = [0, 9];

  const b = a.map((i) => {
    if (i.type === 'text') {
      return i.text;
    } else {
      return '©'; // context 占位，在 anchor
    }
  });
  expect(b.join('')).toMatchInlineSnapshot(`"123 ©  1@23"`);
  expect(b.join('')[anchor[1] - 1]).toMatchInlineSnapshot(`"@"`);
});
