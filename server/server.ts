import express from "express";

const app = express();
app.listen(3000);

app.use("/", express.static(__dirname + "/../web"));
console.log(__dirname + "/../web");