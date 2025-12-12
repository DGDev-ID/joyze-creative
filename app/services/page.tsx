"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/ui/ServiceCard";
import BookingModal from "@/components/ui/BookingModal";
import { services as SERVICES } from "@/components/data/services";
import { MotionDiv } from "@/components/ui/MotionWrap";

const categories = [
	"All Services",
	"Creative Production",
	"Digital Strategy",
	"Visual Storytelling",
	"Influencer Marketing",
];

export default function Services() {
	const [activeCategory, setActiveCategory] = useState("All Services");
	const services = SERVICES;

	// map service ids to the category they belong to (used for filtering)
	const categoryMap: Record<string, string> = {
		"content-creation": "Creative Production",
		"videography": "Visual Storytelling",
		"photography": "Visual Storytelling",
		"influencer": "Influencer Marketing",
		"ads": "Digital Strategy",
		"social": "Digital Strategy",
	};

	const filteredServices = activeCategory === "All Services"
		? services
		: services.filter((s) => categoryMap[s.id] === activeCategory);

	// modal & booking form state
	const [modalOpen, setModalOpen] = useState(false);
	const [booking, setBooking] = useState(() => ({
		cust_name: "",
		cust_email: "",
		cust_phone: "",
		service_id: services.length > 0 ? services[0].id : "",
		service_type_id: "0",
		start_date: "",
		end_date: "",
	}));

		return (
			<div className="w-full py-20 relative">
						<div className="max-w-7xl mx-auto px-4 text-center">
							<span className="absolute -left-12 -top-10 w-44 h-44 rounded-full bg-[var(--bg-light)] opacity-25 blur-2xl animate-float" aria-hidden />
							<span className="absolute right-6 -bottom-10 w-36 h-36 rounded-full bg-[var(--bg-primary)] opacity-20 blur-xl transform rotate-6 animate-float" aria-hidden />
							{/* extra decorative blobs */}
							<span className="absolute -right-6 top-6 w-32 h-32 rounded-full bg-[var(--bg-primary)] opacity-15 blur-xl transform rotate-12 animate-float" aria-hidden />
							<span className="absolute left-10 -bottom-6 w-24 h-24 rounded-full bg-[var(--bg-light)] opacity-18 blur-lg animate-float" aria-hidden />
								<MotionDiv initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
									<h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
										Our Creative Services
									</h1>
								</MotionDiv>

								<MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.08 }}>
									<p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
										Elevate your brand with our tailored digital marketing and creative
										solutions.
									</p>
								</MotionDiv>

				<div className="flex justify-center flex-wrap gap-4 mt-8 px-4">
					{categories.map((c, idx) => (
						<MotionDiv key={c} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.04 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
							<Button
								variant={activeCategory === c ? "primary" : "primary-line"}
								pill
								onClick={() => setActiveCategory(c)}
							>
								{c}
							</Button>
						</MotionDiv>
					))}
				</div>

				{/* Service cards */}
				<div className="mt-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
						{filteredServices.length > 0 ? filteredServices.map((s, idx) => (
							<MotionDiv
								key={s.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.45, delay: idx * 0.05 }}
								whileHover={{ scale: 1.01 }}
							>
								<ServiceCard
									serviceId={s.id}
									onBook={(serviceId) => {
										setBooking((b) => ({ ...b, service_id: String(serviceId), service_type_id: "0" }));
										setModalOpen(true);
									}}
									icon={s.icon}
									title={s.title}
									description={s.description}
									tiers={s.tiers}
								/>
							</MotionDiv>
														)) : (
															<div className="text-center col-span-full text-gray-500">No services found for {activeCategory}.</div>
														)}
					</div>

					{/* Booking modal (component) */}
					<BookingModal
						open={modalOpen}
						onClose={() => setModalOpen(false)}
						services={services}
						initial={booking}
						onSubmit={(data) => { console.log("Booking submitted:", data); setBooking(data); setModalOpen(false); }}
					/>
				</div>
			</div>
		</div>
	);
}