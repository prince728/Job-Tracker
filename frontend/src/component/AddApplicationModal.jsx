import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ApplicationForm({ onClose, onSubmit, defaultValues }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });

  const submitHandler = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-white mb-6">
          {defaultValues ? "Edit Application" : "Add Application"}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="block text-gray-300">Company Name</label>
            <input
              {...register("companyName", { required: "Company name is required" })}
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded focus:ring-2 focus:ring-indigo-500"
            />
            {errors.companyName && (
              <p className="text-red-400 text-sm">{errors.companyName.message}</p>
            )}
          </div>

          {/* Role Title */}
          <div>
            <label className="block text-gray-300">Role Title</label>
            <input
              {...register("roleTitle", { required: "Role title is required" })}
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded focus:ring-2 focus:ring-indigo-500"
            />
            {errors.roleTitle && (
              <p className="text-red-400 text-sm">{errors.roleTitle.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-300">Status</label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select status</option>
              <option value="applied">Applied</option>
              <option value="oa">OA</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            {errors.status && (
              <p className="text-red-400 text-sm">{errors.status.message}</p>
            )}
          </div>

          {/* Date Applied */}
          <div>
            <label className="block text-gray-300">Date Applied</label>
            <input
              type="date"
              {...register("dateApplied", { required: "Date applied is required" })}
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded focus:ring-2 focus:ring-indigo-500"
            />
            {errors.dateApplied && (
              <p className="text-red-400 text-sm">{errors.dateApplied.message}</p>
            )}
          </div>

          {/* Job Link */}
          <div>
            <label className="block text-gray-300">Job Link</label>
            <input
              type="url"
              {...register("jobLink")}
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-300">Notes</label>
            <textarea
              {...register("notes")}
              rows={4}
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Follow Up Date */}
          <div>
            <label className="block text-gray-300">Follow Up Date</label>
            <input
              type="date"
              {...register("followUpDate")}
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              {isSubmitting ? "Submitting..." : defaultValues ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
