import { Router } from "express";

export const apiRouter = Router();

// Api routes
apiRouter.use("/ping", (req, res) => res.json({
  message: "Pong!",
}));
