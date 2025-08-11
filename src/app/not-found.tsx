import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Not Found",
  };
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="z-10 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </h1>

        <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
          {`The page you're looking for doesn't exist or has been moved. 
          Don't worry, let's get you back home.`}
        </p>

        <div className="flex space-x-4 pt-4">
          <Button
            asChild
            variant="default"
            size="lg"
            className="rounded-sm text-white"
          >
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-sm">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
