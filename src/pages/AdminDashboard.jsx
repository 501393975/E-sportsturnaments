import React, { useContext, useState } from 'react';
import { TournamentContext } from '../contexts/TournamentContext';
import { TeamContext } from '../contexts/TeamContext';
import { PlayerContext } from '../contexts/PlayerContext';
import { MatchContext } from '../contexts/MatchContext';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const { tournaments } = useContext(TournamentContext);
  const { teams } = useContext(TeamContext);
  const { players, getPlayersByTeam } = useContext(PlayerContext);
  const { createMatch, recordKill } = useContext(MatchContext);

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [matchForm, setMatchForm] = useState({
    date: new Date().toISOString().split('T')[0],
    teams: [],
  });
  const [killLog, setKillLog] = useState([]);
  const [killEntry, setKillEntry] = useState({
    playerId: '',
    kills: 0,
    deaths: 0,
    assists: 0,
    headshots: 0,
  });

  const tournamentTeams = selectedTournament
    ? teams.filter((t) => t.tournamentId === selectedTournament)
    : [];

  const handleRecordMatch = (e) => {
    e.preventDefault();
    if (matchForm.teams.length >= 2 && selectedTournament) {
      const newMatch = createMatch({
        tournamentId: selectedTournament,
        teams: matchForm.teams,
        date: matchForm.date,
        status: 'completed',
        killLog: killLog,
      });

      // Update player stats based on kill log
      killLog.forEach((log) => {
        // This would be called in real implementation
      });

      setMatchForm({
        date: new Date().toISOString().split('T')[0],
        teams: [],
      });
      setKillLog([]);
      setKillEntry({
        playerId: '',
        kills: 0,
        deaths: 0,
        assists: 0,
        headshots: 0,
      });

      alert('Match recorded successfully!');
    } else {
      alert('Please select at least 2 teams and a tournament');
    }
  };

  const handleAddKill = (e) => {
    e.preventDefault();
    if (killEntry.playerId) {
      setKillLog((prev) => [
        ...prev,
        {
          ...killEntry,
          id: Date.now(),
        },
      ]);
      setKillEntry({
        playerId: '',
        kills: 0,
        deaths: 0,
        assists: 0,
        headshots: 0,
      });
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>⚙️ Admin Dashboard</h1>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'record-match' ? 'active' : ''}`}
          onClick={() => setActiveTab('record-match')}
        >
          Record Match
        </button>
        <button
          className={`tab-button ${activeTab === 'manage-data' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage-data')}
        >
          Manage Data
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="tab-content">
          <h2>Dashboard Overview</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h4>Total Tournaments</h4>
              <p className="stat-number">{tournaments.length}</p>
            </div>
            <div className="stat-box">
              <h4>Total Teams</h4>
              <p className="stat-number">{teams.length}</p>
            </div>
            <div className="stat-box">
              <h4>Total Players</h4>
              <p className="stat-number">{players.length}</p>
            </div>
            <div className="stat-box">
              <h4>Active Tournaments</h4>
              <p className="stat-number">
                {tournaments.filter((t) => t.status === 'ongoing').length}
              </p>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Tournaments</h3>
            {tournaments.length > 0 ? (
              <ul>
                {tournaments.slice(0, 5).map((t) => (
                  <li key={t.id}>
                    <strong>{t.name}</strong> - {t.status} ({t.startDate})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tournaments yet</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'record-match' && (
        <div className="tab-content">
          <h2>Record Match Result</h2>

          <form onSubmit={handleRecordMatch} className="match-form">
            <div className="form-section">
              <h3>Match Details</h3>

              <div className="form-group">
                <label>Tournament *</label>
                <select
                  value={selectedTournament}
                  onChange={(e) => setSelectedTournament(e.target.value)}
                  required
                >
                  <option value="">Select a tournament...</option>
                  {tournaments.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Match Date</label>
                <input
                  type="date"
                  value={matchForm.date}
                  onChange={(e) =>
                    setMatchForm((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label>Teams Played *</label>
                <div className="teams-selector">
                  {tournamentTeams.map((team) => (
                    <label key={team.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={matchForm.teams.includes(team.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMatchForm((prev) => ({
                              ...prev,
                              teams: [...prev.teams, team.id],
                            }));
                          } else {
                            setMatchForm((prev) => ({
                              ...prev,
                              teams: prev.teams.filter((t) => t !== team.id),
                            }));
                          }
                        }}
                      />
                      {team.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Record Player Kills</h3>

              <div className="kill-entry">
                <div className="form-group">
                  <label>Player</label>
                  <select
                    value={killEntry.playerId}
                    onChange={(e) =>
                      setKillEntry((prev) => ({
                        ...prev,
                        playerId: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select a player...</option>
                    {tournamentTeams.length > 0 ? (
                      tournamentTeams.map((team) => {
                        const teamPlayers = getPlayersByTeam(team.id);
                        return teamPlayers.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name} ({team.name})
                          </option>
                        ));
                      })
                    ) : (
                      <option disabled>No teams selected</option>
                    )}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kills</label>
                    <input
                      type="number"
                      min="0"
                      value={killEntry.kills}
                      onChange={(e) =>
                        setKillEntry((prev) => ({
                          ...prev,
                          kills: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Deaths</label>
                    <input
                      type="number"
                      min="0"
                      value={killEntry.deaths}
                      onChange={(e) =>
                        setKillEntry((prev) => ({
                          ...prev,
                          deaths: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Assists</label>
                    <input
                      type="number"
                      min="0"
                      value={killEntry.assists}
                      onChange={(e) =>
                        setKillEntry((prev) => ({
                          ...prev,
                          assists: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Headshots</label>
                    <input
                      type="number"
                      min="0"
                      value={killEntry.headshots}
                      onChange={(e) =>
                        setKillEntry((prev) => ({
                          ...prev,
                          headshots: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleAddKill}
                >
                  Add Kill Count
                </button>
              </div>

              <div className="kill-summary">
                <h4>Players Added ({killLog.length})</h4>
                {killLog.length > 0 ? (
                  <ul>
                    {killLog.map((log) => {
                      const player = players.find((p) => p.id === log.playerId);
                      return (
                        <li key={log.id}>
                          {player?.name} - {log.kills}K {log.deaths}D {log.assists}A
                          {log.headshots > 0 && ` (${log.headshots}HS)`}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No players added yet</p>
                )}
              </div>
            </div>

            <button type="submit" className="btn-primary btn-large">
              Record Match
            </button>
          </form>
        </div>
      )}

      {activeTab === 'manage-data' && (
        <div className="tab-content">
          <h2>Manage Data</h2>
          <div className="management-section">
            <h3>⚠️ Data Management</h3>
            <p>Manage tournaments, teams, and players from their respective pages.</p>
            <ul>
              <li>
                <strong>Create Tournaments:</strong> Go to Tournaments page
              </li>
              <li>
                <strong>Add Teams:</strong> Go to Tournament Details
              </li>
              <li>
                <strong>Add Players:</strong> Go to Team Details
              </li>
              <li>
                <strong>Record Matches:</strong> Use the "Record Match" tab above
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
