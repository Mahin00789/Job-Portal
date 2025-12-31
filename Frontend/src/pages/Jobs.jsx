import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  const handleApply = async (jobId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(`/jobs/${jobId}/apply`);
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Already applied");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-lg shadow mb-4"
          >
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-600">
              {job.company} • {job.location}
            </p>
            <p className="mt-2">{job.description}</p>

            {/* ✅ APPLY BUTTON ONLY FOR CANDIDATE */}
            {user?.role === "candidate" && (
              <button
                onClick={() => handleApply(job._id)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
