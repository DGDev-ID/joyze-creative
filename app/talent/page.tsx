import React from "react";
import Card from "@/components/ui/Card";
import { MotionDiv } from "@/components/ui/MotionWrap";
import Image from "next/image";

const talents = [
	{
		id: 1,
		name: "Elara Vance",
		role: "Social Media Strategist",
		bio: "Elara crafts data-driven social strategies that elevate brands and engage communities.",
		avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
	},
	{
		id: 2,
		name: "Liam Foster",
		role: "Lead Photographer",
		bio: "Liam captures striking visuals with a cinematic eye for storytelling and product detail.",
		avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=60",
	},
	{
		id: 3,
		name: "Chloe Lee",
		role: "Content Creator & Copywriter",
		bio: "Chloe writes compelling narratives that resonate with audiences and drive engagement.",
		avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
	},
	{
		id: 4,
		name: "Marcus Thorne",
		role: "Video Producer",
		bio: "Marcus directs and edits cinematic short-form content that tells brand stories with impact.",
		avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=60",
	},
	{
		id: 5,
		name: "Sophia Rodriguez",
		role: "Influencer Outreach Specialist",
		bio: "Sophia builds authentic influencer partnerships to extend brand reach and conversions.",
		avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=60",
	},
	{
		id: 6,
		name: "Noah Jensen",
		role: "Graphic Designer",
		bio: "Noah creates distinctive visual identities and assets that stand out across channels.",
		avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
	},
];

export default function Talent() {
	return (
		<div className="w-full py-20 text-[var(--background)] relative">
			<span className="absolute -right-10 -top-8 w-44 h-44 rounded-full bg-[var(--bg-primary)] opacity-20 blur-2xl transform rotate-12 animate-float" aria-hidden />
			<span className="absolute -left-8 -bottom-6 w-36 h-36 rounded-full bg-[var(--bg-light)] opacity-25 blur-lg animate-float" aria-hidden />
			{/* extra decorative blobs */}
			<span className="absolute left-4 top-16 w-28 h-28 rounded-full bg-[var(--bg-light)] opacity-18 blur-xl animate-float" aria-hidden />
			<span className="absolute -right-16 bottom-10 w-44 h-44 rounded-full bg-[var(--bg-primary)] opacity-12 blur-3xl transform rotate-6 animate-float" aria-hidden />
			<div className="max-w-7xl mx-auto px-4 text-center">
						<MotionDiv initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
							<h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--background)] mb-4">
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

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{talents.map((t, idx) => (
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
												<Image src={t.avatar} alt={t.name} width={112} height={112} className="w-full h-full object-cover" />
											</div>
											<h3 className="text-lg font-semibold">{t.name}</h3>
											<div className="text-sm text-gray-500 mb-3">{t.role}</div>
											<p className="text-sm text-gray-600">{t.bio}</p>
										</div>
									</Card>
								</MotionDiv>
							))}
						</div>
			</div>
		</div>
	);
}

