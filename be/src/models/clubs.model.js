/** @format */

const dbPool = require("../config/database");

const createClub = body => {
  const sql = `INSERT INTO clubs (nama_club, kota_club) VALUES (? , ?)`;
  const values = [body.nama_club, body.kota_club];
  return dbPool.execute(sql, values);
};

const getAllClub = () => {
  const sql = `SELECT * FROM clubs`;
  return dbPool.execute(sql);
};

const getClubByNameAndCity = async body => {
  const sql = `SELECT * FROM clubs WHERE nama_club = ? OR kota_club = ?`;
  const values = [body.nama_club, body.kota_club];
  return dbPool.execute(sql, values);
};

module.exports = {
  createClub,
  getClubByNameAndCity,
  getAllClub,
};
