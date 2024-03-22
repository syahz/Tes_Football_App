/** @format */

const express = require("express");
const clubsController = require("../controller/clubs.controller");
const router = express.Router();

router.post("/", clubsController.createClubs);
router.get("/", clubsController.getAllClubs);

module.exports = router;
