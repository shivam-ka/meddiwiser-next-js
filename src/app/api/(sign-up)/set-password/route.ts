import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!user.isVerified) {
      return Response.json(
        {
          success: false,
          message: "Please verify your account first",
        },
        {
          status: 403,
        }
      );
    }

    const hashPaaword = (await bcrypt.hash(password, 10)).toString();
    user.password = hashPaaword;

    await user.save();

    return Response.json({
         success: true, 
        message: "Password updated successfully",
    },{
        status: 200
    })
  } catch (error) {
    console.error("set password code:", error);
    return Response.json(
      {
        success: false,
        message: "set password code",
      },
      {
        status: 500,
      }
    );
  }
}
