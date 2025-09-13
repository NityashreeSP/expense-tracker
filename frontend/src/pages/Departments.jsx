import React, { useEffect, useState } from "react";
import { getDepartments } from "../api";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Departments</h1>
      <ul>
        {departments.map((dept) => (
          <li
            key={dept._id}
            style={{
              cursor: "pointer",
              padding: "10px",
              marginBottom: "8px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
            }}
            onClick={() => navigate(`/departments/${dept._id}`)} // ✅ backticks added
          >
            <strong>{dept.name}</strong> — Allocated: ₹{dept.allocated}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Departments;
