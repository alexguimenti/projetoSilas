const puppeteer = require("puppeteer");
const CreateCampaignController = require("./controllers/CreateCampaignController");
const FacebookLoginController = require("./controllers/FacebookLoginController");

//const types = ["campanhas", "onsites", "bounces", "optins"]

(async () => {

  // start puppeteer
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // go to panel
  await page.goto("https://panel.soclminer.com.br");
  await FacebookLoginController.facebookLogin(browser, page);
  // wait panel to load
  await page.waitFor("#bt-menu");

  await CreateCampaignController.campaignCreator(page)
})()
