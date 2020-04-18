import "./tracer";

import * as express from 'express';
import axios from 'axios';
import * as os from 'os';

const app = express();

function fibo(n: number): number {
  if (n < 2) return 1;
  else return fibo(n - 2) + fibo(n - 1);
}

app.get('/fibo/:num', (req: express.Request, res: express.Response) => {
  res.send('Result: ' + fibo(+req.params.num));
});

app.get('/cpus', (req: express.Request, res: express.Response) => {
  res.send(os.cpus());
});

app.get('/sw/:id', async (req: express.Request, res: express.Response) => {
  const response = await axios.get('https://swapi.dev/api/planets/' + req.params.id);
  res.send(response.data);
});

app.get('/work', (req: express.Request, res: express.Response) => {
  var i = 0;
  while (i < 1e5) i++;
  res.send('i: ' + i);
});

app.get('/', (req: express.Request, res: express.Response) => {
  console.log(`Worker ${process.pid} running`);
  res.send('Hello World!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
