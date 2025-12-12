import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateParentAPIModal({ onClose, projectId, featureId, token }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    route: "",
    method: "GET",
    description: "",
    tags: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      name: form.name,
      route: form.route,
      method: form.method,
      description: form.description,
      tags: form.tags.split(",").map(t => t.trim()),
      projectId: parseInt(projectId),
      featureId: parseInt(featureId)
    };

    const res = await fetch("https://apivision.onrender.com/api/v1/createproject/create-parent-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (data.success) {
      onClose();              // close modal
      navigate(0);            // refresh current page
    } else {
      alert("Failed to create parent API");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Parent API</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="API Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="route"
            placeholder="/api/v1/user"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <select
            name="method"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="tags"
            placeholder="tags (comma separated)"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 mt-3">
            <button type="button" onClick={onClose} className="px-3 py-2 bg-gray-300 rounded">
              Cancel
            </button>

            <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
