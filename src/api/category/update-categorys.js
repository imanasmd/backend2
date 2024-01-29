const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string(),
    matrial: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { id } = req.params;
    const { name, slug, description, parentCategoryId } = req.body;
    const { user} = req;

    let updateCategory;
    console.log("req.body", req.body);
    try {
      const checkById = await global.models.GLOBAL.CATEGORY.findOne({
        _id: id,
      }).populate({
        path: "mediaId",
        model: "media",
      });
      if (checkById) {
        let image = [];
        let media;
        if (req.body.categoryMedia) {
          updateCategory = await global.models.GLOBAL.CATEGORY.findByIdAndUpdate(
            {
              _id: id,
            },
            req.body
          );
        } else {
          console.log("mediaURL", req.files);
          let saveMediaURL = await global.models.GLOBAL.MEDIA({
            url: req.files[0].location,
            aid: user._id,
          });
          mediaURL = await saveMediaURL.save();
          updateCategory = await global.models.GLOBAL.CATEGORY.findByIdAndUpdate(
            {
              _id: id,
            },
            { name: name, slug: slug, description: description, mediaId: mediaURL._id }
          );
        }
      }

      const responseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_UPDATED,
        payload: updateCategory,
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(responseObject));
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
