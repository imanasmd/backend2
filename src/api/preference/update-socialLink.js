const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  handler: async (req, res) => {
    const { id } = req.params;
    const { socialLink, removedId } = req.body;
    const { user } = req;
    let updated;
    try {
      if (socialLink) {
        for (const i of socialLink) {
          if (i._id) {
            updated = await global.models.GLOBAL.PREFERENCE.updateOne(
              {
                socialLink: { $elemMatch: { _id: i._id } },
              },
              {
                $set: {
                  "socialLink.$.name": i.name,
                  "socialLink.$.link": i.link,
                },
              }
            );
          } else {
            updated = await global.models.GLOBAL.PREFERENCE.updateOne({ $push: { socialLink: i } });
          }
        }
      }
      if (removedId) {
        for (const i of removedId) {
          const deleteSocialLink = await global.models.GLOBAL.PREFERENCE.deleteOne({
            "socialLink.$._id": i,
          });
        }
      }
      const responseObject = {
        req: req,
        result: 0,
        message: messages.ITEM_UPDATED,
        payload: { updated },
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
