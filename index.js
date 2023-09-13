import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";

import { usersRoutes } from "./routes/users.routes.js";
import { moviesRoutes } from "./routes/movies.routes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

/*
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"],
  })
);
*/

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api", usersRoutes(), moviesRoutes());

app.use((req, res) => {
  console.log(`404: ${req.method} ${req.url}`);
  res.status(404).send("404: Page not found");
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
