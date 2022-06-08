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
exports.userSession = void 0;
const request = require("request-promise-native");
const userSession = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookieHeader = req === null || req === void 0 ? void 0 : req.headers.cookie;
        const filterCookie = cookieHeader
            .split("; ")
            .filter((item) => item.match(/(GWSESSIONID)|(JSESSIONID)/));
        if (!filterCookie.length) {
            res.status(403).json({ message: "로그인이 필요합니다." });
            return false;
        }
        const options = {
            url: "https://gw.musinsa.com/gw/uat/uia/serverSessionReset.do",
            method: "POST",
            headers: {
                cookie: filterCookie.join("; "),
            },
            json: true,
        };
        const response = yield request.post(options);
        if (!(response === null || response === void 0 ? void 0 : response.isAuthenticated)) {
            res.status(403).json({ message: "로그인이 필요합니다." });
            return false;
        }
        return true;
    }
    catch (e) {
        res.status(403).json({ message: "로그인이 필요합니다." });
        return false;
    }
});
exports.userSession = userSession;
