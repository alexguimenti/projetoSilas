const campaigns = require("./campaigns"); //mudanca habilitado
//const GoogleSheetsController = require("./GoogleSheetsController"); //mudanca

CreateBounceController = {
  campaignCreator: async function createCampaigns(page, amount, browser) {
    console.log("");
    console.log("=======================================");
    console.log("   Upload de campanhas inicializado!   ");
    console.log("=======================================");
    console.log("");
    //const campaigns = await GoogleSheetsController.getCampaings(amount); //mudança 
    for (let i = 0; i < campaigns.length; i++) {
      await page.goto(
        `https://panel.soclminer.com.br/app/${campaigns[i].customer}`,
        { waitUntil: "load", timeout: 0 }
        );
      // go to manual campaign creation
      page.goto(
        "https://panel.soclminer.com.br/plugin/onsite/Create",
        { waitUntil: "load", timeout: 0 }
      );

    }


    //await page.waitForSelector("#submitAutomaticPush");
    //await page.click("#submitAutomaticPush");
    //console.log(`Campanha '${campaigns[i].name}' concluída!`);
    //onsole.log(`${i + 1} de ${campaigns.length} Feito`);
    console.log("Onsite elaborado");
  }
};

module.exports = CreateBounceController;