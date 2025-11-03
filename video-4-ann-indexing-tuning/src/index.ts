import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

type Metadata = { id: string; [key: string]: any };
interface EmbeddingsData { ids: string[]; vectors: number[][]; metadata: Metadata[] }

function loadData(filePath: string): EmbeddingsData {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as EmbeddingsData;
}

function bruteForceKnn(
  query: number[],
  data: number[][],
  ids: string[],
  k = 5
): { id: string; distance: number }[] {
  const distances = data.map((vec, idx) => {
    const dist = Math.sqrt(
      vec.reduce((sum, v, i) => sum + (v - query[i]) ** 2, 0)
    );
    return { id: ids[idx], distance: dist };
  });
  return distances.sort((a, b) => a.distance - b.distance).slice(0, k);
}

function annSearch(
  query: number[],
  data: number[][],
  ids: string[],
  k = 5,
  sampleRate = 0.5
): { id: string; distance: number }[] {
  const sampleSize = Math.max(1, Math.floor(data.length * sampleRate));
  const indices = Array.from({ length: data.length }, (_, i) => i);
  const sampled = shuffle(indices).slice(0, sampleSize);
  const sampData = sampled.map(i => data[i]);
  const sampIds = sampled.map(i => ids[i]);
  return bruteForceKnn(query, sampData, sampIds, k);
}

function shuffle<T>(array: T[]): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function computeRecall(
  baseline: { id: string }[],
  ann: { id: string }[]
): number {
  const baseSet = new Set(baseline.map(x => x.id));
  const match = ann.filter(x => baseSet.has(x.id)).length;
  return match / baseline.length;
}

if (require.main === module) {
  const argv = yargs(hideBin(process.argv))
    .option('k', { type: 'number', default: 5 })
    .option('sampleRate', { type: 'number', default: 0.5 })
    .argv;

  const { ids, vectors } = loadData(
    path.resolve(__dirname, '../data/sample_embeddings.json')
  );
  const query = vectors[0];

  const baseline = bruteForceKnn(query, vectors, ids, argv.k);
  console.log('Exact baseline:', baseline);

  const annRes = annSearch(query, vectors, ids, argv.k, argv.sampleRate);
  console.log(`ANN (sampleRate=${argv.sampleRate}):`, annRes);

  const recall = computeRecall(baseline, annRes);
  console.log(`Recall@${argv.k}:`, recall.toFixed(2));
}
