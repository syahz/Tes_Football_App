/** @format */

const clubsModels = require("../models/clubs.model");

const createClubs = async (req, res) => {
  try {
    const { body } = req;
    const [checkClubs] = await clubsModels.getClubByNameAndCity(body);
    if (checkClubs.length > 0) {
      return res.status(400).json({ message: "Club already exists" });
    }
    await clubsModels.createClub(body);
    return res.status(201).json({
      message: "Club created successfully",
      data: body,
    });
  } catch (error) {
    console.error("Error clubs controller:", error);
    res.status(500).send("Internal server error");
  }
};

const getAllClubs = async (_, res) => {
  try {
    const [data] = await clubsModels.getAllClub();
    res.status(201).json({
      message: "GET all users success",
      data: data,
    });
  } catch (error) {
    console.error("Error clubs controller:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createClubs,
  getAllClubs,
};
