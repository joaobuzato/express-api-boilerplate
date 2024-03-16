import Router from "express";
import ExampleController from "./ExampleController";
import { Example } from "./Example";

const ExampleRouter = Router();
const controller = new ExampleController();

ExampleRouter.get("/examples", async (req, res) => {
  const examples = await controller.getAll();

  return res.status(200).json(examples);
});

ExampleRouter.get("/examples/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).send("BAD REQUEST");
  }
  const example = await controller.getById(id);
  if (!example) {
    return res.status(404).send("NOT FOUND");
  }
  return res.status(200).json(example);
});

ExampleRouter.post("/examples", async (req, res) => {
  const example = req.body as Example;
  const result = await controller.create(example);
  if (!result) {
    return res.status(500).send("INTERNAL SERVER ERROR");
  }
  return res.status(201).send("CREATED");
});

ExampleRouter.put("/examples/:id", async (req, res) => {
  const example = req.body as Example;
  example.id = Number(req.params.id);
  if (!example.id || isNaN(example.id)) {
    return res.status(400).send("BAD REQUEST");
  }
  const result = await controller.update(example);
  if (!result) {
    return res.status(500).send("INTERNAL SERVER ERROR");
  }
  return res.status(200).send("OK");
});

ExampleRouter.delete("/examples/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).send("BAD REQUEST");
  }
  const result = await controller.delete(id);
  if (!result) {
    return res.status(500).send("INTERNAL SERVER ERROR");
  }
  return res.status(200).send("OK");
});

export default ExampleRouter;
