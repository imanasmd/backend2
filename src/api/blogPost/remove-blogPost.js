const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const { mediaDeleteS3 } = require("../../S3FileUpload");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { blogPostId } = req.body;
    let statusfalse;
    try {
      for (const i of blogPostId) {
        console.log("DATAOFDATA", i);
        const checkById = await global.models.GLOBAL.BLOGPOST.findOne({
          _id: i,
        }).populate({
          path: "mediaId",
          model: "media",
        });
        if (checkById) {
          console.log("checkById+++++++++++", checkById);

          statusfalse = await global.models.GLOBAL.BLOGPOST.findByIdAndUpdate(
            {
              _id: i,
            },
            {
              $set: {
                isActive: false,
                isDraft: false,
                isArchived: false,
              },
            }
          );
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
        const responseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_DELETED,
          payload: { statusfalse },
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(responseObject));
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
