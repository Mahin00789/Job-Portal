import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        JobPortal
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/jobs">Jobs</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to={
              user?.role === "recruiter"
                ? "/recruiter/dashboard"
                : "/candidate/dashboard"
            }>
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
