# Video 6: Batching, Bulk Ingestion & Incremental Updates in TypeScript

## Objective

Demonstrate batching ingestion with retry/backoff, incremental add/delete of vectors, and index persistence.

## Setup

```bash
npm install
npm run build
```

## Usage

```bash
npm run start:video-6
```

This will:
1. Load `data/sample_embeddings.json`.
2. Ingest in batches with logging.
3. Add new vectors and validate queries.
4. Delete a vector by ID using tombstone pattern.
5. Persist and reload the index.

## Files

- `src/batching.ts`: Implementation of batching and incremental updates.
- `tests/batching.test.ts`: Tests for batch iterator and delete logic.
