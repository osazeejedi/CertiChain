const { Sequelize } = require('sequelize');
const databaseUrl ='postgresql://neondb_owner:rUbcm30YkEIX@ep-nameless-bush-a5xiwwm1.us-east-2.aws.neon.tech/neondb?sslmode=require&options=project%3Dep-nameless-bush-a5xiwwm1'

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;