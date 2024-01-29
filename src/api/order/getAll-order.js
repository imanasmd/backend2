const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  //route handler
  handler: async (req, res) => {
    const { user } = req;
    let order = await global.models.GLOBAL.ORDER.find({
      aid: user._id,
    }).populate([
      {
        path: "productId.id",
        model: "product",
        select: "-totalQty",
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

    try {
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.SUCCESS,
        payload: { order },
        logPayload: false,
      };
      res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
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
