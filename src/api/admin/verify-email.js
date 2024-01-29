const Joi = require("joi");
const enums = require("../../../json/enums.json");
const events = require("../../../json/events.json");
const messages = require("../../../json/messages.json");
const logger = require("../../logger");
const utils = require("../../utils");
const config = require("../../../config.json");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const emailHelper = require("../../server/helpers/emails.helper");
sgMail.setApiKey(process.env.EMAIL_API_KEY);

module.exports = exports = {
  // route validation
  validation: Joi.object({
    email: Joi.string().required(),
  }),

  // route handler
  handler: async (req, res) => {
    // await emailHelper.sendMail(email.trim(), `DTOUB | OTP To Verify Your Email`, "verify-email.html", mailData);
    const { email, name } = req.body;
    let code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    let entry;
    const verifyEmail = await global.models.GLOBAL.ADMIN.findOne({
      email: email,
    });
    console.log("verifyEmail>>>>>>>>>>>>>>>>>>>>", verifyEmail);

    if (verifyEmail) {
      let data4createResponseObject = {
        req: req,
        result: -1,
        message: "user already register",
        payload: {},
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.BAD_REQUEST).json(utils.createResponseObject(data4createResponseObject));
    }

    try {
      console.log("MAIL SENDING");
      let mailData = {
        code: code,
        username: name,
      };
      const msg = {
        to: email,
        from: process.env.EMAIL, // Use the email address or domain you verified above
        subject: " DTOUB | OTP To Verify Your Email",
        html: `<!DOCTYPE html>
          <html lang="en">
  
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
          </head>
          <style>
              body {
                  font-family: 'Ubuntu', sans-serif;
                  background-color: #f5f5f5;
              }
  
              * {
                  box-sizing: border-box;
              }
  
              p:last-child {
                  margin-top: 0;
              }
  
              img {
                  max-width: 100%;
              }
          </style>
  
          <body style="margin: 0; padding: 0;">
              <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                      <td style="padding: 20px 0 30px 0;">
                          <table align="center" cellpadding="0" cellspacing="0" width="600" style=" border-collapse: collapse; border: 1px solid #ececec; background-color: #1479FF;">
                              <tr>
                                  <td align="center" style="position: relative;">
                                      <div
                                      class="company-logo-align"
                                      style=" padding: 2rem 2rem 1rem 2rem; display: flex; align-items: center; justify-content: center;background: #fff; margin: 0 auto;"
                                      align="center">
                                          <img  src="https://dtoub.s3.amazonaws.com/dtoub/media/1661339938675.png" style= "margin:0 auto; height: 50px;cursor: pointer;"/>
                                      </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <div class="user-information"
                                      style="padding: 25px; background-color: #28C76F; width: 91.6%;"
                                      >
                                      <h1 align="center" style="color: #fff; font-size: 35px; font-weight: 500; margin: 0 0 1rem 0;">Hi ${name}</h1>
                                      <p align="center" style="color: #fff; font-size: 30px; font-weight: 500; margin: 0 0 1rem 0;">Welcome to DTOUB®</p>
                                      </div>
  
                                  </td>
                                  <td></td>
                              </tr>
                              <tr>
                                  <td style="padding: 3rem 2rem 2rem 2rem;">
                                    <h2 align="center" style="color: #fff; font-size: 30px; ">Verify your Email Address</h2>
                                    <p align="center" style="color: #fff; font-size: 14px; margin: 2.50rem 0 2rem 0;">Please find below your one time passcode.</p>
                                    <h6 align="center" style="font-size: 40px; color: #fff; margin: 0;  margin-top: 0;">OTP : ${code}</h6>
                                  </td>
                              </tr>
  
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
  
          </html>`,
      };
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      let info = await transporter.sendMail(msg);

      if (config.MONGODB.GLOBAL.USE_TEST_PIN) {
        code = code;
        const NOW = new Date();
        // Save the code in database
        let findMail = await global.models.GLOBAL.CODE_VERIFICATION.findOne({
          email: email,
        });
        if (findMail) {
          let findMail = await global.models.GLOBAL.CODE_VERIFICATION.findByIdAndUpdate(
            {
              _id: findMail._id,
            },
            {
              $set: { email: email, code: code, date: Date.now(), expirationDate: new Date(NOW.getTime() + 300 * 1000), failedAttempts: 0 },
            }
          );
        } else {
          entry = global.models.GLOBAL.CODE_VERIFICATION({
            email: email,
            code: code,
            date: Date.now(),
            expirationDate: new Date(NOW.getTime() + 300 * 1000),
            failedAttempts: 0,
          });
          logger.info("/verify-email - Saving verification-code in database");
          try {
            await entry.save();
          } catch (error) {
            logger.error(`/verify-email - Error while saving code in database: ${error.message}\n${error.stack}`);
            const data4createResponseObject = {
              req: req,
              result: -1,
              message: messages.FAILED_VERIFICATION,
              payload: "2",
              logPayload: false,
            };
            return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
          }
        }
        const data4createResponseObject = {
          req: req.body,
          result: 0,
          message: messages.MAIL_SENT,
          payload: { email },
          logPayload: false,
        };
        return res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));
      }
    } catch (error) {
      logger.error(`${req.originalUrl} - Error while sending Mail : ${error.message}\n${error.stack}`);
      const data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.GENERAL,
        payload: "1",
        logPayload: false,
      };
      return res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
    }
  },
};
