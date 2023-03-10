module.exports=(sequelize,DataTypes)=>{
    const employment_types = sequelize.define(
        "EmploymentTypes",
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          EmploymentType: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          CreatedOn: {
            type: DataTypes.DATE(),
          },
          UpdatedOn: {
            type: DataTypes.DATE(),
          },
        },
        {
          timestamps: false,
          createdAt: false,
          updatedAt: false,
        }
      );
      return employment_types;
}