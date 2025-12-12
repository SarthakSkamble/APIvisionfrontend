import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateChildAPIModal({
  onClose,
  projectId,
  featureId,
  token,
  parentApis
}) {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    route: "",
    method: "GET",
    description: "",
    tags: "",
    parentId: ""
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
      parentId: parseInt(form.parentId),
      projectId: parseInt(projectId),
      featureId: parseInt(featureId)
    };

    const res = await fetch("https://apivision.onrender.com/api/v1/createproject/create-child-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (data.success) {
      onClose();
      navigate(0); // refresh page
    } else {
      alert("Failed to create child API");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Child API</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="API Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="route"
            placeholder="/get-user"
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

          <select
            name="parentId"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select Parent API</option>
            {parentApis.map(api => (
              <option key={api.id} value={api.id}>
                {api.name}
              </option>
            ))}
          </select>

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
