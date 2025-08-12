import dbConnect from "@/lib/dbConnect";
import DoctorProfileModel from "@/model/DoctorProfile";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const getDoctorProfile = async () => {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user._id) {
      return { success: false, error: "Unauthorized" };
    }
    const user = await UserModel.findById(session.user._id);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const doctorProfile = await DoctorProfileModel.findOne({
      user: user._id,
    })
      .populate({
        path: "user",
        select: "fullName email avatar gender",
      })
      .lean();

    if (!doctorProfile) {
      return { success: false, error: "No profile found for this user" };
    }

    return { success: true, data: doctorProfile };
  } catch (error) {
    console.error("Doctor profile fetch error:", error);
    return { success: false, error: "Failed to fetch profile" };
  }
};
