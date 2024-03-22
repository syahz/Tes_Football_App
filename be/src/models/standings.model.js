/** @format */

const dbPool = require("../config/database");
const matchesModels = require("../models/matches.model");
const clubModel = require("../models/clubs.model");

const getStandings = async () => {
  const clubData = await clubModel.getAllClub();
  const matchData = await matchesModels.getAllMatches();
  const matches = matchData[0];
  const clubs = clubData[0];

  let standings = clubs.map(club => ({
    id: club.id,
    nama_club: club.nama_club,
    Ma: 0, // Main
    Me: 0, // Menang
    S: 0, // Seri
    K: 0, // Kalah
    GM: 0, // Goal Menang
    GK: 0, // Goal Kalah
    Poin: 0, // Poin
  }));

  matches.forEach(match => {
    const homeIndex = standings.findIndex(club => club.id === match.home_club_id);
    const awayIndex = standings.findIndex(club => club.id === match.away_club_id);

    if (homeIndex !== -1 && awayIndex !== -1) {
      standings[homeIndex].Ma++;
      standings[awayIndex].Ma++;

      if (match.home_score > match.away_score) {
        // Home Wins
        standings[homeIndex].Me++;
        standings[awayIndex].K++;
        standings[homeIndex].GM += match.home_score;
        standings[awayIndex].GK += match.home_score;
        standings[homeIndex].Poin += 3;
      } else if (match.home_score < match.away_score) {
        // Away Wins
        standings[awayIndex].Me++;
        standings[homeIndex].K++;
        standings[awayIndex].GM += match.away_score;
        standings[homeIndex].GK += match.away_score;
        standings[awayIndex].Poin += 3;
      } else {
        // Seri
        standings[homeIndex].S++;
        standings[awayIndex].S++;
        standings[homeIndex].Poin += 1;
        standings[awayIndex].Poin += 1;
      }
    }
  });

  // Sort by Point
  standings.sort((a, b) => b.Poin - a.Poin || b.Me - a.Me || b.S - a.S || a.GK - b.GK || b.GM - a.GM);
  console.log("🚀 tes 🚀", standings);
  return standings;
};

module.exports = { getStandings };
// const getStandings = () => {
//   const sql = `
//     SELECT c.nama_club,
//        COUNT(m.id) AS Ma,
//        SUM(CASE WHEN (c.id = m.home_club_id AND m.home_score > m.away_score) OR
//                      (c.id = m.away_club_id AND m.away_score > m.home_score) THEN 1 ELSE 0 END) AS Me,
//        SUM(CASE WHEN m.home_score = m.away_score THEN 1 ELSE 0 END) AS S,
//        SUM(CASE WHEN (c.id = m.home_club_id AND m.home_score < m.away_score) OR
//                      (c.id = m.away_club_id AND m.away_score < m.home_score) THEN 1 ELSE 0 END) AS K,
//        SUM(CASE WHEN c.id = m.home_club_id THEN m.home_score ELSE 0 END) +
//        SUM(CASE WHEN c.id = m.away_club_id THEN m.away_score ELSE 0 END) AS GM,
//        SUM(CASE WHEN c.id = m.home_club_id THEN m.away_score ELSE 0 END) +
//        SUM(CASE WHEN c.id = m.away_club_id THEN m.home_score ELSE 0 END) AS GK
// FROM clubs c
// LEFT JOIN matches m ON c.id = m.home_club_id OR c.id = m.away_club_id
// GROUP BY c.nama_club
// ORDER BY Me DESC, S DESC, GM DESC
//   `;
//   return dbPool.execute(sql);
// };

// module.exports = {
//   getStandings,
// };
