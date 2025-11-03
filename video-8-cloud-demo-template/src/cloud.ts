import dotenv from 'dotenv';
import { PineconeClient } from '@pinecone-database/pinecone';

dotenv.config();

async function main() {
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT;
  const indexName = process.env.PINECONE_INDEX_NAME || 'example-index';

  if (!apiKey || !environment) {
    throw new Error('Missing PINECONE_API_KEY or PINECONE_ENVIRONMENT');
  }

  const client = new PineconeClient();
  await client.init({ apiKey, environment });
  const existing = await client.listIndexes();
  if (!existing.includes(indexName)) {
    await client.createIndex({ name: indexName, dimension: 3 });
    console.log(`Created index ${indexName}`);
  }

  const index = client.Index(indexName);
  const vectors = [
    { id: 'a', values: [0.1, 0.2, 0.3], metadata: { tag: 'policy' } },
    { id: 'b', values: [0.5, 0.4, 0.1], metadata: { tag: 'survey' } }
  ];

  await index.upsert({ upsertRequest: { vectors } });
  console.log('Upserted sample vectors');

  const queryResponse = await index.query({ queryRequest: { topK: 2, includeMetadata: true, vector: [0.1, 0.2, 0.3] } });
  console.log('Query results:', queryResponse.matches);

  await client.deleteIndex({ indexName });
  console.log(`Deleted index ${indexName}`);
}

if (require.main === module) {
  main().catch(err => console.error(err));
}
