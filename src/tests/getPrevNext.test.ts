import { describe, it, expect } from 'vitest';
import { getPrevNext } from '@/lib/utils';

describe('getNextPrev', () => {
  it('returns correct next and prev for Genesis 1', () => {
    const result = getPrevNext('Genesis', 1);
    expect(result).toEqual({
      prev: null,
      next: { book: 'Genesis', chapter: 2 },
    });
  });

  it('returns null for unknown book', () => {
    const result = getPrevNext('UnknownBook', 1);
    expect(result).toBeNull();
  });

  it('handles book without chapter correctly', () => {
    const result = getPrevNext('John', 0);
    expect(result).toEqual({
      prev: { book: 'Luke' },
      next: { book: 'Acts' },
    });
  });

  it('handles book without chapter correctly', () => {
    const result = getPrevNext('Philemon');
    expect(result).toEqual({
      prev: { book: 'Titus' },
      next: { book: 'Hebrews' },
    });
  });

  it('handles book with chapter correctly', () => {
    const result = getPrevNext('Joshua', 10);
    expect(result).toEqual({
      prev: { book: 'Joshua', chapter: 9 },
      next: { book: 'Joshua', chapter: 11 },
    });
  });

  it('handles book with wrong chapter correctly', () => {
    const result = getPrevNext('Malachi', 10);
    expect(result).toBeNull();
  });

  it('handles end of book correctly', () => {
    const result = getPrevNext('Ezekiel', 48);
    expect(result).toEqual({
      prev: { book: 'Ezekiel', chapter: 47 },
      next: { book: 'Daniel', chapter: 1 },
    });
  });

  it('handles start of book correctly', () => {
    const result = getPrevNext('Hosea', 1);
    expect(result).toEqual({
      prev: { book: 'Daniel', chapter: 12 },
      next: { book: 'Hosea', chapter: 2 },
    });
  });
});
