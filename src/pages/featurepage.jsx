import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateParentAPIModal } from "./cpAPi";
import { CreateChildAPIModal } from "./ppAPI";

export function FeaturePage() {
  const [feature, setFeature] = useState(null);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);

  const [searchTag, setSearchTag] = useState("");
  const [tagResults, setTagResults] = useState([]);

  const token = localStorage.getItem("token");
  const featureId = localStorage.getItem("currentFeatureId");
  const projectId = localStorage.getItem("currentProjectId");

  const navigate = useNavigate();

  async function fetchApis() {
    const res = await fetch(
      `https://apivision.onrender.com/api/v1/createproject/features/${featureId}/apis`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (data.success) setFeature(data.feature);
  }

  useEffect(() => {
    fetchApis();
  }, [featureId]);

  async function handleTagSearch() {
    if (!searchTag.trim()) return;

    const res = await fetch(
      `https://apivision.onrender.com/api/v1/createproject/get-full-apis/${searchTag}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (data.success) {
      setTagResults(data.childApis);
    } else {
      setTagResults([]);
    }
  }

  if (!feature) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600">{feature.name}</h1>

      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
          onClick={() => setShowParentModal(true)}
        >
          + Create Parent API
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setShowChildModal(true)}
        >
          + Create Child API
        </button>
      </div>

      {/* Search Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold">Search APIs by Tag</h2>

        <div className="flex gap-3 mt-3">
          <input
            type="text"
            placeholder="Enter tag"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            className="px-3 py-2 border rounded-lg w-60"
          />
          <button
            onClick={handleTagSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Search
          </button>
        </div>

        {tagResults.length > 0 && (
          <div className="mt-4 border rounded-lg">
            <h3 className="text-lg font-semibold bg-gray-200 p-2">
              Search Results
            </h3>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Parent API</th>
                  <th className="p-2">Child API</th>
                  <th className="p-2">Full Route</th>
                  <th className="p-2">Method</th>
                </tr>
              </thead>
              <tbody>
                {tagResults.map((api) => (
                  <tr key={api.id}>
                    <td className="p-2">{api.parentApi?.name}</td>
                    <td className="p-2">{api.name}</td>
                    <td className="p-2">
                      {api.parentApi?.route}/{api.route}
                    </td>
                    <td className="p-2">{api.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Parent APIs */}
      <h2 className="text-xl mt-6 font-semibold">Parent APIs</h2>
      {feature.parentApis.length === 0 ? (
        <p>No parent APIs</p>
      ) : (
        <table className="w-full mt-3 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Route</th>
              <th className="p-2">Method</th>
            </tr>
          </thead>
          <tbody>
            {feature.parentApis.map((api) => (
              <tr key={api.id}>
                <td className="p-2">{api.name}</td>
                <td className="p-2">{api.route}</td>
                <td className="p-2">{api.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Child APIs */}
      <h2 className="text-xl mt-6 font-semibold">Child APIs</h2>
      {feature.childApis.length === 0 ? (
        <p>No child APIs</p>
      ) : (
        <table className="w-full mt-3 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Route</th>
              <th className="p-2">Method</th>
            </tr>
          </thead>
          <tbody>
            {feature.childApis.map((api) => (
              <tr key={api.id}>
                <td className="p-2">{api.name}</td>
                <td className="p-2">{api.route}</td>
                <td className="p-2">{api.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ====================== VIEW API TREE BUTTON ====================== */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/apitree")}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          View API Tree
        </button>
      </div>

      {/* Modals */}
      {showParentModal && (
        <CreateParentAPIModal
          onClose={() => setShowParentModal(false)}
          projectId={projectId}
          featureId={featureId}
          token={token}
          refresh={fetchApis}
        />
      )}

      {showChildModal && (
        <CreateChildAPIModal
          onClose={() => setShowChildModal(false)}
          projectId={projectId}
          featureId={featureId}
          token={token}
          parentApis={feature.parentApis}
          refresh={fetchApis}
        />
      )}
    </div>
  );
}
