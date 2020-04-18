"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./tracer");
const cluster = require("cluster");
const os = require("os");
if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });
}
else {
    const express = require('express');
    const app = express();
    function fibo(n) {
        if (n < 2)
            return 1;
        else
            return fibo(n - 2) + fibo(n - 1);
    }
    app.get('/fibo/:num', (req, res) => {
        res.send('Result: ' + fibo(+req.params.num));
    });
    app.get('/cpus', (req, res) => {
        res.send('cpus: ' + os.cpus().length);
    });
    app.get('/work', (req, res) => {
        var i = 0;
        while (i < 1e5)
            i++;
        res.send('i: ' + i);
    });
    app.get('/', (req, res) => {
        console.log(`Worker ${process.pid} runnnig`);
        res.send('Hello World!');
    });
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
}
