import express, { Express, Request, Response } from "express";
import Handlers from "./handler"

const app: Express = express();
const port = process.env.PORT || 8080;

app.post("/", async (req: Request, res: Response) => {
  console.log("POST /");
  const result = await Handlers.hello(req);
  const express_response = new Response(result.body, {
    status: result.statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
  res.send(express_response);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});