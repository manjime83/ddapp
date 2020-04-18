import * as cluster from 'cluster';
import * as os from 'os';

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %d died :(', worker.id, code, signal);
    cluster.fork();
  });
} else {
  require('./app');
}
