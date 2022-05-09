"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchSetting = void 0;
const puppeteer = require("puppeteer");
exports.launchSetting = {
    headless: true,
    devtools: false,
    executablePath: puppeteer.executablePath(),
    ignoreDefaultArgs: false,
    timeout: 50000,
    defaultViewport: { width: 1000, height: 1000 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
};
