import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
  getPlayersByTeam,
  getGlobalLeaderboard,
  getTournamentLeaderboard,
} from '../utils/localStorage';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const data = getPlayers();
    setPlayers(data);
  }, []);

  const createPlayer = useCallback((playerData) => {
    const newPlayer = addPlayer(playerData);
    setPlayers((prev) => [...prev, newPlayer]);
    return newPlayer;
  }, []);

  const updatePlayerData = useCallback((id, updates) => {
    const updated = updatePlayer(id, updates);
    if (updated) {
      setPlayers((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    }
    return updated;
  }, []);

  const deletePlayerData = useCallback((id) => {
    deletePlayer(id);
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getPlayerById = useCallback(
    (id) => players.find((p) => p.id === id),
    [players]
  );

  const getTeamPlayers = useCallback(
    (teamId) => players.filter((p) => p.teamId === teamId),
    [players]
  );

  const addKillStats = useCallback((playerId, killData) => {
    const player = players.find((p) => p.id === playerId);
    if (player) {
      const updated = updatePlayer(playerId, {
        totalKills: player.totalKills + (killData.kills || 0),
        totalDeaths: player.totalDeaths + (killData.deaths || 0),
        totalAssists: player.totalAssists + (killData.assists || 0),
        totalHeadshots: player.totalHeadshots + (killData.headshots || 0),
        totalMatches: player.totalMatches + 1,
      });
      setPlayers((prev) =>
        prev.map((p) => (p.id === playerId ? updated : p))
      );
    }
  }, [players]);

  const getGlobalLeaderboardData = useCallback(() => {
    return getGlobalLeaderboard();
  }, []);

  const getTournamentLeaderboardData = useCallback((tournamentId) => {
    return getTournamentLeaderboard(tournamentId);
  }, []);

  const value = {
    players,
    createPlayer,
    updatePlayerData,
    deletePlayerData,
    getPlayerById,
    getTeamPlayers,
    addKillStats,
    getGlobalLeaderboardData,
    getTournamentLeaderboardData,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
