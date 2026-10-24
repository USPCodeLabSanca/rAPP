import { useState, useEffect } from 'react';
import api from '../../../../shared/http/api';

export function useHome() {
  const [rep_search, setRep_search] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  async function listaReps(nameQuery = rep_search) {
    try {
      let url = '/reps';
      if (nameQuery && nameQuery.trim() !== '') {
        url += `?nome=${encodeURIComponent(nameQuery.trim())}`;
      }

      const repsFromApi = await api.get(url);
      setUsers(Array.isArray(repsFromApi.data) ? repsFromApi.data : []);
    } catch (error) {
      console.error("Erro ao buscar repúblicas:", error);
      setUsers([]);
    }
  }

  useEffect(() => {
    listaReps();
  }, []);

  return {
    rep_search,
    setRep_search,
    users,
    listaReps,
  };
}
