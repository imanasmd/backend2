/**
 * MongoDB / Mongoose
 */
const mongoose = require("mongoose");
const logger = require("../logger");
const ConnectionFactory = require("./connection-factory");
const config = require("../../config.json");

module.exports = async () => {
  mongoose.pluralize(null); // So that mongoose doesn't try to pluralize the schema and map accordingly.
  let models;
  try {
    const connectionFactory = new ConnectionFactory(config);
    // GLOBAL Connections
    const connection_IN_DTOUB = await connectionFactory.getConnection("GLOBAL", config.MONGODB.GLOBAL.DATABASE.DTOUB);

    const mongooseConnections = {
      GLOBAL: {
        DTOUB: connection_IN_DTOUB,
      },
    };

    /* All the (mongoose) models to be defined here */
    models = {
      GLOBAL: {
        ADMIN: require("../schema/admin/admin")(connection_IN_DTOUB),
        // USER: require("../schema/user/user")(mongooseConnections.GLOBAL.DTOUB),
        LOG: require("../schema/log/log")(mongooseConnections.GLOBAL.DTOUB),
        PRODUCT: require("../schema/product/product")(mongooseConnections.GLOBAL.DTOUB),
        CATEGORY: require("../schema/category/category")(mongooseConnections.GLOBAL.DTOUB),
        CUSTOMER: require("../schema/customer/customer")(mongooseConnections.GLOBAL.DTOUB),
        ORDER: require("../schema/order/order")(mongooseConnections.GLOBAL.DTOUB),
        REFUNDEDPRODUCT: require("../schema/refundedProduct/refundedProduct")(mongooseConnections.GLOBAL.DTOUB),
        MEDIA: require("../schema/media/media")(mongooseConnections.GLOBAL.DTOUB),
        GIFTCARD: require("../schema/giftcard/giftcard")(mongooseConnections.GLOBAL.DTOUB),
        SUPPLIER: require("../schema/supplier/supplier")(mongooseConnections.GLOBAL.DTOUB),
        INVENTORYTRANSFER: require("../schema/inventory-transfer/inventory-transfer")(mongooseConnections.GLOBAL.DTOUB),
        COLLECTION: require("../schema/collection/collection")(mongooseConnections.GLOBAL.DTOUB),
        DISCOUNT: require("../schema/discount/discount")(mongooseConnections.GLOBAL.DTOUB),
        TAG: require("../schema/tag/tag")(mongooseConnections.GLOBAL.DTOUB),
        BLOGCATEGORY: require("../schema/blogCategory/blogCategory")(mongooseConnections.GLOBAL.DTOUB),
        BLOGPOST: require("../schema/blogPost/blogPost")(mongooseConnections.GLOBAL.DTOUB),
        PAGE: require("../schema/page/page")(mongooseConnections.GLOBAL.DTOUB),
        PREFERENCE: require("../schema/preference/preference")(mongooseConnections.GLOBAL.DTOUB),
        CODE_VERIFICATION: require("../schema/code/code")(mongooseConnections.GLOBAL.DTOUB),
        CODE_REGISTRATION: require("../schema/code/code-registration")(mongooseConnections.GLOBAL.DTOUB),
        THEME: require("../schema/theme/theme")(mongooseConnections.GLOBAL.DTOUB),
        MENU: require("../schema/menu/menu")(mongooseConnections.GLOBAL.DTOUB),
      },
    };

    return models;
  } catch (error) {
    logger.error("Error encountered while trying to create database connections and models:\n" + error.stack);
    return null;
  }
};
