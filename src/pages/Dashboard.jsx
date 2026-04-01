import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../contexts/TournamentContext';
import '../styles/Dashboard.css';

function Dashboard() {
  const { tournaments } = useContext(TournamentContext);

  const activeTournaments = tournaments.filter((t) => t.status === 'ongoing');
  const upcomingTournaments = tournaments.filter((t) => t.status === 'upcoming');
  const completedTournaments = tournaments.filter((t) => t.status === 'completed');

  return (
    <div className="dashboard">
      <div className="hero-section">
        <h1>Free Fire E-Sports Tournament Hub</h1>
        <p>Manage tournaments, track kills, and compete with the best!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tournaments</h3>
          <p className="stat-number">{tournaments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Tournaments</h3>
          <p className="stat-number">{activeTournaments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming</h3>
          <p className="stat-number">{upcomingTournaments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{completedTournaments.length}</p>
        </div>
      </div>

      <div className="quick-action-section">
        <div className="quick-action">
          <h3>Upcoming Tournaments</h3>
          {upcomingTournaments.length > 0 ? (
            <ul>
              {upcomingTournaments.slice(0, 5).map((tournament) => (
                <li key={tournament.id}>
                  <Link to={`/tournament/${tournament.id}`}>
                    {tournament.name} - {tournament.startDate}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming tournaments</p>
          )}
        </div>

        <div className="quick-action">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/tournaments">All Tournaments</Link>
            </li>
            <li>
              <Link to="/leaderboard">Kill Leaderboard</Link>
            </li>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
