const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { id } = req.params;
    const { user} = req;
    let updatedLogo;
    if (req.files.logo) {
      const todo = new global.models.GLOBAL.MEDIA({
        url: req.files.logo[0].location,
        aid: user._id,
      });
      media = await todo.save();
      console.log("todo._id", todo._id);
      uploadImage = await global.models.GLOBAL.PREFERENCE.findByIdAndUpdate(
        {
          _id: id,
        },
        { $set: { "logo.logo": todo._id } }
      );
    }
    if (req.files.mobileLogo) {
      const todo = new global.models.GLOBAL.MEDIA({
        url: req.files.mobileLogo[0].location,
        // aid:user._id
      });
      media = await todo.save();
      uploadImage = await global.models.GLOBAL.PREFERENCE.findByIdAndUpdate(
        {
          _id: id,
        },
        { $set: { "logo.mobileLogo": todo._id } }
      );
    }
    if (req.files.favicon) {
      const todo = new global.models.GLOBAL.MEDIA({
        url: req.files.favicon[0].location,
        aid: user._id,
      });
      media = await todo.save();
      console.log("todo._id", todo._id);
      uploadImage = await global.models.GLOBAL.PREFERENCE.findByIdAndUpdate(
        {
          _id: id,
        },
        { $set: { "logo.favicon": todo._id } }
      );
    }

    try {
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_INSERTED,
        payload: { updatedLogo },
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
