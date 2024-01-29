const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const { mediaDeleteS3 } = require("../../S3FileUpload");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { mediaId } = req.body;
    const { user} = req;
    try {
      let findMedia = await global.models.GLOBAL.MEDIA.find({
        _id: { $in: mediaId },
        aid: user._id,
      });
      let url;
      let removeMedia;
      for (const i of findMedia) {
        url = i.url.split(".com/")[1];
        console.log("iurl++++++++++", i.url);
        console.log(url);
        if (url) {
          mediaDeleteS3(url, async function (err) {
            if (err) {
              console.log("s3 err", err);
              return next(err);
            }
          });
          console.log("delete");
          removeMedia = await global.models.GLOBAL.MEDIA.deleteOne({
            _id: i._id,
          });
        }
      }

      const responseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_DELETED,
        payload: { url },
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
