const express = require("express");
const cors = require("cors");
const database = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
database.connectDatabase();
const sequelize = database.sequelize;
sequelize.sync({ alter: true });
const todoRoutes = require("./routes/index");
app.use("/api", todoRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
