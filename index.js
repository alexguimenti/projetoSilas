const puppeteer = require("puppeteer");
const credentials = require("./credentials");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://panel.soclminer.com.br");
  const nav = new Promise(res => browser.on("targetcreated", res));
  await Promise.all([
    page.waitForSelector("#fbLogin"),
    console.log(`page url: ${page.url()}`),
    page.click("#fbLogin")
  ]);
  await nav;
  await browser.pages(); // get all open pages by the browser
  const pages = await browser.pages();
  const popup = pages[pages.length - 1];
  await Promise.all([
    popup.waitForSelector("#email"),
    console.log(`popup url: ${popup.url()}`)
  ]);
  await popup.type("#email", credentials.email);
  await popup.type("#pass", credentials.pass);
  await popup.click("#loginbutton");

  await page.waitFor("#bt-menu");
  await page.goto(
    "https://panel.soclminer.com.br/app/f6ff038c-24ee-43d4-b624-7fd945bb6929"
  );

  await page.screenshot({ path: "example.png" });
  // await browser.close();
})();
