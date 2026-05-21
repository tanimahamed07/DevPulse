import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { issuesRouter } from "./modules/issues/issues.route";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRouter);

app.use(globalErrorHandler);

export default app;
