import { computeStats } from '../src/benchmark';

describe('computeStats', () => {
  it('calculates avg and p95 correctly', () => {
    const data = [10, 20, 30, 40, 50]; // sorted
    const stats = computeStats(data);
    expect(stats.avg).toBe(30);
    // p95 index = floor(0.95*5)=4 => data[4]=50
    expect(stats.p95).toBe(50);
  });
});
