import z from "zod";

export const doctorProfileSchema = z.object({
  specialization: z.string().min(1, "Specialization is required"),
  qualifications: z.array(z.string().min(1, "Qualification cannot be empty")),
  experience: z.number().min(0, "Experience must be positive"),
  consultationFee: z.number().min(0, "Fee must be positive"),
  availableSlots: z.array(
    z.object({
      day: z.string().min(1, "Day is required"),
    })
  ),
  bio: z.string().min(1, "Bio is required"),
  languages: z.array(z.string().min(1, "Language cannot be empty")),
});
