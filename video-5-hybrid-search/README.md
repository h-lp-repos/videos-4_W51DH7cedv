# Video 5: Hybrid Search - Vector Similarity + Metadata Filtering in TypeScript

## Objective

Combine vector similarity search with metadata filters to return top-k results satisfying filter criteria.

## Setup

```bash
npm install
npm run build
```

## Usage

```bash
npm run start:video-5
```

This runs a sample hybrid search over `data/sample_embeddings.json` filtering by metadata `tag === 'policy'`.

## Files

- `src/hybrid.ts`: Hybrid search implementation.
- `tests/hybrid.test.ts`: Basic tests for hybrid search.
- `data/sample_embeddings.json`: Sample embeddings and metadata.
