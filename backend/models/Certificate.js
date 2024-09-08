const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certificate = sequelize.define('Certificate', {
  recipientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recipientEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  encryptedData: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  encryptedSymmetricKey: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Certificate;