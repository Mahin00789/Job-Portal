import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  const navigate = useNavigate();

  const handleFindJobs = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/jobs");
    }
  };

  const handlePostJob = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
    } else if (user?.role === "recruiter") {
      navigate("/recruiter/post-job");
    } else {
      alert("Only recruiters can post jobs");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Dream Job Today
        </h1>

        <p className="text-gray-600 mb-8">
          Apply to thousands of jobs, track applications, and get hired faster.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleFindJobs}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Find Jobs
          </button>

          <button
            onClick={handlePostJob}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg"
          >
            Post a Job
          </button>
        </div>
      </div>
    </>
  );
}
