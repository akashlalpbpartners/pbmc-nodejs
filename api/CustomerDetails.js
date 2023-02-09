const router = require("express").Router();
const { celebrate } = require("celebrate");

// Importing routers, validators and middleware
const CustomerDetails = require("../controllers/CustomerDetailsController");
const CustomerDetailsValidator = require("../validations/CutomerDetails");
const asyncMiddleware = require("../middleWare/asyncMiddleware");

// Using routers
router.post(
  "/BasicInfo",
  celebrate({ body: CustomerDetailsValidator.insertBasicInfo_POST_Schema }),
  asyncMiddleware(CustomerDetails.BasicInfo)
);
router.post(
  "/BankInfo",
  celebrate({ body: CustomerDetailsValidator.insertBankInfo_POST_Schema }),
  asyncMiddleware(CustomerDetails.BankInfo)
);
router.post(
  "/KycDocuments",
  celebrate({ body: CustomerDetailsValidator.insertKycInfo_POST_Schema }),
  asyncMiddleware(CustomerDetails.KycInfo)
);

module.exports = router;
