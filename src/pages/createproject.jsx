import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://apivision.onrender.com/api/v1/createproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to create project");
        setLoading(false);
        return;
      }

      setSuccess("Project created successfully!");
      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center text-blue-600">
          Create New Project
        </h2>

        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mt-3">{success}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">

          <div>
            <label className="text-gray-700">Project Title</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={()=>navigate("/dashboard")}
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
