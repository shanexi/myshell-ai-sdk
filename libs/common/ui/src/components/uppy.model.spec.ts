import { patternToAllowedFileTypes } from './uppy.utils';

describe('upload model', () => {
  describe('regex to restrictions.allowedFileTypes', () => {
    it('case 1', () => {
      const regStr = /^(image\/.*|.*\.(jpg|jpeg|png|gif))$/i.toString();
      const act = patternToAllowedFileTypes(regStr);
      const exp = ['image/*', '.jpg', '.jpeg', '.png', '.gif'];
      expect(act).toEqual(exp);
    });

    it('case 1-1', () => {
      const regStr =
        /^(image\/.*|.*\.jpg|.*\.jpeg|.*\.png|.*\.gif)$/i.toString();
      const act = patternToAllowedFileTypes(regStr);
      const exp = ['image/*', '.jpg', '.jpeg', '.png', '.gif'];
      expect(act).toEqual(exp);
    });

    it('image/*', () => {
      const regStr = /^(image\/.*)$/i.toString();
      const act = patternToAllowedFileTypes(regStr);
      const exp = ['image/*'];
      expect(act).toEqual(exp);
    });

    it('audio/*', () => {
      const regStr = /^(audio\/.*)$/i.toString();
      const act = patternToAllowedFileTypes(regStr);
      const exp = ['audio/*'];
      expect(act).toEqual(exp);
    });

    it('video/*', () => {
      const regStr = /^(video\/.*)$/i.toString();
      const act = patternToAllowedFileTypes(regStr);
      const exp = ['video/*'];
      expect(act).toEqual(exp);
    });

    it('image/* video/*', () => {
      const regStr = /^(video\/.*|image\/.*)$/i.toString();
      const act = patternToAllowedFileTypes(regStr);
      const exp = ['video/*', 'image/*'];
      expect(act).toEqual(exp);
    });
  });
});
