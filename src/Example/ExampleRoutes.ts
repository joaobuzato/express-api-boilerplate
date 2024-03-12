import Router from "express";
import ExampleController from "./ExampleController";

const ExampleRouter = Router();
const controller = new ExampleController();

ExampleRouter.get("/examples", async (req, res) => {
  const examples = await controller.getAll();

  return res.status(200).json(examples);
});

ExampleRouter.get("/examples/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id)){
    return res.status(400).send("BAD REQUEST")
  }
  const example = await controller.getById(id);
  if (!example) {
    return res.status(404).send("NOT FOUND")
  }
    return res.status(200).json(example);
});


export default ExampleRouter;
