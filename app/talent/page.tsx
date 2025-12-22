"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { MotionDiv } from "@/components/ui/MotionWrap";
import Image from "next/image";
import Loading from "@/components/ui/Loading";
export default function Talent() {
	const [talentsData, setTalentsData] = useState<Array<{ id: number; name: string; avatar: string; role?: string; bio?: string }>>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	type TalentApi = {
		id: number;
		name: string;
		img_url?: string | null;
		imgUrl?: string | null;
		avatar?: string | null;
		jobdesc?: string | null;
		detail_jobdesc?: string | null;
	};

	useEffect(() => {
		let mounted = true;
		const fetchTalents = async () => {
			try {
				setLoading(true);
				const res = await fetch('/api/guest/talent');
				if (!res.ok) throw new Error(`Failed to fetch talents: ${res.status}`);
				const json = await res.json();
				const data = Array.isArray(json?.data) ? json.data : [];
				const mapped = (data as TalentApi[]).map((s) => ({
					id: s.id,
					name: s.name,
					avatar: s.img_url ?? s.imgUrl ?? s.avatar ?? '/talents/default.png',
					role: s.jobdesc ?? '',
					bio: s.detail_jobdesc ?? s.jobdesc ?? ''
				}));
				if (mounted) setTalentsData(mapped);
			} catch (e: unknown) {
				const msg = e instanceof Error ? e.message : String(e);
				if (mounted) setError(msg);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		fetchTalents();
		return () => { mounted = false; };
	}, []);

	return (
		<div className="w-full py-20 text-gray-900 relative">
			<span className="absolute -right-10 -top-8 w-44 h-44 rounded-full bg-(--bg-primary) opacity-20 blur-2xl transform rotate-12 animate-float" aria-hidden />
			<span className="absolute -left-8 -bottom-6 w-36 h-36 rounded-full bg-(--bg-light) opacity-25 blur-lg animate-float" aria-hidden />
			{/* extra decorative blobs */}
			<span className="absolute left-4 top-16 w-28 h-28 rounded-full bg-(--bg-light) opacity-18 blur-xl animate-float" aria-hidden />
			<span className="absolute -right-16 bottom-10 w-44 h-44 rounded-full bg-(--bg-primary) opacity-12 blur-3xl transform rotate-6 animate-float" aria-hidden />
			<div className="max-w-7xl mx-auto px-4 text-center">
						<MotionDiv initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
							<h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
								Meet Our Creative Talent
							</h1>
						</MotionDiv>

						<MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.1 }}>
							<p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
								Discover the passionate individuals behind Joyze Creative Agency. Each
								talent brings unique skills and creativity to elevate your brand&apos;s
								presence.
							</p>
						</MotionDiv>

							{loading ? (
								<div className="py-10"><Loading /></div>
							) : error ? (
								<p className="text-red-500">{error}</p>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
									{talentsData.map((t, idx) => (
								<MotionDiv
									key={t.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.45, delay: idx * 0.06 }}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Card className="p-6">
										<div className="flex flex-col items-center text-center">
											<div className="w-28 h-28 rounded-full overflow-hidden mb-4">
												<Image src={t.avatar} alt={t.name} width={112} height={112} className="w-full h-full object-cover" unoptimized />
											</div>
											<h3 className="text-lg font-semibold">{t.name}</h3>
											<div className="text-sm text-gray-500 mb-3">{t.role}</div>
											<p className="text-sm text-gray-600">{t.bio}</p>
									</div>
									</Card>
								</MotionDiv>
								))}
							</div>
						)}
			</div>
		</div>
	);
}

