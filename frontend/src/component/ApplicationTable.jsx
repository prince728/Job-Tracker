import React from "react";

export default function ApplicationsTable({ applications, onEdit, onDelete }) {

  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "bg-blue-500 text-white";
      case "interview":
        return "bg-yellow-500 text-white";
      case "offer":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 rounded-lg">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-gray-300">Company Name</th>
            <th className="px-4 py-2 text-left text-gray-300">Role Title</th>
            <th className="px-4 py-2 text-left text-gray-300">Status</th>
            <th className="px-4 py-2 text-left text-gray-300">Date Applied</th>
            <th className="px-4 py-2 text-left text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="px-4 py-2 text-gray-200">{app.companyName}</td>
              <td className="px-4 py-2 text-gray-200">{app.roleTitle}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClasses(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-200">{new Date(app.dateApplied).toLocaleDateString()}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(app)}
                  className="px-2 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(app)}
                  className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
