# Video 3: Exact k-NN Search (Brute-Force) in TypeScript

## Objective

Load embeddings from a local JSON file and perform exact k-NN search using brute-force.

## Setup

Make sure dependencies are installed and the project is built:

```bash
npm install
npm run build
```

## Usage

```bash
npm run start:video-3
```

This will load `data/sample_embeddings.json`, run a top-5 k-NN query on the first vector, and print the results.

## Sample Data

Located in `data/sample_embeddings.json`, includes:
- `ids`: Array of unique string identifiers.
- `vectors`: Array of embeddings (number arrays).
- `metadata`: Array of metadata objects matching each id.

## Files

- `src/index.ts`: Implementation of data loading and brute-force search.
- `tests/index.test.ts`: Basic test for the k-NN function.
