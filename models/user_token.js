module.exports = (sequelize, DataTypes) => {
  const user_token = sequelize.define(
    "userTokens",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdOn: {
        type: DataTypes.DATE(),
      },
      updatedOn: {
        type: DataTypes.DATE(),
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return user_token;
};
