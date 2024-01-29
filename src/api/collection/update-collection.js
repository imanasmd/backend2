const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    // number: Joi.number().required(),
    // address: Joi.string().required(),
    // email: Joi.string().required(),
    // gender: Joi.string().required(),
    // notes: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { id } = req.params;
    const { title, description, collectionType, startDate, endDate, pageTitle, metaDescription, urlHandler, collectionMedia } = req.body;
    const { user} = req;
    let collection;
    try {
      const checkById = await global.models.GLOBAL.COLLECTION.findOne({
        _id: id,
        aid: user._id,
      });
      if (checkById) {
        if (collectionMedia) {
          collection = await global.models.GLOBAL.COLLECTION.findByIdAndUpdate(
            {
              _id: id,
            },
            req.body
          );
        } else {
          let saveMediaURL = await global.models.GLOBAL.MEDIA({
            url: req.file.location,
            aid: user._id,
          });
          mediaURL = await saveMediaURL.save();
          collection = await global.models.GLOBAL.COLLECTION.findByIdAndUpdate(
            {
              _id: id,
            },
            {
              title: title,
              description: description,
              collectionType: collectionType,
              startDate: startDate,
              endDate: endDate,
              pageTitle: pageTitle,
              metaDescription: metaDescription,
              urlHandler: urlHandler,
              collectionMedia: saveMediaURL._id,
            }
          );
        }

        const responseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_UPDATED,
          payload: { collection },
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(responseObject));
      } else {
        const data4createResponseObject = {
          req: req,
          result: -1,
          message: messages.ITEM_NOT_FOUND,
          payload: {},
          logPayload: false,
        };
        res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
      }
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
