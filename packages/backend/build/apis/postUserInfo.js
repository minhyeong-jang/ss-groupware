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
exports.postUserInfo = void 0;
const constants_1 = require("../constants");
const moment = require("moment");
const request = require("request-promise-native");
const postUserInfo = (res, { headers }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const requestHeaders = {
            method: "POST",
            headers: {
                cookie: headers === null || headers === void 0 ? void 0 : headers.cookie,
            },
            json: true,
        };
        // 유저 정보
        const userRes = yield request.post(Object.assign(Object.assign({}, requestHeaders), { url: "https://gw.musinsa.com/attend/api/attend/searchPersonnalAttendStat", body: {
                approveYn: "",
                attDivCode: "",
                attItemCode: "",
                endDate: "20220506",
                startDate: "20220406",
            } }));
        // 휴가 정보
        const restRes = yield request.post(Object.assign(Object.assign({}, requestHeaders), { url: "https://gw.musinsa.com/attend/WebAnnv/SearchPersonAnnvMstList" }));
        // 근태 정보
        const workRes = yield request.post(Object.assign(Object.assign({}, requestHeaders), { url: "https://gw.musinsa.com/attend/api/attend/getSearchPersonAttList", body: {
                approveYn: "",
                attDivCode: "",
                attItemCode: "",
                endDate: moment().endOf("month").format("YYYYMMDD"),
                page: 1,
                pageNum: 1,
                pageSize: 31,
                skip: 0,
                startDate: moment().startOf("month").format("YYYYMMDD"),
                take: 10,
            } }));
        // 법인카드 사용 금액
        const bizCardList = yield request.post(Object.assign(Object.assign({}, requestHeaders), { url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardListInfoSelect.do", formData: Object.assign(Object.assign({}, constants_1.BIZ_CARD_LIST), { searchFromDate: moment().startOf("month").format("YYYYMMDD"), searchToDate: moment().endOf("month").format("YYYYMMDD") }) }));
        const bizCardTotalPrice = bizCardList.aaData.reduce((curr, next) => curr + next.requestAmount, 0);
        const filterToday = workRes.result.resultList.filter((item) => moment().isAfter(moment(item.attDate, "YYYYMMDD")))[0];
        const isTodayWork = moment().subtract(6, "h").format("YYYYMMDD") === (filterToday === null || filterToday === void 0 ? void 0 : filterToday.attDate);
        res.send({
            restDay: ((_b = (_a = restRes.result) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.restAnnvDayCnt) || 0,
            profile: {
                userName: userRes.result.empName,
                deptName: userRes.result.deptName,
            },
            workToday: {
                comeAt: isTodayWork ? filterToday.comeDt : "",
                leaveAt: isTodayWork ? filterToday.leaveDt : "",
            },
            bizCardTotalPrice,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
    }
});
exports.postUserInfo = postUserInfo;
