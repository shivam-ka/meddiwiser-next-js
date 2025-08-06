import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/model/Appointment";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userId } = await request.json();

    const user = await UserModel.findOne({
      _id: userId,
    });

    if (!user) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const sortBy = searchParams.get("sortBy") || "-date";

    const filter: any = {};

    if (user.role === "patient") {
      filter.patient = user._id;
    } else if (user.role === "doctor") {
      filter.doctor = user._id;
    }

    if (status) {
      filter.status = status;
    }

    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo) filter.date.$lte = new Date(dateTo);
    }

    const query = AppointmentModel.find(filter)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);

    if (user.role === "patient") {
      query.populate({
        path: "doctor",
        select: "fullName email avatar gender",
      });
      query.populate( {
          path: "doctorProfile",
          select: "specialization qualifications",
        })
    } else if (user.role === "doctor") {
      query.populate({
        path: "patient",
        select: "fullName email avatar dateOfBirth gender phone",
      });
    } else {
      // Admin
      query.populate([
        {
          path: "patient",
          select: "fullName email avatar",
        },
        {
          path: "doctor",
          select: "fullName email avatar",
          populate: {
            path: "doctorProfile",
            select: "specialization consultationFee",
          },
        },
      ]);
    }

    const [appointments, total] = await Promise.all([
      query.exec(),
      AppointmentModel.countDocuments(filter),
    ]);

    return Response.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch appointments",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
