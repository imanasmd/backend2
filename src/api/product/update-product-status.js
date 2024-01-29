const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { isActive, isArchived, isDraft, id } = req.body;
    const { user } = req;
    let updatedProduct;
    try {
      const checkById = await global.models.GLOBAL.PRODUCT.findOne({
        _id: id,
      });
      if (checkById) {
        updatedProduct = await global.models.GLOBAL.PRODUCT.updateMany(
          {
            _id: { $in: id },
          },
          { $set: { isArchived: isArchived, isDraft: isDraft, isActive: isActive } }
        );

        const responseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_UPDATED,
          payload: {},
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
