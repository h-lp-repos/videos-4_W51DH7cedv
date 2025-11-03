import { batchIterator, InMemoryIndex } from '../src/batching';

describe('batchIterator', () => {
  it('yields correct batches', () => {
    const arr = [1, 2, 3, 4, 5];
    const batches = Array.from(batchIterator(arr, 2));
    expect(batches).toEqual([[1, 2], [3, 4], [5]]);
  });
});

describe('InMemoryIndex', () => {
  it('adds and deletes entries correctly', () => {
    const idx = new InMemoryIndex();
    idx.add(['x'], [[1]], [{ id: 'x', tag: 'test' }]);
    expect(idx.query('x')).toBe(true);
    idx.delete('x');
    expect(idx.query('x')).toBe(false);
  });
});
