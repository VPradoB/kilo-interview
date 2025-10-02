import { useState, useEffect } from 'react';
import { fetchApplications } from '../services/applicationsService';

export const useApplications = (params) => {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      const result = await fetchApplications(params);
      setApplications(result.data);
      setPagination(result.pagination);
      setLoading(false);
    };
    loadApplications();
  }, [params]);

  return { applications, pagination, loading };
};