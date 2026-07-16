import React from "react";
import { Link } from "react-router-dom";   
import { useAuth } from "../context/AuthContext"; 

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
      <div className="text-xl font-bold text-indigo-400">
        Job Application
      </div>

      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-gray-200 hover:text-indigo-400 transition font-medium"
        >
          Home
        </Link>
        <Link
          to="/match-score"
          className="text-gray-200 hover:text-indigo-400 transition font-medium"
        >
          Match Score
        </Link>
        <Link
          to="/interview-prep"
          className="text-gray-200 hover:text-indigo-400 transition font-medium"
        >
          Interview Prep
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-200 hover:text-indigo-400 transition font-medium"
        >
          dashboard
        </Link>

        {user && (
          <span className="text-gray-200">
            {user.name}
          </span>
        )}
        <button
          onClick={logout}
          className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
