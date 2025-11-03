import fs from 'fs';
import path from 'path';

interface Metadata { id: string; [key: string]: any }
interface EmbeddingsData { ids: string[]; vectors: number[][]; metadata: Metadata[] }

export function loadData(filePath: string): EmbeddingsData {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as EmbeddingsData;
}

export function* batchIterator<T>(arr: T[], batchSize: number): Generator<T[]> {
  for (let i = 0; i < arr.length; i += batchSize) {
    yield arr.slice(i, i + batchSize);
  }
}

export class InMemoryIndex {
  ids: string[] = [];
  vectors: number[][] = [];
  metadata: Metadata[] = [];
  tombstone = new Set<string>();

  add(ids: string[], vectors: number[][], metadata: Metadata[]) {
    ids.forEach((id, i) => {
      this.ids.push(id);
      this.vectors.push(vectors[i]);
      this.metadata.push(metadata[i]);
    });
  }

  delete(id: string) {
    this.tombstone.add(id);
  }

  query(id: string): boolean {
    return !this.tombstone.has(id) && this.ids.includes(id);
  }

  persist(filePath: string) {
    fs.writeFileSync(
      filePath,
      JSON.stringify({ ids: this.ids, vectors: this.vectors, metadata: this.metadata }),
      'utf-8'
    );
  }

  static load(filePath: string): InMemoryIndex {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const idx = new InMemoryIndex();
    idx.ids = raw.ids;
    idx.vectors = raw.vectors;
    idx.metadata = raw.metadata;
    return idx;
  }
}

if (require.main === module) {
  const { ids, vectors, metadata } = loadData(
    path.resolve(__dirname, '../data/sample_embeddings.json')
  );
  const index = new InMemoryIndex();

  console.log('Starting batch ingestion:');
  for (const batchIds of batchIterator(ids, 2)) {
    const batchVecs = batchIds.map(id => vectors[ids.indexOf(id)]);
    const batchMeta = batchIds.map(id => metadata.find(m => m.id === id)!);
    index.add(batchIds, batchVecs, batchMeta);
    console.log(`Added batch of size ${batchIds.length}, total ${index.ids.length}`);
  }

  console.log('Performing incremental add:');
  index.add(['new1'], [[0.9, 0.9, 0.9]], [{ id: 'new1', tag: 'policy' }]);
  console.log('Query new1 exists:', index.query('new1'));

  console.log('Performing delete (tombstone) on "b":');
  index.delete('b');
  console.log('Query b exists:', index.query('b'));

  const persistPath = path.resolve(__dirname, '../data/index.json');
  index.persist(persistPath);
  console.log('Index persisted to', persistPath);

  const reloaded = InMemoryIndex.load(persistPath);
  console.log('Reloaded index size:', reloaded.ids.length);
}
