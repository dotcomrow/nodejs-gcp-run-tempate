import express, { Express, Request, Response } from "express";
import Handlers from "./handler"

const app: Express = express();
const port = process.env.PORT || 8080;

app.post("/", async (req: Request, res: Response) => {
  res.send(await Handlers.hello(req));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});