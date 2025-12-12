import React from "react";
import { useNavigate } from "react-router-dom"

export function Indexpage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-4 px-8 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">APIVisions</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 text-gray-700 hover:text-blue-600" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Build, Organize & Visualize Your APIs With Ease
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            APIVisions helps developers create structured API documentation,
            visualize parent-child API relationships and manage large projects
            effortlessly.
          </p>
          <br></br>

          <p className="text-3xl font-bold text-center text-gray-800">Get Started By creating a account or Login Thankyou </p>
            
          
        </div>

        
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
  <div className="w-80 p-6 bg-white rounded-xl shadow-xl border">
    <div className="font-mono text-gray-700 text-sm">
      <p>/api/v1</p>
      <p className="ml-4">├── /users</p>
      <p className="ml-8">├── GET /list</p>
      <p className="ml-8">└── GET /:id</p>
      <p className="ml-4">└── /auth</p>
      <p className="ml-8">└── POST /login</p>
    </div>
  </div>
</div>

      </section>
      

      {/* Features Section */}
      <section className="bg-white py-16 px-8">
        <h3 className="text-3xl font-bold text-center text-gray-800">
          Key Features
        </h3>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-blue-600">
              Create Projects
            </h4>
            <p className="mt-2 text-gray-600">
              Organize your APIs by project with descriptions and features.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-blue-600">
              Parent + Child API Structure
            </h4>
            <p className="mt-2 text-gray-600">
              Automatically generate hierarchical API routes like
              /api/v1/user/get.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-blue-600">
              Search by Feature or Tag
            </h4>
            <p className="mt-2 text-gray-600">
              Instantly retrieve APIs by feature, tag or route name.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
}
