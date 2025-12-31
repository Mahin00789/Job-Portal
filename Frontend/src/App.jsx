import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import JobListing from "./pages/JobListing";
import Jobs from "./pages/Jobs";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PostJob from "./pages/PostJob";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<Jobs />} />

      <Route
        path="/candidate/dashboard"
        element={
          // <ProtectedRoute role="candidate">
            <CandidateDashboard />
          // </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/recruiter/post-job"
  element={
    <ProtectedRoute role="recruiter">
      <PostJob />
    </ProtectedRoute>
  }
/>

    </Routes>
    
  );
}
