const getAllGiftcard = require("./getAll-giftcard");
const addGiftcard = require("./add-giftcard");
const getGiftcardById = require("./get-giftcard-by-id");
const updateGiftcard = require("./update-giftcard");
const giftcardStatus = require("./update-giftcard-status");


module.exports = exports = {
  addGiftcard,
  updateGiftcard,
  getGiftcardById,
  getAllGiftcard,
  giftcardStatus
};
