const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");
module.exports = exports = {
  handler: async (req, res) => {
    let { category } = req.query;
    console.log("category", category);
    try {
      let SearchData = await global.models.GLOBAL.CATEGORY.find({
        $or: [
          {
            name: { $regex: category, $options: "i" },
          },
          {
            matrial: { $regex: category, $options: "i" },
          },
        ],
      });
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { SearchData },
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
