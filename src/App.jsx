import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TournamentProvider } from './contexts/TournamentContext';
import { TeamProvider } from './contexts/TeamContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { MatchProvider } from './contexts/MatchContext';
import Dashboard from './pages/Dashboard';
import Tournaments from './pages/Tournaments';
import TournamentDetails from './pages/TournamentDetails';
import TeamDetails from './pages/TeamDetails';
import PlayerProfile from './pages/PlayerProfile';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

function App() {
  return (
    <TournamentProvider>
      <TeamProvider>
        <PlayerProvider>
          <MatchProvider>
            <Router>
              <div className="app">

                {/* Windows 2000-style nav bar */}
                <nav className="navbar">
                  <div className="nav-container">
                    <Link to="/" className="nav-brand">
                      FF E-Sports Tournament Hub
                    </Link>
                    <ul className="nav-menu">
                      <li><Link to="/">🏠 Home</Link></li>
                      <li><Link to="/tournaments">🏆 Tournaments</Link></li>
                      <li><Link to="/leaderboard">📊 Leaderboard</Link></li>
                      <li><Link to="/admin">⚙️ Admin</Link></li>
                    </ul>
                  </div>
                </nav>

                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tournaments" element={<Tournaments />} />
                    <Route path="/tournament/:id" element={<TournamentDetails />} />
                    <Route path="/team/:id" element={<TeamDetails />} />
                    <Route path="/player/:id" element={<PlayerProfile />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                  </Routes>
                </main>

                {/* Windows 2000-style taskbar/footer */}
                <footer className="footer">
                  <span>© 2026 Free Fire E-Sports</span>
                  &nbsp;|&nbsp;
                  <span>All rights reserved.</span>
                  &nbsp;|&nbsp;
                  <span style={{ color: 'var(--win-darker-gray)' }}>Microsoft Windows 2000 Edition™</span>
                </footer>

              </div>
            </Router>
          </MatchProvider>
        </PlayerProvider>
      </TeamProvider>
    </TournamentProvider>
  );
}

export default App;
