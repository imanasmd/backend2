const moment = require("moment");

const couponSchedule = async function (filename, callback) {
  let getAllGiftcard = await global.models.GLOBAL.GIFTCARD.find({ isDateExpire: true });
  for (const i of getAllGiftcard) {
    if (i.isDateExpire) {
      if (i.expireDate) {
        let discountDate = moment(i.expireDate).format("YYYY-MM-DD");
        let currentDate = moment(new Date()).format("YYYY-MM-DD");
        if (discountDate === currentDate) {
          let UpdateCoupon = await global.models.GLOBAL.GIFTCARD.updateOne(
            { _id: i },
            {
              isExpire: true,
            }
          );
        }
      }
    }
  }
};

module.exports = {
  couponSchedule,
};
