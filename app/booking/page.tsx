"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { MotionDiv } from "@/components/ui/MotionWrap";
import BookingModal from "@/components/ui/BookingModal";
import { services as SERVICES } from "@/components/data/services";

import { ChevronDown, Calendar, Clock, CheckCircle } from "lucide-react";

export default function BookingPage() {
	const [selectedService, setSelectedService] = useState(
		"Social Media Strategy"
	);
	const services = [
		"Social Media Strategy",
		"Content Creation Package",
		"Influencer Collaboration",
		"Brand Identity Design",
	];

	const handleServiceSelect = (service: string) => {
		setSelectedService(service);
		// dropdown remains open per design
	};

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className="w-full py-12 text-gray-900 relative">
			<span className="absolute -right-10 -top-6 w-50 h-50 rounded-full bg-[var(--bg-primary)] opacity-25 blur-xl transform rotate-12 animate-float" aria-hidden />
			<span className="absolute -left-6 -bottom-6 w-38 h-38 rounded-full bg-[var(--bg-light)] opacity-30 blur-lg animate-float" aria-hidden />
			{/* extra decorative blobs */}
			<span className="absolute left-10 top-20 w-28 h-28 rounded-full bg-[var(--bg-light)] opacity-20 blur-xl animate-float" aria-hidden />
			<span className="absolute -right-20 bottom-20 w-56 h-56 rounded-full bg-[var(--bg-primary)] opacity-12 blur-3xl animate-float" aria-hidden />
			<div className="max-w-7xl mx-auto px-4 text-center">
				<MotionDiv initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
					<h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
						<span>Streamlined Booking,</span>
						<span className="block">Unmatched Creativity</span>
					</h1>
				</MotionDiv>

				<MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.12 }}>
					<p className="text-lg max-w-2xl mx-auto mb-12">
						Experience Joyze Creative Agency&apos;s effortless automated booking
						system. Select services, schedule with ease, and preview your
						invoice in real-time.
					</p>
				</MotionDiv>

				<div className="grid lg:grid-cols-3 gap-8 text-left mb-12 items-start">
					{/* Column 1: Select Your Service */}
					<MotionDiv className="h-full" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
					<div className="bg-white p-6 rounded-lg shadow-md ring-1 ring-gray-50 h-full">
						<div className="flex items-center justify-between gap-3 mb-3">
							<h2 className="text-lg font-semibold">1. Select Your Service</h2>
							<div className="w-10 h-10 rounded-md flex items-center justify-center bg-[var(--bg-primary)]/10 text-[var(--bg-primary)]">
								<Calendar className="w-5 h-5" />
							</div>
						</div>
						<p className="text-sm text-gray-600 mb-4">
							Choose from our diverse range of creative marketing solutions tailored to your needs.
						</p>
						<div className="relative">
							<div className="bg-white p-3 rounded-md border border-gray-200 flex justify-between items-center cursor-pointer">
								<span>{selectedService}</span>
								<ChevronDown className="w-4 h-4 text-gray-500" />
							</div>
							<div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
								{services.map((service) => (
									<MotionDiv
										key={service}
										className={`p-3 cursor-pointer hover:bg-gray-100 ${
											selectedService === service
												? "bg-[var(--bg-light)] text-[var(--bg-primary)]"
												: ""
										}`}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => handleServiceSelect(service)}
									>
										{service}
									</MotionDiv>
								))}
							</div>
						</div>
					</div>
					</MotionDiv>

					{/* Column 2: Schedule Your Session */}
					<MotionDiv className="h-full" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }}>
					<div className="bg-white p-6 rounded-lg shadow-md ring-1 ring-gray-50 h-full">
						<div className="flex items-center justify-between gap-3 mb-3">
							<h2 className="text-lg font-semibold">2. Schedule Your Session</h2>
							<div className="w-10 h-10 rounded-md flex items-center justify-center bg-[var(--bg-primary)]/10 text-[var(--bg-primary)]">
								<Clock className="w-5 h-5" />
							</div>
						</div>
						<p className="text-sm text-gray-600 mb-4">Pick an available date and time that fits your schedule using our real-time calendar.</p>
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
									<MotionDiv
										key={day}
										className={`p-1 rounded-full cursor-pointer text-sm flex items-center justify-center ${
											[9, 10, 11, 12, 13].includes(day)
												? "bg-[var(--bg-primary)]/10 text-[var(--bg-primary)]"
												: "hover:bg-gray-200"
										}`}
										whileHover={{ scale: 1.06 }}
										whileTap={{ scale: 0.96 }}
										title={`October ${day}`}
									>
										{day}
									</MotionDiv>
								))}
							</div>
						</div>
					</div>
					</MotionDiv>

					{/* Column 3: Review & Confirm */}
					<MotionDiv className="h-full" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }}>
					<div className="bg-white p-6 rounded-lg shadow-md ring-1 ring-gray-50 h-full">
						<div className="flex items-center justify-between gap-3 mb-3">
							<h2 className="text-lg font-semibold">3. Review & Confirm</h2>
							<div className="w-10 h-10 rounded-md flex items-center justify-center bg-[var(--bg-primary)]/10 text-[var(--bg-primary)]">
								<CheckCircle className="w-5 h-5" />
							</div>
						</div>
						<p className="text-sm text-gray-600 mb-4">Get an instant preview of your booking details and invoice before final confirmation.</p>
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
					</MotionDiv>
				</div>

					<MotionDiv initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
						<Button size="lg" onClick={() => setModalOpen(true)}>Start Your Booking Journey</Button>
					</MotionDiv>

					{/* Booking modal (shared) */}
					<BookingModal
						open={modalOpen}
						onClose={() => setModalOpen(false)}
						services={SERVICES}
						requireServiceSelection
						onSubmit={(data) => { console.log('Booking from booking page:', data); setModalOpen(false); }}
					/>
			</div>
		</div>
	);
}