/** @format */
require("dotenv").config();
const express = require("express");
const clubsRoutes = require("./routes/clubs.routes");
const matchesRoutes = require("./routes/matches.routes");
const standingsRoutes = require("./routes/standings.routes");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/club", clubsRoutes);
app.use("/match", matchesRoutes);
app.use("/standing", standingsRoutes);

app.listen(PORT, () => {
  console.log(`Server Running di port : ${PORT}`);
});
