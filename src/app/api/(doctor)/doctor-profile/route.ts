import dbConnect from "@/lib/dbConnect";
import DoctorProfileModel from "@/model/DoctorProfile";
import UserModel from "@/model/User";

export async function POST(request: Request) {
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

    const user = await UserModel.findById(userId);

    if (!(user?.role === "doctor")) {
      return Response.json(
        { sussess: false, message: "Only doctors can create profiles" },
        { status: 403 }
      );
    }

    const doctorProfile = new DoctorProfileModel({
      user: user?._id,
      specialization,
      qualifications,
      experience,
      consultationFee,
      availableSlots: availableSlots || [],
      bio,
      languages: languages || [],
    });

    await doctorProfile.save();

    return Response.json(
      {
        success: true,
        message: "Profile Created Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to create doctor profile",
      },
      {
        status: 500,
      }
    );
  }
}
