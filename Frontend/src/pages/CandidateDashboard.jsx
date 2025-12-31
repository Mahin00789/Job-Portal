import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/jobs/applied");
        setApplications(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load applications");
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          My Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-gray-600">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Job</th>
                  <th className="px-6 py-3 text-left">Company</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((job) => (
                  <tr key={job._id} className="border-t">
                    <td className="px-6 py-4">{job.title}</td>
                    <td className="px-6 py-4">{job.company}</td>
                    <td className="px-6 py-4">
                      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                        Applied
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
