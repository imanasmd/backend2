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
    const { name, slug, description, mediaId, parentCategoryId } = req.body;
    const { user} = req;
    // let findData = await global.models.GLOBAL.BLOGCATEGORY.find({ name: name, aid: user._id });
    let findData = await global.models.GLOBAL.BLOGCATEGORY.find({ name: name });

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
    let image = [];
    let imageId = [];

    let media;
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
        imageId.push(todo._id);
      }
      let blogCategoryData = await global.models.GLOBAL.BLOGCATEGORY({
        name,
        slug,
        parentCategoryId,
        description,
        mediaId: imageId,
        aid: user._id,
      });
      category = await blogCategoryData.save();
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: {},
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
