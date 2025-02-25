import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterDashBoard() {
  const [recruiter, setRecruiter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recruiter details (mock API call)
    const fetchRecruiterDetails = async () => {
      try {
        const response = await fetch("/api/recruiter/details");
        const data = await response.json();
        setRecruiter(data);
      } catch (error) {
        console.error("Error fetching recruiter details:", error);
      }
    };

    fetchRecruiterDetails();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Recruiter Dashboard
      </h1>

      {recruiter ? (
        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>{recruiter.name}</h2>
          <p><strong>Email:</strong> {recruiter.email}</p>
          <p><strong>Company:</strong> {recruiter.company}</p>
        </div>
      ) : (
        <p>Loading recruiter details...</p>
      )}

      <button
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/addJob")}
      >
        Add New Job
      </button>
    </div>
  );
}

export default RecruiterDashBoard;
