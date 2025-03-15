import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import BigfootReport from "@/lib/models/report";

// Helper function to check if an ID is valid
function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

//Create GET - retrieve bigfootReport by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    //Use helper function to validate the ID format
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
    }

    await connectToDatabase();

    //Find the bigfootReport by ID
    const bigfootReport = await BigfootReport.findById(id);

    //Check if bigfootReport exists
    if (!bigfootReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ bigfootReport }, { status: 200 });
  } catch (error) {
    //Log error to console for troubleshooting
    console.error("Error fetching report", error);
    //return generic error message to client
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

//Create PUT - update BigfootReport by ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Use helper function to validate the ID format
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Get the update data from the request body
    const updateData = await request.json();

    //Find and update the BigfootReport
    const updatedBigfootReport = await BigfootReport.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    //check if BigfootReport exists
    if (!updatedBigfootReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(
      { bigfootReport: updatedBigfootReport },
      { status: 200 }
    );
  } catch (error) {
    //log error to console for troubleshooting
    console.error("Error updating report:", error);
    //return generic error to client
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}

//Create DELETE - Delete BigfootReport by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Use helper function to validate the ID format
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
    }

    await connectToDatabase();

    //Find and delete the BigfootReport
    const deletedBigfootReport = await BigfootReport.findByIdAndDelete(id);

    //Check if BigfootReport exists
    if (!deletedBigfootReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Report deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json(
      { error: "Failed to delete report:" },
      { status: 500 }
    );
  }
}
