import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { matchScore } from "../services/AiApi";

export default function ResumeScore() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await matchScore(resumeText, jobDescription);
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
        Resume Job Match Scorer
      </h1>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-300">
            Resume Text
          </h2>
          <textarea
            className="w-full p-4 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={10}
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-300">
            Job Description
          </h2>
          <textarea
            className="w-full p-4 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={10}
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-indigo-600 cursor-pointer hover:bg-indigo-700 rounded-lg font-semibold transition"
      >
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {/* Results Section */}
      {result && (
        <div className="mt-10 space-y-6">
          <p className="text-xl font-bold">
            Match Score:{" "}
            <span className="text-indigo-400">{result.matchScore}%</span>
          </p>

          <div>
            <h2 className="font-semibold text-green-400 mb-2">
              Matching Skills
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              {result.matchingSkills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-red-400 mb-2">
              Missing Skills
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              {result.missingSkills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-yellow-400 mb-2">
              Improvements
            </h2>
            <p className="text-gray-300">{result.improvements}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
