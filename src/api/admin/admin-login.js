const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../../auth/jwt-options");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    number: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { email, password } = req.body;
    if (email != null) {
      if (!email || !password) {
        logger.error("Email || Password token is mandatory.");
        const data4createResponseObject = {
          req: req,
          result: -400,
          message: "Email || Password is mandatory.",
          payload: {},
          logPayload: false,
        };
        res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
        return;
      }
      try {
        const admin = await global.models.GLOBAL.ADMIN.findOne({
          email: email,
        });
        if (!admin) {
          logger.error(`/login - No ADMIN (email: ${email}) found with the provided password!`);
          const data4createResponseObject = {
            req: req,
            result: -1,
            message: messages.USER_DOES_NOT_EXIST,
            payload: {},
            logPayload: false,
          };
          return res.status(enums.HTTP_CODES.NOT_FOUND).json(utils.createResponseObject(data4createResponseObject));
        } else {
          if (admin.password !== password) {
            const data4createResponseObject = {
              req: req,
              result: -1,
              message: messages.USER_NOT_FOUND,
              payload: {},
              logPayload: false,
            };
            return res.status(enums.HTTP_CODES.NOT_FOUND).json(utils.createResponseObject(data4createResponseObject));
          }
        }

        // User found - create JWT and return it
        const data4token = {
          id: admin._id,
          date: new Date(),
          environment: process.env.APP_ENVIRONMENT,
          email: email,
          scope: "login",
          type: admin.role,
        };
        const payload = {
          admin: {
            id: admin._id,
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            number: admin.number,
            expiresIn: "24h",
          },
          token: jwt.sign(data4token, jwtOptions.secretOrKey),
          token_type: "Bearer",
        };

        const data4createResponseObject = {
          req: req,
          result: 0,
          message: "Log in successful!",
          payload: payload,
          logPayload: false,
        };
        res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
      } catch (error) {
        logger.error(`${req.originalUrl} - Error encountered: ${error.message}\n${error.stack}`);
        const data4createResponseObject = {
          req: req,
          result: -1,
          message: messages.GENERAL,
          payload: {},
          logPayload: false,
        };
        res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
      }
    }
  },
};
