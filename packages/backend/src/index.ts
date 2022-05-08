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
  postOfficeCheck,
} from "./apis";
import { userSession } from "./utils";
moment.tz.setDefault("Asia/Seoul");

const app = express();
const port = 5001;

app.use(
  cors({
    origin: [
      "http://local.ss-groupware.com:3000",
      "https://www.ss-groupware.com",
      "https://ss-groupware.com",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded());
app.use(express.json());

app.get("/profile", (req, res) => {
  userSession(res, req).then((isOK) => {
    isOK && postUserInfo(res, req);
  });
});
app.get("/session", (req, res) => {
  userSession(res, req).then((isOK) => {
    isOK && res.send(true);
  });
});
app.post("/login", (req, res) => {
  postUserLogin(res, req.body);
});
app.post("/office-check", (req, res) => {
  // console.log(req.headers["x-forwarded-for"] || req.socket.remoteAddress);
  userSession(res, req).then((isOK) => {
    isOK && postOfficeCheck(res, req, req.body.type);
  });
});
app.post("/bizcard", async (req, res) => {
  await postBizCardList(res, req.body);
});
// app.post("/bizcard-list", async (req, res) => {
//   userSession(res, req).then((isOK) => {
//     isOK && postBizCardList(res, req, req.body);
//   });
// });
app.post("/checkin", async (req, res) => {
  await postCheckin(res, req.body, "1");
});
app.post("/checkout", async (req, res) => {
  await postCheckin(res, req.body, "4");
});
app.post("/bizcard/submit", async (req, res) => {
  await postBizCardSubmit(res, req.body);
});

app.listen(port, () => {
  console.log("Express is listening on port", port);
});
