const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    number: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    notes: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { user } = req;
    try {
      let inventoryTransferData = await global.models.GLOBAL.INVENTORYTRANSFER({ ...req.body, aid: user._id });
      // let inventoryTransferData = await global.models.GLOBAL.INVENTORYTRANSFER({ ...req.body });

      inventoryTransfer = await inventoryTransferData.save();

      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { inventoryTransfer },
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
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
