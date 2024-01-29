const Joi = require('joi');
const enums = require('../../../json/enums.json');
const messages = require('../../../json/messages.json');
const logger = require('../../logger');
const utils = require('../../utils');
const { ObjectId } = require('mongodb');

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
    const { name, number, address, email, gender, notes } = req.body;
    const { user } = req;
    let FindDataNumber = await global.models.GLOBAL.CUSTOMER.find({
      number: number,
      aid: user._id,
    });
    // let FindDataNumber = await global.models.GLOBAL.CUSTOMER.find({ number: number });

    if (FindDataNumber.length > 0) {
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
      console.log('====USER ID====', user._id);
      // let customerData = await global.models.GLOBAL.CUSTOMER({ ...req.body, aid: user._id });
      let customerData = await global.models.GLOBAL.CUSTOMER({
        ...req.body,
        aid: new ObjectId(user._id),
      });

      customer = await customerData.save();
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { customer },
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
        payload: {},
        logPayload: false,
      };
      res
        .status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json(utils.createResponseObject(data4createResponseObject));
    }
  },
};
