const campaigns = require("./campaigns"); //mudanca habilitado
//const GoogleSheetsController = require("./GoogleSheetsController"); //mudanca

CreateOnsiteController = {
  campaignCreator: async function createCampaigns(page, amount, browser) {
    console.log("");
    console.log("=======================================");
    console.log("     Upload de onsite inicializado!    ");
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

      const selector = "#formOnsite > section:nth-child(6) > div > div > div.campo > div > button:nth-child(1)"
      await page.waitFor(1000);
      await page.click(selector);
      //await page.click('.btn.m0.f1'); modo antigo de usar 
      await page.waitFor(1000);

      await page.waitFor(1000);
      await page.waitForSelector("#pluginName");
      await page.waitFor(1000);
      await page.type("#pluginName", campaigns[i].name);

      await page.waitFor(1000);
      await page.type("#ruleWhiteText", campaigns[i].text); //selecionar o dominio da WHITELIST

      await page.waitFor(1000);
      const regra1 = "#checkTimeInSite"
      await page.click(regra1);

      await page.waitFor(1000);
      await page.type("#pluginLinkView", campaigns[i].link); //selecionar o dominio da WHITELIST

      await page.waitFor(1000);
      const teste = "#formOnsite > section:nth-child(20) > div > p:nth-child(2) > button.btn.ml0.destaque"
      await page.click(teste);
      await page.waitFor(1000);

      await page.waitFor(2000);
      await page.click("#formOnsite > section:nth-child(20) > div > p:nth-child(2) > button.btn.ml0.destaque");
      await page.waitFor(2000);

      await page.waitFor(2000);
      await page.click("#submitOnsiteMessage");
      await page.waitFor(2000);
    }
    console.log("Onsite elaborado");
  }
};

module.exports = CreateOnsiteController;