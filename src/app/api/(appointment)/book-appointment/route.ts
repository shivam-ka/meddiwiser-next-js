import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/model/Appointment.model";
import DoctorProfileModel from "@/model/DoctorProfile";

export async function POST(request: Response) {
  await dbConnect();

  try {
    const { userId, doctorId, date, startTime, endTime, problem } =
      await request.json();

    const doctorProfile = await DoctorProfileModel.findById(doctorId);

    const appointmentData = new Date(date);

    if (startTime >= endTime) {
      return Response.json(
        { success: false, error: "End time must be after start time" },
        { status: 400 }
      );
    }

    const appointment = new AppointmentModel({
      patient: userId,
      doctor: doctorProfile?.user._id,
      doctorProfile: doctorProfile?._id,
      paymentAmount: doctorProfile?.consultationFee,
      date: appointmentData,
      startTime,
      endTime,
      problem,
    });

    await appointment.save();

    return Response.json(
      {
        success: true,
        message: "Appointment booked successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error booking appointment:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to book appointment",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
