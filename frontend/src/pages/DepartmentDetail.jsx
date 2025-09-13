import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjects, getVendors } from "../api";

const DepartmentDetail = () => {
  const { id } = useParams(); // department ID from URL
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await getProjects();
        const vendorsRes = await getVendors();

        // Filter projects belonging to this department
        const deptProjects = projectsRes.data.filter((p) => p.deptId === id);
        setProjects(deptProjects);

        // Filter vendors belonging to these projects
        const deptVendors = vendorsRes.data.filter((v) =>
          deptProjects.some((p) => p._id === v.projectId)
        );
        setVendors(deptVendors);
      } catch (error) {
        console.error("Error fetching department details:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Department Details</h1>

      {projects.length === 0 ? (
        <p>No projects found for this department.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <h3>
              Project: {project.name} — Allocated: ₹{project.allocated}
            </h3>

            <ul>
              {vendors
                .filter((v) => v.projectId === project._id)
                .map((vendor) => (
                  <li key={vendor._id}>
                    Vendor: <strong>{vendor.name}</strong> — Paid: ₹{vendor.paid}
                  </li>
                ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default DepartmentDetail;