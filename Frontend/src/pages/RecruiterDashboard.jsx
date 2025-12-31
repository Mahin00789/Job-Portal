import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/recruiter");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load recruiter jobs");
      }
    };

    fetchJobs();
  }, []);

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
                <p className="text-gray-500 text-sm">
                  No applications yet
                </p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {job.applicants.map((applicant) => (
                    <li
                      key={applicant._id}
                      className="border p-3 rounded-lg"
                    >
                      <p className="font-medium">{applicant.name}</p>
                      <p className="text-sm text-gray-600">
                        {applicant.email}
                      </p>
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
