const puppeteer = require("puppeteer");
const CreateCampaignController = require("./controllers/CreateCampaignController");
const FacebookLoginController = require("./controllers/FacebookLoginController");
const readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);

console.log("");
console.log("Digite o código para o tipo de campanha/plugin você quer subir:");

init();

async function init() {
  console.log("");
  console.log("[1] - Campanhas Manuais Programadas");
  console.log("[2] - Optins");
  console.log("[Exit] - Encerrar programa");
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

        optionCheck(answer, browser, page);
      })();
    } else if (answer == "exit" || answer == "Exit") {
      process.exit();
    } else {
      console.log("");
      console.log("Opção Inválida! Tente de novo...");
      console.log("");
      init();
    }
  });
}

//const types = ["campanhas", "onsites", "bounces", "optins"]
async function optionCheck(option, browser, page) {
  if (option == "1") {
    await CreateCampaignController.campaignCreator(page);
  } else {
    console.log("Script ainda não disponível!");
    await browser.close();
  }
  console.log("");
  console.log("Upload concluído!");
  console.log("");
  await page.waitFor("#bt-menu");
  await page.waitFor(4000);
  await browser.close();
  process.exit();
}
