const cluster = require('cluster');

console.log(`PID master : ${process.pid}`);

cluster.setupMaster({
    exec: __dirname + '/servicio-fibonacci.js'
});

cluster.fork();
cluster.fork();
cluster.fork();

cluster
    .on('disconnect', (worker) => {
        console.log(`Se desconecto: ${worker.id}`);
    })
    .on('exit', (worker) => {
        console.log(`Salio: ${worker.id}`);
        cluster.fork();
    })
    .on('listening', (worker, {address, port}) =>{
        console.log(`Escuchando: ${address}:${port}`);
    });