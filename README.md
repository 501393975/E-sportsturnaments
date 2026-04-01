# Free Fire E-Sports Tournament Management Website

A comprehensive web application for managing Free Fire E-sports tournaments, teams, and players with **real-time kill leaderboards**.

## Features

✅ **Tournament Management** - Create and manage multiple tournaments  
✅ **Team Management** - Form teams and add players  
✅ **Player Profiles** - Track individual player statistics  
✅ **Match Recording** - Record match results and player kills  
✅ **Kill Leaderboard** - Real-time global and tournament-specific kill rankings  
✅ **Admin Dashboard** - Centralized management panel  
✅ **Local Data Persistence** - All data stored in browser localStorage  
✅ **Responsive Design** - Works on desktop and mobile devices  

## Key Pages

| Page | Feature |
|------|---------|
| **Dashboard** | Overview of active tournaments and quick stats |
| **Tournaments** | Browse and create tournaments |
| **Tournament Details** | View teams, matches, and bracket info |
| **Team Details** | Manage team roster and view player stats |
| **Player Profile** | Individual player statistics and achievements |
| **Leaderboard** | Kill rankings (global & tournament-specific) |
| **Admin Dashboard** | Record matches and manage tournament data |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   cd /path/to/E-sporst
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## Usage

### Creating a Tournament

1. Go to **Tournaments** page
2. Click **"Create Tournament"** button
3. Fill in tournament details (name, dates, max teams)
4. Click **"Create Tournament"**

### Adding Teams

1. Open a tournament from **Tournaments** page
2. Click **"Add Team"** button
3. Enter team name and tag
4. Click **"Add Team"**

### Adding Players

1. Go to a **Team Details** page
2. Click **"Add Player"** button
3. Enter player name and role
4. Click **"Add Player"**

### Recording Matches

1. Go to **Admin Dashboard** → **"Record Match"** tab
2. Select tournament and teams
3. Add player kill counts
4. Click **"Record Match"**

### Viewing Leaderboard

1. Go to **Leaderboard** page
2. Select **Global** or **Tournament-specific** view
3. See real-time kill rankings sorted by total kills

## Data Structure

### Tournament
- ID, Name, Description
- Start/End Dates
- Max Teams
- Status (upcoming/ongoing/completed)

### Team
- ID, Name, Tag
- Tournament ID
- Player List
- Total Kills & Wins

### Player
- ID, Name, Role
- Team ID
- Stats: Kills, Deaths, Assists, Headshots
- Matches Played

### Match
- ID, Tournament ID
- Teams Involved
- Date
- Kill Log (per player)
- Status

## Technology Stack

- **Frontend:** React with React Router
- **Styling:** CSS (responsive design)
- **State Management:** React Context API + Hooks
- **Data Storage:** Browser localStorage
- **Icons:** React Icons

## File Structure

```
src/
├── App.jsx                          # Main app with routing
├── index.jsx                        # Entry point
├── contexts/
│   ├── TournamentContext.jsx       # Tournament state
│   ├── TeamContext.jsx              # Team state
│   ├── PlayerContext.jsx            # Player state
│   └── MatchContext.jsx             # Match state
├── pages/
│   ├── Dashboard.jsx                # Home page
│   ├── Tournaments.jsx              # Tournament management
│   ├── TournamentDetails.jsx        # Single tournament view
│   ├── TeamDetails.jsx              # Team roster & stats
│   ├── PlayerProfile.jsx            # Player statistics
│   ├── Leaderboard.jsx              # Kill leaderboard ⭐
│   └── AdminDashboard.jsx           # Admin control panel
├── utils/
│   └── localStorage.js              # Data persistence utilities
└── styles/
    ├── index.css                    # Global styles
    └── [page].css                   # Page-specific styles
```

## Key Functions

### Leaderboard Calculation

- Players ranked by **total kills**
- K/D Ratio: Total Kills ÷ Total Deaths
- Supports **global** and **tournament-specific** rankings
- Real-time updates when match results recorded

### Data Persistence

- All data automatically saved to localStorage
- Data persists across browser sessions
- Clear all data via Admin Dashboard

### Player Statistics

- **Kills:** Total eliminations
- **Deaths:** Times eliminated
- **Assists:** Helping eliminate opponents
- **Headshots:** Precision kills
- **K/D Ratio:** Efficiency metric

## How to View Kill Leaderboard

### Global Leaderboard
1. Click **Leaderboard** in navigation
2. Select **"Global Leaderboard"**
3. See players ranked by kills across all tournaments
4. Click player name to view full profile

### Tournament Leaderboard
1. Click **Leaderboard** in navigation
2. Select **"Tournament Specific"**
3. Choose tournament from dropdown
4. See rankings for that tournament only

## Tips

- **Create sample data:** Add a tournament, teams, and players to test features
- **Record matches:** Use Admin Dashboard to add match results and update leaderboards
- **Responsive UI:** Website adapts to desktop, tablet, and mobile screens
- **Export data:** All data stored locally - use browser dev tools to export localStorage

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Limitations

- Data stored in localStorage (~ 5MB limit per domain)
- No user authentication
- Single-browser data (not synced across devices)
- No real-time multiplayer features

## Future Enhancements

- Backend API integration
- Cloud database support
- User authentication & roles
- Real-time updates via WebSockets
- Mobile app
- Video highlights integration
- Tournament brackets
- Streaming integration

## Contributing

Feel free to modify and extend this project!

## License

Open source - use freely for personal and commercial projects.

---

**Need Help?**
- Check individual page documentation
- Review Admin Dashboard for data management
- Ensure tournament, teams, and players are created before recording matches

**Made for Free Fire E-Sports 🔥**
