import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="md:py-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-none border md:rounded-sm">
          <div className="flex flex-row items-center justify-between p-6">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-9 w-[100px]" />
          </div>
          <div className="px-3 md:px-6">
            {/* Profile Image */}
            <Skeleton className="mb-5 h-28 w-28 rounded-xl md:h-44 md:w-44" />

            {/* Profile Details */}
            <div className="space-y-4">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="flex">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="ml-4 h-5 flex-1" />
                </div>
              ))} 
              
            </div>

            {/* Available Slots */}
            <div className="mt-6">
              <Skeleton className="mb-4 h-6 w-[150px]" />
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-sm border p-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[60px]" />
                      <Skeleton className="h-4 w-[80px]" />
                    </div>
                    <Skeleton className="mt-2 h-3 w-[120px]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="py-6">
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
