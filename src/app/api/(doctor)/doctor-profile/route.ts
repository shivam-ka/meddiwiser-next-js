import dbConnect from "@/lib/dbConnect";
import DoctorProfileModel from "@/model/DoctorProfile";
import UserModel from "@/model/User";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user._id) {
      return { success: false, error: "Unauthorized" };
    }

    const {
      specialization,
      qualifications,
      experience,
      consultationFee,
      availableSlots,
      bio,
      languages,
    } = await request.json();

    const user = await UserModel.findById(session?.user._id);

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

export async function GET(req: NextRequest) {
  try {
    
    const session = await getServerSession(authOptions);
      const token = await getToken({req: req});
  console.log("Token:", token);
    
    
    await dbConnect();
    return NextResponse.json({
      data: session,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
