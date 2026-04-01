import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TeamContext } from '../contexts/TeamContext';
import { PlayerContext } from '../contexts/PlayerContext';
import '../styles/TeamDetails.css';

function TeamDetails() {
  const { id } = useParams();
  const { getTeamById } = useContext(TeamContext);
  const { getTeamPlayers, createPlayer, deletePlayerData } = useContext(PlayerContext);

  const team = getTeamById(id);
  const players = getTeamPlayers(id);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Assaulter',
  });

  if (!team) {
    return <div className="error">Team not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      createPlayer({
        name: formData.name,
        role: formData.role,
        teamId: id,
        tournamentId: team.tournamentId,
      });
      setFormData({ name: '', role: 'Assaulter' });
      setShowForm(false);
    }
  };

  const handleDeletePlayer = (playerId) => {
    if (window.confirm('Remove this player from the team?')) {
      deletePlayerData(playerId);
    }
  };

  return (
    <div className="team-details">
      <div className="team-header">
        <h1>{team.name}</h1>
        <span className="team-tag">{team.tag}</span>
      </div>

      <div className="team-stats-grid">
        <div className="stat-box">
          <h4>Total Players</h4>
          <p>{players.length}</p>
        </div>
        <div className="stat-box">
          <h4>Total Kills</h4>
          <p>{team.totalKills}</p>
        </div>
        <div className="stat-box">
          <h4>Total Wins</h4>
          <p>{team.totalWins}</p>
        </div>
      </div>

      <div className="roster-section">
        <div className="section-header">
          <h2>Roster</h2>
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add Player'}
          </button>
        </div>

        {showForm && (
          <form className="player-form" onSubmit={handleAddPlayer}>
            <div className="form-group">
              <label>Player Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleInputChange}>
                <option>Assaulter</option>
                <option>Support</option>
                <option>Sniper</option>
                <option>Scout</option>
              </select>
            </div>
            <button type="submit" className="btn-primary">
              Add Player
            </button>
          </form>
        )}

        <div className="players-list">
          {players.length > 0 ? (
            <table className="players-table">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Role</th>
                  <th>Kills</th>
                  <th>Deaths</th>
                  <th>Assists</th>
                  <th>Headshots</th>
                  <th>Matches</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id}>
                    <td>
                      <Link to={`/player/${player.id}`}>{player.name}</Link>
                    </td>
                    <td>{player.role}</td>
                    <td className="kills">{player.totalKills}</td>
                    <td className="deaths">{player.totalDeaths}</td>
                    <td>{player.totalAssists}</td>
                    <td>{player.totalHeadshots}</td>
                    <td>{player.totalMatches}</td>
                    <td>
                      <button
                        className="btn-small btn-danger"
                        onClick={() => handleDeletePlayer(player.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-message">No players in this team yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;
