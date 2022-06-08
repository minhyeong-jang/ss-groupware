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
exports.pageLogin = void 0;
const user_1 = require("../types/user");
const pageLogin = (page, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("https://gw.musinsa.com/gw/uat/uia/actionLogout.do", {
        waitUntil: "networkidle2",
    });
    yield page.goto("https://gw.musinsa.com/gw/uat/uia/egovLoginUsr.do", {
        waitUntil: "networkidle2",
    });
    // 테스트용 wait
    // await page.waitFor(3000);
    return yield page.evaluate(({ userInfo: { id, pw, type }, CompanyType }) => {
        try {
            let response = {
                code: 200,
                message: "",
            };
            const loginParams = {
                isScLogin: "Y",
                scUserId: id,
                scUserPwd: window.securityEncrypt(pw),
                id: window.securityEncrypt(id),
                id_sub1: "",
                id_sub2: "",
                password: window.securityEncrypt(pw),
            };
            $.ajax({
                url: "https://gw.musinsa.com/gw/uat/uia/actionLogin.do",
                type: "post",
                async: false,
                data: loginParams,
                error: (error) => {
                    response = {
                        code: 400,
                        message: "서버 오류가 발생하였습니다.",
                        error,
                    };
                },
                success: (data) => {
                    if (!data.resultCode &&
                        data.indexOf("더존 그룹웨어에 오신것을 환영합니다.") !== -1) {
                        response = {
                            code: 400,
                            message: "로그인 계정을 다시 확인해주세요.",
                        };
                        return;
                    }
                    if (type === CompanyType.MUSINSALAB) {
                        $.ajax({
                            url: "https://gw.musinsa.com/gw/systemx/changeUserPositionProc.do",
                            type: "POST",
                            data: { seq: "musinsa|2986|3125" },
                            async: false,
                            success: (data) => {
                                if (data.indexOf("(주)무신사 랩") === -1) {
                                    response = {
                                        code: 400,
                                        message: "무신사랩 전환 중 오류가 발생했습니다.",
                                    };
                                    return;
                                }
                                response = {
                                    code: 200,
                                    message: "로그인 되었습니다.",
                                };
                            },
                            error: () => {
                                response = {
                                    code: 400,
                                    message: "무신사랩 전환 중 오류가 발생했습니다.",
                                };
                            },
                        });
                    }
                    else {
                        response = {
                            code: 200,
                            message: "로그인 되었습니다.",
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
    }, { userInfo, CompanyType: user_1.CompanyType });
});
exports.pageLogin = pageLogin;
