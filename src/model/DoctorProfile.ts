import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./User";

export interface IDoctorProfile extends Document {
  user: Types.ObjectId | IUser;
  specialization: string;
  qualifications: string[];
  experience: number;
  consultationFee: number;
  availableSlots: {
    day: string;
    isAvailable: boolean;
  }[];
  bio?: string;
  languages?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DoctorProfileSchema = new Schema<IDoctorProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    qualifications: {
      type: [String],
      required: [true, "Qualifications are required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
    },
    consultationFee: {
      type: Number,
      required: [true, "Consultation fee is required"],
      min: [0, "Consultation fee cannot be negative"],
    },
    availableSlots: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          required: true,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
      },
    ],
    bio: String,
    languages: [String],
  },
  {
    timestamps: true,
  }
);

const DoctorProfileModel =
  (mongoose.models.DoctorProfile as mongoose.Model<IDoctorProfile>) ||
  mongoose.model<IDoctorProfile>("DoctorProfile", DoctorProfileSchema);

export default DoctorProfileModel;
