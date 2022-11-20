import { ResponseModel } from "../types";
import { CompanyType, UserInfoModel } from "../types/user";

export const pageLogin = async (page, userInfo: UserInfoModel) => {
  await page.goto("https://gw.musinsa.com/gw/uat/uia/actionLogout.do", {
    waitUntil: "networkidle2",
  });
  await page.goto("https://gw.musinsa.com/gw/uat/uia/egovLoginUsr.do", {
    waitUntil: "networkidle2",
  });

  // 테스트용 wait
  // await page.waitFor(3000);

  return await page.evaluate(
    ({ userInfo: { id, pw, type }, CompanyType }) => {
      try {
        let response: ResponseModel = {
          code: 200,
          message: "",
        };
        const loginParams = {
          isScLogin: "Y",
          scUserId: id,
          scUserPwd: (window as any).securityEncrypt(pw),
          id: (window as any).securityEncrypt(id),
          id_sub1: "",
          id_sub2: "",
          password: (window as any).securityEncrypt(pw),
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
            if (
              !data.resultCode &&
              data.indexOf("더존 그룹웨어에 오신것을 환영합니다.") !== -1
            ) {
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
                  response = {
                    code: 200,
                    message: "로그인 되었습니다.",
                  };
                },
                error: () => {
                  response = {
                    code: 400,
                    message: "전환 중 오류가 발생했습니다.",
                  };
                },
              });
            } else {
              response = {
                code: 200,
                message: "로그인 되었습니다.",
              };
            }
          },
        });
        return response;
      } catch (error) {
        return {
          code: error.code,
          message: error.message,
        };
      }
    },
    { userInfo, CompanyType }
  );
};
