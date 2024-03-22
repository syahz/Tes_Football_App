/** @format */

const express = require("express");
const matchesController = require("../controller/matches.controller");
const router = express.Router();

router.post("/", matchesController.createMatch);

module.exports = router;
