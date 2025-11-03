# Video 7: Benchmark Harness - Latency & Throughput Simulation in TypeScript

## Objective

Measure single-query latency, P95, and simulate concurrent throughput against a local vector search implementation.

## Setup

```bash
npm install
npm run build
```

## Usage

Single-mode latency test:
```bash
npm run start:video-7 -- --mode single --numQueries 50 --k 5
```

Concurrency-mode throughput test:
```bash
npm run start:video-7 -- --mode concurrency --numQueries 100 --concurrency 10 --k 5
```

Dry-run to print parameters without executing queries:
```bash
npm run start:video-7 -- --dryRun
```

## Files

- `src/benchmark.ts`: Benchmark harness implementation.
- `tests/benchmark.test.ts`: Tests for statistics calculation.
