import { TriangleAlert } from "lucide-react";
import { ProfileView } from "./ProfileView";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Metadata } from "next";
import CreateProfile from "./CreateProfile";
import { getDoctorProfile } from "./action";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Doctor Profile",
  };
}

export default async function DoctorProfilePage() {

  const result = await getDoctorProfile();

  if (!result.success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert
          variant="default"
          className="flex max-w-sm items-center justify-center"
        >
          <TriangleAlert className="mb-0.5 h-4 w-4" />
          <AlertTitle>{result.error || "Failed to load profile"}</AlertTitle>
          <CreateProfile />
        </Alert>
      </div>
    );
  }

  return (
    <div className="md:py-8">
      <div className="mx-auto max-w-4xl">
        <ProfileView profile={result.data} />
      </div>
    </div>
  );
}
