  const puppeteer = require("puppeteer");

<<<<<<< HEAD
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://panel.soclminer.com.br");
  await Promise.all([page.waitForSelector("#fbLogin"), page.click("#fbLogin")]);
  await browser.pages(); // get all open pages by the browser
  await page.waitFor("#bt-menu");
  console.log("loaded!");
  await page.goto(
    "https://panel.soclminer.com.br/app/f6ff038c-24ee-43d4-b624-7fd945bb6929"
  );

  await page.screenshot({ path: "example.png" });

  // bt-menu
  // https://panel.soclminer.com.br/app/f6ff038c-24ee-43d4-b624-7fd945bb6929
  // await browser.close();
})();
=======
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://panel.soclminer.com.br");
    await Promise.all([page.waitForSelector("#fbLogin"), page.click("#fbLogin")]);
    await browser.pages(); // get all open pages by the browser
    await page.waitFor("#bt-menu");
    console.log("loaded!");
    await page.goto(
      "https://panel.soclminer.com.br/app/f6ff038c-24ee-43d4-b624-7fd945bb6929"
    );

    await page.screenshot({ path: "example.png" });

    // bt-menu
    // https://panel.soclminer.com.br/app/f6ff038c-24ee-43d4-b624-7fd945bb6929
    // await browser.close();
  })();
>>>>>>> 03ab207b238a2b5adc4ec9fb53b42a4bf52f512e
