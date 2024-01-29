const _ = require("lodash");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const jwtOptions = require("../../auth/jwt-options");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  // route validation
  validation: Joi.object({
    email: Joi.string().required(),
    code: Joi.string().required(),

    // email: Joi.string().required(),
  }),

  // route handler
  handler: async (req, res) => {
    let { code, email, forgot } = req.body;
    const { user } = req;

    // let findemail = await global.models.GLOBAL.ADMIN.findOne({ email: email });
    email = email.removeSpaces();

    // Find the email no and code object and then delete it.
    let verificationEntry;
    try {
      verificationEntry = await global.models.GLOBAL.CODE_VERIFICATION.findOne({
        email: email,
      });
      if (!verificationEntry) {
        console.log("verificationEntry", verificationEntry);
        // SMS verification failed
        logger.error(`/verify-code - SMS verification for USER (email: ${email}) failed!`);
        let data4createResponseObject = {
          req: req,
          result: -1,
          message: messages.FAILED_VERIFICATION,
          payload: {},
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.NOT_ACCEPTABLE).json(utils.createResponseObject(data4createResponseObject));
      }
    } catch (error) {
      logger.error(`/verify-code - Error encountered while verifying email: ${error.message}\n${error.stack}`);
      let data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.ERROR,
        payload: { error: error },
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
    }

    // Check number of attempts and expiryTime
    const now = moment();
    const expirationDate = moment(verificationEntry.expirationDate); // another date
    if (now.isAfter(expirationDate)) {
      let data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.EXPIRED_VERIFICATION,
        payload: {},
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.BAD_REQUEST).json(utils.createResponseObject(data4createResponseObject));
    }

    if (verificationEntry.code !== code) {
      verificationEntry.failedAttempts++;
      await verificationEntry.save();
      let data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.FAILED_OTP,
        payload: {},
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.DUPLICATE_VALUE).json(utils.createResponseObject(data4createResponseObject));
    } else {
      /* SMS verification done */
      logger.info(`/verify-code - SMS verification for ADMIN (email: ${email}) successful!`);

      try {
        const checkByEmail = await global.models.GLOBAL.CODE_REGISTRATION.findOne({
          email: email,
        });
        if (forgot) {
          let data4createResponseObject = {
            req: req,
            result: 0,
            message: "Verification Successfully",
            payload: { entryEmail },
            logPayload: false,
          };
          return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
        } else {
          if (checkByEmail) {
            let data4createResponseObject = {
              req: req,
              result: -1,
              message: "user already register",
              payload: {},
              logPayload: false,
            };
            return res.status(enums.HTTP_CODES.BAD_REQUEST).json(utils.createResponseObject(data4createResponseObject));
          } else {
            const entry = await global.models.GLOBAL.CODE_REGISTRATION({
              email: email,
              date: Date.now(),
            });
            entryEmail = entry.save();
            // }
            let data4createResponseObject = {
              req: req,
              result: 0,
              message: "Verification Successfully",
              payload: { entryEmail },
              logPayload: false,
            };
            return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
          }
        }
      } catch (error) {
        logger.error(`/verify-code - Error encountered while saving registration-code: ${error.message}\n${error.stack}`);
        console.log("error", error.message);
        let data4createResponseObject = {
          req: req,
          result: -1,
          message: messages.FAILED_VERIFICATION,
          payload: { error: error },
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
      }
    }
  },
};
