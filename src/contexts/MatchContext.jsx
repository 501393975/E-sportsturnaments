import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getMatches,
  addMatch,
  updateMatch,
  deleteMatch,
  getMatchesByTournament,
} from '../utils/localStorage';

export const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const data = getMatches();
    setMatches(data);
  }, []);

  const createMatch = useCallback((matchData) => {
    const newMatch = addMatch(matchData);
    setMatches((prev) => [...prev, newMatch]);
    return newMatch;
  }, []);

  const updateMatchData = useCallback((id, updates) => {
    const updated = updateMatch(id, updates);
    if (updated) {
      setMatches((prev) =>
        prev.map((m) => (m.id === id ? updated : m))
      );
    }
    return updated;
  }, []);

  const deleteMatchData = useCallback((id) => {
    deleteMatch(id);
    setMatches((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const getMatchById = useCallback(
    (id) => matches.find((m) => m.id === id),
    [matches]
  );

  const getTournamentMatches = useCallback(
    (tournamentId) => matches.filter((m) => m.tournamentId === tournamentId),
    [matches]
  );

  const recordKill = useCallback((matchId, killLog) => {
    const match = matches.find((m) => m.id === matchId);
    if (match) {
      const updated = updateMatch(matchId, {
        killLog: [...(match.killLog || []), killLog],
      });
      setMatches((prev) =>
        prev.map((m) => (m.id === matchId ? updated : m))
      );
    }
  }, [matches]);

  const value = {
    matches,
    createMatch,
    updateMatchData,
    deleteMatchData,
    getMatchById,
    getTournamentMatches,
    recordKill,
  };

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
};
