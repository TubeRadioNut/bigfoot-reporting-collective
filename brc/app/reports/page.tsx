import { getServerSession } from "next-auth";
//import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { BigfootReport } from "../types/bigfootReport";
import Link from "next/link";
import { GET } from "../api/reports/route";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const { search = "", page = "1" } = await searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const reportsPerPage = 4;
  let bigfootReports: BigfootReport[] = [];

  try {
    const response = await GET();
    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }

    const data = await response.json();
    bigfootReports = data?.bigfootReports || [];

    if (search) {
      bigfootReports = bigfootReports.filter((report) =>
        report.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    //Pagination: Calculate the total number of pages and slice the reports to show on the current page's reports
    const totalPages = Math.ceil(bigfootReports.length / reportsPerPage);
    const startIndex = (currentPage - 1) * reportsPerPage;
    const endIndex = startIndex + reportsPerPage;
    const reportsToShow = bigfootReports.slice(startIndex, endIndex);

    // If no reports are found after filtering, display a message instead of triggering 404
    if (reportsToShow.length === 0 && currentPage > totalPages) {
      return (
        <main className="container text-white mx-auto px-4 py-8 rounded-2xl">
          <h1 className="lg:col-span-2 text-6xl font-extrabold mb-8 text-center">
            No Reports Found for {search}
          </h1>
          <p className="text-center text-xl py-8">
            We could not find any Bigfoot reports matching your search. Please
            try again with different terms.
          </p>
        </main>
      );
    }

    return (
      <main className="container text-white mx-auto px-4 py-8 rounded-2xl bg-[url('/background_3.jpg')]">
        <div className="grid lg:grid-cols-2 lg:gap-8 max-w-4xl mx-auto p-4">
          <h1 className="lg:col-span-2 text-6xl font-extrabold mb-8 text-center">
            Welcome To Reported Bigfoot Sightings
          </h1>

          {/* Search Form */}
          <div className="lg:col-span-2 mb-8">
            <form action="" method="GET" className="flex items-center">
              <input
                type="text"
                name="search"
                placeholder="Search by location..."
                defaultValue={search}
                className="w-full p-4 text-lg border-2 border-white rounded-md text-black bg-white"
              />
              <button
                type="submit"
                className="ml-4 p-4 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Search
              </button>
            </form>
          </div>

          {/* Render filtered reports with pagination */}
          {reportsToShow.length > 0 ? (
            reportsToShow.map((report, _id) => (
              <div
                key={_id}
                className="p-8 text-center bg-gray-200/10 backdrop-blur-sm border-solid border-black border-2 rounded-2xl shadow-custom"
              >
                <h2 className="text-2xl font-bold py-8">
                  Date Of Sighting: {new Date(report.date).toLocaleDateString()}
                </h2>
                <p className="text-xl py-4">{report.title}</p>
                <p className="text-lg py-2">Location: {report.location}</p>
                <Link
                  className="border-solid border-2 border-white rounded-md p-2 bg-blue-500 hover:border-blue-700 hover:text-blue-700"
                  href={`/reports/${report._id}`}
                >
                  More Information
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-xl py-8">
              No reports found matching your search.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {/* Prev Page */}
          {currentPage > 1 && (
            <Link
              href={`?search=${search}&page=${currentPage - 1}`}
              className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
            >
              Previous
            </Link>
          )}

          {/* Next Page */}
          {currentPage < totalPages && (
            <Link
              href={`?search=${search}&page=${currentPage + 1}`}
              className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
            >
              Next
            </Link>
          )}
        </div>
      </main>
    );
  } catch (err) {
    console.error("Error fetching reports:", err);
    throw new Error("An error occurred while fetching UFO reports.");
  }
}
