import express, { Express, Request, Response } from "express";
import Handlers from "./handler.js"
import axios from "axios";

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json()) 

app.post("/", async (req: Request, res: Response) => {
  const auth_header = req.header("Authorization");
  if (!auth_header) {
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }

  console.log("auth_header", auth_header);
  const bearer_token = auth_header.split(" ")[1];
  var response = await axios.get("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + bearer_token);

  if (response.data.error) {
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }

  if (response.data.email != process.env.SHARED_SERVICE_ACCOUNT_EMAIL) {
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }

  const { status, body } = await Handlers.handleRequest(req.body, response.data);
  res.status(status).setHeader(
    "Content-Type", "application/json"
  ).send(body);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});