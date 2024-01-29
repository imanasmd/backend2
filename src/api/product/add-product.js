const Joi = require('joi');
const enums = require('../../../json/enums.json');
const messages = require('../../../json/messages.json');
const logger = require('../../logger');
const utils = require('../../utils');

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    totalQty: Joi.number().required(),
  }),
  handler: async (req, res) => {
    const { name, unit, weight, variant } = req.body;
    const { user } = req;

    let FindData = await global.models.GLOBAL.PRODUCT.find({
      name: name,
      aid: user._id,
    });

    if (FindData.length > 0) {
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_ALREADY_EXIST,
        payload: {},
        logPayload: false,
      };
      return res
        .status(enums.HTTP_CODES.BAD_REQUEST)
        .json(utils.createResponseObject(data4createResponseObject));
    }
    try {
      console.log('======Req body======', req.body);
      let productData = await global.models.GLOBAL.PRODUCT({ ...req.body });
      product = await productData.save();

      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { product },
        logPayload: false,
      };
      return res
        .status(enums.HTTP_CODES.OK)
        .json(utils.createResponseObject(data4createResponseObject));
    } catch (error) {
      const data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.GENERAL,
        payload: { error },
        logPayload: false,
      };
      res
        .status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json(utils.createResponseObject(data4createResponseObject));
    }
  },
};
