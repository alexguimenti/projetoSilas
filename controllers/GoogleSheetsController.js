const GoogleSpreadSheet = require("google-spreadsheet");
const { promisify } = require("util");
const creds = require("./client_secret.json");

GoogleSheetsController = {
  getCampaings: async function accessSpreadsheet(amount) {
    const campaigns = [];
    const doc = new GoogleSpreadSheet(
      "1DmbLfSAEIpgEEGC3ZlLiC_gboq1NJJASqLV98tLU1Eg"
      //"1qFJzC_RkAjwMLu2xFMmZORFAoFW0AtHByDlSkbrJ1X4"
    );
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const campaingsSheet = info.worksheets[0];
    const cells = await promisify(campaingsSheet.getCells)({
      "min-row": 2,
      "max-row": 2 + (amount - 1),
      "min-col": 16,
      "max-col": 16
    });
    for (const cell of cells) {
      //console.log(cell)
      //console.log(cell.value)
      let campaign = JSON.parse(cell.value);
      campaigns.push(campaign);
    }
    return campaigns;
  }
};

module.exports = GoogleSheetsController;