// src/components/Navbar.jsx
import React from "react";
import { useAuth } from "../context/AuthContext"; 

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
      <div className="text-xl font-bold text-indigo-400">
        Job Application
      </div>

      <div className="flex items-center space-x-4">
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
