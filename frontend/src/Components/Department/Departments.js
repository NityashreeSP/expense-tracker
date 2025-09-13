import React, { useEffect, useState } from "react";
import { getDepartments } from "../../api";
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

  return React.createElement(
    "div",
    { style: { padding: "20px" } },
    React.createElement("h1", null, "Departments"),
    React.createElement(
      "ul",
      null,
      departments.map((dept) =>
        React.createElement(
          "li",
          {
            key: dept._id,
            style: {
              cursor: "pointer",
              padding: "10px",
              marginBottom: "8px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
            },
            onClick: function () {
              navigate("/departments/" + dept._id);
            },
          },
          React.createElement("strong", null, dept.name),
          " — Allocated: ₹" + dept.allocated
        )
      )
    )
  );
};

export default Departments;
