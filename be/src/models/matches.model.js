/** @format */

const dbPool = require("../config/database");

const createMatch = body => {
  const sql = `INSERT INTO matches (home_club_id, away_club_id, home_score, away_score) VALUES (?,?,?,?)`;
  const values = [body.home_club_id, body.away_club_id, body.home_score, body.away_score];
  return dbPool.execute(sql, values);
};

const getAllMatches = () => {
  const sql = `SELECT * FROM matches`;
  return dbPool.execute(sql);
};

const getMatchByHomeAndAway = async body => {
  const sql = `SELECT * FROM matches WHERE home_club_id = ? AND away_club_id = ?`;
  const values = [body.home_club_id, body.away_club_id];
  return dbPool.execute(sql, values);
};

module.exports = {
  createMatch,
  getMatchByHomeAndAway,
  getAllMatches,
};
