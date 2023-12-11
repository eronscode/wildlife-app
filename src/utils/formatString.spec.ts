import { stringUtils } from './formatString';

const { decodeSlug, convertToTitleCase } = stringUtils;

describe('stringUtils', () => {
  describe('decodeSlug', () => {
    it('should decode slug to normal text', () => {
      const slug = 'Betta%20Fish%20(Siamese%20Fighting%20Fish)';
      const expected = 'Betta Fish (Siamese Fighting Fish)';
      expect(decodeSlug(slug)).toEqual(expected);
    });
  });

  describe('convertToTitleCase', () => {
    it('should convert string to title case', () => {
      const str = 'this_is_another_test';
      const expected = 'This Is Another Test';
      expect(convertToTitleCase(str)).toEqual(expected);
    });
  });
});
