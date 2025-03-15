import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import BigfootReport from "@/lib/models/report";

// Create GET - retrieves all BigfootReports
export async function GET() {
  try {
    //connect to the databse
    await connectToDatabase();

    //Fetch all BigfootReports, sorted by creation data (newest first)
    const bigfootReports = await BigfootReport.find({}).sort({ createdAt: -1 });

    //Return the bigfootReports with a 200 status code
    return NextResponse.json({ bigfootReports }, { status: 200 });
  } catch (error) {
    //log the error for troubleshooting
    console.error("Error fetching bigfootReports:", error);

    //return generic error message to the client
    return NextResponse.json(
      { error: "Failed to fetch bigfootReports" },
      { status: 500 }
    );
  }
}

//Create POST - Create a new bigfootReport
export async function POST(request: Request) {
  try {
    //connect to the database
    await connectToDatabase();

    //Parse the request body
    const data = await request.json();

    //Create a new bigfootReport with data
    const newBigfootReport = await BigfootReport.create(data);

    //Return the created BigfootReport with a 201 status code
    return NextResponse.json(
      { bigfootReport: newBigfootReport },
      { status: 201 }
    );
  } catch (error) {
    //Log error to the consle for troublshooting
    console.error("Errro creating bigfootReport:", error);
    //return generic error message to the client
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}
