"use client";

import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { ChevronRight, CircleUser, Menu } from "lucide-react";
import ThemeToggleButton from "../ui/theme-toggle-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "next-auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-b-neutral-600 bg-white/80 px-2 py-4 shadow-sm backdrop-blur-md 2xl:px-20 dark:bg-black/80">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="h-8 w-8 rotate-12 sm:h-10 sm:w-10"
            src="/logo.svg"
            width={45}
            height={45}
            alt="logo"
            draggable={false}
          />
          <h1 className="hidden sm:block sm:text-xl lg:text-2xl">Meddiwiser</h1>
        </Link>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="space-x-3">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  className={`text-[15px] font-normal tracking-wide hover:bg-neutral-200 dark:hover:bg-neutral-800/90`}
                  asChild
                >
                  <Link href={item.href}>{item.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-foreground gap-1 focus-visible:ring-0"
              >
                <CircleUser />
                {user ? <p>Profile</p> : <p>Log in</p>}
              </Button>
            </DropdownMenuTrigger>
            {user ? (
              <>
                {user.role === "patient" && <PatientMenu user={user} />}
                {user.role === "doctor" && <DoctorMenu user={user} />}
                {user.role === "admin" && <AdminMenu user={user} />}
              </>
            ) : (
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/sign-up">Create Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sign-in">Login</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          <ThemeToggleButton start="top-right" />

          {/* Book Appointment - Hidden on mobile */}
          <Button asChild className="ml-1 hidden text-white md:block">
            <Link href="/doctors">Book Appointment</Link>
          </Button>

          <Button
            className="lg:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col sm:max-w-sm">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex grow flex-col px-4 py-6">
            <div className="flex-1 px-3">
              <div className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <ChevronRight className="text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
            <Button
              asChild
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <Link href="/doctors">Book Appointment</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface UserProps {
  user: User;
}

function PatientMenu({ user }: UserProps) {
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel className="flex flex-col">
        <span className="capitalize">{user.fullName}</span>
        <span className="text-muted-foreground text-xs">{user.email}</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/dashboard">Profile </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/doctors">Book Appointments </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/appointments">My Appointments </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="font-semibold text-red-800"
        onClick={() => signOut()}
      >
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

function DoctorMenu({ user }: UserProps) {
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel className="flex flex-col">
        <span className="capitalize">{user.fullName}</span>
        <span className="text-muted-foreground text-xs">{user.email}</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/dashboard">Profile </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/doctors">Book Appointments </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/appointments">My Appointments </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="font-semibold text-red-800"
        onClick={() => signOut()}
      >
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
function AdminMenu({ user }: UserProps) {
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel className="flex flex-col">
        <span className="capitalize">{user.fullName}</span>
        <span className="text-muted-foreground text-xs">{user.email}</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/dashboard">Profile </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/doctors">Book Appointments </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/appointments">My Appointments </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="font-semibold text-red-800"
        onClick={() => signOut()}
      >
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
