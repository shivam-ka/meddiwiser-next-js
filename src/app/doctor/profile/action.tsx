"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DoctorProfileModel from "@/model/DoctorProfile";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";

export async function getDoctorProfile() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      throw new Error("Unauthorized - No valid session found");
    }

    const user = await UserModel.findById(session.user._id);
    if (!user) {
      throw new Error("User not found");
    }

    const doctorProfile = await DoctorProfileModel.findOne({
      user: user._id,
    })
      .populate({
        path: "user",
        select: "fullName avatar email gender",
      })
      .lean();

    if (!doctorProfile) {
      throw new Error("Doctor profile not found");
    }

    return {
      success: true,
      data: doctorProfile,
    };
  } catch (error) {
    console.error("Error in getDoctorProfile:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
