const puppeteer = require("puppeteer");
const CreateCampaignController = require("./controllers/CreateCampaignController");
const FacebookLoginController = require("./controllers/FacebookLoginController");
const CreateOnsiteController = require("./controllers/CreateOnsiteController");
const CreateBounceController = require("./controllers/CreateBounceController");
const readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);

console.log("");
console.log("Digite o código para o tipo de campanha/plugin você quer subir:");

init();

async function init() {
  console.log("");
  console.log("[1] - Campanhas Manuais Programadas");
  console.log("[2] - Onsite");
  console.log("[3] - Social Bounce");
  console.log("[Exit] - Encerrar programa");
  console.log("");

  rl.question("-> ", answer1 => {
    if (answer1 == "1" || answer1 == "2") {
      rl.question("Quantas campanhas? ", answer2 => {
        const amount = answer2;
        console.log(amount);
        if (answer1 == "1" || answer1 == "2") {
          console.clear();
          console.log("");
          console.log("");
          (async () => {
            // start puppeteer
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            // go to panel
            await page.goto("https://panel.soclminer.com.br");
            await FacebookLoginController.facebookLogin(browser, page);
            // wait panel to load
            await page.waitFor("#bt-menu");

            optionCheck(answer1, browser, page, amount);
          })();
        }
      });
    } else if (answer1 == "exit" || answer1 == "Exit") {
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
async function optionCheck(option, browser, page, amount) {
  switch (option) {

    case "1":
    await CreateCampaignController.campaignCreator(page, amount, browser);
        break;

    case "2":
        await CreateOnsiteController.campaignCreator(page, amount, browser);
        break;

    case "3":
        await CreateBounceController.campaignCreator(page, amount, browser);
        break;


        default:
            console.log("Script ainda não disponível!");
            await browser.close();
    } 
    console.log("");
    console.log("Upload concluído!");
    console.log("");
    await page.waitFor("#bt-menu");
    await page.waitFor(4000);
}