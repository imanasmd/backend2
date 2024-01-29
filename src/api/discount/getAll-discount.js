const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  //route handler
  handler: async (req, res) => {
    const { user } = req;
    let discount = await global.models.GLOBAL.DISCOUNT.find({
      aid: user._id,
    }).populate([
      {
        path: "collectionId",
        model: "collection",
      },
      {
        path: "productId",
        model: "product",
        populate: [
          {
            path: "mediaId",
            model: "media",
          },
          {
            path: "categoryId",
            model: "category",
            populate: {
              path: "mediaId",
              model: "media",
            },
          },
          {
            path: "tagId",
            model: "tag",
          },
          {
            path: "quantity.supplierId",
            model: "supplier",
          },
        ],
      },
      {
        path: "customerId",
        model: "customer",
      },
    ]);
    try {
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.SUCCESS,
        payload: { discount },
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
