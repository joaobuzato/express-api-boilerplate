import Router from "express";
import ExampleController from "./ExampleController";

const ExampleRouter = Router();
const controller = new ExampleController();

ExampleRouter.get("/examples", async (req, res) => {
  const examples = await controller.getAll();

  return res.status(200).json(examples);
});

ExampleRouter.get("/examples/:id", async (req, res) => {
  const id = req.params.id;
  if (!id){
    res.status(400).json("BAD REQUEST")
  }
  const examples = await controller.getById(Number(id));

  return res.status(200).json(examples);
});

export default ExampleRouter;
