import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const firstletter = localStorage.getItem("firstletter");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentProjectId");
    localStorage.removeItem("currentFeatureId");
    localStorage.removeItem("firstletter");
    
    navigate("/");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          APIVisions
        </h2>

        <nav className="space-y-4">
          {["projects", "features", "apis", "tags"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left px-3 py-2 rounded-lg ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Top bar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>

          <div className="flex items-center gap-4">
            {/* User avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              {firstletter ? firstletter[0].toUpperCase() : "?"}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="bg-white rounded-xl shadow p-6 min-h-[70vh]">
          {activeTab === "projects" && <ProjectsSection />}
          
        </div>
      </main>
    </div>
  );
}

/* ---------------- PROJECTS ---------------- */

function ProjectsSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          "https://apivision.onrender.com/api/v1/createproject/myprojects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Projects</h2>

      <button
        onClick={() => navigate("/createproject")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4"
      >
        + Create New Project
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          projects.map((p) => (
            <ProjectCard
              key={p.id}
              id={p.id}
              name={p.name}
              description={p.description}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ProjectCard({ id, name, description }) {
  const navigate = useNavigate();

  function openProject() {
    localStorage.setItem("currentProjectId", id);
    navigate("/project");
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>

      <button
        onClick={openProject}
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
      >
        Open
      </button>
    </div>
  );
}

/* ---------------- PLACEHOLDERS ---------------- */

function FeaturesSection() {
  return <div>No features yet</div>;
}

function ApisSection() {
  return <div>No APIs yet</div>;
}

function TagsSection() {
  return <div>No tags yet</div>;
}
