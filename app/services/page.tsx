"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

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
		<div className="w-full py-20">
			<div className="max-w-7xl mx-auto px-4 text-center">
				<h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--background)] mb-4">
					Our Creative Services
				</h1>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
					Elevate your brand with our tailored digital marketing and creative
					solutions.
				</p>

				<div className="flex justify-center flex-wrap gap-4 mt-8">
					{categories.map((c) => (
						<Button
							key={c}
							variant={activeCategory === c ? "primary" : "primary-line"}
							pill
							onClick={() => setActiveCategory(c)}
						>
							{c}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

