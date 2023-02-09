// Importing the schemas
const CustomerDetailsSchema = require("../models/CustomerDetailsSchema");

// Assigning the schemas to different names
const BasicInfo = CustomerDetailsSchema.BasicInfo;
const BankInfo = CustomerDetailsSchema.BankInfo;
const kycInfo = CustomerDetailsSchema.kycinfo;

// Firing the routes to create entries

var CustomerDetails = {
  BasicInfo: async function (req, res, next) {
    // Making json object to push the data for basic info
    let customerBasicInfo = {
      Username: req.body.Username,
      FatherName: req.body.FatherName,
      MobileNumber: req.body.MobileNumber,
      EmailId: req.body.EmailId,
      PanNumber: req.body.PanNumber,
      DOB: req.body.DOB,
      Address: req.body.Address,
      Pincode: req.body.Pincode,
      State: req.body.State,
      City: req.body.City,
      GSTNumber: req.body.GSTNumber,
      MSMENumber: req.body.MSMENumber,
    };

    // Creating entries using info json object
    const result = await BasicInfo.create(customerBasicInfo);

    // Catching result and error message
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("Internal server error!");
    }
  },

  BankInfo: async function (req, res, next) {
    // Making json object to push the data for bank info
    let customerBankInfo = {
      BankName: req.body.BankName,
      AccountHolderName: req.body.AccountHolderName,
      AccountNumber: req.body.AccountNumber,
      IfscCode: req.body.IfscCode,
      PanNumber: req.body.PanNumber,
      Pincode: req.body.Pincode,
      BranchState: req.body.BranchState,
      BranchAddress: req.body.BranchAddress,
    };

    // Creating entries using info json object
    const result = await BankInfo.create(customerBankInfo);

    // Catching result and error message
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("Internal server error!");
    }
  },
  KycInfo: async function (req, res, next) {
    // Making json object to push the data for kyc info
    let customerKycInfo = {
      PanCard: req.body.PanCard,
      CancelCheque: req.body.CancelCheque,
      AddressProof: req.body.AddressProof,
      HighestEducation: req.body.HighestEducation,
      PartnerPhoto: req.body.PartnerPhoto,
      MSMECertificate: req.body.MSMECertificate,
      GSTCertificate: req.body.GSTCertificate,
    };

    // Creating entries using info json object
    const result = await kycInfo.create(customerKycInfo);

    // Catching result and error message
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("Internal server error!");
    }
  },
};
module.exports = CustomerDetails;
