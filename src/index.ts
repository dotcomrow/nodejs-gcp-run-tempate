import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 8080;

app.post("/", (req: Request, res: Response) => {
  console.log("POST /");
  res.send({
    message: "Hello World!"
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});