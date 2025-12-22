"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/ui/ServiceCard";
import BookingModal from "@/components/ui/BookingModal";
import type { ServiceItem } from "@/components/ui/BookingModal";
import { MotionDiv } from "@/components/ui/MotionWrap";
import Loading from "@/components/ui/Loading";

// API response types (lightweight) to avoid `any`
type ServiceTypeDescriptionApi = {
	id: number;
	service_type_id?: number;
	description?: string;
};

type ServiceTypeApi = {
	id: number;
	service_id?: number;
	name?: string;
	title?: string;
	price?: number | string;
	price_raw?: number | string;
	price_display?: string;
	priceText?: string;
	serviceTypeDescriptions?: ServiceTypeDescriptionApi[];
};

type ServiceApi = {
	id: number;
	name?: string;
	title?: string;
	description?: string;
	summary?: string;
	unit?: string;
	serviceTypes?: ServiceTypeApi[];
};

type CategoryApi = { id: number; name: string };

// categories will be loaded from API; keep a default placeholder while loading
// structure: { id: number | null, name: string }

export default function Services() {
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null); // null = All Services
	const [categoriesList, setCategoriesList] = useState<{ id: number | null; name: string }[]>([
		{ id: null, name: 'All Services' },
	]);
	const [services, setServices] = useState<ServiceItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// When using backend-driven categories we ask the server for filtered results.
	// filteredServices simply mirrors services returned by the API for the selected category.
	const filteredServices = services;
	const activeCategoryName = categoriesList.find((c) => c.id === activeCategoryId)?.name ?? 'All Services';

	// modal & booking form state
	const [modalOpen, setModalOpen] = useState(false);
	const [booking, setBooking] = useState(() => ({
		cust_name: "",
		cust_email: "",
		cust_phone: "",
		service_id: "",
		service_type_id: "0",
		start_date: "",
		end_date: "",
	}));

	// fetch services from backend API and map to UI shape
	useEffect(() => {
		let cancelled = false;
		async function load() {
			setLoading(true);
			setError(null);
			try {
				const base = '/api/guest/service';
				const url = activeCategoryId ? `${base}?category-id=${activeCategoryId}` : base;
				const res = await fetch(url);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = await res.json();
				const data = (json?.data ?? json) as ServiceApi[];
				const mapped = (data || []).map((s: ServiceApi) => {
					const mapUnit = (u: string | undefined) => {
						if (!u) return undefined;
						switch (String(u).toUpperCase()) {
							case 'MONTH':
							case 'MONTHS':
								return '/bulan';
							case 'DAY':
								return '/hari';
							case 'SESSION':
								return '/sesi';
							case 'VIDEO':
								return '/video';
							default:
								return `/${String(u).toLowerCase()}`;
						}
					};

					const tiers = (s.serviceTypes || []).map((st: ServiceTypeApi) => {
						const rawPrice = st.price ?? st.price_raw ?? st.price_display;
						let priceNum: number | undefined = undefined;
						if (rawPrice != null) {
							const digits = String(rawPrice).replace(/[^0-9.-]+/g, '');
							const n = Number(digits);
							if (!Number.isNaN(n)) priceNum = n;
						}
						const priceDisplay = priceNum != null
							? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(priceNum)
							: (st.price_display ?? st.priceText ?? undefined);

						const features = (st.serviceTypeDescriptions || []).map((d: ServiceTypeDescriptionApi) => d.description).filter(Boolean) as string[];

						return {
							name: st.name ?? st.title ?? `Tier ${st.id}`,
							price: priceNum,
							priceDisplay,
							period: mapUnit(s.unit),
							features,
						};
					});

					return {
						id: String(s.id),
						title: s.name ?? s.title ?? `Service ${s.id}`,
						description: s.description ?? s.summary ?? '',
						icon: null,
						tiers,
					};
				});
				if (!cancelled) {
					setServices(mapped);
					// set default booking service if not set (use functional update to avoid stale deps)
					if (mapped.length > 0) {
						setBooking((prev) => (prev.service_id ? prev : ({ ...prev, service_id: mapped[0].id })));
					}
				}
			} catch (err: unknown) {
				if (!cancelled) setError((err as Error)?.message ?? String(err));
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => { cancelled = true; };
	}, [activeCategoryId]); // refetch when selected category changes

	// load categories from API once on mount
	useEffect(() => {
		let cancelled = false;
			(async () => {
				try {
					const res = await fetch('/api/guest/service/category');
					if (!res.ok) throw new Error(`HTTP ${res.status}`);
					const json = await res.json();
					const data = (json?.data ?? json) as CategoryApi[];
					const mapped = (data || []).map((c: CategoryApi) => ({ id: c.id, name: c.name }));
					if (!cancelled) setCategoriesList([{ id: null, name: 'All Services' }, ...mapped]);
				} catch {
					// ignore; keep default categories
				}
			})();
		return () => { cancelled = true; };
	}, []);

		return (
			<div className="w-full py-20 relative">
						<div className="max-w-7xl mx-auto px-4 text-center">
							<span className="absolute -left-12 -top-10 w-44 h-44 rounded-full bg-(--bg-light) opacity-25 blur-2xl animate-float" aria-hidden />
							<span className="absolute right-6 -bottom-10 w-36 h-36 rounded-full bg-(--bg-primary) opacity-20 blur-xl transform rotate-6 animate-float" aria-hidden />
							{/* extra decorative blobs */}
							<span className="absolute -right-6 top-6 w-32 h-32 rounded-full bg-(--bg-primary) opacity-15 blur-xl transform rotate-12 animate-float" aria-hidden />
							<span className="absolute left-10 -bottom-6 w-24 h-24 rounded-full bg-(--bg-light) opacity-18 blur-lg animate-float" aria-hidden />
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

								{error && <div className="text-center text-sm text-red-500 mb-4">Error loading services: {error}</div>}

				<div className="flex justify-center flex-wrap gap-4 mt-8 px-4">
					{categoriesList.map((c, idx) => (
						<MotionDiv key={String(c.id ?? 'all') + idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.04 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
							<Button
								variant={activeCategoryId === c.id ? "primary" : "primary-line"}
								pill
								className="min-w-40"
								onClick={() => setActiveCategoryId(c.id)}
							>
								{c.name}
							</Button>
						</MotionDiv>
					))}
				</div>

				{/* Service cards */}
					<div className="mt-12">
						{loading ? (
							<div className="py-10 flex justify-center"><Loading /></div>
						) : (
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
											title={s.title}
											description={s.description}
											tiers={s.tiers}
										/>
									</MotionDiv>
								)) : (
									<div className="text-center col-span-full text-gray-500">No services found for {activeCategoryName}.</div>
								)}
							</div>
						)}

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