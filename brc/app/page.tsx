import { BigfootReport } from "./types/bigfootReport";
import Link from "next/link";
import { GET } from "./api/reports/route";

export default async function Home() {
  let bigfootReports: BigfootReport[] = [];

  try {
    //use the GET function to get data
    const response = await GET();

    //Check if the response is valid
    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }

    //parse the response data
    const data = await response.json();
    bigfootReports = data?.bigfootReports || [];
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }

  //Assign report the late one (newest first)
  const report = bigfootReports[0];

  return (
    <main className="container  mx-auto px-4 py-8 rounded-2xl bg-[url('/background.jpg')]">
      <h1 className="text-center text-3xl font-bold mb-8 text-white">
        Welcome To The Bigfoot Reporting Collective!
      </h1>
      <div className="text-white text-2xl">
        <p className="mb-4">
          This platform is dedicated to gathering and sharing Bigfoot sightings
          and encounters from North America. Our mission is to provide a space
          for enthusiasts, researchers, and curious individuals to share their
          experiences without the need for personal information. Whether you
          have had a firsthand sighting or heard an intriguing tale, we invite
          you to report it here.
        </p>

        <p className="mb-4">
          At the Bigfoot Reporting Collective, your privacy is our priority. We
          understand the importance of anonymity and confidentiality, which is
          why we do not collect any personal data from our users. Your reports
          are only focused on the details of the encounter itself, allowing you
          to share freely and without concern.
        </p>

        <p className="mb-4">
          The main reason we do not collect personal information is to remove
          any barriers that might prevent people from stepping forward with
          their sightings. Too often, individuals hesitate to share their
          experiences due to fears of being ridiculed, belittled, or labeled as
          crazy or a nutjob. We believe that every account deserves to be heard,
          regardless of how extraordinary or unusual it may seem.
        </p>

        <p className="mb-4">
          By contributing to the Bigfoot Reporting Collective, you are becoming
          part of a growing community of Bigfoot enthusiasts across North
          America, all eager to uncover the truth behind these mysterious
          creatures. Help us piece together the puzzle and connect sightings
          from all corners of the continent in one accessible and trustworthy
          platform.
        </p>
      </div>
      {/* conditional render content */}
      {bigfootReports.length === 0 ? (
        <div className="text-center text-xl text-red-500">
          <h1 className="text-4xl mb-2">No Reports Available At The Moment.</h1>
          <Link className="hover:text-blue-700" href={"/reports/addreport"}>
            <h2>Submit A Bigfoot Report</h2>
          </Link>
        </div>
      ) : (
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
        </div>
      )}
    </main>
  );
}
