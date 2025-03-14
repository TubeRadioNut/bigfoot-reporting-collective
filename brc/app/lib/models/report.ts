import mongoose from "mongoose";

//Interface defination for bigfoot report
interface IBigfootReport extends mongoose.Document {
  date: Date;
  title: string;
  location: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Check to see if the model already exists before creating it

const BigfootReport =
  mongoose.models.BigfootReport ||
  mongoose.model<IBigfootReport>(
    "BigfootReport",
    new mongoose.Schema(
      {
        date: {
          type: Date,
          required: [true, "Please provide a date"],
        },
        title: {
          type: String,
          required: [true, "Please provide a title"],
          maxlength: [130, "Title cannot be more than 130 chatacters"],
        },
        location: {
          type: String,
          required: [true, "Please provide a loaction"],
          maxlength: [130, "Loacation cannot be more than 130 characters"],
        },
        description: {
          type: String,
          required: [true, "Please provide a description"],
        },
      },
      {
        timestamps: true,
      }
    )
  );
