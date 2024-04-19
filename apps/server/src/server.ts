import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import compute from "./routes/compute";
import http from "http";
import { WebSocketServer } from "ws";

export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors());

  // Init routes
  app
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/health", (req, res) => {
      return res.json({ ok: true });
    });

  app.use(compute);

  return app;
};

export const createWsServer = (server: http.Server) => {
  return new WebSocketServer({
    server,
  });
};
