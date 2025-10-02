import { useState } from 'react';
import { useZones } from '../../zones/hooks/useZones';
import AwardList from './AwardList';

const ZoneAwardForm = () => {
  const { zones, loading: zonesLoading } = useZones();
  const [selectedZone, setSelectedZone] = useState('');

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  if (zonesLoading) {
    return <div>Loading zones...</div>;
  }

  return (
    <div>
      <h3>Select Zone to View Awards</h3>
      <select value={selectedZone} onChange={handleZoneChange}>
        <option value="">Select a zone</option>
        {zones.map((zone) => (
          <option key={zone.id} value={zone.id}>
            {zone.name}
          </option>
        ))}
      </select>
      {selectedZone && <AwardList zone={selectedZone} />}
    </div>
  );
};

export default ZoneAwardForm;