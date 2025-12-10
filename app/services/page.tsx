"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/ui/ServiceCard";
import { MotionDiv } from "@/components/ui/MotionWrap";
import { Edit3, Video, Users, Megaphone, Share2, Camera } from "lucide-react";

const categories = [
	"All Services",
	"Creative Production",
	"Digital Strategy",
	"Visual Storytelling",
	"Influencer Marketing",
];

export default function Services() {
	const [activeCategory, setActiveCategory] = useState("All Services");

		return (
			<div className="w-full py-20 relative">
						<div className="max-w-7xl mx-auto px-4 text-center">
							<span className="absolute -left-12 -top-10 w-44 h-44 rounded-full bg-[var(--bg-light)] opacity-25 blur-2xl animate-float" aria-hidden />
							<span className="absolute right-6 -bottom-10 w-36 h-36 rounded-full bg-[var(--bg-primary)] opacity-20 blur-xl transform rotate-6 animate-float" aria-hidden />
							{/* extra decorative blobs */}
							<span className="absolute -right-6 top-6 w-32 h-32 rounded-full bg-[var(--bg-primary)] opacity-15 blur-xl transform rotate-12 animate-float" aria-hidden />
							<span className="absolute left-10 -bottom-6 w-24 h-24 rounded-full bg-[var(--bg-light)] opacity-18 blur-lg animate-float" aria-hidden />
								<MotionDiv initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
									<h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--background)] mb-4">
										Our Creative Services
									</h1>
								</MotionDiv>

								<MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.08 }}>
									<p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
										Elevate your brand with our tailored digital marketing and creative
										solutions.
									</p>
								</MotionDiv>

				<div className="flex justify-center flex-wrap gap-4 mt-8">
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
										<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
												<MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} whileHover={{ scale: 1.01 }}>
													<ServiceCard
														icon={<Edit3 size={18} />}
														title="Content Creation"
							description="Captivating and unique content tailored for your brand's voice and audience across all platforms."
							tiers={[
								{
									name: "Basic",
									features: ["10 Posts/Month", "Basic Graphic Design", "Content Calendar"],
									price: 500000,
									period: "/Month",
								},
								{
									name: "Standard",
									features: ["20 Posts/Month", "Advanced Graphic Design", "Copywriting", "Audience Engagement"],
									price: 950000,
									period: "/Month",
								},
								{
									name: "Premium",
									features: ["30 Posts/Month", "Custom Illustrations", "Video Content", "Performance Reports"],
									price: 1500000,
									period: "/Month",
								},
							]}
													/>
												</MotionDiv>

						{/* Additional service cards (match image) */}
												<MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} whileHover={{ scale: 1.01 }}>
													<ServiceCard
														icon={<Video size={18} />}
														title="Videography & Motion Graphics"
							description="Dynamic video content and engaging motion graphics to tell your story and captivate your audience."
							tiers={[
								{name: "Basic", features: ["1 Minute Explainer", "Basic Editing", "Music License"], price: 800000, period: "/Video"},
								{name: "Standard", features: ["2 Minute Promo", "Custom Graphics", "Voiceover", "B-Roll Footage"], price: 1500000, period: "/Video"},
								{name: "Premium", features: ["3-5 Minute Short Film", "Advanced Visual Effects", "Storyboarding", "Multiple Revisions"], price: 2500000, period: "/Video"},
							]}
													/>
												</MotionDiv>

												<MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} whileHover={{ scale: 1.01 }}>
													<ServiceCard
														icon={<Users size={18} />}
														title="Influencer Collaboration"
							description="Connect with relevant influencers to amplify your brand's message and reach new audiences."
							tiers={[
								{name: "Basic", features: ["Micro-Influencer Match (1)", "Campaign Briefing", "Performance Tracking"], price: 700000, period: "/Campaign"},
								{name: "Standard", features: ["Mid-Tier Influencer Match (1-2)", "Content Review", "Negotiation & Contracts"], price: 1300000, period: "/Campaign"},
								{name: "Premium", features: ["Macro-Influencer Match (1-3)", "Full Campaign Strategy", "Detailed ROI Analysis", "Ongoing Management"], price: 2200000, period: "/Campaign"},
							]}
													/>
												</MotionDiv>

												<MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }} whileHover={{ scale: 1.01 }}>
													<ServiceCard
														icon={<Megaphone size={18} />}
														title="Digital Ad Campaigns"
							description="Targeted advertising strategies across platforms like Google, Facebook, and Instagram to maximize reach and conversions."
							tiers={[
								{name: "Basic", features: ["Platform Setup (1)", "Basic Audience Targeting", "A/B Testing (1 Ad Set)"], price: 450000, period: "/Month"},
								{name: "Standard", features: ["Platform Setup (2)", "Advanced Audience Targeting", "Multiple Ad Sets & Creatives"], price: 850000, period: "/Month"},
								{name: "Premium", features: ["Multi-Platform Campaigns", "Dynamic Retargeting", "Advanced Budget Optimization", "Conversion Tracking"], price: 1400000, period: "/Month"},
							]}
													/>
												</MotionDiv>

												<MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }} whileHover={{ scale: 1.01 }}>
													<ServiceCard
														icon={<Share2 size={18} />}
														title="Social Media Management"
							description="Full-service management of your social media channels to boost presence and engagement."
							tiers={[
								{name: "Basic", features: ["2 Platforms", "Scheduling", "Basic Analytics"], price: 600000, period: "/Month"},
								{name: "Standard", features: ["3 Platforms", "Community Management", "Growth Strategy", "Monthly Reports"], price: 1100000, period: "/Month"},
								{name: "Premium", features: ["All Platforms", "Influencer Outreach", "Campaign Management", "Crisis Management"], price: 1800000, period: "/Month"},
							]}
													/>
												</MotionDiv>

												<MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }} whileHover={{ scale: 1.01 }}>
													<ServiceCard
														icon={<Camera size={18} />}
														title="Brand Photography"
							description="Professional photography services to capture your brand's essence with high-quality visuals."
							tiers={[
								{name: "Basic", features: ["1 Hour Shoot", "10 Edited Photos", "Online Gallery"], price: 400000, period: "/Session"},
								{name: "Standard", features: ["2 Hour Shoot", "25 Edited Photos", "Product Shots", "Location Scouting"], price: 750000, period: "/Session"},
								{name: "Premium", features: ["Half-Day Shoot", "50+ Edited Photos", "Lifestyle & Team Photos", "Props & Styling"], price: 1200000, period: "/Session"},
							]}
													/>
												</MotionDiv>
					</div>
				</div>
			</div>
		</div>
	);
}

