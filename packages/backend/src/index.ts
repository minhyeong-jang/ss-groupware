import "dotenv/config";
import * as express from "express";
import * as cors from "cors";
import "moment-timezone";
import * as moment from "moment";
import { postCheckin } from "./apis";
moment.tz.setDefault("Asia/Seoul");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.post("/checkin", async (req, res) => {
  await postCheckin(res, req.body, "1");
});
app.post("/checkout", async (req, res) => {
  await postCheckin(res, req.body, "4");
});

app.listen(port, () => {
  console.log("Express is listening on port", port);
});
