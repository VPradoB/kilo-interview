import { useState } from "react";
import { useZones } from "../hooks/useZones";

const ZoneSelector = () => {
  const { zones, loading } = useZones();
  const [selectedZones, setSelectedZones] = useState([]);


  if (loading) {
    return <div>Loading zones...</div>;
  }

  return (
    <div>
      <h3>Zone Selector</h3>
      <p>Select zones:</p>
      {zones.map((zone) => {
        return (
          <label
            key={zone.id}
            style={{ display: "block", marginBottom: "5px" }}
          >
            <input
              type="checkbox"
              checked={selectedZones.includes(zone.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedZones((prev) => [...prev, zone.id]);
                } else {
                  setSelectedZones((prev) =>
                    prev.filter((id) => id !== zone.id),
                  );
                }
              }}
            />
            {zone.name}
          </label>
        );
      })}
      <p>Selected zones: {selectedZones.length}</p>
    </div>
  );
};

export default ZoneSelector;

