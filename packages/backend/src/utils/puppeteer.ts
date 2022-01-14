const puppeteer = require("puppeteer");

export const launchSetting = {
  headless: true, // 헤드리스모드의 사용여부를 묻는다
  devtools: false, // 브라우저의 개발자 모드의 오픈 여부를 묻는다
  executablePath: puppeteer.executablePath(), // 실행할 chromium 기반의 브라우저의 실행 경로를 지정한다.
  ignoreDefaultArgs: false, // 배열이 주어진 경우 지정된 기본 인수를 필터링한다.(중요 : true사용금지)
  timeout: 50000, // 브라우저 인스턴스가 시작될 때까지 대기하는 시간(밀리 초)
  defaultViewport: { width: 1000, height: 1000 }, // 실행될 브라우저의 화면 크기를 지정한다.
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
};
