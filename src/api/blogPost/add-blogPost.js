const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    totalQty: Joi.number().required(),
  }),
  handler: async (req, res) => {
    const { title } = req.body;
    const { user } = req;
    let FindData = await global.models.GLOBAL.BLOGPOST.find({ title: title, aid: user._id });
    // let FindData = await global.models.GLOBAL.BLOGPOST.find({ title: title });

    if (FindData.length > 0) {
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
      let blogData = await global.models.GLOBAL.BLOGPOST({
        ...req.body,
        // aid:user._id
      });
      blog = await blogData.save();

      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { blog },
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
    } catch (error) {
      const data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.GENERAL,
        payload: { error },
        logPayload: false,
      };
      res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
    }
  },
};
