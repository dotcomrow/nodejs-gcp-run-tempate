import express, { Express, Request, Response } from "express";
import Handlers from "./handler.js"

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json()) 

app.post("/", async (req: Request, res: Response) => {
  const { status, body } = await Handlers.handleRequest(req);
  res.status(status).setHeader(
    "Content-Type", "application/json"
  ).send(body);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});