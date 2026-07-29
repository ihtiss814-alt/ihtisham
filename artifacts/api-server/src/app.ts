import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();

const ALLOWED_ORIGINS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/wazirtradingllc\.com$/,
  /^https:\/\/www\.wazirtradingllc\.com$/,
  // Replit preview domains (.replit.dev and .repl.co)
  /\.replit\.dev$/,
  /\.repl\.co$/,
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests (no Origin header)
    if (!origin) return callback(null, true);
    const allowed = ALLOWED_ORIGINS.some((pattern) => pattern.test(origin));
    callback(allowed ? null : new Error(`CORS: origin not allowed — ${origin}`), allowed);
  },
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

// The Replit reverse proxy forwards /api/* to this service WITHOUT stripping
// the prefix, so routes must be mounted under /api to match.
// The Vite dev proxy also forwards the full /api/* path (no rewrite).
app.use('/api', router);

export default app;
