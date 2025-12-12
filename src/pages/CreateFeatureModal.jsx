import React from "react";
import { useState } from "react";

export function CreateFeatureModal({ onClose, projectId, token, refresh }) {
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://apivision.onrender.com/api/v1/createproject/createfeature",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            projectId: Number(projectId),
            name: form.name,
            description: form.description
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Error creating feature");
        return;
      }

      refresh();   // Refresh project page
      onClose();   // Close modal
    } catch (err) {
      setError("Something went wrong");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold">Create New Feature</h2>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-gray-700">Feature Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Create Feature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
