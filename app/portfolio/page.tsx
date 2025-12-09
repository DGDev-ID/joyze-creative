"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

const categories = [
  "All",
  "Social Media",
  "Branding",
  "Video Production",
  "Photography",
  "Web Design",
];

const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="w-full">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold text-gray-900">
          Our Creative Portfolio
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Explore a curated selection of our best work, showcasing our expertise
          in social media campaigns, branding, video production, and stunning
          photography. Each project tells a story of innovation and client
          success.
        </p>
      </section>

      <section className="pb-20 px-4">
        <div className="flex justify-center flex-wrap gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                activeCategory === category ? "primary" : "primary-light"
              }
              className="rounded-full"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Portfolio items will go here */}
        <div className="mt-16 max-w-7xl mx-auto">
          {/* Placeholder for portfolio grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Example of a portfolio item card */}
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Portfolio Item</p>
            </div>
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Portfolio Item</p>
            </div>
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Portfolio Item</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;