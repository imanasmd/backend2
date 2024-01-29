const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    // productId: Joi.array().required(),
    customerId: Joi.string().required(),
    isDraft: Joi.boolean().required(),
  }),
  handler: async (req, res) => {
    const { title, description, collectionType, startDate, endDate, pageTitle, metaDescription, urlHandler } = req.body;
    const { user} = req;
    let media;
    try {
      const todo = await global.models.GLOBAL.MEDIA({
        url: req.file.location,
        aid: user._id,
      });
      media = await todo.save();
      let collectionData = await global.models.GLOBAL.COLLECTION({
        title: title,
        description: description,
        collectionType: collectionType,
        startDate: startDate,
        endDate: endDate,
        pageTitle: pageTitle,
        metaDescription: metaDescription,
        urlHandler: urlHandler,
        collectionMedia: todo._id,
        aid: user._id,
      });
      collection = await collectionData.save();
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ORDER_CREATED,
        payload: { collection },
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
