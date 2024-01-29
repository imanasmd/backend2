const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    console.log("user++++++++++++++++", user);
    try {
      const checkById = await global.models.GLOBAL.ADMIN.findOne({
        _id: user._id,
      });
      if (checkById) {
        let updated = await global.models.GLOBAL.ADMIN.findByIdAndUpdate(
          {
            _id: user._id,
          },
          { $set: { subscription: req.body, status: 4 } }
        );
        const responseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_UPDATED,
          payload: { updated },
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
