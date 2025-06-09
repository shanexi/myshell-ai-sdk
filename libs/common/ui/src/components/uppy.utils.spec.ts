import {
  getAllowedFileTypesDisplay,
  formatFileSize,
  formatEta,
} from './uppy.utils';

describe('uppy utils', () => {
  describe('getAllowedFileTypesDisplay', () => {
    it('should return "Images" for image types', () => {
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#unique_file_type_specifiers
      const a = ['image/*', '.jpg', '.jpeg', '.png', '.gif'];
      const e = 'Image';
      expect(getAllowedFileTypesDisplay(a)).toEqual(e);
    });

    it('should return "Videos" for video types', () => {
      const a = ['video/*', '.mp4', '.avi'];
      const e = 'Video';
      expect(getAllowedFileTypesDisplay(a)).toEqual(e);
    });

    it('should return "Audio" for audio types', () => {
      const a = ['audio/*', '.mp3', '.wav'];
      const e = 'Audio';
      expect(getAllowedFileTypesDisplay(a)).toEqual(e);
    });

    it('should return "Documents" for document types', () => {
      const a = ['.pdf', '.doc', '.docx', '.txt'];
      const e = 'PDF, Doc, Docx, Txt';
      expect(getAllowedFileTypesDisplay(a)).toEqual(e);
    });

    it('should combine multiple categories with "and"', () => {
      const a = ['image/*', '.pdf', '.mp3'];
      const e = 'Image, PDF, MP3';
      expect(getAllowedFileTypesDisplay(a)).toEqual(e);
    });

    it('should handle two categories', () => {
      const a = ['image/*', '.pdf'];
      const e = 'Image, PDF';
      expect(getAllowedFileTypesDisplay(a)).toEqual(e);
    });

    it('should return "Files" for unknown types', () => {
      const a = ['.xyz', '.abc'];
      const e = 'XYZ, ABC';
      expect(getAllowedFileTypesDisplay(a)).toEqual(e);
    });

    it('should return "Any file" for empty array', () => {
      const a: string[] = [];
      const e = 'File';
      expect(getAllowedFileTypesDisplay(a)).toEqual(e);
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0B');
      expect(formatFileSize(1)).toBe('1B');
      expect(formatFileSize(512)).toBe('512B');
      expect(formatFileSize(1023)).toBe('1023B');
    });

    it('should format KB correctly', () => {
      expect(formatFileSize(1024)).toBe('1KB');
      expect(formatFileSize(1536)).toBe('1.5KB');
      expect(formatFileSize(2048)).toBe('2KB');
      expect(formatFileSize(1024 * 1023)).toBe('1023.0 KB');
    });

    it('should format MB correctly', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1MB');
      expect(formatFileSize(1024 * 1024 * 1.5)).toBe('1.5MB');
      expect(formatFileSize(1024 * 1024 * 10)).toBe('10MB');
      expect(formatFileSize(1024 * 1024 * 1023)).toBe('1023MB');
    });

    it('should format GB correctly', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1GB');
      expect(formatFileSize(1024 * 1024 * 1024 * 2.5)).toBe('2GB');
      expect(formatFileSize(1024 * 1024 * 1024 * 1023)).toBe('1023GB');
    });

    it('should format TB correctly', () => {
      expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe('1TB');
      expect(formatFileSize(1024 * 1024 * 1024 * 1024 * 5.2)).toBe('5TB');
    });

    it('should handle edge cases', () => {
      expect(formatFileSize(null)).toBe(null);
      expect(formatFileSize(undefined)).toBe(undefined);
      expect(formatFileSize(-1)).toBe(null);
      expect(formatFileSize(-1024)).toBe(null);
    });

    it('should round to 1 decimal place', () => {
      expect(formatFileSize(1024 * 1.234)).toBe('1.2KB');
      expect(formatFileSize(1024 * 1024 * 1.999)).toBe('2MB');
      expect(formatFileSize(1024 * 1024 * 1024 * 1.876)).toBe('1.9GB');
    });
  });

  describe('formatEta', () => {
    it('should return empty string for undefined or 0', () => {
      expect(formatEta()).toBe('');
      expect(formatEta(undefined)).toBe('');
      expect(formatEta(0)).toBe('');
    });

    it('should format seconds correctly', () => {
      expect(formatEta(1)).toBe('1s');
      expect(formatEta(30)).toBe('30s');
      expect(formatEta(59)).toBe('59s');
    });

    it('should format minutes and seconds correctly', () => {
      expect(formatEta(60)).toBe('1min 0s');
      expect(formatEta(90)).toBe('1min 30s');
      expect(formatEta(150)).toBe('2min 30s');
      expect(formatEta(3599)).toBe('59min 59s');
    });

    it('should format hours and minutes correctly', () => {
      expect(formatEta(3600)).toBe('1h 0min');
      expect(formatEta(3900)).toBe('1h 5min');
      expect(formatEta(7200)).toBe('2h 0min');
      expect(formatEta(7320)).toBe('2h 2min');
      expect(formatEta(10800)).toBe('3h 0min');
    });

    it('should handle large values', () => {
      expect(formatEta(86400)).toBe('24h 0min');
      expect(formatEta(90000)).toBe('25h 0min');
    });
  });
});
