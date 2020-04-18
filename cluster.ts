import * as cluster from 'cluster';

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %d died :(', worker.id, code, signal);
    cluster.fork();
  });
} else {
  require('./server');
}
