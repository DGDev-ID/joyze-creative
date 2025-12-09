"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

// A simple arrow icon component for the dropdown
const DropdownArrow = () => (
	<svg
		className="w-4 h-4 text-gray-500"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 9l-7 7-7-7"
		/>
	</svg>
);

export default function BookingPage() {
	const [selectedService, setSelectedService] = useState(
		"Social Media Strategy"
	);
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const services = [
		"Social Media Strategy",
		"Content Creation Package",
		"Influencer Collaboration",
		"Brand Identity Design",
	];

	const handleServiceSelect = (service: string) => {
		setSelectedService(service);
		setDropdownOpen(false);
	};

	return (
		<div className="w-full py-12">
			<div className="max-w-7xl mx-auto px-4 text-center">
				<h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
					Streamlined Booking, Unmatched Creativity
				</h1>
				<p className="text-lg max-w-2xl mx-auto mb-12">
					Experience Joyze Creative Agency's effortless automated booking
					system. Select services, schedule with ease, and preview your
					invoice in real-time.
				</p>

				<div className="grid md:grid-cols-3 gap-8 text-left mb-12">
					{/* Column 1: Select Your Service */}
					<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
						<h2 className="text-xl font-bold mb-4">1. Select Your Service</h2>
						<p className="text-sm text-gray-600 mb-4">
							Choose from our diverse range of creative marketing solutions
							tailored to your needs.
						</p>
						<div className="relative">
							<div
								className="bg-white p-3 rounded-md border border-gray-200 flex justify-between items-center cursor-pointer"
								onClick={() => setDropdownOpen(!isDropdownOpen)}
							>
								<span>{selectedService}</span>
								<DropdownArrow />
							</div>
							{isDropdownOpen && (
								<div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
									{services.map((service) => (
										<div
											key={service}
											className={`p-3 cursor-pointer hover:bg-gray-100 ${
												selectedService === service
													? "bg-[var(--bg-light)] text-[var(--bg-primary)]"
													: ""
											}`}
											onClick={() => handleServiceSelect(service)}
										>
											{service}
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Column 2: Schedule Your Session */}
					<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
						<h2 className="text-xl font-bold mb-4">
							2. Schedule Your Session
						</h2>
						<p className="text-sm text-gray-600 mb-4">
							Pick an available date and time that fits your schedule using
							our real-time calendar.
						</p>
						<div className="bg-white p-4 rounded-md border border-gray-200">
							<div className="flex justify-between items-center mb-4">
								<span className="font-semibold">October 2023</span>
							</div>
							<div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
								{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
									(day) => (
										<div key={day}>{day}</div>
									)
								)}
							</div>
							<div className="grid grid-cols-7 gap-2 text-center text-sm">
								{Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
									<div
										key={day}
										className={`p-1 rounded-full cursor-pointer ${
											[9, 10, 11, 12, 13].includes(day)
												? "bg-orange-100 text-orange-500"
												: "hover:bg-gray-200"
										}`}
									>
										{day}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Column 3: Review & Confirm */}
					<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
						<h2 className="text-xl font-bold mb-4">3. Review & Confirm</h2>
						<p className="text-sm text-gray-600 mb-4">
							Get an instant preview of your booking details and invoice
							before final confirmation.
						</p>
						<div className="bg-white p-4 rounded-md border border-gray-200 space-y-3 text-sm">
							<div className="font-semibold mb-2">Booking Summary</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Service:</span>
								<span>Social Media Strategy</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Date:</span>
								<span>October 9, 2023</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Time:</span>
								<span>10:00 AM - 11:00 AM</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Talent:</span>
								<span>Sophia Chen</span>
							</div>
							<hr className="my-2" />
							<div className="flex justify-between font-bold text-base">
								<span>Total:</span>
								<span>$450.00</span>
							</div>
						</div>
					</div>
				</div>

				<Button size="lg">Start Your Booking Journey</Button>
			</div>
		</div>
	);
}