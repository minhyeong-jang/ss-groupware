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
exports.postOfficeCheck = void 0;
const request = require("request-promise-native");
const postOfficeCheck = (res, { headers }, loginType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookieHeader = headers === null || headers === void 0 ? void 0 : headers.cookie;
        const result = yield request.post({
            url: "https://gw.musinsa.com/gw/insertComeLeaveEventApi.do",
            method: "POST",
            headers: {
                cookie: cookieHeader,
            },
            formData: {
                gbnCode: loginType,
            },
            json: true,
        });
        if (result.resultCode !== "SUCCESS") {
            res
                .status(400)
                .json(Object.assign(Object.assign({}, result), { message: "서버 오류가 발생하였습니다." }));
        }
        res.send({ message: result.resultMessage, code: 200 });
    }
    catch (err) {
        res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
    }
});
exports.postOfficeCheck = postOfficeCheck;
