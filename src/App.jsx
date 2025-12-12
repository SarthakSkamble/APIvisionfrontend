import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Indexpage } from "./pages";
import { SignUp } from "./pages/signup";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import {CreateProject} from "./pages/createproject"
import {ProjectPage} from "./pages/projectpage"
import { FeaturePage } from "./pages/featurepage";
import { ApiTree } from "./pages/TreePage";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Indexpage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/createproject" element={<CreateProject />}/>
      <Route path="/project" element={<ProjectPage />}/>
      <Route path="/feature" element={<FeaturePage />}/>
      <Route path="/apitree" element={<ApiTree />}/>
    
      

    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
