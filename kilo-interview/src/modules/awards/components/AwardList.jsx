import { useState, useMemo } from "react";
import { useAwards } from "../hooks/useAwards";
import Pagination from "./Pagination";
import ApplicationList from "../../applications/components/ApplicationList";

const AwardList = ({ zones, startDate, endDate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAward, setSelectedAward] = useState(null);
  const params = useMemo(() => ({
    zone: zones.join(','),
    start_date: startDate,
    end_date: endDate,
    page: currentPage,
    limit: 10,
  }), [zones, startDate, endDate, currentPage]);
  const { awards, pagination, loading } = useAwards(params);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAwardClick = (award) => {
    setSelectedAward(award);
  };

  const closeApplications = () => {
    setSelectedAward(null);
  };

  if (loading) {
    return <div>Loading awards...</div>;
  }

  return (
    <div>
      <h3>
        Award List for Zones: {zones.join(', ')}
        {startDate && ` from ${startDate}`}
        {endDate && ` to ${endDate}`}
      </h3>
      {awards.length === 0 ? (
        <p>No awards found.</p>
      ) : (
        <ul>
          {awards.map((award) => (
            <li
              key={award.award_id}
              onClick={() => handleAwardClick(award)}
              style={{ cursor: 'pointer', marginBottom: '5px' }}
            >
              Award ID: {award.award_id}, Application ID: {award.application_id}, Zone ID: {award.zone_id}, Pref: {award.pref}, Entry: {award.entry}, Size: {award.size}
            </li>
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
      {selectedAward && (
        <div>
          <h4>Applications for Award {selectedAward.award_id}</h4>
          <ApplicationList zone={selectedAward.zone_id} date={selectedAward.entry} />
          <button onClick={closeApplications}>Close Applications</button>
        </div>
      )}
    </div>
  );
};

export default AwardList;