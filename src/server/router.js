const enums = require("../../json/enums.json");
const messages = require("../../json/messages.json");
var cron = require("node-cron");
const { couponSchedule } = require("../api/discount/coupon-scheduler");

module.exports = (app, logger) => {
  // define all route imports here/
  const productRoute = require("../routes/product/index");
  const categoryRoute = require("../routes/category/index");
  const adminRoute = require("../routes/admin/index");
  const userRoute = require("../routes/user/index");
  const customerRoute = require("../routes/customer/index");
  const orderRoute = require("../routes/order/index");
  const mediaRoute = require("../routes/media/index");
  const giftcardRoute = require("../routes/giftcard/index");
  const supplierRoute = require("../routes/supplier/index");
  const inventoryRoute = require("../routes/inventory-transfer/index");
  const collectionRoute = require("../routes/collection/index");
  const discountRoute = require("../routes/discount/index");
  const tagRoute = require("../routes/tag/index");
  const blogCategoryRoute = require("../routes/blogCategory/index");
  const blogPostRoute = require("../routes/blogPost/index");
  const pageRoute = require("../routes/page/index");
  const preferenceRoute = require("../routes/preference/index");
  const themeRoute = require("../routes/theme/index");
  const menuRoute = require("../routes/menu/index");

  // define all routes here
  app.use(["/api/v1/product"], productRoute);
  app.use(["/api/v1/category"], categoryRoute);
  app.use(["/api/v1/admin"], adminRoute);
  app.use(["/api/v1/user"], userRoute);
  app.use(["/api/v1/customer"], customerRoute);
  app.use(["/api/v1/order"], orderRoute);
  app.use(["/api/v1/media"], mediaRoute);
  app.use(["/api/v1/giftcard"], giftcardRoute);
  app.use(["/api/v1/supplier"], supplierRoute);
  app.use(["/api/v1/inventory"], inventoryRoute);
  app.use(["/api/v1/collection"], collectionRoute);
  app.use(["/api/v1/discount"], discountRoute);
  app.use(["/api/v1/tag"], tagRoute);
  app.use(["/api/v1/blogCategory"], blogCategoryRoute);
  app.use(["/api/v1/blogPost"], blogPostRoute);
  app.use(["/api/v1/page"], pageRoute);
  app.use(["/api/v1/os-preference"], preferenceRoute);
  app.use(["/api/v1/theme"], themeRoute);
  app.use(["/api/v1/menu"], menuRoute);

  const { createResponseObject } = require("../utils");

  /* Catch all */
  app.all("*", function (req, res) {
    res.status(enums.HTTP_CODES.BAD_REQUEST).json(
      createResponseObject({
        req: req,
        result: -1,
        message: "Sorry! The request could not be processed!",
        payload: {},
        logPayload: false,
      })
    );
  });

  // Async error handler
  app.use((error, req, res, next) => {
    logger.error(`${req.originalUrl} - Error caught by error-handler (router.js): ${error.message}\n${error.stack}`);
    const data4responseObject = {
      req: req,
      result: -999,
      message: messages.GENERAL,
      payload: {},
      logPayload: false,
    };

    return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(createResponseObject(data4responseObject));
  });
};

cron.schedule("0 0 * * *", async () => {
  await couponSchedule();
});
