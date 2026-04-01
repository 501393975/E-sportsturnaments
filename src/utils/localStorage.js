// localStorage utilities for persisting data

const STORAGE_KEYS = {
  TOURNAMENTS: 'ff_tournaments',
  TEAMS: 'ff_teams',
  PLAYERS: 'ff_players',
  MATCHES: 'ff_matches',
};

// Initialize storage with default empty data
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.TOURNAMENTS)) {
    localStorage.setItem(STORAGE_KEYS.TOURNAMENTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PLAYERS)) {
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MATCHES)) {
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify([]));
  }
};

// Tournament operations
export const getTournaments = () => {
  const data = localStorage.getItem(STORAGE_KEYS.TOURNAMENTS);
  return data ? JSON.parse(data) : [];
};

export const saveTournaments = (tournaments) => {
  localStorage.setItem(STORAGE_KEYS.TOURNAMENTS, JSON.stringify(tournaments));
};

export const addTournament = (tournament) => {
  const tournaments = getTournaments();
  const newTournament = {
    ...tournament,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'upcoming',
  };
  tournaments.push(newTournament);
  saveTournaments(tournaments);
  return newTournament;
};

export const updateTournament = (id, updates) => {
  const tournaments = getTournaments();
  const index = tournaments.findIndex((t) => t.id === id);
  if (index !== -1) {
    tournaments[index] = { ...tournaments[index], ...updates };
    saveTournaments(tournaments);
    return tournaments[index];
  }
  return null;
};

export const deleteTournament = (id) => {
  const tournaments = getTournaments().filter((t) => t.id !== id);
  saveTournaments(tournaments);
};

// Team operations
export const getTeams = () => {
  const data = localStorage.getItem(STORAGE_KEYS.TEAMS);
  return data ? JSON.parse(data) : [];
};

export const saveTeams = (teams) => {
  localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
};

export const addTeam = (team) => {
  const teams = getTeams();
  const newTeam = {
    ...team,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    players: [],
    totalKills: 0,
    totalWins: 0,
  };
  teams.push(newTeam);
  saveTeams(teams);
  return newTeam;
};

export const updateTeam = (id, updates) => {
  const teams = getTeams();
  const index = teams.findIndex((t) => t.id === id);
  if (index !== -1) {
    teams[index] = { ...teams[index], ...updates };
    saveTeams(teams);
    return teams[index];
  }
  return null;
};

export const deleteTeam = (id) => {
  const teams = getTeams().filter((t) => t.id !== id);
  saveTeams(teams);
};

export const getTeamsByTournament = (tournamentId) => {
  const teams = getTeams();
  return teams.filter((t) => t.tournamentId === tournamentId);
};

// Player operations
export const getPlayers = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PLAYERS);
  return data ? JSON.parse(data) : [];
};

export const savePlayers = (players) => {
  localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
};

export const addPlayer = (player) => {
  const players = getPlayers();
  const newPlayer = {
    ...player,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    totalKills: 0,
    totalDeaths: 0,
    totalAssists: 0,
    totalHeadshots: 0,
    totalMatches: 0,
  };
  players.push(newPlayer);
  savePlayers(players);
  return newPlayer;
};

export const updatePlayer = (id, updates) => {
  const players = getPlayers();
  const index = players.findIndex((p) => p.id === id);
  if (index !== -1) {
    players[index] = { ...players[index], ...updates };
    savePlayers(players);
    return players[index];
  }
  return null;
};

export const deletePlayer = (id) => {
  const players = getPlayers().filter((p) => p.id !== id);
  savePlayers(players);
};

export const getPlayersByTeam = (teamId) => {
  const players = getPlayers();
  return players.filter((p) => p.teamId === teamId);
};

// Match operations
export const getMatches = () => {
  const data = localStorage.getItem(STORAGE_KEYS.MATCHES);
  return data ? JSON.parse(data) : [];
};

export const saveMatches = (matches) => {
  localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
};

export const addMatch = (match) => {
  const matches = getMatches();
  const newMatch = {
    ...match,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    killLog: [],
  };
  matches.push(newMatch);
  saveMatches(matches);
  return newMatch;
};

export const updateMatch = (id, updates) => {
  const matches = getMatches();
  const index = matches.findIndex((m) => m.id === id);
  if (index !== -1) {
    matches[index] = { ...matches[index], ...updates };
    saveMatches(matches);
    return matches[index];
  }
  return null;
};

export const deleteMatch = (id) => {
  const matches = getMatches().filter((m) => m.id !== id);
  saveMatches(matches);
};

export const getMatchesByTournament = (tournamentId) => {
  const matches = getMatches();
  return matches.filter((m) => m.tournamentId === tournamentId);
};

// Leaderboard calculations
export const getGlobalLeaderboard = () => {
  const players = getPlayers();
  return players
    .sort((a, b) => b.totalKills - a.totalKills)
    .map((p, index) => ({
      ...p,
      rank: index + 1,
    }));
};

export const getTournamentLeaderboard = (tournamentId) => {
  const players = getPlayers().filter((p) => p.tournamentId === tournamentId);
  return players
    .sort((a, b) => b.totalKills - a.totalKills)
    .map((p, index) => ({
      ...p,
      rank: index + 1,
    }));
};

// Clear all data
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.TOURNAMENTS);
  localStorage.removeItem(STORAGE_KEYS.TEAMS);
  localStorage.removeItem(STORAGE_KEYS.PLAYERS);
  localStorage.removeItem(STORAGE_KEYS.MATCHES);
  initializeStorage();
};
