# apollo-typeorm-poc

This repo contains a proof of concept to support the analysis of performance issues in a Apollo-based graphql server.

## Setup

- `npm i`
- `docker-compose up -d`
- `npm run dev`

## Contents

- typescript codebase
- postgres database seeded with relatively small amounts of data
- Apollo server using TypeOrm running on port 4000
- Fastify server using node-pg running on port 3000

## Performance

Load tests executed via [autocannon](https://github.com/mcollina/autocannon).

### Apollo

#### autocannon command

```
npx autocannon -H 'content-type: application/json' -b '{"query":"query { salesTypeOrm { amount date id userId storeId productId } } "}' -m POST http://localhost:4000
```

#### Output

```
┌─────────┬───────┬───────┬───────┬───────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼──────────┼────────┤
│ Latency │ 28 ms │ 32 ms │ 53 ms │ 73 ms │ 35.73 ms │ 29.51 ms │ 575 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴──────────┴────────┘
┌───────────┬────────┬────────┬─────────┬─────────┬─────────┬────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min    │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ Req/Sec   │ 112    │ 112    │ 298     │ 326     │ 275.8   │ 58.34  │ 112    │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ Bytes/Sec │ 1.4 MB │ 1.4 MB │ 3.72 MB │ 4.06 MB │ 3.44 MB │ 727 kB │ 1.4 MB │
└───────────┴────────┴────────┴─────────┴─────────┴─────────┴────────┴────────┘
```

### Fastify

#### autocannon command

```
npx autocannon -H 'content-type: application/json' -b '{"query":"query { salesPg { amount date id userId storeId productId } } "}' -m POST http://localhost:3000/graphql
```

#### Output

```
┌─────────┬───────┬───────┬───────┬───────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼──────────┼────────┤
│ Latency │ 17 ms │ 21 ms │ 33 ms │ 37 ms │ 23.21 ms │ 20.18 ms │ 452 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 262     │ 262     │ 429     │ 481     │ 422     │ 58.02  │ 262     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Bytes/Sec │ 3.53 MB │ 3.53 MB │ 5.78 MB │ 6.49 MB │ 5.69 MB │ 782 kB │ 3.53 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴────────┴─────────┘
```
