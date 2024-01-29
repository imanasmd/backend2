const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const { mediaDeleteS3 } = require("../../S3FileUpload");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { categoryId } = req.body;
    const { user} = req;
    try {
      for (const i of categoryId) {
        console.log("DATAOFDATA", i);
        const checkById = await global.models.GLOBAL.CATEGORY.findOne({
          _id: i,
          aid: user._id,
        }).populate({
          path: "mediaId",
          model: "media",
        });
        if (checkById) {
          console.log("checkById", checkById);
          let url = checkById.mediaId[0].url.split(".com/")[1];
          if (url) {
            mediaDeleteS3(url, function (err) {
              if (err) {
                console.log("s3 err", err);
                return next(err);
              }
            });
            console.log("delete");
            let removeMedia = await global.models.GLOBAL.MEDIA.deleteOne({
              _id: checkById.mediaId[0]._id,
            });
            let removeCategory = await global.models.GLOBAL.CATEGORY.findByIdAndDelete({
              _id: checkById._id,
            });
          }
          const responseObject = {
            req: req,
            result: 0,
            message: messages.ITEM_DELETED,
            payload: {},
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
