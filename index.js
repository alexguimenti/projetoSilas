const puppeteer = require("puppeteer");
const credentials = require("./credentials");

(async () => {
  // startup puppeteer
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // go to panel
  await page.goto("https://panel.soclminer.com.br");
  const nav = new Promise(res => browser.on("targetcreated", res));

  // click loggin button
  await Promise.all([page.waitForSelector("#fbLogin"), page.click("#fbLogin")]);
  await nav;
  await browser.pages();
  const pages = await browser.pages();

  // select popup window
  const popup = pages[pages.length - 1];

  // enter credentials and login
  await Promise.all([popup.waitForSelector("#email")]);
  await popup.type("#email", credentials.email);
  await popup.type("#pass", credentials.pass);
  await popup.click("#loginbutton");

  // wait to panel to load
  await page.waitFor("#bt-menu");

  // choose customer
  await page.goto(
    "https://panel.soclminer.com.br/app/f6ff038c-24ee-43d4-b624-7fd945bb6929"
  );

  // go to manual campaign creation
  await page.goto(
    "https://panel.soclminer.com.br/campaign/push/Create?newcampaign=True&campaigntype=5"
  );

  await page.screenshot({ path: "example.png" });
  // await browser.close();
})();
