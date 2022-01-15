import { ResponseModel } from "../types";

export const pageLogin = async (page, { id, pw }) => {
  await page.goto("https://gw.musinsa.com/gw/uat/uia/actionLogout.do", {
    waitUntil: "networkidle2",
  });
  await page.goto("https://gw.musinsa.com/gw/uat/uia/egovLoginUsr.do", {
    waitUntil: "networkidle2",
  });

  return await page.evaluate(
    ({ id, pw }) => {
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
            // const userName = data.match(
            //   /[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\/\_\s\:\.\"\<\>\=]*<span class="txt_nm">([^\<]*)/
            // )?.[1];
            response = {
              code: 200,
            };
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
    { id, pw }
  );
};
