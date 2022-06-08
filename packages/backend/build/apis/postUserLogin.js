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
exports.postUserLogin = void 0;
const utils_1 = require("../utils");
const puppeteer_1 = require("../utils/puppeteer");
const puppeteer = require("puppeteer");
const postUserLogin = (res, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch(puppeteer_1.launchSetting);
    try {
        const page = yield browser.newPage();
        const loginRes = yield (0, utils_1.pageLogin)(page, userInfo);
        if (loginRes.code !== 200) {
            res.status(loginRes.code).json(loginRes);
        }
        const cookies = yield page.cookies();
        cookies.map((cookie) => {
            res.cookie(cookie.name, cookie.value);
        });
        loginRes.code === 200
            ? res.send(loginRes)
            : res.status(loginRes.code).json(loginRes);
    }
    catch (err) {
        res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
    }
    finally {
        yield browser.close();
    }
});
exports.postUserLogin = postUserLogin;
