import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../component/Navbar";
import { getAllApplications } from "../services/applicationApi";

const STATUS_COLORS = {
  applied: "#6366f1",
  oa: "#f59e0b",
  interview: "#eab308",
  offer: "#22c55e",
  rejected: "#ef4444",
};

export default function Dashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllApplications();
        setApplications(data.applications || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const statusData = Object.entries(
    applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, count]) => ({ name: status, value: count }));

  const monthData = Object.entries(
    applications.reduce((acc, app) => {
      const month = new Date(app.dateApplied).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {})
  ).map(([month, count]) => ({ month, count }));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight text-indigo-400">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition text-center">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-3xl font-bold">{applications.length}</p>
          </div>
          {statusData.map((s) => (
            <div
              key={s.name}
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition text-center"
            >
              <p className="text-gray-400 text-sm capitalize">{s.name}</p>
              <p
                className="text-3xl font-bold"
                style={{ color: STATUS_COLORS[s.name] }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition">
            <h2 className="text-lg font-semibold mb-4 text-indigo-300">
              Status Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] || "#6366f1"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition">
            <h2 className="text-lg font-semibold mb-4 text-indigo-300">
              Applications Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
