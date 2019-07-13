const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://panel.soclminer.com.br");
  await Promise.all([page.waitForNavigation(), page.click("#fbLogin")]);
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" })]);
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
