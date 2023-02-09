module.exports = (sequelize, DataTypes) => {
  const BasicInfo = sequelize.define("BasicInfo", {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FatherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmailId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PanNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DOB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GSTNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MSMENumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  const Bankinfo = sequelize.define("bankinfo", {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    BankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AccountHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IfscCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PanNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BranchState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BranchAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  const Kycinfo = sequelize.define("kycinfo", {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PanCard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CancelCheque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AddressProof: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HighestEducation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PartnerPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MSMECertificate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GSTCertificate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return { BasicInfo, Bankinfo, Kycinfo };
};
