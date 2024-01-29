const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    matrial: Joi.string().required(),
  }),

  handler: async (req, res) => {
    const { user } = req;
    const { name, description, category, tag, isFeatured } = req.body;
    let saveData;
    let findData = await global.models.GLOBAL.THEME.find({ name: name, _id: user._id });
    if (findData.length > 0) {
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_ALREADY_EXIST,
        payload: {},
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.BAD_REQUEST).json(utils.createResponseObject(data4createResponseObject));
    }

    try {
      if (req.file) {
        saveData = await global.models.GLOBAL.THEME({
          name: name,
          description: description,
          category: category,
          tag: tag,
          image: req.file.location,
          isFeatured: isFeatured,
        });
        theme = await saveData.save();
      }
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { theme },
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
