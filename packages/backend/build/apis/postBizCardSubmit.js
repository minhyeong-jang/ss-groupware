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
const constants_1 = require("../constants");
const request = require("request-promise-native");
const postBizCardSubmit = (res, { headers }, { items }) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = headers === null || headers === void 0 ? void 0 : headers.cookie;
    if (!items.length) {
        res.status(400).json({ message: "필수값을 선택해주세요." });
    }
    try {
        const exUserInitExpend = yield request.post({
            method: "POST",
            headers: { cookie },
            json: true,
            url: "https://gw.musinsa.com/exp/ex/expend/master/ExUserInitExpend.do",
            formData: { formSeq: "24" },
        });
        const result = yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return yield new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                try {
                    const targetParams = item.type === "FOOD" ? constants_1.FOOD_PARAMS : constants_1.DRIVE_PARAMS;
                    const formData = Object.assign(Object.assign({}, targetParams), { target: JSON.stringify([
                            {
                                key: item.syncId,
                                syncId: item.syncId,
                            },
                        ]), authInfo: JSON.stringify(Object.assign(Object.assign({}, targetParams.authInfo), { seq: item.authSeq })), empInfo: JSON.stringify(Object.assign(Object.assign({}, targetParams.empInfo), { seq: item.empSeq, bizSeq: exUserInitExpend.aaData.empInfo.bizSeq, compSeq: exUserInitExpend.aaData.empInfo.compSeq, empSeq: exUserInitExpend.aaData.empInfo.empSeq, empName: exUserInitExpend.aaData.empInfo.empName, erpEmpSeq: exUserInitExpend.aaData.empInfo.erpEmpSeq, erpCompSeq: exUserInitExpend.aaData.empInfo.erpCompSeq, groupSeq: exUserInitExpend.aaData.empInfo.groupSeq, createSeq: exUserInitExpend.aaData.empInfo.empSeq, modifySeq: exUserInitExpend.aaData.empInfo.empSeq, searchStr: exUserInitExpend.aaData.empInfo.erpEmpSeq })), note: item.note });
                    const data = yield request.post({
                        headers: { cookie },
                        json: true,
                        url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardInfoMapUpdate.do",
                        formData: formData,
                    });
                    if (((_a = data === null || data === void 0 ? void 0 : data.aaData) === null || _a === void 0 ? void 0 : _a.code) === "SUCCESS") {
                        return resolve(true);
                    }
                    else {
                        return resolve(false);
                    }
                }
                catch (e) {
                    console.log(e);
                    return resolve(false);
                }
            }));
        })));
        const isFailed = result.filter((isSuccess) => !isSuccess).length;
        if (isFailed) {
            res.send({
                message: `총 ${result.length}개 중 ${isFailed}개가 실패했습니다.`,
                code: 400,
            });
        }
        else {
            res.send({ message: "정상적으로 반영되었습니다.", code: 200 });
        }
    }
    catch (err) {
        res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
    }
});
exports.postBizCardSubmit = postBizCardSubmit;
