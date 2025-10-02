import { useState, useMemo } from "react";
import { useAwards } from "../hooks/useAwards";
import Pagination from "./Pagination";

const AwardList = ({ zone, date }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const params = useMemo(() => ({
    zone,
    date,
    page: currentPage,
    limit: 10,
  }), [zone, date, currentPage]);
  const { awards, pagination, loading } = useAwards(params);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading awards...</div>;
  }

  return (
    <div>
      <h3>
        Award List for Zone: {zone}
      </h3>
      {awards.length === 0 ? (
        <p>No awards found.</p>
      ) : (
        <ul>
          {awards.map((award) => (
            <li key={award.award_id}>
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
    </div>
  );
};

export default AwardList;