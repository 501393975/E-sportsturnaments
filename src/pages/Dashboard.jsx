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

      {/* Hero Window */}
      <div className="hero-section">
        <div className="hero-titlebar">
          <span>🏆</span>
          <span>Free Fire E-Sports Tournament Hub</span>
          <div className="hero-titlebar-btns">
            <button className="hero-titlebar-btn" title="Minimize">_</button>
            <button className="hero-titlebar-btn" title="Maximize">□</button>
            <button className="hero-titlebar-btn" title="Close">✕</button>
          </div>
        </div>
        <div className="hero-body">
          <div className="hero-icon">🎮</div>
          <div>
            <h1>Welcome to FF E-Sports Tournament Hub</h1>
            <p>Manage tournaments, track kills, and compete with the best players!</p>
          </div>
        </div>
        <div className="win-statusbar">
          <span className="win-statusbar-pane">Ready</span>
          <span className="win-statusbar-pane">{tournaments.length} tournament(s)</span>
          <span>{activeTournaments.length} active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-titlebar">📁 Total Tournaments</div>
          <div className="stat-card-body">
            <p className="stat-number">{tournaments.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-titlebar">▶ Active</div>
          <div className="stat-card-body">
            <p className="stat-number">{activeTournaments.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-titlebar">🕐 Upcoming</div>
          <div className="stat-card-body">
            <p className="stat-number">{upcomingTournaments.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-titlebar">✔ Completed</div>
          <div className="stat-card-body">
            <p className="stat-number">{completedTournaments.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-action-section">
        <div className="quick-action">
          <div className="quick-action-titlebar">
            <span>📋</span>
            <span>Upcoming Tournaments</span>
          </div>
          <div className="quick-action-body">
            {upcomingTournaments.length > 0 ? (
              <ul>
                {upcomingTournaments.slice(0, 5).map((tournament) => (
                  <li key={tournament.id}>
                    <Link to={`/tournament/${tournament.id}`}>
                      {tournament.name} — {tournament.startDate}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-message">No upcoming tournaments</p>
            )}
          </div>
          <div className="win-statusbar">
            <span>{upcomingTournaments.length} item(s)</span>
          </div>
        </div>

        <div className="quick-action">
          <div className="quick-action-titlebar">
            <span>🔗</span>
            <span>Quick Links</span>
          </div>
          <div className="quick-action-body">
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
          <div className="win-statusbar">
            <span>3 shortcut(s)</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
