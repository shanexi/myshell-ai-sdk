/*
打开：
需要覆盖的场景是
当输入的字符前面必须是空格
后面无所谓
关闭：
否则关闭

然后 search criteria 就是 @到最后一个空格

*/
import { Position } from 'edix';
import { ChatInputDoc } from './edix.model';
import { getAtSearchCriteria } from './edix.utils';
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
  const a: ChatInputDoc[number] = [
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
      text: '  1@23 ab',
    },
  ];
  const anchor: Position = [0, 9];

  const b = a.map((i) => {
    if (i.type === 'text') {
      return i.text;
    } else {
      return '©'; // context 占位，在 anchor
    }
  });
  const text = b.join('');
  expect(text).toMatchInlineSnapshot(`"123 ©  1@23 ab"`);
  expect(text[anchor[1] - 1]).toMatchInlineSnapshot(`"@"`);
  expect(getAtSearchCriteria([a], [anchor, [0, 0]])).toMatchInlineSnapshot(
    `"23"`,
  );
});

it('case 1', () => {
  const doc: ChatInputDoc = [
    [
      {
        type: 'text',
        text: '@re',
      },
    ],
    [
      {
        type: 'text',
        text: '@req',
      },
    ],
  ];
  const sel: [anchor: Position, focus: Position] = [
    [1, 4],
    [1, 4],
  ];
  expect(getAtSearchCriteria(doc, sel)).toMatchInlineSnapshot(`"req"`);
});

it('@@ return null', () => {
  const doc: ChatInputDoc = [
    [
      {
        type: 'text',
        text: '@@1',
      },
    ],
  ];
  const sel: [anchor: Position, focus: Position] = [
    [0, 2],
    [0, 0],
  ];
  expect(getAtSearchCriteria(doc, sel)).toMatchInlineSnapshot(`null`);
});

it('space return null', () => {
  const doc: ChatInputDoc = [
    [
      {
        type: 'text',
        text: '@123 ',
      },
    ],
    [
      {
        type: 'text',
        text: '@123 ',
      },
    ],
  ];
  const sel: [anchor: Position, focus: Position] = [
    [1, 5],
    [1, 5],
  ];
  expect(getAtSearchCriteria(doc, sel)).toMatchInlineSnapshot(`null`);
});
