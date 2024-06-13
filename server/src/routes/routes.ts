import express, { Router, Request, Response } from "express";

import { UserRouter, FinancialsRouter } from "../modules";

const router: Router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Health Check Passed" });
});

router.use("/api/users", UserRouter);
router.use("/api/financials", FinancialsRouter);

export default router;
