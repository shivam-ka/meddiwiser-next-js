import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./User";
import { IDoctorProfile } from "./DoctorProfile";

export type AppointmentStatus = "confirmed" | "cancelled" | "completed";

export interface IAppointment extends Document {
  patient: Types.ObjectId | IUser;
  doctor: Types.ObjectId | IUser;
  doctorProfile: Types.ObjectId | IDoctorProfile;
  date: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  problem?: string;
  isPaid: boolean;
  paymentAmount: number;
  paymentMethod?: "CASH" | "ONLINE";
  paymentId?: string;
  isCompleted: boolean,
  cancellationReason?: string;
  cancelledBy?: "patient" | "doctor" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorProfile: {
      type: Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Please enter a valid time in HH:MM format",
      ],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      match: [
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Please enter a valid time in HH:MM format",
      ],
      validate: {
        validator: function (this: any, value: string) {
          return value > this.startTime;
        },
        message: "End time must be after start time",
      },
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },
    problem: String,
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentAmount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Payment amount cannot be negative"],
    },
    paymentMethod: {
      type: String,
      enum: ["CASH", "ONLINE"],
      default: "CASH"
    },
    paymentId: String,
    cancellationReason: String,
    isCompleted: {
      type: Boolean,
      default: false
    },
    cancelledBy: {
      type: String,
      enum: ["patient", "doctor", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

const AppointmentModel =
  (mongoose.models.Appointment as mongoose.Model<IAppointment>) ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default AppointmentModel;
