"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { Input } from "./ui/input";

export default function Footer() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
  ];

  return (
    <footer className="border-primary bg-background border-t px-2 py-8 2xl:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                className="h-8 w-8 rotate-12 sm:h-10 sm:w-10"
                src="/logo.svg"
                width={45}
                height={45}
                alt="logo"
                draggable={false}
              />
              <h1 className="text-xl font-semibold">Meddiwiser</h1>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted healthcare partner providing quality medical services
              and expert doctors.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground h-5 w-5" />
                <span className="text-muted-foreground text-sm">
                  contact@meddiwiser.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-muted-foreground h-5 w-5" />
                <span className="text-muted-foreground text-sm">
                  +1 (123) 456-7890
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest updates and health
              tips.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="focus-visible:ring-0"
              />
              <Button className="text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-primary mt-8 flex flex-col items-center justify-between border-t pt-6 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Meddiwiser. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <ThemeToggleButton start="bottom-right" />
          </div>
        </div>
      </div>
    </footer>
  );
}
