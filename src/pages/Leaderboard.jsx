import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerContext';
import { TournamentContext } from '../contexts/TournamentContext';
import '../styles/Leaderboard.css';

function Leaderboard() {
  const { getGlobalLeaderboardData, getTournamentLeaderboardData } = useContext(PlayerContext);
  const { tournaments } = useContext(TournamentContext);
  const [filterType, setFilterType] = useState('global');
  const [selectedTournament, setSelectedTournament] = useState('');

  const getLeaderboardData = () => {
    if (filterType === 'global') {
      return getGlobalLeaderboardData();
    } else if (filterType === 'tournament' && selectedTournament) {
      return getTournamentLeaderboardData(selectedTournament);
    }
    return [];
  };

  const leaderboardData = getLeaderboardData();

  return (
    <div className="leaderboard-page">
      <div className="page-header">
        <h1>🔥 Kill Leaderboard</h1>
        <p>Rank the top killers in Free Fire E-Sports</p>
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label>Filter By:</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setSelectedTournament('');
            }}
          >
            <option value="global">Global Leaderboard</option>
            <option value="tournament">Tournament Specific</option>
          </select>
        </div>

        {filterType === 'tournament' && (
          <div className="filter-group">
            <label>Tournament:</label>
            <select
              value={selectedTournament}
              onChange={(e) => setSelectedTournament(e.target.value)}
            >
              <option value="">Select a tournament...</option>
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="leaderboard-container">
        {leaderboardData.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="rank">Rank</th>
                <th className="player-name">Player</th>
                <th className="team">Team</th>
                <th className="kills">Kills</th>
                <th className="deaths">Deaths</th>
                <th className="assists">Assists</th>
                <th className="headshots">Headshots</th>
                <th className="kd">K/D Ratio</th>
                <th className="matches">Matches</th>
                <th className="action">Profile</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => {
                const kdRatio = player.totalDeaths > 0 
                  ? (player.totalKills / player.totalDeaths).toFixed(2) 
                  : player.totalKills;
                
                return (
                  <tr key={player.id} className={`rank-${index + 1}`}>
                    <td className="rank">
                      <div className="rank-badge">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `#${index + 1}`}
                      </div>
                    </td>
                    <td className="player-name">
                      <strong>{player.name}</strong>
                    </td>
                    <td className="team">{player.teamId || 'N/A'}</td>
                    <td className="kills">
                      <span className="value">{player.totalKills}</span>
                    </td>
                    <td className="deaths">
                      <span className="value">{player.totalDeaths}</span>
                    </td>
                    <td className="assists">
                      <span className="value">{player.totalAssists}</span>
                    </td>
                    <td className="headshots">
                      <span className="value">{player.totalHeadshots}</span>
                    </td>
                    <td className="kd">
                      <span className="value">{kdRatio}</span>
                    </td>
                    <td className="matches">
                      <span className="value">{player.totalMatches}</span>
                    </td>
                    <td className="action">
                      <Link to={`/player/${player.id}`} className="btn-view">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty-message">
            <p>No players found. {filterType === 'tournament' && 'Select a tournament to view its leaderboard.'}</p>
          </div>
        )}
      </div>

      <div className="leaderboard-info">
        <h3>📊 Leaderboard Information</h3>
        <ul>
          <li>Players are ranked by total kills</li>
          <li>K/D Ratio = Total Kills ÷ Total Deaths</li>
          <li>Real-time updates when match results are recorded</li>
          <li>Global leaderboard shows all players across tournaments</li>
          <li>Tournament leaderboard shows players in specific tournaments</li>
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
