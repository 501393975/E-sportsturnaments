import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getTeams,
  addTeam,
  updateTeam,
  deleteTeam,
  getTeamsByTournament,
} from '../utils/localStorage';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const data = getTeams();
    setTeams(data);
  }, []);

  const createTeam = useCallback((teamData) => {
    const newTeam = addTeam(teamData);
    setTeams((prev) => [...prev, newTeam]);
    return newTeam;
  }, []);

  const updateTeamData = useCallback((id, updates) => {
    const updated = updateTeam(id, updates);
    if (updated) {
      setTeams((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    }
    return updated;
  }, []);

  const deleteTeamData = useCallback((id) => {
    deleteTeam(id);
    setTeams((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTeamById = useCallback(
    (id) => teams.find((t) => t.id === id),
    [teams]
  );

  const getTournamentTeams = useCallback(
    (tournamentId) => teams.filter((t) => t.tournamentId === tournamentId),
    [teams]
  );

  const value = {
    teams,
    createTeam,
    updateTeamData,
    deleteTeamData,
    getTeamById,
    getTournamentTeams,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};
