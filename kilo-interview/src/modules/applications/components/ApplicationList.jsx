import { useState, useMemo } from "react";
import { useApplications } from "../hooks/useApplications";

const ApplicationList = ({ zone, date }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const params = useMemo(() => ({
    zone,
    date,
    page: currentPage,
    limit: 10,
  }), [zone, date, currentPage]);
  const { applications, pagination, loading } = useApplications(params);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  return (
    <div>
      <h3>
        Application List for Zone: {zone}, Date: {date}
      </h3>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.application_id}>{app.zone1}</li>
          ))}
        </ul>
      )}
      {pagination.totalPages > 1 && (
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span>
            {" "}
            Page {currentPage} of {pagination.totalPages}{" "}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;

