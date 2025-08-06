import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/model/Appointment.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { appointmentId } = await request.json();

    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      return Response.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    appointment.status = "completed";
    appointment.isCompleted = true;
    appointment.isPaid = true;

    await appointment.save();

    return Response.json({
      success: true,
      message: "Appointment marked as completed",
    });
  } catch (error: any) {
    console.error("Error completing appointment:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to complete appointment",
      },
      { status: 500 }
    );
  }
}
