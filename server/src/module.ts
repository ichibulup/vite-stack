import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import { resolve } from "node:path";

const isProduction = process.env.NODE_ENV === "production";
const indexPath = resolve(process.cwd(), "index.html");

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default function AppModule() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") ?? true,
      credentials: true,
    }),
  );
  app.use(morgan(isProduction ? "combined" : "dev"));
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      name: "backend.sid",
      secret: process.env.SESSION_SECRET ?? "local-development-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );
  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: "draft-8",
      legacyHeaders: false,
    }),
  );

  app.get("/", (_req, res) => {
    res.sendFile(indexPath);
  });

  app.get("/api/hello", (_req, res) => {
    res.json({ message: "Hello Express from Japtor" });
  });

  return app;
}
