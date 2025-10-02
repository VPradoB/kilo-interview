import { useState } from 'react';
import { useZones } from '../../zones/hooks/useZones';
import AwardList from './AwardList';
import Toast from '../../shared/components/Toast';

const ZoneAwardForm = () => {
  const { zones, loading: zonesLoading } = useZones();
  const [selectedZones, setSelectedZones] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [toast, setToast] = useState(null);

  const handleZoneChange = (zoneId) => {
    setSelectedZones((prev) =>
      prev.includes(zoneId)
        ? prev.filter((id) => id !== zoneId)
        : [...prev, zoneId]
    );
  };

  const validateDate = (date) => {
    if (!date) return true;
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  };

  const handleDateChange = (setter) => (e) => {
    const value = e.target.value;
    if (value && !validateDate(value)) {
      setToast({ message: 'Invalid date format', type: 'error' });
      return;
    }
    setter(value);
    if (toast) setToast(null);
  };

  const handleClear = () => {
    setSelectedZones([]);
    setStartDate('');
    setEndDate('');
    setToast(null);
  };

  const closeToast = () => setToast(null);

  if (zonesLoading) {
    return <div>Loading zones...</div>;
  }

  return (
    <div>
      <h3>Select Zones and Filter Awards</h3>
      <div>
        <h4>Zones:</h4>
        {zones.map((zone) => (
          <label key={zone.zone_id} style={{ display: 'block', marginBottom: '5px' }}>
            <input
              type="checkbox"
              checked={selectedZones.includes(zone.zone_id)}
              onChange={() => handleZoneChange(zone.zone_id)}
            />
            {zone.name}
          </label>
        ))}
      </div>
      <div>
        <h4>Date Filters:</h4>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={handleDateChange(setStartDate)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={handleDateChange(setEndDate)}
          />
        </label>
      </div>
      <button onClick={handleClear}>Clear Filters</button>
      {selectedZones.length > 0 && (
        <AwardList
          zones={selectedZones}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default ZoneAwardForm;