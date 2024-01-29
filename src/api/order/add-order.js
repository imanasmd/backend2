const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    // productId: Joi.array().required(),
    customerId: Joi.string().required(),
    isDraft: Joi.boolean().required(),
  }),
  handler: async (req, res) => {
    const { customerId } = req.body;
    const { user } = req;
    let response;
    let counts = await global.models.GLOBAL.ORDER.findOne({ aid: user._id }).sort({ _id: -1 }).limit(1);
    // let counts = await global.models.GLOBAL.ORDER.findOne().sort({ _id: -1 }).limit(1);
    if (counts) {
      let replaced = String(counts.orderIndex);
      response = replaced.replace(/\d+/, function (val) {
        return parseInt(val) + 1;
      });
    } else {
      response = "#1001";
    }
    try {
      let orderData = await global.models.GLOBAL.ORDER({
        ...req.body,
        orderIndex: response,
        aid: user._id,
      });
      order = await orderData.save();
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ORDER_CREATED,
        payload: { order },
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
