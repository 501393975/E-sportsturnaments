import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getTournaments,
  saveTournaments,
  addTournament,
  updateTournament,
  deleteTournament,
  initializeStorage,
} from '../utils/localStorage';

export const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const data = getTournaments();
    setTournaments(data);
    setLoading(false);
  }, []);

  const createTournament = useCallback((tournamentData) => {
    const newTournament = addTournament(tournamentData);
    setTournaments((prev) => [...prev, newTournament]);
    return newTournament;
  }, []);

  const updateTournamentData = useCallback((id, updates) => {
    const updated = updateTournament(id, updates);
    if (updated) {
      setTournaments((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    }
    return updated;
  }, []);

  const deleteTournamentData = useCallback((id) => {
    deleteTournament(id);
    setTournaments((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTournamentById = useCallback(
    (id) => tournaments.find((t) => t.id === id),
    [tournaments]
  );

  const value = {
    tournaments,
    loading,
    createTournament,
    updateTournamentData,
    deleteTournamentData,
    getTournamentById,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
