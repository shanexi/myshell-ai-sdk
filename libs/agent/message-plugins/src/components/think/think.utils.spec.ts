import { decode } from 'html-entities';

it('decode', () => {
  const a = '&quot;';
  const b = decode(a);
  console.log(b);
});

it('decode 2', () => {
  const a = '\ud83d\udcdd';
  const b = decode(a);
  console.log(b);
});

it('decode 3', () => {
  const a =
    '"\ud83d\udcdd {"id":"fc_685a97814c88819ba3c5ab579284fef40c6a39901c840833","type":"function_call","status":"completed","arguments":"{\\"command\\":[\\"bash\\",\\"-lc\\",\\"ls -R\\"]}","call_id":"call_r6SZeqznNiABZoWhYqf3SFDu","name":"shell"}"';
  console.log(a);
});
