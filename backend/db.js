const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("mydb", "root", "son", {
  host: "mysql_db",
  port: 3306,
  dialect: "mysql",
});
const connectDatabase = async () => {
  const sequelize = new Sequelize("mydb", "root", "son", {
    host: "mysql_db",
    port: 3306,
    dialect: "mysql",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = {
  connectDatabase,
  sequelize,
};
