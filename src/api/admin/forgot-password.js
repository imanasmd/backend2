const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

// User Profile update
module.exports = exports = {
  validation: Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      const data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.INVALID_PARAMETERS,
        payload: {},
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.BAD_REQUEST).json(utils.createResponseObject(data4createResponseObject));
    }
    try {
      let admin = await global.models.GLOBAL.ADMIN.findOne({ _id: id });
      if (admin.password !== password) {
        const data4createResponseObject = {
          req: req,
          result: -1,
          message: messages.INVALID_PASSWORD,
          payload: {},
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
      } else {
        await global.models.GLOBAL.ADMIN.findByIdAndUpdate(
          id,
          {
            $set: { password: newPassword },
          },
          { new: true }
        );
        const data4createResponseObject = {
          req: req,
          result: 0,
          message: messages.PASSWORD_UPDATED,
          payload: { admin },
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
      }
    } catch (error) {
      logger.error(`${req.originalUrl} - Error encountered: ${error.message}\n${error.stack}`);
      const data4createResponseObject = {
        req: req,
        result: -1,
        message: error,
        payload: {},
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
    }
  },
};
