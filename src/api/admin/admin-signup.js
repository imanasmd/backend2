const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../../auth/jwt-options");

module.exports = exports = {
  handler: async (req, res) => {
    try {
      const { email } = req.body;
      if (email != null) {
        const emailExist = await global.models.GLOBAL.ADMIN.findOne({ email: email });
        if (emailExist) {
          const data4createResponseObject = {
            req: req,
            result: -1,
            message: messages.EXISTS_EMAIL,
            payload: {},
            logPayload: false,
          };
          res.status(enums.HTTP_CODES.BAD_REQUEST).json(utils.createResponseObject(data4createResponseObject));
          return;
        }
      }
      const findRegistration = await global.models.GLOBAL.CODE_REGISTRATION.findOne({
        email: email,
      });
      // User found - create JWT and return it
      if (findRegistration) {
        let adminData = await global.models.GLOBAL.ADMIN(req.body);
        admin = await adminData.save();
        const data4token = {
          id: admin._id,
          date: new Date(),
          environment: process.env.APP_ENVIRONMENT,
          email: email,
          scope: "login",
          type: req.body.role,
        };
        const payload = {
          adminData: {
            id: admin._id,
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            number: admin.number,
            expiresIn: "24h",
            status: 1,
          },
          token: jwt.sign(data4token, jwtOptions.secretOrKey),
          token_type: "Bearer",
        };
        const data4createResponseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_INSERTED,
          payload: { payload },
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
      } else {
        const data4createResponseObject = {
          req: req,
          result: 0,
          message: messages.EMAIL_NOT_VERIFIED,
          payload: {},
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
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
