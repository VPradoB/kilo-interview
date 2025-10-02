import { useState, useEffect } from 'react';
import { fetchAwardById } from '../services/awardsService';

const AwardDetails = ({ awardId }) => {
  const [award, setAward] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAward = async () => {
      if (!awardId) return;
      setLoading(true);
      const result = await fetchAwardById(awardId);
      setAward(result);
      setLoading(false);
    };
    loadAward();
  }, [awardId]);

  if (loading) {
    return <div>Loading award details...</div>;
  }

  if (!award) {
    return <div>No award found.</div>;
  }

  return (
    <div>
      <h3>Award Details</h3>
      <p><strong>Award ID:</strong> {award.award_id}</p>
      <p><strong>Application ID:</strong> {award.application_id}</p>
      <p><strong>Zone ID:</strong> {award.zone_id}</p>
      <p><strong>Pref:</strong> {award.pref}</p>
      <p><strong>Entry:</strong> {award.entry}</p>
      <p><strong>Size:</strong> {award.size}</p>
    </div>
  );
};

export default AwardDetails;