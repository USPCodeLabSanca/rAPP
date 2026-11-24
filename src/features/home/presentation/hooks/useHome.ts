import { useEffect, useState } from 'react';
import api from '../../../../shared/http/api';
import type { Catalogo, Metricas, Republica, Tag } from '../../../../shared/domain/types';

const priceQuery: Record<string, { precoMin?: number; precoMax?: number }> = {
  'Até R$ 700': { precoMax: 700 },
  'R$ 700 a R$ 1.000': { precoMin: 700, precoMax: 1000 },
  'Acima de R$ 1.000': { precoMin: 1000 },
};

export function useHome() {
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [faixa, setFaixa] = useState('Qualquer preço');
  const [republicas, setRepublicas] = useState<Republica[]>([]);
  const [metricas, setMetricas] = useState<Metricas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Tag[]>('/tags')
      .then((response) => setTags(response.data))
      .catch(() => setError('Não foi possível carregar as tags.'));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(q), 250);
    return () => clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    const faixaQuery = priceQuery[faixa] ?? {};
    setLoading(true);
    api
      .get<Catalogo>('/republicas', {
        params: {
          q: debounced.trim() || undefined,
          tagIds: selected.length ? selected.join(',') : undefined,
          precoMin: faixaQuery.precoMin,
          precoMax: faixaQuery.precoMax,
        },
      })
      .then((response) => {
        setRepublicas(response.data.republicas ?? []);
        setMetricas(response.data.metricas ?? null);
        setError('');
      })
      .catch(() => {
        setRepublicas([]);
        setError('Não foi possível carregar o catálogo. Confira se a API Nest está na porta 3002 e o PostgreSQL do painel responde em 127.0.0.1:5433.');
      })
      .finally(() => setLoading(false));
  }, [debounced, selected, faixa]);

  function toggle(tagId: number) {
    setSelected((current) => (current.includes(tagId) ? current.filter((id) => id !== tagId) : [...current, tagId]));
  }

  return {
    q,
    setQ,
    tags,
    selected,
    setSelected,
    toggle,
    faixa,
    setFaixa,
    republicas,
    metricas,
    loading,
    error,
  };
}
