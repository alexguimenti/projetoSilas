const campaigns = require("./campaigns");

CreateCampaignController = {
  campaignCreator: async function createCampaigns(page, i) {
    for (let i = 0; i < campaigns.length; i++) {
      await page.goto(`https://panel.soclminer.com.br/app/${campaigns[i].customer}`);
      // go to manual campaign creation
      page.goto(
        "https://panel.soclminer.com.br/campaign/push/Create?newcampaign=True&campaigntype=5"
      );

      await page.waitForSelector("#btnTest");
      await page.waitFor(2000);
      await page.type("#AudienceId", campaigns[i].audience);
      await page.waitForSelector("#linkRedirect");
      await page.type("#linkRedirect", campaigns[i].link);
      await page.click("#scheduleCampaign");
      await page.waitFor(2000);
      await page.evaluate(
        () => (document.querySelector("#campaignStartDate").value = "")
      );
      await page.type("#campaignStartDate", campaigns[i].start);
      await page.type("#campaignName", campaigns[i].name);
      await page.type("#title", campaigns[i].title);
      await page.type("#message", campaigns[i].message);
      await page.click("#btnTest");
      await page.waitFor(2000);
      await page.click("#btnSave");
      await page.waitFor(2000);
      await page.click("#submitAutomaticPush");
      console.log(`Campanha '${campaigns[i].name}' criada!`);
    }
  }
}

module.exports = CreateCampaignController;