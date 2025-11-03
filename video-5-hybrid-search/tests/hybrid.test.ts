import { hybridSearch } from '../src/hybrid';

describe('hybridSearch', () => {
  const data = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  const ids = ['x', 'y', 'z'];
  const metadata = [
    { id: 'x', tag: 'keep' },
    { id: 'y', tag: 'remove' },
    { id: 'z', tag: 'keep' }
  ];

  it('filters by metadata and returns top k', () => {
    const result = hybridSearch(
      [1, 0, 0],
      2,
      m => m.tag === 'keep',
      data,
      ids,
      metadata
    );
    expect(result.every(r => r.metadata.tag === 'keep')).toBe(true);
    expect(result).toHaveLength(2);
  });
});
