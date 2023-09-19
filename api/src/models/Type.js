const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Type', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Usa UUID como tipo de dato para el ID
      primaryKey: true // Genera un UUID único automáticamente
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Campo obligatorio
    },
  },
  {timestamps: false}
  );

};
