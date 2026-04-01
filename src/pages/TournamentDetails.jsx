import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TournamentContext } from '../contexts/TournamentContext';
import { TeamContext } from '../contexts/TeamContext';
import { MatchContext } from '../contexts/MatchContext';
import '../styles/TournamentDetails.css';

function TournamentDetails() {
  const { id } = useParams();
  const { getTournamentById, updateTournamentData } = useContext(TournamentContext);
  const { getTournamentTeams, createTeam } = useContext(TeamContext);
  const { getTournamentMatches } = useContext(MatchContext);

  const tournament = getTournamentById(id);
  const teams = getTournamentTeams(id);
  const matches = getTournamentMatches(id);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamTag, setTeamTag] = useState('');

  if (!tournament) {
    return <div className="error">Tournament not found</div>;
  }

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      createTeam({
        name: teamName,
        tag: teamTag,
        tournamentId: id,
      });
      setTeamName('');
      setTeamTag('');
      setShowTeamForm(false);
    }
  };

  const handleStatusChange = (newStatus) => {
    updateTournamentData(id, { status: newStatus });
  };

  return (
    <div className="tournament-details">
      <div className="tournament-header">
        <div>
          <h1>{tournament.name}</h1>
          <p className="description">{tournament.description}</p>
        </div>
        <div className="status-buttons">
          <button
            className={`btn-status ${tournament.status === 'upcoming' ? 'active' : ''}`}
            onClick={() => handleStatusChange('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`btn-status ${tournament.status === 'ongoing' ? 'active' : ''}`}
            onClick={() => handleStatusChange('ongoing')}
          >
            Ongoing
          </button>
          <button
            className={`btn-status ${tournament.status === 'completed' ? 'active' : ''}`}
            onClick={() => handleStatusChange('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="tournament-info-grid">
        <div className="info-card">
          <h4>Start Date</h4>
          <p>{tournament.startDate}</p>
        </div>
        <div className="info-card">
          <h4>End Date</h4>
          <p>{tournament.endDate}</p>
        </div>
        <div className="info-card">
          <h4>Max Teams</h4>
          <p>{tournament.maxTeams}</p>
        </div>
        <div className="info-card">
          <h4>Teams Joined</h4>
          <p>
            {teams.length} / {tournament.maxTeams}
          </p>
        </div>
      </div>

      <div className="tournament-section">
        <div className="section-header">
          <h2>Teams ({teams.length})</h2>
          <button
            className="btn-primary"
            onClick={() => setShowTeamForm(!showTeamForm)}
          >
            {showTeamForm ? 'Cancel' : 'Add Team'}
          </button>
        </div>

        {showTeamForm && (
          <form className="team-form" onSubmit={handleAddTeam}>
            <div className="form-group">
              <label>Team Name *</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Team Tag</label>
              <input
                type="text"
                value={teamTag}
                onChange={(e) => setTeamTag(e.target.value)}
                placeholder="e.g., GSC, IND, EXO"
                maxLength="5"
              />
            </div>
            <button type="submit" className="btn-primary">
              Add Team
            </button>
          </form>
        )}

        <div className="teams-grid">
          {teams.length > 0 ? (
            teams.map((team) => (
              <Link
                key={team.id}
                to={`/team/${team.id}`}
                className="team-card-link"
              >
                <div className="team-card">
                  <div className="team-name">
                    <h3>{team.name}</h3>
                    <span className="team-tag">{team.tag}</span>
                  </div>
                  <div className="team-stats">
                    <span>Players: {team.players?.length || 0}</span>
                    <span>Kills: {team.totalKills}</span>
                    <span>Wins: {team.totalWins}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="empty-message">No teams yet</p>
          )}
        </div>
      </div>

      <div className="tournament-section">
        <h2>Matches ({matches.length})</h2>
        {matches.length > 0 ? (
          <div className="matches-list">
            {matches.map((match) => (
              <div key={match.id} className="match-card">
                <div className="match-info">
                  <span className="match-date">{match.date}</span>
                  <span className="match-teams">
                    {match.teams?.map((t) => t.name).join(' vs ')}
                  </span>
                </div>
                <div className="match-status">
                  {match.status === 'completed' && (
                    <span className="winner">Winner: {match.winner}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No matches yet</p>
        )}
      </div>
    </div>
  );
}

export default TournamentDetails;
