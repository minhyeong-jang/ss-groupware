"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const moment = require("moment");
require("moment-timezone");
const apis_1 = require("./apis");
const utils_1 = require("./utils");
moment.tz.setDefault("Asia/Seoul");
const app = express();
const port = 5001;
app.use(cors({
    origin: [
        "http://local.ss-groupware.com:3000",
        "https://www.ss-groupware.com",
        "https://ss-groupware.com",
    ],
    credentials: true,
}));
app.use(express.urlencoded());
app.use(express.json());
app.get("/profile", (req, res) => {
    (0, utils_1.userSession)(res, req).then((isOK) => {
        isOK && (0, apis_1.postUserInfo)(res, req);
    });
});
app.get("/session", (req, res) => {
    (0, utils_1.userSession)(res, req).then((isOK) => {
        isOK && res.send(true);
    });
});
app.post("/login", (req, res) => {
    (0, apis_1.postUserLogin)(res, req.body);
});
app.post("/logout", (req, res) => {
    res.clearCookie("GWSESSIONID");
    res.clearCookie("JSESSIONID");
    res.send({ message: "로그아웃 되었습니다.", code: 200 });
});
app.post("/office-check", (req, res) => {
    // console.log(req.headers["x-forwarded-for"] || req.socket.remoteAddress);
    (0, utils_1.userSession)(res, req).then((isOK) => {
        isOK && (0, apis_1.postOfficeCheck)(res, req, req.body.type);
    });
});
app.post("/bizcard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.userSession)(res, req).then((isOK) => {
        isOK && (0, apis_1.postBizCardList)(res, req, req.body);
    });
}));
app.post("/bizcard/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.userSession)(res, req).then((isOK) => {
        isOK && (0, apis_1.postBizCardSubmit)(res, req, req.body);
    });
}));
app.listen(port, () => {
    console.log("Express is listening on port", port);
});
