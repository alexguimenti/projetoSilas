const puppeteer = require("puppeteer");
const credentials = require("./credentials");

// campaings array
const campaigns = [
  {
    customer: "f6ff038c-24ee-43d4-b624-7fd945bb6929",
    name: "nome1",
    audience: "ab837adb-76e2-44ae-b981-31e56b35553d",
    link: "http://www.uol.com.br",
    start: "25/07/2019 14:50",
    title: "Título da campanha 1",
    message: "Mensagem da campanha 1"
  },
  {
    customer: "f6ff038c-24ee-43d4-b624-7fd945bb6929",
    name: "nome2",
    audience: "ab837adb-76e2-44ae-b981-31e56b35553d",
    link: "http://www.g1.com.br",
    start: "26/08/2019 14:50",
    title: "Título da campanha 2",
    message: "Mensagem da campanha 2"
  }
];

(async () => {
  // start puppeteer
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // go to panel
  await page.goto("https://panel.soclminer.com.br");

  await login(browser, page);

  // wait to panel to load
  await page.waitFor("#bt-menu");

  // choose customer

  for (let i = 0; i < campaigns.length; i++) {
    await chooseCustomer(campaigns[i].customer, page);

    // go to manual campaign creation
    page.goto(
      "https://panel.soclminer.com.br/campaign/push/Create?newcampaign=True&campaigntype=5"
    );

    //createCampaign(page, i);
    await page.waitForSelector("#btnTest");
    await page.waitFor(2000);
    await page.click("#AudienceId");
    await page.type("#AudienceId", campaigns[i].audience);
    await page.waitFor(2000);
    await page.waitForSelector("#linkRedirect");
    await page.type("#linkRedirect", campaigns[i].link);
    await page.click("#scheduleCampaign");
    await page.waitFor(2000);
    await page.evaluate(
      () => (document.querySelector("#campaignStartDate").value = "")
    );
    await page.type("#campaignStartDate", campaigns[i].start);
    await page.type("#campaignName", campaigns[i].name);
    await page.click("#formattedLink");
    await page.type("#title", campaigns[i].title);
    await page.type("#message", campaigns[i].message);
    await page.click("#btnTest");
    await page.waitFor(2000);
    await page.click("#btnSave");
    await page.waitFor(2000);
    await page.click("#submitAutomaticPush");
    console.log(`Campanha '${campaigns[i].name}' criada!`);
  }

  await page.screenshot({ path: "example.png" });
  // await browser.close();
})();

async function login(browser, page) {
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
}

async function chooseCustomer(customer, page) {
  await page.goto(`https://panel.soclminer.com.br/app/${customer}`);
}

async function createCampaign(page, i) {
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
  await page.click("#formattedLink");
  await page.type("#title", campaigns[i].title);
  await page.type("#message", campaigns[i].message);
  await page.click("#btnTest");
  await page.waitFor(2000);
  await page.click("#btnSave");
  await page.waitFor(2000);
  await page.click("#submitAutomaticPush");
}
