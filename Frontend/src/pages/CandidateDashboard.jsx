import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get("/jobs/applied");
        setJobs(res.data);
      } catch (err) {
        alert("Failed to load applied jobs");
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">My Applications</h2>

        {jobs.length === 0 ? (
          <p className="text-gray-600">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-5 rounded-xl shadow"
              >
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    (job.status || "applied") === "accepted"
                      ? "bg-green-100 text-green-700"
                      : job.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {(job.status || "applied").toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
