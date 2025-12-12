"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import BookingModal from "@/components/ui/BookingModal";
import { services as SERVICES } from "@/components/data/services";
import { Toaster } from "sonner";
import { Menu, X } from "lucide-react";

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
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	const isActive = (item: string) => {
		const route = routeFor(item);
		if (route === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(route);
	};

	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm">
			<Toaster />
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex items-center justify-between h-16">
					{/* Logo / brand */}
					<div className="flex-shrink-0">
						<Link href="/" className="inline-flex items-center">
							<Image
								src="/logo-joyze.svg"
								alt="Joyze"
								width={44}
								height={44}
								className="h-11 w-auto"
							/>
						</Link>
					</div>

					{/* Nav links (Desktop) */}
					<nav className="hidden md:flex md:items-center md:gap-6">
						<ul className="flex items-center gap-4 text-sm text-gray-600">
							{navItems.map((item) => (
								<li key={item}>
									<Link
										href={routeFor(item)}
										className={`transition-colors px-3 py-1 rounded-md ${
											isActive(item)
												? "text-[var(--bg-primary)] font-medium bg-orange-50"
												: "hover:text-[var(--bg-primary)]"
										}`}
										aria-current={isActive(item) ? "page" : undefined}
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Right side (Desktop) */}
					<div className="hidden md:flex items-center gap-4">
						<Button
							variant="primary"
							className="rounded-full px-4 py-2 h-10 text-sm shadow-sm"
							onClick={() => setModalOpen(true)}
						>
							Book a Consultation
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[var(--bg-primary)] hover:bg-gray-100 focus:outline-none"
							aria-controls="mobile-menu"
							aria-expanded={isMobileMenuOpen}
						>
							<span className="sr-only">Open main menu</span>
							{isMobileMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden" id="mobile-menu">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						{navItems.map((item) => (
							<Link
								key={item}
								href={routeFor(item)}
								onClick={() => setMobileMenuOpen(false)}
								className={`block px-3 py-2 rounded-md text-base font-medium ${
									isActive(item)
										? "text-[var(--bg-primary)] bg-orange-50"
										: "text-gray-700 hover:text-[var(--bg-primary)] hover:bg-gray-50"
								}`}
								aria-current={isActive(item) ? "page" : undefined}
							>
								{item}
							</Link>
						))}
					</div>
					<div className="pt-4 pb-3 border-t border-gray-200">
						<div className="px-5">
							<Button
								variant="primary"
								className="w-full"
								onClick={() => {
									setModalOpen(true);
									setMobileMenuOpen(false);
								}}
							>
								Book a Consultation
							</Button>
						</div>
					</div>
				</div>
			)}

			<BookingModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				services={SERVICES}
				requireServiceSelection
				onSubmit={(data) => {
					console.log("Booking from headbar:", data);
					setModalOpen(false);
				}}
			/>
		</header>
	);
};

export default Headbar;