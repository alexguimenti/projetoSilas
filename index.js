const puppeteer = require("puppeteer");
const CreateCampaignController = require("./controllers/CreateCampaignController");
const FacebookLoginController = require("./controllers/FacebookLoginController");
const readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);

console.log("");
console.log("Digite o código para o tipo de campanha/plugin você quer subir:");
console.log("");
console.log("[1] - Campanhas Manuais");
console.log("[2] - Optins");
console.log("");

rl.question("-> ", answer => {
  if (answer == "1" || answer == "2") {
    (async () => {
      // start puppeteer
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      // go to panel
      await page.goto("https://panel.soclminer.com.br");
      await FacebookLoginController.facebookLogin(browser, page);
      // wait panel to load
      await page.waitFor("#bt-menu");

      optionCheck(answer, browser);
    })();
  } else {
    console.log("Opção Inválida!");
  }
});

//const types = ["campanhas", "onsites", "bounces", "optins"]
async function optionCheck(option, browser) {
  if (option == "1") {
    await CreateCampaignController.campaignCreator(page);
  } else {
    console.log("Script ainda não disponível!");
    await browser.close();
  }
}
