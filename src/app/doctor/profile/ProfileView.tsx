import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";


export function ProfileView({ profile }: {profile: any}) {
  return (
    <Card className="rounded-none md:rounded-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Doctor Profile</CardTitle>
        <Link href="/doctor/profile/edit">
          <Button variant="outline">Edit Profile</Button>
        </Link>
      </CardHeader>
      <CardContent className="px-3 md:px-6">
        <Image
          width={200}
          height={200}
          src={profile.user.avatar}
          alt="doctor"
          draggable={false}
          className="border-muted-foreground mb-5 h-28 w-28 rounded-xl border bg-gradient-to-b from-blue-600 to-blue-900 object-cover md:h-44 md:w-44"
        />
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableCell>{profile.user.fullName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableCell>{profile.user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[200px]">Gender</TableHead>
              <TableCell>{profile.user.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[200px]">Specialization</TableHead>
              <TableCell>{profile.specialization}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Qualifications</TableHead>
              <TableCell>
                <ul className="list-disc pl-5">
                  {profile.qualifications.map(
                    (qualification: string, index: number) => (
                      <li key={index}>{qualification}</li>
                    )
                  )}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Experience</TableHead>
              <TableCell>{profile.experience} years</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Consultation Fee</TableHead>
              <TableCell>₹{profile.consultationFee}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Bio</TableHead>
              <TableCell className="max-w-prose whitespace-pre-wrap">
                {profile.bio}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Languages</TableHead>
              <TableCell>{profile.languages?.join(", ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-6">
          <h3 className="mb-4 text-lg font-medium">Available Slots</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {profile.availableSlots.map((slot: any, index: number) => (
              <Card
                key={index}
                className="gap-1 rounded-sm px-4 py-3 transition-shadow hover:shadow-sm"
              >
                <CardHeader className="p-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm font-medium capitalize">
                      {slot.day}
                    </span>
                    <Badge
                      variant={slot.isAvailable ? "default" : "destructive"}
                      className="h-5 rounded-sm px-2 py-0 text-xs text-white"
                    >
                      {slot.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-muted-foreground text-xs">
                    {slot.startTime} - {slot.endTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
