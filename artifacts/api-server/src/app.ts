import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: Request) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: Response) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vercel can invoke this catch-all function with either the original `/api`
// prefix or with the prefix already stripped. Mount both shapes so the same
// server works behind the frontend rewrite and when called directly.
app.use("/api", router);
app.use(router);

export default app;
