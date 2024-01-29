const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const { mediaDeleteS3 } = require("../../S3FileUpload");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    categoryId: Joi.string().required(),
    color: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { id } = req.params;
    const { blogPostMedia, removeBlogPostId } = req.body;
    const { user } = req;
    let image = [];
    let mediaId = [];
    let keepPostId;
    try {
      const checkById = await global.models.GLOBAL.BLOGPOST.findOne({
        _id: id,
        // aid: user._id,
      });
      console.log("checkById++++++++++", checkById);
      if (checkById) {
        console.log("removeBlogPostId++++++++++", removeBlogPostId);
        if (typeof removeBlogPostId === "array") {
          //FOR ARRAY =============================
          // REMOVE BLOGPOST MEDIAID AND MEDIA ======================================================================================
          for (const i of removeBlogPostId) {
            removeMedia = await global.models.GLOBAL.BLOGPOST.updateOne(
              { _id: id },
              {
                $pull: {
                  mediaId: i,
                },
              }
            );
            removeMedia = await global.models.GLOBAL.MEDIA.deleteOne({
              _id: i,
            });
          }
          // REMOVE BLOGPOST MEDIA FROM AWS ======================================================================================
          for (const i of removeBlogPostId) {
            let media = await global.models.GLOBAL.MEDIA.findOne({ _id: i });
            let url = media?.url?.split(".com/")[1];
            if (url) {
              mediaDeleteS3(url, function (err) {
                if (err) {
                  console.log("s3 err", err);
                  return next(err);
                }
              });
              console.log("delete");
              const deletMedia = await global.models.GLOBAL.MEDIA.deleteOne({
                _id: media._id,
              });
            }
          }
        } else {
          //FOR OBJECT =============================
          // REMOVE BLOGPOST MEDIAID AND MEDIA ======================================================================================
          removeMedia = await global.models.GLOBAL.BLOGPOST.updateOne(
            { _id: id },
            {
              $pull: {
                mediaId: removeBlogPostId,
              },
            }
          );
          removeMedia = await global.models.GLOBAL.MEDIA.deleteOne({
            _id: removeBlogPostId,
          });
          // REMOVE BLOGPOST MEDIA FROM AWS ======================================================================================
          let media = await global.models.GLOBAL.MEDIA.findOne({ _id: removeBlogPostId });
          let url = media?.url?.split(".com/")[1];
          if (url) {
            mediaDeleteS3(url, function (err) {
              if (err) {
                console.log("s3 err", err);
                return next(err);
              }
            });
            console.log("delete");
            const deletMedia = await global.models.GLOBAL.MEDIA.deleteOne({
              _id: media._id,
            });
          }
        }
        // ADD MEDIA ON BLOGPOST ================================================================================================
        if (req.files) {
          req.files.map((e) => image.push({ url: e.location }));
          for (let i of image) {
            const todo = new global.models.GLOBAL.MEDIA({
              url: i.url,
              // aid:user._id
            });
            mediaSave = await todo.save();
            mediaId.push(todo._id);
          }
          uploadImage = await global.models.GLOBAL.BLOGPOST.findByIdAndUpdate(
            {
              _id: id,
            },
            { $push: { mediaId: mediaId } }
          );
        }
        const responseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_UPDATED,
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
