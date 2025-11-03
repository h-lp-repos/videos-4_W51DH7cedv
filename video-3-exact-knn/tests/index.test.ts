import { bruteForceKnn } from '../src/index';

describe('bruteForceKnn', () => {
  const data = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  const ids = ['x', 'y', 'z'];

  it('returns the closest neighbors in correct order', () => {
    const result = bruteForceKnn([1, 0, 0], data, ids, 2);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('x');
    expect(result[1].id).toBe('y');
  });
});
