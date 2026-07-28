import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const corsOptions: cors.CorsOptions = {
  // Allow any origin (Replit proxy, deployed domain, local dev)
  origin: true,
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  // Must explicitly list custom headers or the preflight OPTIONS will be rejected
  allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Password"],
  optionsSuccessStatus: 204,
};

// Handle OPTIONS preflight for every route BEFORE other middleware
// Express 5 + path-to-regexp@8 reject bare "*" — use a regex instead
app.options(/(.*)/, cors(corsOptions));
app.use(cors(corsOptions));

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
