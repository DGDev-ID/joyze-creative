"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-2">
        <div className="flex items-center justify-between h-14">
          <nav className="flex items-center gap-6">
            {/* Logo / brand placeholder */}
            <div className="text-lg font-semibold text-[var(--foreground)]">Joyze</div>

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
                        ? "text-[var(--bg-primary)] font-medium"
                        : "hover:text-[var(--bg-primary)]"
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
            >
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Headbar;
