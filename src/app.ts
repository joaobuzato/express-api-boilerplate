import express from "express";
import ExampleRouter from "./Example/ExampleRoutes";

const Router = express.Router();
const app = express();

Router.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use(ExampleRouter);
app.use(Router);

export default app;
