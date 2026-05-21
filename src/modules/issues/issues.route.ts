import { Router } from "express";
import { issuesController } from "./issues.controller";
import { auth } from "../../middleware/auth";

const route = Router();
route.post("/", auth, issuesController.createIssues);
route.get("/", auth, issuesController.getAllIssues);

export const issuesRouter = route;
