const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
// const { mediaDeleteS3 } = require("../../S3FileUpload");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { inventoryTransferId } = req.body;
    try {
      let removeInventoryTransfer;
      for (const i of inventoryTransferId) {
        removeInventoryTransfer = await global.models.GLOBAL.INVENTORYTRANSFER.deleteOne({
          _id: i,
        });
      }

      const responseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_DELETED,
        payload: { removeInventoryTransfer },
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(responseObject));
    } catch (error) {
      const data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.GENERAL,
        payload: {},
        logPayload: false,
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
    }
  },
};
