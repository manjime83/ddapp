import * as cluster from 'cluster';
import * as os from 'os';

import { Request, Response } from 'express';

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %d died :(', worker.id, code, signal);
    // cluster.fork();
  });
} else {
  require('dd-trace').init({ analytics: true, logInjection: true, runtimeMetrics: true });

  const express = require('express');
  const app = express();

  function fibo(n: number): number {
    if (n < 2) return 1;
    else return fibo(n - 2) + fibo(n - 1);
  }

  app.get('/fibo/:num', (req: Request, res: Response) => {
    res.send('Result: ' + fibo(+req.params.num));
  });

  app.get('/cpus', (req: Request, res: Response) => {
    res.send(os.cpus());
  });

  app.get('/work', (req: Request, res: Response) => {
    var i = 0;
    while (i < 1e5) i++;
    res.send('i: ' + i);
  });

  app.get('/', (req: Request, res: Response) => {
    console.log(`Worker ${process.pid} running`);
    res.send('Hello World!');
  });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
}
