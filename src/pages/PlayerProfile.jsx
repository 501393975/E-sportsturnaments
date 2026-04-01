import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerContext';
import { TeamContext } from '../contexts/TeamContext';
import '../styles/PlayerProfile.css';

function PlayerProfile() {
  const { id } = useParams();
  const { getPlayerById } = useContext(PlayerContext);
  const { getTeamById } = useContext(TeamContext);

  const player = getPlayerById(id);
  const team = player ? getTeamById(player.teamId) : null;

  if (!player) {
    return <div className="error">Player not found</div>;
  }

  const kdRatio = player.totalDeaths > 0 ? (player.totalKills / player.totalDeaths).toFixed(2) : player.totalKills;

  return (
    <div className="player-profile">
      <div className="profile-header">
        <div className="player-info">
          <h1>{player.name}</h1>
          <p className="role">{player.role}</p>
          {team && (
            <p className="team">
              Team: <Link to={`/team/${team.id}`}>{team.name} {team.tag}</Link>
            </p>
          )}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Kills</h3>
          <p className="stat-value">{player.totalKills}</p>
        </div>
        <div className="stat-card">
          <h3>Total Deaths</h3>
          <p className="stat-value">{player.totalDeaths}</p>
        </div>
        <div className="stat-card">
          <h3>K/D Ratio</h3>
          <p className="stat-value">{kdRatio}</p>
        </div>
        <div className="stat-card">
          <h3>Assists</h3>
          <p className="stat-value">{player.totalAssists}</p>
        </div>
        <div className="stat-card">
          <h3>Headshots</h3>
          <p className="stat-value">{player.totalHeadshots}</p>
        </div>
        <div className="stat-card">
          <h3>Matches Played</h3>
          <p className="stat-value">{player.totalMatches}</p>
        </div>
      </div>

      <div className="detailed-stats">
        <h2>Detailed Statistics</h2>
        <table className="stats-table">
          <tr>
            <td>Headshot Rate</td>
            <td>
              {player.totalKills > 0
                ? ((player.totalHeadshots / player.totalKills) * 100).toFixed(2)
                : 0}
              %
            </td>
          </tr>
          <tr>
            <td>Avg Kills per Match</td>
            <td>
              {player.totalMatches > 0
                ? (player.totalKills / player.totalMatches).toFixed(2)
                : 0}
            </td>
          </tr>
          <tr>
            <td>Avg Assists per Match</td>
            <td>
              {player.totalMatches > 0
                ? (player.totalAssists / player.totalMatches).toFixed(2)
                : 0}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default PlayerProfile;
