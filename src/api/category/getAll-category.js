const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { user} = req;
    const categories = await global.models.GLOBAL.CATEGORY.find({
      aid: user._id,
    })
      .populate([
        {
          path: "mediaId",
          model: "media",
        },
        {
          path: "parentCategoryId",
          model: "category",
          populate: {
            path: "mediaId",
            model: "media",
          },
        },
      ])
      .sort({ createdAt: -1 });
    try {
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { categories },
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
