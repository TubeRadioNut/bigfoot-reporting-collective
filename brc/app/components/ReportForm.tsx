"use client";

import { useState, useEffect, useRef } from "react";

interface BigfootReport {
  _id?: string;
  date: Date;
  title: string;
  location: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BigfootReportFormProps {
  onSubmit: (
    bigfootReport: Omit<BigfootReport, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  existingReport?: BigfootReport; // Optional prop for updating
}

export default function ReportForm({
  onSubmit,
  existingReport,
}: BigfootReportFormProps) {
  const [formData, setFormData] = useState({
    date: new Date(),
    title: "",
    location: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Populate form data if editing an existing report
  useEffect(() => {
    if (existingReport) {
      setFormData({
        date: new Date(existingReport.date),
        title: existingReport.title,
        location: existingReport.location,
        description: existingReport.description,
      });
    }
  }, [existingReport]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Convert date value to Date object
      [name]: name === "date" ? new Date(value + "T00:00:00") : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit(formData);

      // Reset the form after submission
      setFormData({
        date: new Date(),
        title: "",
        location: "",
        description: "",
      });
    } catch {
      setError("Failed to save Bigfoot Report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {/* Display error message if there's one */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Date of Sighting
        </label>
        <input
          ref={inputRef}
          type="date"
          name="date"
          value={formData.date.toISOString().split("T")[0]}
          onChange={handleChange}
          required
          className="text-white p-2 border border-white rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Title of Sighting
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={130}
          className="w-full text-white p-2 border border-white rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Location of Sighting
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          maxLength={130}
          className="w-full text-white p-2 border border-white rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description of Sighting
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          maxLength={500}
          className="w-full text-white p-2 border border-white rounded-md"
        />
      </div>

      {/* Submit button changes text based on the state */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? "Saving..." : "Submit Report"}
      </button>
    </form>
  );
}
