const Joi = require("joi");
const { ObjectId } = require("mongodb");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");

module.exports = exports = {
  validation: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    totalQty: Joi.string().required(),
    availableQty: Joi.string().required(),
  }),
  handler: async (req, res) => {
    const { id } = req.params;
    const { productId, quantity, customerId, resoneForRefund } = req.body;
    const { user} = req;
    let removeProductFromOrder = 0;
    console.log("productId", productId);
    try {
      for (let i in productId) {
        let matchElement = await global.models.GLOBAL.ORDER.findOne(
          {
            _id: id,
            aid: user._id,
          },
          {
            productId: {
              $elemMatch: {
                id: productId[i].id,
                quantity: productId[i].quantity,
              },
            },
          }
        );
        if (matchElement.productId.length > 0) {
          removeProductFromOrder = await global.models.GLOBAL.ORDER.updateOne(
            { _id: id },
            {
              $pull: {
                productId: { id: productId[i].id },
              },
            }
          );
        } else {
          removeProductFromOrder = await global.models.GLOBAL.ORDER.updateOne(
            {
              _id: id,
              productId: { $elemMatch: { id: productId[i].id } },
            },
            {
              $inc: {
                "productId.$.quantity": -productId[i].quantity,
              },
            }
          );
        }

        let resoneRefund = await global.models.GLOBAL.ORDER.findByIdAndUpdate(
          {
            _id: id,
          },
          { $set: { resoneForRefund: resoneForRefund } }
        );

        const data4createResponseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_UPDATED,
          payload: { removeProductFromOrder },
          logPayload: false,
        };

        let refundedResponse = await refundOrder(id, productId[i].id, customerId, productId[i].quantity);
        let addRefundedProductId = await global.models.GLOBAL.ORDER.findByIdAndUpdate(
          { _id: id },
          {
            $push: {
              refundedProduct: refundedResponse._id,
            },
          }
        );
        res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
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

async function refundOrder(orderId, productId, customerId, quantity) {
  let refundedProduct = await global.models.GLOBAL.REFUNDEDPRODUCT({
    orderId,
    productId,
    customerId,
    quantity,
  });
  let refundedOrder = await refundedProduct.save();
  return refundedOrder;
}
