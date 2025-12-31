import { getUser } from "../utils/auth";

export default function JobCard({ job }) {
  const user = getUser();

  const appliedJobs =
    JSON.parse(localStorage.getItem("appliedJobs")) || [];

  const alreadyApplied = appliedJobs.some(
    (j) => j.id === job.id
  );

  const handleApply = () => {
    if (!user || user.role !== "candidate") {
      alert("Login as candidate to apply");
      return;
    }

    const updated = [...appliedJobs, job];
    localStorage.setItem(
      "appliedJobs",
      JSON.stringify(updated)
    );

    alert("Applied successfully");
    window.location.reload();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {job.title}
          </h3>
          <p className="text-gray-500">{job.company}</p>
        </div>
        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {job.type}
        </span>
      </div>

      <p className="text-gray-600 mt-4 text-sm">
        {job.description}
      </p>

      <div className="flex justify-between items-center mt-6">
        <span className="text-gray-500 text-sm">
          📍 {job.location}
        </span>

        <button
          onClick={handleApply}
          disabled={alreadyApplied}
          className={`px-4 py-2 rounded-lg text-sm ${
            alreadyApplied
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          {alreadyApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}
