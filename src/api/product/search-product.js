const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");
module.exports = exports = {
  handler: async (req, res) => {
    let { product } = req.query;
    let result = [];
    try {
      if (isNaN(Number(product))) {
        result = await global.models.GLOBAL.PRODUCT.find({
          $or: [
            {
              name: { $regex: product, $options: "i" },
            },
          ],
        });
      } else {
        const data = await global.models.GLOBAL.PRODUCT.aggregate([
          { $addFields: { accountStr: { $toString: "$price" } } },
          { $match: { accountStr: /[0-9]/ } },
        ]);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (data[i].price === Number(product)) {
              result.push(element);
            }
          }
        }
      }

      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { result },
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
