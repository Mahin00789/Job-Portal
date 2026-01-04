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
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Already applied");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {jobs.map((job) => {
          const hasApplied =
            user &&
            job.applicants?.some(
              (id) => id === user._id
            );

          return (
            <div
              key={job._id}
              className="bg-white p-5 rounded-lg shadow mb-4"
            >
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600">
                {job.company} • {job.location}
              </p>
              <p className="mt-2">{job.description}</p>

              {user?.role === "candidate" && (
                <button
                  disabled={hasApplied}
                  onClick={() => handleApply(job._id)}
                  className={`mt-4 px-4 py-2 rounded-lg text-sm ${
                    hasApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {hasApplied ? "Applied" : "Apply"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
