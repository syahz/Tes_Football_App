/** @format */

const standingsModels = require("../models/standings.model");

const getStandings = async (_, res) => {
  try {
    const data = await standingsModels.getStandings();
    res.status(201).json({
      message: "GET all Standings",
      data: data,
    });
  } catch (error) {
    console.error("Error clubs controller:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getStandings,
};
