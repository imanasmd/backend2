const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");
const moment = require("moment");

module.exports = exports = {
  //route handler
  handler: async (req, res) => {
    const { user } = req;
    let updateGiftcard;
    let giftcardData = await global.models.GLOBAL.GIFTCARD.find({ aid: user._id });
    // let giftcardData = await global.models.GLOBAL.GIFTCARD.find();

    try {
      for (const i of giftcardData) {
        if (moment(i.expireDate).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")) {
          let updateGiftcard = await global.models.GLOBAL.GIFTCARD.findByIdAndUpdate(
            {
              _id: i._id,
            },
            { $set: { isExpire: true, isActive: false } }
          );
        }
      }
      let giftcard = await global.models.GLOBAL.GIFTCARD.find({ aid: user._id }).populate({
        path: "customerId",
        model: "customer",
      });
      // let giftcard = await global.models.GLOBAL.GIFTCARD.find().populate({
      //   path: "customerId",
      //   model: "customer",
      // });
      const data4createResponseObject = {
        req: req,
        result: 0,
        message: messages.SUCCESS,
        payload: { giftcard },
        logPayload: false,
      };
      res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
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
