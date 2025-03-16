"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ReportForm from "@/app/components/ReportForm";
import { useRouter } from "next/navigation";

interface BigfootReport {
  _id: string;
  date: Date;
  title: string;
  location: string;
  description: string;
}

export default function CreateReportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If session is still loading, or user is not authenticated, redirect to the sign-in page
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    redirect("/api/auth/signin");
    return null; // Prevent further rendering if not authenticated
  }

  const handleSubmit = async (bigfootReport: Omit<BigfootReport, "_id">) => {
    try {
      const responce = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bigfootReport),
      });

      const responseData = await responce.json(); // Get the response from the server
      console.log("Server response:", responseData);

      if (!responce.ok) {
        throw new Error("Failed to create Bigfoot report");
      }

      // Notify the user that the report was created successfully
      alert("Bigfoot Report Created Successfully!");
      // Redirect to the reports page after successful creation
      router.push("/reports");
    } catch (err) {
      console.error("Error:", err);
      // Optionally handle the error state here (show error message, etc.)
      alert("Failed to create Bigfoot report. Please try again.");
    }
  };

  return (
    <main className="container text-white mx-auto px-4 py-8 bg-[url('/background_2.jpg')]">
      <div className="my-8 p-8 bg-gray-400/40 backdrop-blur-sm border-solid border-black border-2 rounded-2xl shadow-custom">
        <h1 className="text-4xl mb-2 text-center">Submit A Bigfoot Report</h1>
        <p className="text-xl text-center py-4 font-semibold">
          Do not leave an input field empty; if information is unknown, type
          "Unknown".
        </p>
        <ReportForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
