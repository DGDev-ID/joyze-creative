"use client";

import React from "react";
import { motion } from "framer-motion";

type LoadingProps = {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
};

const sizeMap: Record<NonNullable<LoadingProps["size"]>, string> = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
};

export default function Loading({ text = "Loading...", size = "md", fullScreen = false, className = "" }: LoadingProps) {
  const dims = sizeMap[size];

  const wrapperCls = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
    : "inline-flex items-center";

  return (
    <div className={`${wrapperCls} ${className}`} role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <motion.svg
          className={`${dims} text-(--bg-primary)`}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.15, ease: "linear" }}
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <circle cx="25" cy="25" r="20" strokeOpacity="0.12" strokeWidth="6" stroke="currentColor" />
          <path
            d="M45 25a20 20 0 0 0-20-20"
            strokeWidth="6"
            strokeLinecap="round"
            stroke="url(#g)"
            fill="none"
          />
        </motion.svg>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-(--bg-primary)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-(--bg-primary)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.18 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-(--bg-primary)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.36 }}
            />
          </div>

          <div className="text-sm text-gray-600 mt-2">{text}</div>
        </div>
      </div>
    </div>
  );
}
