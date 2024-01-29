const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { id } = req.params;
    const { mediaId, searchText, copyrightText, isScrollTop, isMobileSearch } = req.body;
    const { user } = req;

    let updated;
    if (req.body.mediaId) {
      updated = await global.models.GLOBAL.PREFERENCE.findByIdAndUpdate(
        {
          _id: id,
          aid: user._id,
        },
        {
          $set: {
            "footer.searchText": searchText,
            "footer.copyrightText": copyrightText,
            "footer.mediaId": mediaId,
            "footer.isScrollTop": isScrollTop ? isScrollTop : false,
            "footer.isMobileSearch": isMobileSearch ? isMobileSearch : false,
          },
        }
      );
    } else {
      const todo = new global.models.GLOBAL.MEDIA({
        url: req.file.location,
        // aid:user._id
      });
      media = await todo.save();
      updated = await global.models.GLOBAL.PREFERENCE.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            "footer.searchText": searchText,
            "footer.copyrightText": copyrightText,
            "footer.mediaId": media?._id,
            "footer.isScrollTop": isScrollTop ? isScrollTop : false,
            "footer.isMobileSearch": isMobileSearch ? isMobileSearch : false,
          },
        }
      );
    }

    try {
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { updated },
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
