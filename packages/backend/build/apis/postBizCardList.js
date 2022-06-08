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
exports.postBizCardList = void 0;
const constants_1 = require("../constants");
const request = require("request-promise-native");
const postBizCardList = (res, { headers }, { startDate, endDate }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bizCardList = yield request.post({
            method: "POST",
            headers: {
                cookie: headers === null || headers === void 0 ? void 0 : headers.cookie,
            },
            json: true,
            url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardListInfoSelect.do",
            formData: Object.assign(Object.assign({}, constants_1.BIZ_CARD_LIST), { searchFromDate: startDate, searchToDate: endDate }),
        });
        const newData = bizCardList.aaData.map((item) => ({
            syncId: item.syncId,
            authSeq: item.authSeq,
            empSeq: item.empSeq,
            mercName: item.mercName,
            mccName: item.mccName,
            authDate: item.authDate,
            authTime: item.authTime,
            requestAmount: item.requestAmount,
            note: item.note,
        }));
        res.send({
            bizCardList: newData,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
    }
});
exports.postBizCardList = postBizCardList;
