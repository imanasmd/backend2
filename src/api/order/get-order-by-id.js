const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { id } = req.params;
    let order;
    try {
      const orderData = await global.models.GLOBAL.ORDER.findOne({
        _id: id,
      }).populate([
        {
          path: "productId.id",
          model: "product",
          populate: {
            path: "mediaId",
            model: "media",
          },
        },
        {
          path: "customerId",
          model: "customer",
        },
        {
          path: "tagId",
          model: "tag",
        },
      ]);

      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: {
          orderData: orderData,
          timeline: orderData.timeline.reverse(),
        },
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
