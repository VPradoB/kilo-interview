import { useState, useEffect } from 'react';
import { fetchAwards } from '../services/awardsService';

export const useAwards = (params) => {
  const [awards, setAwards] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAwards = async () => {
      setLoading(true);
      const result = await fetchAwards(params);
      setAwards(result.data);
      setPagination(result.pagination);
      setLoading(false);
    };
    loadAwards();
  }, [params]);

  return { awards, pagination, loading };
};