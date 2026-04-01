import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../contexts/TournamentContext';
import '../styles/Tournaments.css';

function Tournaments() {
  const { tournaments, createTournament, deleteTournamentData } = useContext(TournamentContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    maxTeams: 8,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTournament = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      createTournament(formData);
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        maxTeams: 8,
      });
      setShowForm(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      deleteTournamentData(id);
    }
  };

  return (
    <div className="tournaments-page">
      <div className="page-header">
        <h1>Tournaments</h1>
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Tournament'}
        </button>
      </div>

      {showForm && (
        <form className="tournament-form" onSubmit={handleCreateTournament}>
          <div className="form-group">
            <label>Tournament Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Max Teams</label>
              <input
                type="number"
                name="maxTeams"
                value={formData.maxTeams}
                onChange={handleInputChange}
                min="2"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Create Tournament
          </button>
        </form>
      )}

      <div className="tournaments-list">
        {tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div key={tournament.id} className="tournament-card">
              <div className="tournament-info">
                <h3>{tournament.name}</h3>
                <p className="description">{tournament.description}</p>
                <div className="tournament-details">
                  <span className={`status ${tournament.status}`}>
                    {tournament.status?.toUpperCase()}
                  </span>
                  <span>
                    {tournament.startDate} - {tournament.endDate}
                  </span>
                  <span>Max Teams: {tournament.maxTeams}</span>
                </div>
              </div>
              <div className="tournament-actions">
                <Link
                  to={`/tournament/${tournament.id}`}
                  className="btn-secondary"
                >
                  View Details
                </Link>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(tournament.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">
            No tournaments yet. Create one to get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default Tournaments;
