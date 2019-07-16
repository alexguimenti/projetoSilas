const puppeteer = require("puppeteer");
const CreateCampaignController = require("./controllers/CreateCampaignController");
const FacebookLoginController = require("./controllers/FacebookLoginController");

const types = ["campanhas", "onsites", "bounces", "optins"]

if (!types.includes(process.argv[2])) {
  console.log("Entrar com uma das opções: 'campanhas', 'onsites', 'bounces', ou 'optins'!");
}
else {
  (async () => {

    // start puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // go to panel
    await page.goto("https://panel.soclminer.com.br");
    await FacebookLoginController.facebookLogin(browser, page);
    // wait panel to load
    await page.waitFor("#bt-menu");
    if (!process.argv[2] === "campanhas") {
      await CreateCampaignController.campaignCreator(page)
    } else {
      console.log(`Script para ${process.argv[2]} ainda não está disponível!`);
      await browser.close();
    }
  })()
};