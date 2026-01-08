import express from "express";

import second from '#middlewares/test.middleware.js'

const app = express();
const port = process.env.PORT ?? "9001";

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sents");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});