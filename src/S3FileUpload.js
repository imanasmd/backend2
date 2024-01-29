const multer = require("multer");
const multerS3 = require("multer-s3");
var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

const mediaUploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    // acl: 'public-read',
    // contentType: 'image/jpg',
    metadata: function (req, file, cb) {
      console.log("file-----", file);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log("file+++++", file);
      let splited = file.originalname.split(".");
      console.log("splited", splited);
      cb(null, `dtoub/${file?.fieldname}/` + Date.now().toString() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    },
  }),
});

const mediaDeleteS3 = function (filename, callback) {
  // var s3 = new AWS.S3();
  var params = {
    Bucket: process.env.BUCKET,
    Key: filename,
  };

  s3.deleteObject(params, function (err, data) {
    if (data) {
      console.log("file deleted", data);
    } else {
      console.log("err in delete object", err);
      // callback(null);
    }
  });
};

module.exports = {
  mediaUploadS3,
  mediaDeleteS3,
};
