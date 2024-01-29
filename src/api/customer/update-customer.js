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
    const { id } = req.params;
    const { user} = req;
    try {
      const checkById = await global.models.GLOBAL.CUSTOMER.findOne({
        _id: id,
        aid: user._id,
      });
      if (checkById) {
        let updatedCustomer = await global.models.GLOBAL.CUSTOMER.findByIdAndUpdate(
          {
            _id: id,
          },
          req.body
        );
        const responseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_UPDATED,
          payload: { updatedCustomer },
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
