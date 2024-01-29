const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  //route handler
  handler: async (req, res) => {
    const { isActive, isDraft, isArchived } = req.query;
    const { user} = req;
    let product;
    try {
      if (isDraft === true) {
        product = await global.models.GLOBAL.PRODUCT.find({
          isDraft: true,
          isArchived: false,
          isActive: false,
          aid: user._id,
        }).populate([
          {
            path: "mediaId",
            model: "media",
          },
          {
            path: "quantity.supplierId",
            model: "supplier",
          },
          {
            path: "categoryId",
            model: "category",
          },
        ]);
      } else if (isArchived === true) {
        product = await global.models.GLOBAL.PRODUCT.find({
          isArchived: true,
          isDraft: false,
          isActive: true,
          aid: user._id,
        }).populate([
          {
            path: "mediaId",
            model: "media",
          },
          {
            path: "quantity.supplierId",
            model: "supplier",
          },
          {
            path: "categoryId",
            model: "category",
          },
        ]);
      } else if (isActive === false) {
        product = await global.models.GLOBAL.PRODUCT.find({
          isActive: false,
          isDraft: false,
          isArchived: false,
          aid: user._id,
        }).populate([
          {
            path: "mediaId",
            model: "media",
          },
          {
            path: "quantity.supplierId",
            model: "supplier",
          },
          {
            path: "categoryId",
            model: "category",
          },
        ]);
      } else {
        product = await global.models.GLOBAL.PRODUCT.find({
          // isActive: true,
          // isDraft: false,
          // isArchived: false,
          aid: user._id,
        }).populate([
          {
            path: "mediaId",
            model: "media",
          },
          {
            path: "quantity.supplierId",
            model: "supplier",
          },
          {
            path: "categoryId",
            model: "category",
          },
        ]);
      }
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.SUCCESS,
        payload: { product },
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
