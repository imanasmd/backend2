const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { id } = req.params;
    const { mediaId } = req.body;
    const { user} = req;

    try {
      let image = [];
      let media;
      let uploadImage;
      console.log("req.files", req.files);
      if (req.files) {
        req.files.map((e) => image.push({ url: e.location }));
      }
      for (let i of image) {
        const todo = new global.models.GLOBAL.MEDIA({
          url: i.url,
          aid: user._id,
        });
        media = await todo.save();
        uploadImage = await global.models.GLOBAL.PREFERENCE.findByIdAndUpdate(
          {
            _id: id,
          },
          { $push: { socialSharing: todo._id } }
        );
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
