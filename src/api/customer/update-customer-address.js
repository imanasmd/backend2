const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { id } = req.params;
    const { addressId, city, pincode, apartment, address } = req.body;
    const { user } = req;
    try {
      const checkById = await global.models.GLOBAL.CUSTOMER.findOne({
        _id: id,
        aid: user._id,
      });
      if (checkById) {
        let updatedTimeline = await global.models.GLOBAL.CUSTOMER.updateOne(
          {
            _id: id,
            address: { $elemMatch: { _id: addressId } },
          },
          {
            $set: {
              "address.$.city": city,
              "address.$.pincode": pincode,
              "address.$.apartment": apartment,
              "address.$.address": address,
            },
          }
        );
        const responseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_UPDATED,
          payload: { updatedTimeline },
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
