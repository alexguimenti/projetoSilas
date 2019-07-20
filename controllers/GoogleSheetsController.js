const GoogleSpreadSheet = require("google-spreadsheet");
const { promisify } = require("util");
const creds = require("./client_secret.json");

GoogleSheetsController = {
  getCampaings: async function accessSpreadsheet() {
    const campaigns = [];
    const doc = new GoogleSpreadSheet(
      "1qFJzC_RkAjwMLu2xFMmZORFAoFW0AtHByDlSkbrJ1X4"
    );
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const campaingsSheet = info.worksheets[0];
    const cells = await promisify(campaingsSheet.getCells)({
      "min-row": 2,
      "max-row": 3,
      "min-col": 12,
      "max-col": 12
    });
    for (const cell of cells) {
      let campaign = JSON.parse(cell.value);
      campaigns.push(campaign);
    }
    return campaigns;
  }
};

module.exports = GoogleSheetsController;
