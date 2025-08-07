import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(session.user._id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const { avatarUrl } = await request.json();

    user.avatar = avatarUrl;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Avatar updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating avatar:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update avatar",
      },
      { status: 500 }
    );
  }
}
