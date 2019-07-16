const credentials = require("./credentials");

FacebookLoginController = {
  facebookLogin: async function facebookLogin(browser, page) {
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
}

module.exports = FacebookLoginController;