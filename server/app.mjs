import express from "express";
import cors from "cors";
import http from "http";
import { userRouter } from "./v1/userRoutes.mjs";

import connectToMongoDB from "./db/database.mjs";
import { AppError } from "./utils/appError.mjs";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user/v1", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

connectToMongoDB();

const server = http.createServer(app);

const PORT = 3001;
app.listen(PORT, () => {
  console.info(`Server : Running at port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack || err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", async (err) => {
  console.error("Unhandled Rejection:", err.stack || err);
  server.close(() => {
    process.exit(1);
  });
});
