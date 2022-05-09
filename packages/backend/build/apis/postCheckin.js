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
exports.postCheckin = void 0;
const utils_1 = require("../utils");
const puppeteer_1 = require("../utils/puppeteer");
const puppeteer = require("puppeteer");
const postCheckin = (res, userInfo, loginType) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch(puppeteer_1.launchSetting);
    try {
        const page = yield browser.newPage();
        const loginRes = yield (0, utils_1.pageLogin)(page, userInfo);
        if (loginRes.code !== 200) {
            res.status(loginRes.code).json(loginRes);
        }
        const pageRes = yield page.evaluate(({ loginType }) => {
            try {
                let response = {
                    code: 200,
                };
                const tblParam = { gbnCode: loginType };
                $.ajax({
                    url: "https://gw.musinsa.com/gw/insertComeLeaveEventApi.do",
                    type: "post",
                    data: tblParam,
                    async: false,
                    error: (error) => {
                        response = {
                            code: 400,
                            message: "서버 오류가 발생하였습니다.",
                            error,
                        };
                    },
                    success: function (data) {
                        if (data.resultCode == "SUCCESS") {
                            response = {
                                message: data.resultMessage,
                                code: 200,
                            };
                        }
                        else {
                            response = {
                                code: 400,
                                message: "서버 에러가 발생하였습니다.",
                            };
                        }
                    },
                });
                return response;
            }
            catch (error) {
                return {
                    code: error.code,
                    message: error.message,
                };
            }
        }, { loginType });
        pageRes.code === 200
            ? res.send(pageRes)
            : res.status(pageRes.code).json(pageRes);
    }
    catch (err) {
        res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
    }
    finally {
        yield browser.close();
    }
});
exports.postCheckin = postCheckin;
