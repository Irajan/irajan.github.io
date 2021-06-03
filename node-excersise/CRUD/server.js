const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router"));

app.use((err, req, res, next) => {
  const status = err.status;
  const message = err.message;
  res.status(status).json({ message });
});

app.listen(4000, function () {
  console.log("Server is up and running");
});
