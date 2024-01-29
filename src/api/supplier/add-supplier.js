const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({}),
  handler: async (req, res) => {
    const { customerId } = req.body;
    const { user } = req;

    try {
      let supplierData = await global.models.GLOBAL.SUPPLIER({
        ...req.body,
        aid: user._id,
      });
      supplier = await supplierData.save();
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ORDER_CREATED,
        payload: { supplier },
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
