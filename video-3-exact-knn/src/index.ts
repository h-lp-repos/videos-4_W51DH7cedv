import fs from 'fs';
import path from 'path';

type Metadata = { id: string; [key: string]: any };
interface EmbeddingsData { ids: string[]; vectors: number[][]; metadata: Metadata[] }

export function loadData(filePath: string): EmbeddingsData {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as EmbeddingsData;
}

export function bruteForceKnn(
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

if (require.main === module) {
  const { ids, vectors } = loadData(
    path.resolve(__dirname, '../data/sample_embeddings.json')
  );
  const query = vectors[0];
  const results = bruteForceKnn(query, vectors, ids, 5);
  console.log('Top-5 results:', results);
}
