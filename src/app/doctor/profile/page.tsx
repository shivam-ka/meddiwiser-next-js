import { TriangleAlert } from "lucide-react";
import { getDoctorProfile } from "./actions";
import { ProfileView } from "./ProfileView";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Metadata } from "next";

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
        <Alert variant="destructive" className="max-w-md">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Profile Error</AlertTitle>
          <AlertDescription>
            {result.error || "Failed to load profile"}
          </AlertDescription>
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
