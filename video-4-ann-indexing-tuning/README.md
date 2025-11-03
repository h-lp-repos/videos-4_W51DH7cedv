# Video 4: ANN Indexing & Tuning (Simulated) in TypeScript

## Objective

Demonstrate an approximate nearest neighbor (ANN) search simulation and parameter tuning trade-offs.

## Setup

Ensure dependencies are installed and project built:

```bash
npm install
npm run build
```

## Usage

```bash
npm run start:video-4
```

Arguments:
- `--k`: number of nearest neighbors (default: 5)
- `--sampleRate`: fraction of dataset to sample for ANN simulation (0 < sampleRate ≤ 1)

Example:
```bash
npm run start:video-4 -- --k 5 --sampleRate 0.3
```

## Files

- `src/index.ts`: ANN simulation implementation and comparison to exact search.
- `tests/index.test.ts`: Basic test for ANN function.
