import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { interviewPrepHelp } from "../services/AiApi";

export default function InterviewPrep() {
  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await interviewPrepHelp(companyName, roleTitle);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-400">
          Interview Prep
        </h1>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-300">
              Company Name
            </h2>
            <input
              type="text"
              className="w-full p-4 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter company name..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-300">
              Role Title
            </h2>
            <input
              type="text"
              className="w-full p-4 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter role title..."
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition cursor-pointer"
        >
          {loading ? "Fetching..." : "Submit"}
        </button>

        {/* Results Section */}
        {result && (
          <div className="mt-10 space-y-8">
            {/* DSA/Technical */}
            {result.dsaTechnical && (
              <div>
                <h2 className="font-semibold text-indigo-300 mb-2">
                  DSA / Technical
                </h2>
                <ul className="list-disc list-inside text-gray-300">
                  {result.dsaTechnical.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Role-specific */}
            {result.roleSpecific && (
              <div>
                <h2 className="font-semibold text-indigo-300 mb-2">
                  Role-specific
                </h2>
                <ul className="list-disc list-inside text-gray-300">
                  {result.roleSpecific.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Behavioural */}
            {result.behavioural && (
              <div>
                <h2 className="font-semibold text-indigo-300 mb-2">
                  Behavioural
                </h2>
                <ul className="list-disc list-inside text-gray-300">
                  {result.behavioural.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Company-specific */}
            {result.companySpecific && (
              <div>
                <h2 className="font-semibold text-indigo-300 mb-2">
                  Company-specific
                </h2>
                <ul className="list-disc list-inside text-gray-300">
                  {result.companySpecific.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
