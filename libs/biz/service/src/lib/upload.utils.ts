import { createId } from '@paralleldrive/cuid2';

export const STATIC_URL = 'https://static.myshell.run';

export const uploadBase64 = async (base64: string, opt: { token: string }) => {
  const id = createId();
  const formdata = new FormData();
  const buffer = Buffer.from(base64, 'base64');
  const file = new Blob([buffer], { type: 'image/png' });
  formdata.append('uploads', file, `${id}.png`);
  formdata.append('token', opt.token);
  await fetch('https://upload.myshell.run/upload', {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  });
  return `${STATIC_URL}/${id}.png`;
};
