import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-mist-200/50 shadow-md/50">
      <div className="text-xl font-bold text-indigo-400">
        Job Application
      </div>

      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className=" text-gray-200 px-1.5 transition-all hover:text-indigo-400 hover:border-b-2 hover:scale-105 font-medium hover:shadow-lg hover:rounded-xl hover:shadow-indigo-400/50 hover:shadow-md/50"
        >
          Home
        </Link>
        <Link
          to="/match-score"
          className="text-gray-200 px-1.5 transition-all hover:text-indigo-400 hover:border-b-2 hover:scale-105 font-medium hover:shadow-lg hover:rounded-xl hover:shadow-indigo-400/50 hover:shadow-md/50"
        >
          Match Score
        </Link>
        <Link
          to="/interview-prep"
          className="text-gray-200 px-1.5 transition-all hover:text-indigo-400 hover:border-b-2 hover:scale-105 font-medium hover:shadow-lg hover:rounded-xl hover:shadow-indigo-400/50 hover:shadow-md/50"
        >
          Interview Prep
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-200 px-1.5 transition-all hover:text-indigo-400 hover:border-b-2 hover:scale-105 font-medium hover:shadow-lg hover:rounded-xl hover:shadow-indigo-400/50 hover:shadow-md/50"
        >
          Dashboard
        </Link>

        {user && (
          <span className="text-gray-200 text-md ml-5 mx-3 font-semibold capitalize">
            Hello, {user.name}
          </span>
        )}
        <button
          onClick={logout}
          className="px-4 py-1 rounded-xl border cursor-pointer border-red-500/40 bg-red-500/10 text-red-400 text-sm font-semibold backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:shadow-xl/50 hover:shadow-red-500/40 hover:scale-105 active:scale-95"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
