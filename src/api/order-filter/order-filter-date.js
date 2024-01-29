const { globalAgent } = require("https");
const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    // productId: Joi.array().required(),
    customerId: Joi.string().required(),
    isDraft: Joi.boolean().required(),
  }),
  handler: async (req, res) => {
    const { startDate, endDate, key, sort } = req.body;
    const { user } = req;
    let filteredData;
    console.log("req.body", req.body);
    try {
      filteredData = await global.models.GLOBAL.ORDER.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate),
            },
            // aid: admin?._id,
          },
        },
        {
          $lookup: {
            from: "customer",
            localField: "customerId",
            foreignField: "_id",
            as: "customerId",
          },
        },
        { $sort: { [key]: sort } },
      ]);
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ORDER_CREATED,
        payload: { filteredData },
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
