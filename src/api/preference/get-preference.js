const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  //route handler
  handler: async (req, res) => {
    const { user } = req;
    try {
      let preference = await global.models.GLOBAL.PREFERENCE.find({ aid: user._id }).populate([
        {
          path: "footer.mediaId",
          model: "media",
        },
        {
          path: "logo.logo",
          model: "media",
        },
        {
          path: "logo.mobileLogo",
          model: "media",
        },
        {
          path: "logo.favicon",
          model: "media",
        },
        {
          path: "socialSharing",
          model: "media",
          populate: {
            path: "mediaId",
            model: "media",
          },
        },
      ]);
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.SUCCESS,
        payload: { preference },
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
