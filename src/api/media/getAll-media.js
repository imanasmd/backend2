const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { user } = req;
    try {
      req.query.page = req.query.page ? req.query.page : 1;
      let page = parseInt(req.query.page);
      req.query.limit = req.query.limit ? req.query.limit : 10;
      let limit = parseInt(req.query.limit);
      let skip = (parseInt(req.query.page) - 1) * limit;
      const media = await global.models.GLOBAL.MEDIA.find({ aid: user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit);
      const count = await global.models.GLOBAL.MEDIA.find({ aid: user._id }).count();
      // const media = await global.models.GLOBAL.MEDIA.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
      // const count = await global.models.GLOBAL.MEDIA.find().count();
      let payload = {
        media: media,
        count: count,
      };
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_FETCHED,
        payload: payload,
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
