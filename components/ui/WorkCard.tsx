import React from "react";
import Image from "next/image";

export interface WorkCardProps {
  imageSrc: string;
  title: string;
  category?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ imageSrc, title, category }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm group">
      <div className="relative aspect-square bg-gray-100">
        <Image src={imageSrc} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />

        {/* gradient overlay: appears on hover and fades toward center */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden />

        {/* Title + category overlay */}
        <div className="absolute left-4 right-4 bottom-4 pointer-events-none">
          <h3 className="text-lg font-semibold text-white drop-shadow-sm leading-tight">{title}</h3>
          {category && (
            <span className="inline-block mt-2 text-xs bg-white/90 text-gray-800 px-3 py-1 rounded-full transition-colors duration-200 pointer-events-auto group-hover:bg-(--bg-primary) group-hover:text-white">
              {category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
