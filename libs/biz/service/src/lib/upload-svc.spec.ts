import { uploadBase64 } from './upload.utils';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe.skip('upload.svc', () => {
  it('should work', async () => {
    await uploadBase64('BASE64_IMAGE', {
      token: '',
    });
    await sleep(3000);
  });
});
