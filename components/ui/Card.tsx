import React, { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Tailwind padding classes (default: p-6) */
  padding?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", padding = "p-6", ...props }) => {
  return (
    <div
      {...props}
      className={`bg-white rounded-lg shadow-sm transition-shadow duration-200 hover:shadow-[0_20px_40px_rgba(255,173,51,0.18)] ${padding} ${className} h-full flex flex-col`}
    >
      {children}
    </div>
  );
};

export default Card;
