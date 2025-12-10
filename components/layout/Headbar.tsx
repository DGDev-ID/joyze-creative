"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import BookingModal from "@/components/ui/BookingModal";
import { services as SERVICES } from "@/components/data/services";
import { Toaster } from "sonner";

const navItems = ["Home", "Services", "Talent", "Booking", "Portfolio"];

const routeFor = (item: string) => {
  switch (item) {
    case "Home":
      return "/";
    case "Services":
      return "/services";
    case "Talent":
      return "/talent";
    case "Booking":
      return "/booking";
    case "Portfolio":
      return "/portfolio";
    default:
      return "/";
  }
};

const Headbar: React.FC = () => {
  const pathname = usePathname() || "/";
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Toaster />
      <div className="max-w-7xl mx-auto py-2">
        <div className="flex items-center justify-between h-14">
          <nav className="flex items-center gap-6">
            {/* Logo / brand */}
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo-joyze.svg" alt="Joyze" width={44} height={44} className="h-11 w-auto" />
            </Link>

            {/* Nav links */}
            <ul className="flex items-center gap-4 text-sm text-gray-600">
              {navItems.map((item) => (
                <li key={item}>
                  {
                    /* use real route hrefs and compute active from pathname */
                  }
                  <a
                    href={routeFor(item)}
                    className={`transition-colors px-3 py-1 ${
                      (item === "Home" ? pathname === "/" : pathname.startsWith(routeFor(item)))
                        ? "text-(--bg-primary) font-medium"
                        : "hover:text-(--bg-primary)"
                    }`}
                    aria-current={(item === "Home" ? pathname === "/" : pathname.startsWith(routeFor(item))) ? "page" : undefined}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              className="rounded-full px-4 py-2 h-10 text-sm shadow-sm"
              onClick={() => setModalOpen(true)}
            >
              Book a Consultation
            </Button>
          </div>
          <BookingModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            services={SERVICES}
            requireServiceSelection
            onSubmit={(data) => { console.log('Booking from headbar:', data); setModalOpen(false); }}
          />
        </div>
      </div>
    </header>
  );
};

export default Headbar;
