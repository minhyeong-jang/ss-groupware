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
exports.postBizCardSubmit = void 0;
const puppeteer_1 = require("../utils/puppeteer");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const puppeteer = require("puppeteer");
const postBizCardSubmit = (res, { userInfo, items }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!items.length) {
        res.status(400).json({ message: "필수값을 선택해주세요." });
    }
    const browser = yield puppeteer.launch(puppeteer_1.launchSetting);
    try {
        const page = yield browser.newPage();
        const loginRes = yield (0, utils_1.pageLogin)(page, userInfo);
        if (loginRes.code !== 200) {
            res.status(loginRes.code).json(loginRes);
        }
        const pageRes = yield page.evaluate(({ items, FOOD_PARAMS, DRIVE_PARAMS }) => {
            try {
                let response = {
                    code: 200,
                };
                const params = { formSeq: "24" };
                $.ajax({
                    type: "post",
                    url: "https://gw.musinsa.com/exp/ex/expend/master/ExUserInitExpend.do",
                    async: false,
                    data: params,
                    success: (data) => {
                        items.map((item) => {
                            const targetParams = item.type === "FOOD" ? FOOD_PARAMS : DRIVE_PARAMS;
                            const params = Object.assign(Object.assign({}, targetParams), { target: JSON.stringify([
                                    {
                                        key: item.syncId,
                                        syncId: item.syncId,
                                    },
                                ]), authInfo: JSON.stringify(Object.assign(Object.assign({}, targetParams.authInfo), { seq: item.authSeq })), empInfo: JSON.stringify(Object.assign(Object.assign({}, targetParams.empInfo), { seq: item.empSeq, bizSeq: data.aaData.empInfo.bizSeq, compSeq: data.aaData.empInfo.compSeq, empSeq: data.aaData.empInfo.empSeq, empName: data.aaData.empInfo.empName, erpEmpSeq: data.aaData.empInfo.erpEmpSeq, erpCompSeq: data.aaData.empInfo.erpCompSeq, groupSeq: data.aaData.empInfo.groupSeq, createSeq: data.aaData.empInfo.empSeq, modifySeq: data.aaData.empInfo.empSeq, searchStr: data.aaData.empInfo.erpEmpSeq })), note: item.note });
                            $.ajax({
                                dataType: "json",
                                type: "post",
                                url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardInfoMapUpdate.do",
                                async: false,
                                data: params,
                                success: function (data) {
                                    var _a;
                                    if (((_a = data === null || data === void 0 ? void 0 : data.aaData) === null || _a === void 0 ? void 0 : _a.code) === "SUCCESS") {
                                        response = {
                                            code: 200,
                                            message: "SUCCESS",
                                        };
                                    }
                                    else {
                                        response = {
                                            code: 400,
                                            message: "에러가 발생하였습니다. 개발자에게 문의해주세요.",
                                        };
                                    }
                                },
                            });
                        });
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
        }, { items, FOOD_PARAMS: constants_1.FOOD_PARAMS, DRIVE_PARAMS: constants_1.DRIVE_PARAMS });
        yield page.waitFor(2000);
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
exports.postBizCardSubmit = postBizCardSubmit;
