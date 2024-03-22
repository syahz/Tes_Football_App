/** @format */

const matchesModels = require("../models/matches.model");

const createMatch = async (req, res) => {
  try {
    const { body } = req;
    const [checkMatch] = await matchesModels.getMatchByHomeAndAway(body);
    if (checkMatch.length > 0) {
      return res.status(409).json({ message: "Match already exists" });
    }
    const match = await matchesModels.createMatch(body);
    return res.status(201).json({
      message: "Matches created successfully",
      data: body,
    });
  } catch (error) {
    console.error("Error clubs controller:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMatch };
