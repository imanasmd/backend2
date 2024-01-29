const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  //route handler
  handler: async (req, res) => {
    const { isActive, isDraft, isArchived } = req.query;
    const { user} = req;
    let page;
    try {
      if (isDraft === true) {
        page = await global.models.GLOBAL.PAGE.find({
          isDraft: true,
          isArchived: false,
          isActive: false,
          aid: user._id,
        }).populate([
          {
            path: "tagId",
            model: "tag",
          },
          {
            path: "mediaId",
            model: "media",
          },
          {
            path: "blogCategoryId",
            model: "blog-category",
          },
        ]);
      } else if (isArchived === true) {
        page = await global.models.GLOBAL.PAGE.find({
          isArchived: true,
          isDraft: false,
          isActive: true,
          // aid:user._id
        }).populate([
          {
            path: "tagId",
            model: "tag",
          },
          {
            path: "mediaId",
            model: "media",
          },
          {
            path: "categoryId",
            model: "category",
          },
        ]);
      } else if (isActive === false) {
        page = await global.models.GLOBAL.PAGE.find({
          isActive: false,
          isDraft: false,
          isArchived: false,
          // aid:user._id
        }).populate([
          {
            path: "tagId",
            model: "tag",
          },
          {
            path: "mediaId",
            model: "media",
          },
          {
            path: "categoryId",
            model: "category",
          },
        ]);
      } else {
        page = await global.models.GLOBAL.PAGE.find({
          isActive: true,
          isDraft: false,
          isArchived: false,
          // aid:user._id
        }).populate([
          {
            path: "tagId",
            model: "tag",
          },
          {
            path: "mediaId",
            model: "media",
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
        payload: { page },
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
