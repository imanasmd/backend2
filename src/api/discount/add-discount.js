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
    const { user } = req;
    try {
      let DiscountData = await global.models.GLOBAL.DISCOUNT({ ...req.body, aid: user._id });
      // let DiscountData = await global.models.GLOBAL.DISCOUNT(req.body);
      discount = await DiscountData.save();
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ORDER_CREATED,
        payload: { discount },
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
