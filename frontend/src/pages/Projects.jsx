import React, { useEffect, useState } from "react";
import { getProjects, getVendors } from "../api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await getProjects();
        const vendorsRes = await getVendors();

        setProjects(projectsRes.data);
        setVendors(vendorsRes.data);
      } catch (error) {
        console.error("Error fetching projects or vendors:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Projects</h1>

      {projects.length === 0 ? (
        <p>No projects found.</p>
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

export default Projects;