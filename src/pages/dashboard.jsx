import React from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ================= DASHBOARD ================= */

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

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

  async function fetchUserInfo() {
    try {
      const res = await fetch(
        "https://apivision.onrender.com/api/v1/user/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setShowProfile((prev) => !prev);
      }
    } catch (err) {
      console.error("Fetch user error:", err);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          APIVisions
        </h2>

        <nav className="space-y-4">
          {["projects"].map((tab) => (
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

          {/* Avatar + Profile */}
          <div className="relative">
            <button
              onClick={fetchUserInfo}
              className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold hover:bg-blue-600 transition"
            >
              {firstletter ? firstletter[0].toUpperCase() : "?"}
            </button>

            {showProfile && user && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg p-4 z-50">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="font-semibold text-gray-800 break-all">
                  {user.email}
                </p>

                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Role:</span> {user.role}
                  </p>
                  <p>
                    <span className="font-medium">Joined:</span>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
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

/* ================= PROJECTS ================= */

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
