const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { name, email, number, password } = req.body;
    try {
      const userData = await global.models.GLOBAL.USER({
        name: name,
        email: email,
        number: number,
        password: password,
      });
      user = await userData.save();

      const data4createResponseObject = {
        req: req,
        result: 0,
        message: "User created succesfully!",
        payload: { user },
        logPayload: false,
      };

      res
        .status(enums.HTTP_CODES.OK)
        .json(utils.createResponseObject(data4createResponseObject));
    } catch (error) {
      const data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.GENERAL,
        payload: {},
        logPayload: false,
      };
      res
        .status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json(utils.createResponseObject(data4createResponseObject));
    }
  },
};
