// Placeholder for useZones hook
// TODO: Custom hook for fetching zones data
import { useState, useEffect } from 'react';
import { fetchZones } from '../services/zonesService';

export const useZones = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadZones = async () => {
      setLoading(true);
      const data = await fetchZones();
      console.log(data)
      setZones(data);
      setLoading(false);
    };
    loadZones();
  }, []);

  console.log(zones)
  return { zones, loading };
};