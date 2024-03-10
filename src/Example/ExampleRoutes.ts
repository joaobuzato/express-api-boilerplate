import Router from "express";
import ExampleController from "./ExampleController";

const ExampleRouter = Router();
const controller = new ExampleController();

ExampleRouter.get("/examples", async (req, res) => {
  const examples = await controller.getAll();

  return res.status(200).json(examples);
});

export default ExampleRouter;
