import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/model/Appointment";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { appointmentId, userRole, cancellationReason } =
      await request.json();

    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      return Response.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    appointment.status = "cancelled";
    appointment.cancelledBy = userRole;
    appointment.cancellationReason = cancellationReason;

    await appointment.save();

    return Response.json(
      {
        success: true,
        message: "Appointment cancelled successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error cancelling appointment:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to cancel appointment",
      },
      { status: 500 }
    );
  }
}
