import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import CGPA from "./pages/CGPA";
import Assignments from "./pages/Assignments";
import Resources from "./pages/Resources";
import Contribute from "./pages/Contribute";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/cgpa" element={<CGPA />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/contribute" element={<Contribute />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;