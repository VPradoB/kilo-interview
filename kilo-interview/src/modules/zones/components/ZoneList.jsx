import { useZones } from '../hooks/useZones';

const ZoneList = () => {
  const { zones, loading } = useZones();

  if (loading) {
    return <div>Loading zones...</div>;
  }
   

  return (
    <div>
      <h3>Zone List</h3>
      <div className="zone-cards">
        {zones.map((zone, index) => {
          return (
            <div key={zone.zone_id || index} className="zone-card">
              <h4>{zone.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ZoneList;