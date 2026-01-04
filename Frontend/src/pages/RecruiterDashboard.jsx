import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/recruiter");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load recruiter jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const acceptApplicant = async (jobId, userId) => {
    try {
      await api.patch(`/jobs/${jobId}/applicants/${userId}/accept`);
      await fetchJobs();
    } catch (err) {
      alert("Failed to accept applicant");
    }
  };

  const rejectApplicant = async (jobId, userId) => {
    try {
      await api.patch(`/jobs/${jobId}/applicants/${userId}/reject`);
      await fetchJobs();
    } catch (err) {
      alert("Failed to reject applicant");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">My Job Posts</h2>

        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow rounded-xl mb-6 p-6"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>

              <h4 className="mt-4 font-medium">
                Applicants ({job.applicants.length})
              </h4>

              {job.applicants.length === 0 ? (
                <p className="text-gray-500 text-sm">No applications yet</p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {job.applicants.map((app) => (
                    <li
                      key={app.user?._id}
                      className="flex items-center justify-between border p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {app.user?.name || "Unknown Candidate"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {app.user?.email || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Status: {app.status}
                        </p>
                      </div>

                      {app.status === "applied" && app.user && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              acceptApplicant(job._id, app.user._id)
                            }
                            className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              rejectApplicant(job._id, app.user._id)
                            }
                            className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {app.status === "accepted" && (
                        <span className="text-green-600 font-semibold">
                          Accepted
                        </span>
                      )}

                      {app.status === "rejected" && (
                        <span className="text-red-600 font-semibold">
                          Rejected
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
