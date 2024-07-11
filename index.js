import express from "express";
import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;
const port = 3000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Forking a new worker!");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/fibonacci/:num", (req, res) => {
    const num = parseInt(req.params.num, 10);

    if (isNaN(num) || num < 0) {
      return res.status(400).send("Invalid number");
    }

    const fibonacci = (n) => {
      if (n < 2) {
        return n;
      }
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    const result = fibonacci(num);
    res.send(`Fibonacci of ${num} is ${result} (computed by process ${process.pid})`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
