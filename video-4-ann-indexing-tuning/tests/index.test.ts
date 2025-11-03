import { annSearch } from '../src/index';

describe('annSearch', () => {
  const data = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  const ids = ['x', 'y', 'z'];

  it('returns k results from a sample of data', () => {
    const result = annSearch([1, 0, 0], data, ids, 2, 0.5);
    expect(result).toHaveLength(2);
    result.forEach(r => expect(ids).toContain(r.id));
  });
});
