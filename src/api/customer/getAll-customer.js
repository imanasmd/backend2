const { ObjectId } = require('mongodb');
const enums = require('../../../json/enums.json');
const messages = require('../../../json/messages.json');
const logger = require('../../logger');
const utils = require('../../utils');

module.exports = exports = {
  //route handler
  handler: async (req, res) => {
    const { user } = req;
    console.log('==============User:=============', user);
    let customer = await global.models.GLOBAL.CUSTOMER.find({
      aid: new ObjectId(user?._id),
    });
    console.log('=========CUSTOMER==========', customer);
    // let customer = await global.models.GLOBAL.CUSTOMER.find();
    try {
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.SUCCESS,
        payload: { customer },
        logPayload: false,
      };
      res
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
