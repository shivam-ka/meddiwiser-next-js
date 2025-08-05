import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { fullName, email, dateOfBirth, gender } = await request.json();

    const user = await UserModel.findOne({
      email,
    });

    if (user) {
      return Response.json(
        {
          success: false,
          message: "email already in use",
        },
        {
          status: 400,
        }
      );
    }

    const dobDate = new Date(dateOfBirth);
    const today = new Date();
    if (dobDate > today) {
      return Response.json(
        {
          success: false,
          message: "Date of birth cannot be in the future",
        },
        { status: 400 }
      );
    }

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    const verifyCode = Math.floor(1000 + Math.random() * 900000).toString();

    const newUser = new UserModel({
      fullName,
      email,
      verifyCode,
      verifyCodeExpiry: expiryDate,
      dateOfBirth: dobDate,
      gender,
    });

    await newUser.save();

    const emailResponse = await sendVerificationEmail({
      email,
      fullname: fullName,
      verificationCode: verifyCode,
    });

    if (emailResponse.error) {
      return Response.json(
        {
          success: false,
          message: emailResponse.error?.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "verification code sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "user register Error",
      },
      {
        status: 500,
      }
    );
  }
}
