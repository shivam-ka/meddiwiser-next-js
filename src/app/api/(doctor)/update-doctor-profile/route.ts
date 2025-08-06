import dbConnect from "@/lib/dbConnect";
import DoctorProfileModel from "@/model/DoctorProfile";
import { Types } from "mongoose";

export async function PUT(request: Request) {
  await dbConnect();

  try {
    const {
      userId,
      specialization,
      qualifications,
      experience,
      consultationFee,
      availableSlots,
      bio,
      languages,
    } = await request.json();

    // Validate userId is provided
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return Response.json(
        {
          success: false,
          message: "Invalid or missing user ID",
        },
        { status: 400 }
      );
    }

    // Find and update the profile
    const doctorProfile = await DoctorProfileModel.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          ...(specialization && { specialization }),
          ...(qualifications && { qualifications }),
          ...(experience !== undefined && { experience }),
          ...(consultationFee !== undefined && { consultationFee }),
          ...(availableSlots && { availableSlots }),
          ...(bio && { bio }),
          ...(languages && { languages }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!doctorProfile) {
      return Response.json(
        {
          success: false,
          message: "Doctor profile not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: doctorProfile,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating doctor profile:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Error updating doctor profile",
      },
      { status: 500 }
    );
  }
}