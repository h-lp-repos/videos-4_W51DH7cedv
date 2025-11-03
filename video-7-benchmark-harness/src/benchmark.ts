import { performance } from 'perf_hooks';
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { loadData, bruteForceKnn } from '../../video-3-exact-knn/src/index';

interface Stats { avg: number; p95: number; }

function computeStats(latencies: number[]): Stats {
  const sorted = latencies.slice().sort((a, b) => a - b);
  const sum = latencies.reduce((s, x) => s + x, 0);
  const avg = sum / latencies.length;
  const idx = Math.floor(0.95 * sorted.length);
  const p95 = sorted[idx];
  return { avg, p95 };
}

function saveCsv(rows: number[][], filePath: string): void {
  const csv = rows.map(r => r.join(',')).join('\n');
  fs.writeFileSync(filePath, csv, 'utf-8');
}

async function singleMode(numQueries: number, k: number, dryRun: boolean) {
  console.log('Running single-mode with', numQueries, 'queries, k=', k);
  if (dryRun) return;
  const { ids, vectors } = loadData(path.resolve(__dirname, '../../video-3-exact-knn/data/sample_embeddings.json'));
  const latencies: number[] = [];
  for (let i = 0; i < numQueries; i++) {
    const query = vectors[i % vectors.length];
    const start = performance.now();
    bruteForceKnn(query, vectors, ids, k);
    const end = performance.now();
    latencies.push(end - start);
  }
  const stats = computeStats(latencies);
  console.log('Latency stats:', stats);
  const rows = latencies.map((l, i) => [i, l]);
  const outPath = path.resolve(__dirname, '../results/single.csv');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  saveCsv(rows, outPath);
  console.log('Saved per-query latencies to', outPath);
}

async function concurrencyMode(numQueries: number, k: number, concurrency: number, dryRun: boolean) {
  console.log('Running concurrency-mode:', numQueries, 'queries at', concurrency, 'concurrency, k=', k);
  if (dryRun) return;
  const { ids, vectors } = loadData(path.resolve(__dirname, '../../video-3-exact-knn/data/sample_embeddings.json'));
  const tasks: Promise<number>[] = [];
  for (let i = 0; i < numQueries; i++) {
    const query = vectors[i % vectors.length];
    const task = (async () => {
      const start = performance.now();
      bruteForceKnn(query, vectors, ids, k);
      const end = performance.now();
      return end - start;
    })();
    tasks.push(task);
    if (tasks.length >= concurrency) {
      await Promise.all(tasks);
      tasks.length = 0;
    }
  }
  console.log('Concurrent execution completed');
}

if (require.main === module) {
  const argv = yargs(hideBin(process.argv))
    .option('mode', { choices: ['single', 'concurrency'], default: 'single' })
    .option('numQueries', { type: 'number', default: 50 })
    .option('concurrency', { type: 'number', default: 10 })
    .option('k', { type: 'number', default: 5 })
    .option('dryRun', { type: 'boolean', default: false })
    .argv;

  if (argv.mode === 'single') {
    singleMode(argv.numQueries, argv.k, argv.dryRun);
  } else {
    concurrencyMode(argv.numQueries, argv.k, argv.concurrency, argv.dryRun);
  }
}

export { computeStats };
