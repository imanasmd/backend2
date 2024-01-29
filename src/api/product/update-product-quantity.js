const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string(),
    matrial: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { id } = req.params;
    const { user} = req;
    const { quantity } = req.query;

    try {
      const checkById = await global.models.GLOBAL.PRODUCT.findOne({
        _id: id,
        aid: user._id,
      });
      if (checkById) {
        let updatedProduct = await global.models.GLOBAL.PRODUCT.findByIdAndUpdate(
          {
            _id: id,
          },
          { $set: { quantity: quantity } }
        );
        const responseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_UPDATED,
          payload: { quantity },
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(responseObject));
      } else {
        const data4createResponseObject = {
          req: req,
          result: -1,
          message: messages.ITEM_NOT_FOUND,
          payload: {},
          logPayload: false,
        };
        res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
      }
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
