const CustomerDetailsSchema = require("../models/");
const axios = require("axios");
const multer = require("multer");
const util = require("util");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const BasicInfo = CustomerDetailsSchema.customerDetails.BasicInfo;
const BankInfo = CustomerDetailsSchema.customerDetails.BankInfo;
const KycInfo = CustomerDetailsSchema.customerDetails.KycInfo;

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `./KycDocs/${req.body.CustomerID}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Allowed file types
  var fileExtensions = [
    "image/png",
    "image/bmp",
    "image/jpeg",
    "image/x-png",
    "image/gif",
  ];

  // Check if the file type is in the allowedTypes array
  if (fileExtensions.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError = `goes wrong on the file type of ${file.fieldname}`;
    return cb(new Error("Invalid upload: fieldname should be image "));
  }
};

// Initialize upload variable with storage engine and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
  { name: "PanCard", maxCount: 1 },
  { name: "CancelCheque", maxCount: 1 },
  { name: "AddressProof", maxCount: 1 },
  { name: "HighestEducation", maxCount: 1 },
  { name: "PartnerPhoto", maxCount: 1 },
  { name: "MSMECertificate", maxCount: 1 },
  { name: "GSTCertificate", maxCount: 1 },
]);

const CustomerDetails = {
  ReadBasicInfo: async function (req, res, next) {
    // Creating entries using info json object

    const users = await BasicInfo.findAll({
      attributes: ["ID", "Username", "MobileNumber", "EmailId"],
    });
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).send("Internal server error!");
    }
  },

  CreateBasicInfo: async function (req, res, next) {
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
      res.status(200).send({"msg":"Record Inserted Successfully"});
    } else {
      res.status(400).send("Internal server error!");
    }
  },

  UpdateBasicInfo: async function (req, res, next) {
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
    BasicInfo.update(customerBasicInfo, { where: { ID: req.body.ID } })
      .then((result) => {
        console.log(result);
        res.status(200).json({
          msg: "update succesfull",
          customerId: req.body.ID,
          error: false,
        });
      })
      .catch((err) => {
        res.status(200).json({ msg: "updation failed", error: true });
      });
  },
  BankInfo: async function (req, res, next) {
    console.log(req.body)
    let customerBankInfo = {
      CustomerID: req.body.CustomerID,
      BankName: req.body.BankName,
      AccountHolderName: req.body.AccountHolderName,
      AccountNumber: req.body.AccountNumber,
      IfscCode: req.body.IfscCode,
      PanNumber: req.body.PanNumber,
      Pincode: req.body.Pincode,
      BranchState: req.body.BranchState,
      BranchAddress: req.body.BranchAddress,
    };
    var isExist = 0;
    await BankInfo.count({ where: { CustomerID: req.body.CustomerID } }).then(
      (count) => {
        if (count != 0) {
          isExist = false;
        } else {
          isExist = true;
        }
      }
    );
    if (isExist === true) {
      //Insert into table bankinfo
      BankInfo.create(customerBankInfo).then(function (result) {
        if (result) {
          res.status(200).send( {"msg":"Record Inserted successfully"});
        } else {
          res.status(400).send("Error in insert new record");
        }
      });
    } else {
      //Insert into table bankinfo
      BankInfo.update(customerBankInfo, {
        where: { CustomerID: req.body.CustomerID },
      }).then(function (result) {
        if (result) {
          res.status(200).json({"msg":"Update Succesfull",
          "result":result});
        } else {
          res.status(400).send("Error in update new record");
        }
      });
    }
  },
  KycDocuments: async function (req, res, next) {
    await upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.send({ msg: req.fileValidationError });
      }
      if (err) {
        return res.send(err);
      } else {
        console.log(req.files.Pancard);
        var docLink = `${process.env.LOCALHOST}details/kycinfo/${req.body.CustomerID}/`;
        const data = {
          CustomerID: Number(req.body.CustomerID),
          PanCard: docLink + req.files.PanCard[0].filename,
          CancelCheque: docLink + req.files.CancelCheque[0].filename,
          AddressProof: docLink + req.files.AddressProof[0].filename,
          HighestEducation: docLink + req.files.HighestEducation[0].filename,
          PartnerPhoto: docLink + req.files.PartnerPhoto[0].filename,
          MSMECertificate: docLink + req.files.MSMECertificate[0].filename,
          GSTCertificate: docLink + req.files.GSTCertificate[0].filename,
        };
        console.log(data);
        axios
          .post(`${process.env.LOCALHOST}details/kycinfo`, data)
          // Print data
          .then((response) => {
            if (response) {
              res.status(200).send({ msg: "Saved successfully" });
            } else {
              res.status(400).send("Error to fetch data\n" + error);
            }
          });
      }
    });
  },
  KycInfo: async function (req, res, next) {
    // Making json object to push the data for kyc info
    var isExist;
    await KycInfo.count({ where: { CustomerID: req.body.CustomerID } }).then(
      (count) => {
        if (count != 0) {
          isExist = false;
          // res.status(200).send(isExist);
        } else {
          isExist = true;
          // res.status(200).send(isExist);
        }
      }
    );
    let customerKycInfo = {
      CustomerID: req.body.CustomerID,
      PanCard: req.body.PanCard,
      CancelCheque: req.body.CancelCheque,
      AddressProof: req.body.AddressProof,
      HighestEducation: req.body.HighestEducation,
      PartnerPhoto: req.body.PartnerPhoto,
      MSMECertificate: req.body.MSMECertificate,
      GSTCertificate: req.body.GSTCertificate,
    };
    if (isExist === true) {
      const result = await KycInfo.create(customerKycInfo);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).send("Internal server error!");
      }
    } else {
      KycInfo.update(customerKycInfo, {
        where: { CustomerID: req.body.CustomerID },
      }).then(function (result) {
        const obj = { result };
        const str = util.inspect(obj);
        if (result) {
          res.status(200).send({"msg":"Update Succesfull",
          "result":result});
        } else {
          res.status(400).send("Error in update new record");
        }
      });
    }
    // Catching result and error message
  },

  GetKycDoc: async function (req, res, next) {
    const filepath = `./kycinfo/${req.params.id}/${req.params.docname}`;
    const fileextension = req.params.docname.substr(
      req.params.docname.lastIndexOf(".") + 1
    );
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.status(500).send({ error: "Error reading file" });
      } else {
        res.contentType(`application/${fileextension}`);
        res.send(data);
      }
    });
  },
};

module.exports = CustomerDetails;
