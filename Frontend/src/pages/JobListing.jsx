import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

export default function JobListing() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Bangalore",
      type: "Full Time",
      description: "Build modern user interfaces using React and Tailwind."
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "CodeBase",
      location: "Remote",
      type: "Remote",
      description: "Develop scalable APIs using Node and MongoDB."
    },
    {
      id: 3,
      title: "MERN Stack Intern",
      company: "StartupX",
      location: "Hyderabad",
      type: "Internship",
      description: "Work across frontend and backend in a fast-paced startup."
    }
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Jobs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </>
  );
}
