"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect, use, useCallback } from "react";
import { BigfootReport } from "@/app/types/bigfootReport";
import { useRouter } from "next/navigation";
import ReportForm from "@/app/components/ReportForm";

//define a type the URL parameters ID, define Id type string
type PageParams = { id: string };
//create page default function with params defined as Promise containing ID
export default function DetailsPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { data: session, status } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [report, setReport] = useState<BigfootReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  //detructure ID out of params with use
  const { id } = use(params);
  //setup hooks and state variables

  //Memorize the loadReport function using useCallback
  const loadReport = useCallback(async () => {
    try {
      const responce = await fetch(`/api/reports/${id}`);
      const reportData = await responce.json();
      if (!responce) {
        throw new Error(reportData.error || "Failed to fetch report");
      }
      setReport(reportData.bigfootReport || null);
    } catch (error) {
      console.error("Error fetching report: ", error);
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, [id]); //Only recreates this funcion if `id` changes

  //useEffect will now run only when `id` changes
  useEffect(() => {
    loadReport();
  }, [loadReport]);
  console.log("Report: ", report);

  // If session is still loading, or user is not authenticated, redirect to the sign-in page
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    redirect("/api/auth/signin");
    return null; // Prevent further rendering if not authenticated
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        //make DELETE request to API
        const responce = await fetch(`/api/reports/${id}`, {
          method: "DELETE",
        });
        if (!responce.ok) {
          throw new Error("Failed to delete Bigfoot Report");
        }

        router.push("/reports");
      } catch (err) {
        alert("Failed to delete Bigfoot Report");
        console.error("Error: ", err);
      }
    } else {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (
    updatedReport: Omit<BigfootReport, "_id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const responce = await fetch(`/api/reports/${id}`, {
        method: "PUT",
        headers: { Content_Type: "application/json" },
        body: JSON.stringify(updatedReport),
      });

      if (!responce) {
        throw new Error("Failed to update Bigfoot Report");
      }

      alert("Update of Bigfoot Report was successfull!");
      loadReport();
      setEditMode(false);
    } catch (error) {
      console.error("Error updating report: ", error);
      alert("Failed to update Bigfoot Report.  Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-2xl text-white font-bold text-center">
        Loading....
      </div>
    );
  }

  if (!report) {
    return (
      <div>
        <h1>No Report Found.</h1>
      </div>
    );
  }

  return (
    <main className="container text-white mx-auto px-4 py-8 ">
      <div className="my-8 p-8 bg-gray-200/10 backdrop-blur-sm text-gray-300 rounded-2xl shadow-custom">
        <div className="w-full text-center mb-4">
          <h1 className="text-4xl mb-2">Latest Reported Sighting</h1>
          <h2 className="text-2xl font-bold">
            Date of Sighting: {new Date(report.date).toLocaleDateString()}
          </h2>
          <p className="text-2xl font-semibold">{report.title}</p>
          <p className="text-2xl font-semibold">{report.location}</p>
          <p className="text-2xl font-semibold">{report.description}</p>
          <p className="text-2xl font-semibold">
            Submission Date: {new Date(report.createdAt).toDateString()}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 lg:gap-8 max-w-4xl mx-auto p-4">
          <button
            onClick={() => handleDelete(report._id)}
            disabled={isDeleting}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
          >
            {isDeleting ? "Deleting..." : "Delete Report"}
          </button>

          {/* Edit button */}
          <button
            onClick={() => setEditMode(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
          >
            Edit UFO Report
          </button>
        </div>

        {/* Render the report form only when editMode is ture */}
        {editMode && report && (
          <div className="mt-8 bg-gray-200/10 backdrop-blur-sm border-solid border-black border-2 rounded-xl shadow-custom p-4">
            <ReportForm onSubmit={handleSubmit} existingReport={report} />

            {/* Cancel button to hide the form */}
            <button
              onClick={() => setEditMode(false)}
              className="mt-4 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
            >
              Cancel Edit
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
