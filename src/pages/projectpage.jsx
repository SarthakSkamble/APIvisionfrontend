import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateFeatureModal } from "./CreateFeatureModal";

export function ProjectPage() {
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  const navigate = useNavigate();
  const projectId = localStorage.getItem("currentProjectId");
  const token = localStorage.getItem("token");

  async function fetchProject() {
    try {
      const res = await fetch(
        `https://apivision.onrender.com/api/v1/createproject/project/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        return;
      }

      setProject(data.project);
    } catch (err) {
      setError("Something went wrong");
    }
  }

  useEffect(() => {
    fetchProject();
  }, [projectId]);


  function openFeature(featureId) {
    localStorage.setItem("currentFeatureId", featureId);
    navigate("/feature");
  }

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">{project.name}</h1>
          <p className="mt-3 text-gray-700 text-lg">{project.description}</p>
        </div>

        <button
          onClick={() => setShowFeatureModal(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Feature
        </button>
      </div>

      <h2 className="mt-8 text-2xl font-bold">Features</h2>

      {project.features.length === 0 ? (
        <p className="text-gray-600 mt-2">No features added yet</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {project.features.map((feature, index) => (
            <li
              key={feature.id}
              onClick={() => openFeature(feature.id)}
              className="cursor-pointer p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition shadow-sm"
            >
              <p className="font-semibold text-lg">
                {index + 1}. {feature.name}
              </p>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </li>
          ))}
        </ul>
      )}

      {/* FEATURE MODAL */}
      {showFeatureModal && (
        <CreateFeatureModal
          onClose={() => setShowFeatureModal(false)}
          projectId={projectId}
          token={token}
          refresh={fetchProject}
        />
      )}
    </div>
  );
}
