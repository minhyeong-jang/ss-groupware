import "dotenv/config";
import * as express from "express";
import * as cors from "cors";
import "moment-timezone";
import * as moment from "moment";
import {
  postUserInfo,
  postBizCardList,
  postBizCardSubmit,
  postCheckin,
  postUserLogin,
} from "./apis";
import { userSession } from "./utils";
moment.tz.setDefault("Asia/Seoul");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// app.get("/user", (req, res) => {
//   userSession(res, req).then((isOK) => {
//     isOK && postUserInfo(res, req);
//   });
// });
app.get("/session", (req, res) => {
  userSession(res, req);
});
app.post("/login", (req, res) => {
  postUserLogin(res, req.body);
});
app.post("/checkin", async (req, res) => {
  await postCheckin(res, req.body, "1");
});
app.post("/checkout", async (req, res) => {
  await postCheckin(res, req.body, "4");
});
app.post("/bizcard", async (req, res) => {
  await postBizCardList(res, req.body);
});
app.post("/bizcard/submit", async (req, res) => {
  await postBizCardSubmit(res, req.body);
});

app.listen(port, () => {
  console.log("Express is listening on port", port);
});
