const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const { off } = require("../../logger");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    matrial: Joi.string().required(),
  }),

  handler: async (req, res) => {
    let image = [];
    let media;
    const { user} = req;

    if (req.files) {
      req.files.map((e) => image.push({ url: e.location }));
    }
    try {
      for (let i of image) {
        const todo = new global.models.GLOBAL.MEDIA({
          url: i.url,
          aid: user._id,
        });
        media = await todo.save();
      }

      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { media },
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
