import fs from 'fs';
import path from 'path';
import { loadData, bruteForceKnn } from '../../video-3-exact-knn/src/index';

interface Metadata { id: string; [key: string]: any }

export function hybridSearch(
  query: number[],
  k: number,
  filterFn: (m: Metadata) => boolean,
  data: number[][],
  ids: string[],
  metadata: Metadata[]
): { id: string; distance: number; metadata: Metadata }[] {
  const candidates = bruteForceKnn(query, data, ids, k * 10);
  const filtered = candidates
    .filter(c => {
      const m = metadata.find(m => m.id === c.id);
      return m ? filterFn(m) : false;
    })
    .slice(0, k)
    .map(c => ({ ...c, metadata: metadata.find(m => m.id === c.id)! }));
  return filtered;
}

if (require.main === module) {
  const { ids, vectors, metadata } = loadData(
    path.resolve(__dirname, '../data/sample_embeddings.json')
  );
  const query = vectors[0];
  const results = hybridSearch(
    query,
    5,
    m => m.tag === 'policy',
    vectors,
    ids,
    metadata
  );
  console.log('Hybrid search results:', results);
}
