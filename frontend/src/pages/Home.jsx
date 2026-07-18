// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import ApplicationsTable from "../component/ApplicationTable";
import ApplicationForm from "../component/AddApplicationModal";
import {
  createApplication,
  getAllApplications,
  updateApplication,
  deleteApplication,
} from "../services/applicationApi";

export default function Home() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // Fetch applications on page load
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllApplications();
        setApplications(data.applications || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };
    fetchApplications();
  }, []);

  // Handle delete
  const handleDelete = async (app) => {
    try {
      await deleteApplication(app.id);
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  // Handle edit
  const handleEdit = (app) => {
    setSelectedApp({
      ...app,
      dateApplied: app.dateApplied
        ? new Date(app.dateApplied).toISOString().split("T")[0]
        : "",
      followUpDate: app.followUpDate
        ? new Date(app.followUpDate).toISOString().split("T")[0]
        : "",
    });
  };

  // Handle add new application
  const handleAdd = async (newApp) => {
    try {
      const savedApp = await createApplication(newApp);
      setApplications((prev) => [...prev, savedApp.application]);
      setShowForm(false);
    } catch (err) {
      console.error("Error adding application:", err);
    }
  };

  // Handle update existing application
  const handleUpdate = async (updatedApp) => {
    try {
      const res = await updateApplication(selectedApp.id, updatedApp);
      setApplications((prev) =>
        prev.map((a) => (a.id === selectedApp.id ? res.application : a))
      );
      setSelectedApp(null);
    } catch (err) {
      console.error("Error updating application:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="p-6">
        {/* Add Application button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition cursor-pointer"
          >
            Add Application
          </button>
        </div>

        {/* Applications Table */}
        <ApplicationsTable
          applications={applications}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add Modal */}
        {showForm && (
          <ApplicationForm
            onClose={() => setShowForm(false)}
            onSubmit={handleAdd}
          />
        )}

        {/* Edit Modal */}
        {selectedApp && (
          <ApplicationForm
            defaultValues={selectedApp}
            onClose={() => setSelectedApp(null)}
            onSubmit={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}
