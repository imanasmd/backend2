const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { id } = req.params;

    try {
      const productData = await global.models.GLOBAL.PRODUCT.findById({
        _id: id,
      }).populate([
        {
          path: "mediaId",
          model: "media",
        },
        {
          path: "categoryId",
          model: "category",
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
        payload: { productData },
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
