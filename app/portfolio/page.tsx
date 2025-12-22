"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import WorkCard from "@/components/ui/WorkCard";
import { MotionDiv } from "@/components/ui/MotionWrap";
import { portfolio } from "@/components/data/portfolio";

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

  const items = portfolio;

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((it) => it.category === activeCategory);

  return (
    <div className="w-full relative">
      {/* Decorative blobs */}
  <span className="absolute -right-8 -top-10 w-44 h-44 rounded-full bg-(--bg-primary) opacity-20 blur-2xl transform rotate-6 animate-float" aria-hidden />
  <span className="absolute -left-6 -bottom-8 w-36 h-36 rounded-full bg-(--bg-light) opacity-25 blur-lg animate-float" aria-hidden />
  <span className="absolute left-6 top-6 w-32 h-32 rounded-full bg-(--bg-light) opacity-18 blur-xl animate-float" aria-hidden />
  <span className="absolute -right-16 bottom-12 w-52 h-52 rounded-full bg-(--bg-primary) opacity-10 blur-3xl animate-float" aria-hidden />

      <section className="text-center py-12 px-4">
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900">
            Our Creative Portfolio
          </h1>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.12 }}>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-600">
            Explore a curated selection of our best work, showcasing our expertise
            in social media campaigns, branding, video production, and stunning
            photography. Each project tells a story of innovation and client

            success.
          </p>
        </MotionDiv>
      </section>

      <section className="pb-20 px-4">
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 px-4">
          {categories.map((category, idx) => (
            <MotionDiv
              key={category}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={activeCategory === category ? "primary" : "primary-line"}
                pill
                className="min-w-[140px]"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            </MotionDiv>
          ))}
        </div>
        
        {/* Portfolio items */}
        <div className="mt-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No portfolio items found for &quot;{activeCategory}&quot;.
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <MotionDiv
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                >
                  <WorkCard
                    imageSrc={item.imageSrc}
                    title={item.title}
                    category={item.category}
                  />
                </MotionDiv>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;