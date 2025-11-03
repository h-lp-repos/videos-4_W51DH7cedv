# Lesson 2: Vector Databases - Indexing and Retrieval for LLMs - TypeScript Examples

This repository contains TypeScript examples and guided exercises corresponding to Video 1 to Video 8 of Module 2, Class 02: "Vector Databases: Indexing and Retrieval for LLMs".

## Structure

- video-1-environment-setup/
  - Setup Node.js and TypeScript environment.
- video-2-quick-tour/
  - Overview of repository structure and running scripts.
- video-3-exact-knn/
  - Brute-force ingestion of embeddings and k-NN search.
- video-4-ann-indexing-tuning/
  - Approximate Nearest Neighbors (ANN) search simulation and parameter tuning.
- video-5-hybrid-search/
  - Hybrid search combining vector similarity with metadata filters.
- video-6-batching-incremental-updates/
  - Bulk ingestion with batching, retry/backoff, incremental add/delete, index persistence.
- video-7-benchmark-harness/
  - Latency and throughput measurement harness (single and concurrent).
- video-8-cloud-demo-template/
  - Template for cloud vector DB demo (e.g., Pinecone) with upsert and query.

## Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Scripts

- `npm run build` - compile TypeScript sources.
- `npm run test` - run tests.
- `npm start:video-3` - run exact k-NN example.
- `npm start:video-4` - run ANN example.
- `npm start:video-5` - run hybrid search example.
- `npm start:video-6` - run batching ingestion example.
- `npm start:video-7` - run benchmark harness.
- `npm start:video-8` - run cloud demo template.

### Extending to real vector DBs

See notes in individual video READMEs for instructions on extending to Pinecone, Weaviate, etc.

## Dependencies Justification

- `typescript`, `ts-node` - for TypeScript development and execution.
- `jest`, `ts-jest` - for tests.
- `dotenv` - to load environment variables securely.
- `@pinecone-database/pinecone` - lightweight client for cloud vector DB demo (Video 8).
